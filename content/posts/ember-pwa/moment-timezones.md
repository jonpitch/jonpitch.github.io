---
title: "Progressive Ember - Moment Timezones"
date: 2018-09-06T00:00:00-05:00
draft: false
tags: [ember, progressive-web, web-development, javascript]
---

A walk through the real effort to transition an enterprise level Ember application to a progressive web application.

Part three: Moment Timezones
<!--more-->

## This will be quick
In my latest build, we still see some **12 kB** for `moment.js` and a whopping **43 kB** for `tz.min.js` (moment timezones).

![No Lodash - Build](../images/no-lodash-build.png "No Lodash - Build")

What on earth could **43 kB** of JavaScript related to timezones possibly be?

## Everything, ever.
The answer is apparently all timezone data, forever. Browsing through the [ember-cli-moment-shim](https://github.com/jasonmit/ember-cli-moment-shim) repository led me to [this](https://github.com/jasonmit/ember-cli-moment-shim#enabling-moment-timezone) part of the documentation.

I'm not sure if this was auto-generated at some point, or I was just copy/paste happy from the documentation, but apparently I was bundling `all` timezone data throughout time. I'm surprised that's even a thing; how many applications need that?

My application doesn't need anything specific to timezones, so a simple switch of my config from:

```javascript
moment: {
    includeTimezone: 'all'
}
```

to:

```javascript
moment: {
    includeTimezone: 'none'
}
```

drops some significant kilobytes. I feel ridiculous for missing that initially, but I'll take the easy win.

## Results
Before:

![No Lodash - Build](../images/no-lodash-build.png "No Lodash - Build")

After:

![No moment timezones - Build](../images/moment-build.png "No moment timezones - Build")

Up next, I'll see if I can replace [ember-cli-showdown](https://github.com/gcollazo/ember-cli-showdown) to save another **23 kB**.

## Keep reading
- [Baseline]({{< ref "/posts/ember-pwa/baseline" >}} "baseline")
- [Add web manifest]({{< ref "/posts/ember-pwa/manifest" >}} "web manifest")
- [Remove liquid fire]({{< ref "/posts/ember-pwa/no-liquid-fire" >}} "remove liquid fire") 
- [Bundle web fonts]({{< ref "/posts/ember-pwa/web-fonts" >}} "web fonts") 
- [Random lodash]({{< ref "/posts/ember-pwa/random-lodash" >}} "random lodash")
- [Moment Timezones]({{< ref "/posts/ember-pwa/moment-timezones" >}} "moment timezones") _(you are here)_
- [Remove Showdown]({{< ref "/posts/ember-pwa/showdown" >}} "remove showdown")
- [Lazy Locales]({{< ref "/posts/ember-pwa/lazy-locales" >}} "lazy locales")
- [Service worker]({{< ref "/posts/ember-pwa/service-worker" >}} "service worker")