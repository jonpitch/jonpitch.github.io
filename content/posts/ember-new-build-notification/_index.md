---
title: Adding a new build notification to an Ember application
tags: [ember, web-development, javascript, progressive-web]
medium: https://medium.com/@jonpitch/adding-a-new-build-notification-to-an-ember-application-c657211289f6
date: 2018-09-26T00:00:00-05:00
draft: false
---

Continuous deployment of your Ember app is great; users with stale builds isn't as great. Let's take a look at building a new build notification using a service worker.
<!--more-->

## Problem
Users of my Ember application tend to have long running sessions. My team and I also prefer to release code often. Those releases usually come with corresponding backend changes. While we spend a lot of time making sure those releases are backwards compatible, it would be nice to have some assurance the old builds are no longer in use after a reasonable amount of time.

Note that this isn't specifically an Ember problem. While the approach and solution will be in the context of an Ember application, this could be adapted for any single page application.

## Approach
We need the Ember application to know that there is a newer build available. There are a few ways to tackle this, but I'm going to use a [Service Worker](https://developers.google.com/web/fundamentals/primers/service-workers/). I like the service worker for this because not only will it make this notification simpler, it will set up my application for any future progressive web functionality.

The service worker is served from the server and will have a version associated with it. We need to rely on this always being the most up to date, so this file should never be cached or fingerprinted by a build process. We need to be able to `GET /sw.js` and know it's the latest version.

When the user requests my application, the service worker gets registered. We'll attach a handler to the `onupdatefound` event of the service worker registration. At the same time, we'll set up a polling interval to tell the service worker to update itself, fetching the latest file from the server and re-registering itself. If the version of the service worker changes, our `onupdatefound` event will fire and we can handle it, showing the user a notification.

## Putting Pieces Together
Start by adding a service worker, I'll use [ember-service-worker](https://github.com/DockYard/ember-service-worker):

```bash
ember install ember-service-worker
```

This addon will put a service worker into your Ember build, but it won't do much else. It will however offer us an ability to version this file with every build of our application.

Next we need to attach our `onupdatefound` handler. In the root of your Ember project, not `/app`, literally the root (outside of the app tree), add `/service-worker-registration/index.js` with the following:

{{< gist jonpitch 0b324bad7a2b52d856543f991cb1dc45 sw-registration.js >}}

We are going to use `window.isUpdateAvailable` to know when a new build is available. For browsers that support [Promises](https://caniuse.com/#search=Promise), we create a promise that will hook in to the `ember-service-worker` lifecycle. When our service worker successfully installs, our function is invoked and we receive the service worker registration (`reg`). We add a little function to the `onstatechange` event, that when the service worker activates, resolves our promise.

We use `addSuccessHandler` here with `ember-service-worker` because we only want to attach this event handler once, on application load.

This next piece will likely be very application specific, since there's a design element to it. In my application, I'm going to use the Material Web Component [snackbar](https://material.io/develop/web/components/snackbars/) since that aligns with our design system. I'll then create a component that gets put in my `application.hbs` template:

```bash
ember g component new-build-notifier
```

The component code will be:

{{< gist jonpitch 0b324bad7a2b52d856543f991cb1dc45 new-build-notifier.js >}}

Let's walk through this component:

#### `init`
The component is configured with some polling interval. Let's go with 20 minutes for now.

#### `didInsertElement`
The component is inserted into the DOM and we wait for 20 minutes. After that time is up, we attach a handler to our `window.isUpdateAvailable` promise and re-request the service worker.

That initial delay is important. Because we're not caching our initial web application request, users who load the application will be served the most recent build. What I'm really after are the folks who linger for a long time. The delay isn't perfect, but it will catch the majority of the long sessions. If the delay wasn't there, every time you visit `/`, you'll immediately get a notification that a new build is available, which would be annoying.

#### `pollingTask`
Issue a `GET /sw.js` request and tell the service worker to update itself. When the next service worker installs, if the version differs from the initial version the user requested, our `window.isUpdateAvailable` promise will resolve, and we can fire a notification.

## Result
I can deploy code often and users who have stale builds will see a very nice notification informing them to upgrade to the latest version.

![new build notification](../images/new-build-notifier.png "new build notification")

_Shameless plug, you should encourage your company to take the [B Impact Assessment](https://app.bimpactassessment.net)._

If you have a similar implementation (or a better one), I'd love to hear about it; especially if there's a better solution to that initial delay of polling for changes.