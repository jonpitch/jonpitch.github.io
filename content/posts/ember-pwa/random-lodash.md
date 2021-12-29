---
title: "Progressive Ember - Random Lodash"
date: 2018-09-05T00:00:00-05:00
draft: false
tags: [ember, progressive-web, web-development, javascript]
---

A walk through the real effort to transition an enterprise level Ember application to a progressive web application.

Part three: Random Lodash
<!--more-->

## Dependency Hell
Back in the initial baseline, which you can re-read [here]({{< ref "/posts/ember-pwa/baseline" >}} "ember pwa baseline"), there was an egregious **65 kB** in my vendor build from `lodash`. My application doesn't use lodash at all, so some transitive dependency is leaking its way in to my application.

## Tracking Down
This is tough because of the way Ember treats dependencies. For simplicity, let's just say everything in your application is treated as a `devDependency` rather than a dependency. Even addons who specify a `dependency`, might not actually be injecting these dependencies in to your final production build.

A good example of this is [ember-cli-mirage](https://github.com/samselikoff/ember-cli-mirage). Mirage has `lodash` as a `dependency`, but because Mirage is a testing tool, there's no need to include it in your production build, so if Mirage is removed from your production build, so are its dependencies.

You can try tools like `yarn why` or `npm ls -ls`, but even these won't be that helpful. _If anyone has some secret weapon here, I'd love to hear about it._

I went through the `package.json` file of all of my 1st party dependencies (dependencies that exist in my own `package.json`) that would be included in my production build. I flagged any dependency that had either `lodash` or `ember-lodash` as a `dependency`. There was a little trial and error here, removing dependencies re-running `broccoli-concat-analyser` until I found the [winner](https://github.com/Exelord/ember-rollbar-client).

Ultimately the culprit was:

```javascript
import deepMerge from 'lodash/merge';
```

This import is in a service that I inject in my application.

## Removing
The lucky dependency was an addon I need to integrate with [Rollbar](https://rollbar.com/). Rather than remove this dependency, I opened a [pull request](https://github.com/Exelord/ember-rollbar-client/pull/35). It seems that the only reason that dependency exists in the first place is for one specific instance, to perform a deep merge. This is a perfect example of just because you can `ember install` something, it doesn't mean you have to.

At the time of this post, this pull request has not yet merged. In the mean time, if you need to use the slimmed down version, you can use [my fork](https://github.com/jonpitch/ember-rollbar-client/tree/no-lodash).

**Pro Tip:** There's a lot of momentum right now around [ember-auto-import](https://github.com/ef4/ember-auto-import) for importing any NPM dependency in an Ember application. While this is an amazing addon, do be mindful that at the time of this post, it does add **17 kB** to your vendor build.

## Results
Before:

![Include Fonts Lighthouse](../images/include-fonts-lighthouse.png "Include Fonts - Lighthouse")

![No Liquid Fire - Build](../images/no-liquid-fire-build.png "No Liquid Fire - Build")

After:

![No Lodash Lighthouse](../images/no-lodash-lighthouse.png "No Lodash - Lighthouse")

![No Lodash - Build](../images/no-lodash-build.png "No Lodash - Build")

Removing **47 kB** had a substantial impact on my application's performance. Time to first paint was down a few hundred milliseconds and main thread work decreased. Things are starting to look much better.

Next up, **54 kB** for moment? wtf.

## Keep reading
- [Baseline]({{< ref "/posts/ember-pwa/baseline" >}} "baseline") 
- [Add web manifest]({{< ref "/posts/ember-pwa/manifest" >}} "web manifest") 
- [Remove liquid fire]({{< ref "/posts/ember-pwa/no-liquid-fire" >}} "remove liquid fire") 
- [Bundle web fonts]({{< ref "/posts/ember-pwa/web-fonts" >}} "web fonts") 
- [Random lodash]({{< ref "/posts/ember-pwa/random-lodash" >}} "random lodash") _(you are here)_
- [Moment Timezones]({{< ref "/posts/ember-pwa/moment-timezones" >}} "moment timezones")
- [Remove Showdown]({{< ref "/posts/ember-pwa/showdown" >}} "remove showdown")
- [Lazy Locales]({{< ref "/posts/ember-pwa/lazy-locales" >}} "lazy locales")
- [Service worker]({{< ref "/posts/ember-pwa/service-worker" >}} "service worker")