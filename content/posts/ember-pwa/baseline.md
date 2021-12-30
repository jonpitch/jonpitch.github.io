---
title: "Progressive Ember - Baseline"
date: 2018-09-01T00:00:00-05:00
draft: false
tags: [ember, progressive-web, web-development, javascript]
---

A walk through the real effort to transition an enterprise level Ember application to a progressive web application.

Part one: The baseline, aka _you can't improve on what you can't measure_
<!--more-->

## What this isn't
This not going to be a step-by-step guide on building a progressive web application (PWA). I suspect that's largely dependent on your application. Besides, there are already good overviews on just that:

- [Matthew Beale](https://madhatted.com/2017/6/16/building-a-progressive-web-app-with-ember)
- [DockYard](https://dockyard.com/blog/2017/07/20/how-to-build-a-pwa-with-ember)

## It's a journey
This will be similar to a [talk](https://pusher.com/sessions/meetup/emberfest/building-the-progressive-web-app-for-hackernewsio-in-ember) given by Ivan Vanderbyl at EmberFest. While `ember install`ing a [service worker](https://github.com/DockYard/ember-service-worker) and adding a [web manifest](https://github.com/san650/ember-web-app) will boost your Lighthouse score, there's a lot more that goes into a PWA.

My application isn't a simple to-do list or blog post list either; So it's not as easy to _"just remove jQuery"_ or tack on a service worker. It's a real business application that is internationalized in 5 languages, has a lot of dependencies, consists of a large design system, etc.

## Baseline
I'll be using a few tools through this journey that are critical to measuring success.

- Lighthouse - [chrome extension](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk?hl=en), [lighthouse-ci](https://github.com/ebidel/lighthouse-ci)
- [broccoli-concat-analyser](https://github.com/stefanpenner/broccoli-concat-analyser)

I want to start with a baseline of what Lighthouse thinks of my application. 

![Baseline Lighthouse](../images/baseline-lighthouse.png "Baseline - Lighthouse")

I'm not that surprised to see _Progressive Web App_ or _Accessibility_ where it is, but _Performance_ is really poor. Notable poor performers are first meaningful paint, at a brutal **9.1 seconds** and there's a lot of main thread work parsing JavaScript. Let's dive in to just how much JavaScript are we talking about. I'll run `broccoli-concat-analyser` on the `production` build of my application to see where my size comes from exactly:

- `CONCAT_STATS=true ember s -e production`
- kill ember server
- `broccoli-concat-analyser ./concat-stats-for`

Here is the result:

![Baseline Build](../images/baseline-build.png "Baseline - Build")

What you're looking at is a breakdown of where JavaScript size comes from. Ember and jQuery are obvious eye catchers, but there are a lot of surprises in there as well. For example, my application doesn't use `lodash`, but it's included in my vendor build for some reason at a whopping **65 kB**. Moment accounts for around **40 kB**. Showdown is another huge offender at **21 Kb**.

Some other surprising items include:
- translations for my application account for **45 kB** (9 kB per language)
- [liquid-fire](https://github.com/ember-animation/liquid-fire) is **11 kB** plus velocity.js for another **10 kB**

It's easy to dismiss these things as trivial. Even if all of your users have high speed internet, every bit of JavaScript not only has to travel over the wire, but then the browser has to interpret it. So even removing 10 kilobytes can have a noticeable impact on a mobile device.

## Where to start
Before we starting caching and optimizing assets, adding service workers, etc. Let's get this build size _way_ down.

Most PWA guides for Ember will tell you to start by removing jQuery. It's about **20 kB** that isn't necessary any more. My application doesn't need to support any legacy browsers, but I can't remove jQuery just yet because I have some design components that depend on it. That's a much longer play, so I'll have to skip that for now. So where could I actually start?

- My app does not provide a web manifest
- My app doesn't use lodash, so why do I have that huge thing in my vendor build?
- My app does almost nothing with dates, so I can probably mostly get rid of moment
- My app does a minimal amount of markdown interpreting, so showdown might be overkill
- My app doesn't do a lot of animating, so I can probably get rid of liquid fire for native implementations
- Most users of my application only speak one language, so maybe I can lazy-load those languages so they're not bundled in the application by default
- Lighthouse dinged my performance on some other requests for things like fonts, I could probably do better there

Let's get to work.

## Keep reading
- [Baseline]({{< ref "/posts/ember-pwa/baseline" >}} "baseline") _(you are here)_
- [Add web manifest]({{< ref "/posts/ember-pwa/manifest" >}} "web manifest")
- [Remove liquid fire]({{< ref "/posts/ember-pwa/no-liquid-fire" >}} "remove liquid fire") 
- [Bundle web fonts]({{< ref "/posts/ember-pwa/web-fonts" >}} "web fonts") 
- [Random lodash]({{< ref "/posts/ember-pwa/random-lodash" >}} "random lodash")
- [Moment Timezones]({{< ref "/posts/ember-pwa/moment-timezones" >}} "moment timezones")
- [Remove Showdown]({{< ref "/posts/ember-pwa/showdown" >}} "remove showdown")
- [Lazy Locales]({{< ref "/posts/ember-pwa/lazy-locales" >}} "lazy locales")
- [Service worker]({{< ref "/posts/ember-pwa/service-worker" >}} "service worker")
