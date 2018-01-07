---
layout: post
title: Development Battle &mdash; Android vs. iOS &#45; Part 4&#58; Deployments, Analytics &amp; Metrics
tags: [android, ios, mobile]
---

Let's take a look at the last mile of the mobile application process, deploying to users and post deployment.

<!--more-->

# Deployment Process

## Android

Here's how things basically go down for Android:

* Create a release keystore
* Sign your application with said keystore
* Upload .apk to Google Play
* Upload your assets, description, etc.

Android Studio has done a pretty good job of helping developers out with this. By default there's a release Gradle task that will run things like ZipAlign, Proguard (if enabled), Sign with your keystore, etc. At the end you're left with a shiny .apk file.

### What I Like

* Once I'm ready for deployment, I can upload my .apk to Google Play and the app will be live in a few hours.
* Staged rollouts - If I were so inclined, I could have Google Play communities of users who would receive Alpha and Beta versions of my application ahead of release.
* I have a "production" .apk file that I could load on other devices for testing.

### What I Don't Like

* Android Studio doesn't upload my .apk for me

## iOS

And here's how things go down for iOS:

* Obtain certificates
* Publish to App Store
* Wait some arbitrary amount of time for review
* Upload assets, description, etc.

XCode actually does a pretty good job of making this final jaunt easy. I was a bit surprised how simple it was considering how other things within XCode are so terrible.

### What I Like

* XCode handles the upload of my application for me.
* The black box of certificates required is largely transparent to the developer.

### What I Don't Like

* The review process - it's seemingly arbitrary and can take several days. You can also be rejected for unclear reasons.

# Metrics

There are a lot of 3rd party tools that we can use for both platforms for tracking analytics within the application. Instead, I'd rather focus on tools provided by either Apple or Google around your applications.

## Google Developer Console

Google Developer Console is quite nice. You get everything you'd expect with some nice extras:

* Active Installs - I can see downloads as well as users who have kept my app installed.
* Device Demographics - We're able to see what types of devices are using the application, what version of Android they're running, etc.
* Crash reports - Easily see crash data, get stack traces.

## iTunes Connect

Compared to Google Developer Console, iTunes Connect is largely awful.

* I can only view installs. I have no idea how many people have kept my app.
* Device breakdown is worthless. Users are broken down by "iPhone" and "iPad". Well, which iPhone or which iPad? What version of iOS are they running?
* Can I see crash data anywhere? How do I know what my users are doing?

## Final Thoughts

The deployment process for both platforms are largely the same, just different flavors. I think the post deployment metrics are really the differentiator.

**Edge:** `Android`

What do you think? Are there benefits of iTunes Connect that I missed? Has Google Developer Console been helpful?

Next, [the thrilling conclusion](/2015/04/19/development-battle-android-vs-ios-part5).
