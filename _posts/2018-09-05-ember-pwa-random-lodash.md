---
layout: post
title: Progressive Ember - Random Lodash
tags: [ember, progressive-web, web-development, javascript]
---

A walk through the real effort to transition an enterprise level Ember application to a progressive web application.

Part three: Random Lodash
<!--more-->

## Dependency Hell
Back in the initial baseline, which you can re-read [here]({% post_url 2018-09-01-ember-pwa-baseline %}), there was an egregious **65 kB** in my vendor build from `lodash`. My application doesn't use lodash at all, so some transitive dependency is leaking its way in to my application.

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

![Include Fonts Lighthouse](/public/img/posts/20180911/include-fonts-lighthouse.png "Include Fonts - Lighthouse")

![No Liquid Fire - Build](/public/img/posts/20180910/no-liquid-fire-build.png "No Liquid Fire - Build")

After:

![No Lodash Lighthouse](/public/img/posts/20180912/no-lodash-lighthouse.png "No Lodash - Lighthouse")

![No Lodash - Build](/public/img/posts/20180912/no-lodash-build.png "No Lodash - Build")

Removing **47 kB** had a substantial impact on my application's performance. Time to first paint was down a few hundred milliseconds and main thread work decreased. Things are starting to look much better.

Next up, **54 kB** for moment? wtf.

## Keep reading
- [Baseline]({% post_url 2018-09-01-ember-pwa-baseline %}) 
- [Add web manifest]({% post_url 2018-09-02-ember-pwa-manifest %}) 
- [Remove liquid fire]({% post_url 2018-09-03-ember-pwa-no-liquid-fire %}) 
- [Bundle web fonts]({% post_url 2018-09-04-ember-pwa-include-web-fonts %}) 
- [Random Lodash]({% post_url 2018-09-05-ember-pwa-random-lodash %}) _(you are here)_
- [Moment Timezones]({% post_url 2018-09-06-ember-pwa-moment-timezones %})
- [Remove Showdown]({% post_url 2018-09-07-ember-pwa-showdown %})
- [Lazy Locales]({% post_url 2018-09-08-ember-pwa-lazy-locales %})
- [Service Worker]({% post_url 2018-09-09-ember-pwa-service-worker %})