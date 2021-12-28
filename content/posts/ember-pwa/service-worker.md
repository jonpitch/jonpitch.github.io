---
title: "Progressive Ember - Service Worker"
date: 2018-09-09T00:00:00-05:00
draft: false
tags: [ember, progressive-web, web-development, javascript]
---

A walk through the real effort to transition an enterprise level Ember application to a progressive web application.

Part three: Adding a service worker
<!--more-->

## Strategy first
Caching and naming things. The two hardest aspects of computer science. Before bolting on a service worker, I think it's important to really think through why you want to add one in the first place.

Assuming you don't have [learner's syndrome](https://hackernoon.com/do-you-have-the-learners-syndrome-169c8158ec16), service worker can provide a lot of great benefits:

- a good offline experience
- [background sync](https://developers.google.com/web/updates/2015/12/background-sync)
- [push notifications](https://developers.google.com/web/updates/2015/03/push-notifications-on-the-open-web)
- performance benefits

There has been some interest at my organization in an offline experience. Nothing official, but I know the interest is there. There's also some interest on our engineering team to implement a "new build" notification. We often have to be extra backward-compatible to handle users with stale builds of our Ember application.

So my goal is to add a service worker and use it try and get users on newer builds of our application in a timely fashion. Potential future offline capabilities and the performance of second page visits will be a nice side effect.

## Start with the basics
I'm going to user [ember-service-worker](https://github.com/dockyard/ember-service-worker) and their [documentation](http://ember-service-worker.com/documentation/getting-started/) is really good. I'm going to end up installing three addons:

#### `ember install ember-service-worker`
This will physically add the `sw.js` file to your application, but doesn't do much else.

#### `ember install ember-service-worker-asset-cache`
A plugin to cache assets with the service worker

#### `ember install ember-service-worker-index`
A plugin to cache the network request for your `index.html` file.

#### some configuration
I update my `ember-cli-build.js` file with:

```javascript
'ember-service-worker': {
    enabled: ['development', 'test'].indexOf(env) === -1,
    registrationStrategy: 'inline'
},
'asset-cache': {
    lenientErrors: true,
    include: [
        'assets/*',
        'images/**/*',
        'images/*',
        'manifest/**/*',
        'manifest/*',
        'translations/*'
    ]
},
'esw-index': {
    location: '/'
},
```

The service worker is enabled in my `staging` and `production` environments. I'm caching the assets that my application consumes. Finally my `index.html` page is cached with a key of `/`.

In chrome you can open dev tools, navigate to the `Application` tab and click on _Service Workers_. You'll see the service worker installed for the correct domain and if you refresh the page, on the network tab you should see your assets served _from service worker_ rather than from the network or via browser cache.

Now I run lighthouse and my progressive web app score is...less than 100? I missed something.

## Getting to 100
It looks like there are a few issues:

- There's no web manifest
- No content is provided when the application is offline

I distinctly remember [adding a web manifest]({% post_url 2018-09-02-ember-pwa-manifest %}). The issue here lies with my approach to deliver the localized web manifest. Because I am adding it to the `<head>` after Ember boots, this means my cached `index.html` file, which was cached before Ember booted, has no reference to this file.

I'm not really sure what to do here. I would have to know my user's locale ahead of the application loading. I think I'll have to circle back to this, but for now, I'll add the English manifest to the head and update the URL after boot with the localized variant. Something like:

```javascript
import { get } from '@ember/object';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';

// ...

intl: service(),

_updateManifest: task(function*() {
    const [locale] = get(this, 'intl.locale');
    const href = yield get(this, 'assetMap').resolve(`manifest/${locale}/manifest.json`);
    const manifest = document.querySelector('link[rel="manifest"]');
    if (!isEmpty(manifest)) {
        manifest.setAttribute('href', href);
    }
})
```

I'm also missing a `<noscript>` tag as well. Generally a simple add, but localization makes this a little more difficult. Again, I'll just have to default to English and update after boot. For example:

```javascript
_updateNoscript() {
    const noscript = document.querySelector('noscript');
    if (!isEmpty(noscript)) {
        noscript.innerText = get(this, 'intl').t('app.errors.javascript');
    }
}
```

This seems janky, but my PWA score is 100.

## New build notification
An important detail to make this work is to never cache `sw.js` or fingerprint it. I want even cached `index.html` files making a request to the server for this file. The reason is that on every Ember build, `ember-service-worker` is going to version `sw.js` under the hood. So even my cached applications are going to request this file, the browser will see this new service worker and install it. That's the event I can hook in to in order to facilitate my new build notification.

```javascript
// app/service-worker-registration/index.js
import { addSuccessHandler } from 'ember-service-worker/service-worker-registration';
 
addSuccessHandler(function(reg) {
    window.isUpdateAvailable = new Promise(function (resolve) {
        reg.onupdatefound = () => {
            const installingWorker = reg.installing;
            installingWorker.onstatechange = () => {
                switch (installingWorker.state) {
                case 'installed':
                    if (navigator.serviceWorker.controller) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                    break;
                }
            };
        };
    });
});
```

The above plugs in to `ember-service-worker` and on the `installed` event of our service worker, we know we have a new version of `sw.js` (and thus a new build).

I can then add an Ember component that waits for this event to occur. A possible implementation could be:

```javascript
import { timeout } from 'ember-concurrency';

while (true) {
    const hasUpdate = yield window.isUpdateAvailable;
    if (hasUpdate) {
        // do your thing
    } else {
        yield timeout(1000);
    }
}
```

This block of code will only be useful for users who perform a hard refresh or visit the URL and received a cached build. They'll get a new build notification, but what about users who have longer running sessions and a new build might release in the middle of their session? Something like the following could do the trick:

```javascript
import fetch from 'fetch';
import { timeout } from 'ember-concurrency';

while (true) {
    const hasUpdate = yield window.isUpdateAvailable;
    if (hasUpdate) {
        // do your thing
    } else {
        // wait whatever time makes sense
        yield timeout(1000 * 60 * 25);
        
        // re-request the service worker to potentially trigger
        // a new install event
        yield fetch('/sw.js');
    }
}
```

While this works as expected, this interaction is likely very specific to your application. Adapt as needed.

## Results

TO DO

## Keep reading
- [Baseline]({% post_url 2018-09-01-ember-pwa-baseline %})
- [Add web manifest]({% post_url 2018-09-02-ember-pwa-manifest %})
- [Remove liquid fire]({% post_url 2018-09-03-ember-pwa-no-liquid-fire %}) 
- [Bundle web fonts]({% post_url 2018-09-04-ember-pwa-include-web-fonts %}) 
- [Random Lodash]({% post_url 2018-09-05-ember-pwa-random-lodash %})
- [Moment Timezones]({% post_url 2018-09-06-ember-pwa-moment-timezones %})
- [Remove Showdown]({% post_url 2018-09-07-ember-pwa-showdown %}) 
- [Lazy Locales]({% post_url 2018-09-08-ember-pwa-lazy-locales %}) 
- [Service Worker]({% post_url 2018-09-09-ember-pwa-service-worker %}) _(you are here)_