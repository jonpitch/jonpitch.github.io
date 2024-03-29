---
title: "Progressive Ember - Showdown"
date: 2018-09-07T00:00:00-05:00
draft: false
tags: [ember, progressive-web, web-development, javascript]
---

A walk through the real effort to transition an enterprise level Ember application to a progressive web application.

Part three: Remove Showdown
<!--more-->

## Resetting the baseline
Since the [last post]({{< ref "/posts/ember-pwa/moment-timezones" >}} "moment timezones"), my application had some features released and some refactoring that had an impact on our build size.

Here's the updated build:

![Pre-Showdown - Build](../images/pre-showdown-build.png "Pre-Showdown - Build")

Our application moved in to a [yarn workspace](https://yarnpkg.com/en/docs/workspaces) as part of a mono-repo and some other legacy code was removed. Interestingly, some dependency sizes went down after consolidation. Showdown is one of them. At our initial baseline, Showdown weighed in at **20 kB**, but now is around **10 kB**.

## Replacing showdown
My application doesn't do a tremendous amount of HTML to markdown rendering. In fact it's only in one specific instance and even then, the HTML is very paired down. It's safe to say that Showdown is still overkill for my use case.

After some research, I landed on [snarkdown](https://github.com/developit/snarkdown). It has just enough features for my use case and is very tiny. This is a straight forward import in to Ember:

```javascript
// ember-cli-build.js
app.import('node_modules/snarkdown/dist/snarkdown.umd.js', {
    using: [
        { transformation: 'amd', as: 'snarkdown' }
    ]
});

// some-component.js
import snarkdown from 'snarkdown';
```

To make things simpler on my team, I created a helper to have a similar API to the Showdown helper that we'll be losing:

```javascript
import { helper } from '@ember/component/helper';
import snarkdown from 'snarkdown';
import { htmlSafe } from '@ember/string';
import { isEmpty } from '@ember/utils';
 
export function markdownToHtml(params/*, hash*/) {
    if (isEmpty(params[0])) {
        return '';
    }
   
    return htmlSafe(snarkdown(params[0]));
}
 
export default helper(markdownToHtml);
```

Then to use:

{{< highlight handlebars >}}
{{! previously it was: }}
{{markdown-to-html markdown=content}}

{{! now is: }}
{{markdown-to-html content}}
{{< /highlight >}}

## Result
![Post-Showdown - Build](../images/post-showdown-build.png "Post-Showdown - Build")

Not only did we lose **10 kB** here, but some dependency consolidation and dead code removal had a tremendous impact on our Lighthouse score.

![Post-Showdown - Lighthouse](../images/showdown-mono-lighthouse.png "Post-Showdown - Lighthouse")

_note: ignore the SEO drop, this was a bug from the mono-repo change not serving robots.txt correctly_

Our performance score has almost doubled and our first meaningful paint is finally under 5 seconds!

Up next, lazy load locales to drop another **45 kB**.

## Keep reading
- [Baseline]({{< ref "/posts/ember-pwa/baseline" >}} "baseline")
- [Add web manifest]({{< ref "/posts/ember-pwa/manifest" >}} "web manifest")
- [Remove liquid fire]({{< ref "/posts/ember-pwa/no-liquid-fire" >}} "remove liquid fire") 
- [Bundle web fonts]({{< ref "/posts/ember-pwa/web-fonts" >}} "web fonts") 
- [Random lodash]({{< ref "/posts/ember-pwa/random-lodash" >}} "random lodash")
- [Moment Timezones]({{< ref "/posts/ember-pwa/moment-timezones" >}} "moment timezones")
- [Remove Showdown]({{< ref "/posts/ember-pwa/showdown" >}} "remove showdown") _(you are here)_
- [Lazy Locales]({{< ref "/posts/ember-pwa/lazy-locales" >}} "lazy locales")
- [Service worker]({{< ref "/posts/ember-pwa/service-worker" >}} "service worker")