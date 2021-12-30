---
title: "Android Overdraw Optimization"
date: 2013-06-12T00:00:00-05:00
draft: false
tags: [android, mobile]
---

Overdraw is painting a pixel more than once and it's very easy to overlook when building an Android application.

<!--more-->

Overdraw can lead to poor view performance on lower end phones if not properly taken care of. Overdraw often happens with poorly thought out styles where a background style gets applied and then has subsequent styles drawn on top, such as `ListView`s, `TextView`s, etc. It's probably easier to see what in the world I'm talking about:

* On your Android 4.2 device, open up settings
* Go to 'Developer Options'
* Toggle 'Show GPU Overdraw'
* Now open up an app on your phone.

What we see here is how many times a pixel was painted. From best to worst we'll see blue, green, light red and red. If you have a lot of blues and green, with some sparse red, you're probably OK. However if you have lots of red, you should really consider refactoring your view code. Most instances can easily be refactored by double checking your styles and removing erroneous colors and drawing. Some overdraw is easier to eliminate than others. Luckily, there are actually tools that can help you out here.

For a more in depth look into overdraw, how you can fix it and some tools, check out [this case study](http://www.curious-creature.org/docs/android-performance-case-study-1.html).
