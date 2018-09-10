---
layout: post
title: Progressive Ember - Moment Timezones
tags: [ember, progressive-web, web-development, javascript]
---

A walk through the real effort to transition an enterprise level Ember application to a progressive web application.

Part three: Moment Timezones
<!--more-->

## This will be quick
In my latest build, we still see some **12 kB** for `moment.js` and a whopping **43 kB** for `tz.min.js` (moment timezones).

![No Lodash - Build](/public/img/posts/20180912/no-lodash-build.png "No Lodash - Build")

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

![No Lodash - Build](/public/img/posts/20180912/no-lodash-build.png "No Lodash - Build")

After:

![No moment timezones - Build](/public/img/posts/20180913/moment-build.png "No moment timezones - Build")

Up next, I'll see if I can replace [ember-cli-showdown](https://github.com/gcollazo/ember-cli-showdown) to save another **23 kB**.

## Keep reading
- [Baseline]({% post_url 2018-09-01-ember-pwa-baseline %})
- [Add web manifest]({% post_url 2018-09-02-ember-pwa-manifest %})
- [Remove liquid fire]({% post_url 2018-09-03-ember-pwa-no-liquid-fire %}) 
- [Bundle web fonts]({% post_url 2018-09-04-ember-pwa-include-web-fonts %}) 
- [Random Lodash]({% post_url 2018-09-05-ember-pwa-random-lodash %})
- [Moment Timezones]({% post_url 2018-09-06-ember-pwa-moment-timezones %}) _(you are here)_