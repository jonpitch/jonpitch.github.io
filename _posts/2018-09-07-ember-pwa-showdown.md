---
layout: post
title: Progressive Ember - Showdown
tags: [ember, progressive-web, web-development, javascript]
---

A walk through the real effort to transition an enterprise level Ember application to a progressive web application.

Part three: Remove Showdown
<!--more-->

## Resetting the baseline
Since the [last post]({% post_url 2018-09-06-ember-pwa-moment-timezones %}), my application had some features released and some refactoring that had an impact on our build size.

Here's the updated build:

![Pre-Showdown - Build](/public/img/posts/20180914/pre-showdown-build.png "Pre-Showdown - Build")

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

```handlebars
{% raw %}
{{! previously it was: }}
{{markdown-to-html markdown=content}}

{{! now is: }}
{{markdown-to-html content}}
{% endraw %}
```

## Result
![Post-Showdown - Build](/public/img/posts/20180914/post-showdown-build.png "Post-Showdown - Build")

Not only did we lose **10 kB** here, but some dependency consolidation and dead code removal had a tremendous impact on our Lighthouse score.

![Post-Showdown - Lighthouse](/public/img/posts/20180914/showdown-mono-lighthouse.png "Post-Showdown - Lighthouse")

_note: ignore the SEO drop, this was a bug from the mono-repo change not serving robots.txt correctly_

Our performance score has almost doubled and our first meaningful paint is finally under 5 seconds!

Up next, lazy load locales to drop another **45 kB**.

## Keep reading
- [Baseline]({% post_url 2018-09-01-ember-pwa-baseline %})
- [Add web manifest]({% post_url 2018-09-02-ember-pwa-manifest %})
- [Remove liquid fire]({% post_url 2018-09-03-ember-pwa-no-liquid-fire %}) 
- [Bundle web fonts]({% post_url 2018-09-04-ember-pwa-include-web-fonts %}) 
- [Random Lodash]({% post_url 2018-09-05-ember-pwa-random-lodash %})
- [Moment Timezones]({% post_url 2018-09-06-ember-pwa-moment-timezones %})
- [Remove Showdown]({% post_url 2018-09-07-ember-pwa-showdown %}) _(you are here)_
- [Lazy Locales]({% post_url 2018-09-08-ember-pwa-lazy-locales %})