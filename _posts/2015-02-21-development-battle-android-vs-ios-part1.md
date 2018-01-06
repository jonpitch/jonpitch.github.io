---
layout: post
title: Development Battle &mdash; Android vs. iOS &#45; Part 1&#58; Development Tools
tags: [android, ios, mobile]
---

Developers are vital to each platform's success, so let's compare the development tools available for each platform. I'll cover the pros and cons of each platform, based on my personal experience.

<!--more-->

## iOS

Here's what I liked about [Xcode](https://developer.apple.com/xcode/), Apple's IDE for iOS applications:

* Interface Builder
* Integration with the App Store submission process
* iOS simulator

And what I didn't like:

* Source control integration
* The amount of screen space required to perform tasks
* Lack of native dependency management

#### Pros

Interface builder does just what you think, it builds interfaces. It's a WYSIWYG tool where you can drag and drop components that can later be wired up to actions like touch events, gestures, etc. Like most WYSIWYG tools, it was by no means perfect, but I thought for beginner and intermediate iOS developers, Interface Builder removed the worry of UI development.

Integration with the App Store submission process was a nice touch. Xcode was essentially linked to my developer profile, managed deployment keys, etc. While the submission process itself is a weird area, which I'll cover later, it made deployments a little less painful.

The iOS simulator, which is easily my favorite experience developing applications for iOS. The simulator is lightning quick compared to the Android emulator. It also provides a nearly perfect representation of what your app will look like on an iOS device. There are a few caveats to that, but that's a huge win for iOS developers.

#### Cons

Xcode does integrate with source control, however I have found this integration to be somewhat lacking. It worked really well for me when I was the only developer on a project. However I found that when working with Git repositories, Xcode didn't seem interested in merging changes. Instead it was more interested in me discarding local changes so I could pull in the new ones.

Screen real estate is often an issue for me. I have an old Macbook Pro, which isn't even mine, that I use for iOS development (it has a 15" screen for reference). When wiring up interface components from a storyboard, I often found it very tedious to do so without constant resizing of my screen, parts of the IDE, re-arranging my storyboard, etc.

Dependency management just wasn't there. Granted, there is [Cocoapods](http://cocoapods.org/), which is great by the way, the lack of dependency management within Xcode was unfortunate.

## Android

With Android, there are several IDEs available for development. I'll specifically be looking at [Android Studio](http://developer.android.com/sdk/index.html), which I feel is Google's equivalent offering to Xcode, so to speak. Here's what I liked about Android studio:

* Source control integration
* Gradle
* IntelliJ

And what I didn't like:

* Layout editor
* The Android emulator

#### Pros

Back in the old days, developers would have to typically create an empty repository somewhere, pull in the empty repository and then try and create a new project within said repository, the IDE would often balk at this operation and so forth. Android Studio lets you code away and when you're ready, you can have it enable source control on your project and push changes wherever you want. The whole process is completely painless.

[Gradle](https://gradle.org/) all the things! Gradle is a build tool that has been around for a bit, but Google has recently adopted it for building your Android applications within Android Studio. Gradle is incredibly powerful from handling dependencies, building different "flavors" of your application, handling other build tasks, etc. Building an APK isn't always a trivial process, but it's easily automated with Gradle.

Android Studio is built on top of [IntelliJ IDEA](https://www.jetbrains.com/idea/). There are lots of really nice subtle integrations and some improvements made by the Android Studio team that makes Android development a breeze. From simple things like linking your Activities/Fragments with their layouts (no more hunting for them) to its integration with Gradle, development tools, etc.

#### Cons

The layout editor is much improved since the early days of Android development. Similar to Interface Builder, you get a much better sense of what your UI looks like on different devices. However given that there are so many different Android devices, you're never 100% certain you hit them all (though if you build your layouts properly, you'll likely be OK). You can drag and drop components similar to Interface Builder, but I often found that no matter what I ultimately have to work with the underlying XML, which can some times be convoluted.

The Android emulator does what it sounds like, it emulates the Android runtime environment. So naturally, starting up the emulator takes quite a bit of time compared to the iOS simulator. I personally abandoned using the emulator years ago in favor of actual devices. If the emulator is your only means of developing Android applications, I'd highly suggest you buy a development device. The sheer time saved is worth whatever price of the device.

## Conclusion

Both development environments have their strengths and weaknesses. When it comes to pure development tools though, I felt I was more productive using Android Studio than Xcode.

**Edge:** `Android`

What has been your experiences with both platforms? Since I'm really on scratching the surface of both environments, what did I miss that you think is important?

Next, let's compare what it's like actually [writing code in both platforms](/2015/03/16/development-battle-android-vs-ios-part2/).
