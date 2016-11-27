---
layout: post
title: Development Battle &mdash; Android vs. iOS &#45; Part 3&#58; Testing &amp; Debugging
tags: [android, ios, mobile]
---

I'll be comparing my experiences with basic debugging across both platforms. What won't be included are automated testing frameworks or 3rd party tools.

## iOS

Having spent far less time working within the iOS platform there is going to be huge knowledge gap on my part in regards to testing frameworks, best practices, etc. With that in mind:

#### What I Liked

I found the iOS simulator to be a fairly accurate representation of target devices. What I mean by that is, my confidence was high that what I saw on the simulator was presented in the same manner on a physical device. This was a nice experience overall. Not being an iOS guy personally, I don't have access to a lot of test devices, so the simulator saved me a lot of headache during development.

#### What I Didn't Like

Crashes of an iOS application were often cryptic. That's saying something, since most error messages are pretty crappy anyway. Most that I came across in iOS were doubly so. When the application was gracious enough to catch the exception and drop me to the offending code, you're almost always presented with what looks like a pointer dump, which is helpful to no one.

It wasn't straight forward to just plug in an iOS device and fire up my application. The first major annoyance is enrolling in the iOS developer program, which is $99 a year. While it would be nice to one day make money off of my side project applications, there's no way in the short term I'll be making that $99 back, let alone anually. So I'm essentially paying for the "privilege" to develop for iOS. After that nonsense, there's a whole certificate and provision process that was a bit awkward. There's a good post written [here](http://codewithchris.com/deploy-your-app-on-an-iphone/) about all the steps; The fact that there are more than a couple steps is annoying.

## Android

I have had a lot more time to explore the Android platform, but unfortunately I haven't had the time to dive into many of the testing frameworks here either. Again, with that in mind:

#### What I Liked

I can plug in any Android device and deploy my application to it. Right out of the gate, I don't have to spend any money, I can actually use random people's devices for testing - all good. Side note, you do eventually pay Google $25 to become an Android developer, but that's a one time fee; much cheaper than $99 per year.

When my application crashes, I get a meaningful stack trace which I can often trace back to the offending code. `LogCat` is also color coded so I can see the constant stream of device output as Info, Warning, Error, etc. This sounds trivial, but when you look output in XCode you're just looking at a tiny box with black/white text that can be hard to read.

#### What I Didn't Like

The Android emulator is pure brutality. Once is finally starts, you're never quite sure if you're app is actually slow or it's the emulator. Emulating location data can be annoying, setting up multiple Android Virtual Devices (AVD) is annoying, etc. It's vastly simpler to just plug in my Android device and use that for testing.

## Conclusion

The Android emulator is awful and the iOS simulator is quite lovely. Not being able to just plug in an iOS device for debugging is a huge pain and having to shell out dollars for the privilege to develop against the iOS platform is really disappointing.

**Edge:** `Draw`

Both platforms had their strong and weak points, but there wasn't a clear winner in my opinion.

Up next, we'll take a look at the deployment process. *coming soon*
