---
title: "Danger Brewing: The JavaScript Powered Kegerator"
date: 2017-01-01T00:00:00-05:00
draft: false
tags: [web-development, ember, firebase, javascript, raspberry-pi, medium]
medium: https://medium.com/@jonpitch/danger-brewing-the-javascript-powered-kegerator-part-1-dafd82003d36
---

This is a story about a completely unnecessary, over-engineered appliance that dispenses beer, has its own web application and reports data in real-time.

<!--more-->

![Danger Brewing](images/cover.jpeg "End result — A dope looking JavaScript powered beer dispensing piece of madness.")

---

I wanted to keg my own beer since I started brewing 7 years ago, mostly because bottling beer is the worst. The initial plan was to build a [collar-style keezer](https://www.northernbrewer.com/learn/resources/how-to-build-a-keezer-or-freezer-kegerator/). But then I remembered I’m a software engineer, I like building things and I love a flimsy pretext to interject technology.

## Project Goals

* Know how much beer I have left in a keg
* Monitor the temperature of the fridge
* Look like a piece of furniture rather than an appliance

## Just To Say It
Some important things to point out:

* This project isn’t economical — nor did I try to make much effort to be economical.
* There are hundreds of ways to approach this project. I do not claim that this is the best approach by any means; it’s just how I went about it.
* It’s completely unnecessary (but in our crazy world, **very** necessary).
* Huge shout out to my buddy Mark who luckily for us, uses his tools and craftsmanship for good and not evil. I couldn't have done it without him.
* Also a huge shout out to my wife who was more than patient.

## Freezer build
Here’s where the journey started:

![The Freezer](images/overview-1.jpeg "Just a generic chest freezer. No big deal.")

This is an off-the-shelf chest freezer from Home Depot, more specifically, [this one](http://www.homedepot.com/p/Frigidaire-7-2-cu-ft-Chest-Freezer-in-White-FFFC07M1QW/205555886). What may be the reason why I even embarked on this build in the first place is that a non-white chest freezer doesn’t exist. You can find a few of them out there, but they’re either enormous, too small or [are trying to hide from other freezers](http://www.homedepot.com/p/White-Westinghouse-18-cu-ft-Chest-Freezer-in-Mossy-Oak-Break-Up-Infinity-Pattern-WWFC18M4RC/206386571). None of those traits are acceptable for my purposes, so I purchased a white freezer and wrapped it in wood. The inspiration of which can be found [here](http://drewmcdowell.com/blog/9-uncategorised/81-kegerator).

There’s a 2x4 skeleton around the freezer.

![Base Skeleton](images/overview-2.jpeg "The skeleton around the lower portion of the freezer.")

With a similar skeleton around the lid.

![Lid Skeleton](images/overview-3.jpeg "The skeleton frame around the lid portion of the freezer.")

The original goal was to use reclaimed wood, pallet wood or something up-cycled. This proved to be quite difficult to find enough consistent building materials. I ended up using generic “white wood” (I’m still not sure what this is exactly) and pine from the hardware store. The “reclaimed” look was inspiration from [Young House Love](https://www.younghouselove.com/2011/04/at-long-last-a-completed-console/). The wood was roughed up randomly and stained with two different colors at different time intervals.

![Stained Pine](images/overview-5.jpeg "The pine trim pieces — stained.")

![Stained White Wood](images/overview-6.jpeg "Interior pieces coming together. Each piece was stained at different time intervals and roughed up.")

No worries about the freezer exhaust, it was accounted for:

![Freezer Exhaust](images/overview-12.jpg "The cover is a gutter guard spray painted black.")

The draft towers are off the shelf 1.25" galvanized steel pipe and fittings. Most I was able to acquire locally with only a few pieces requiring purchase online.

![Lid Complete](images/overview-7.jpeg "The lid is complete — about to assemble draft towers.")

![Draft Towers In Place](images/overview-8.jpeg "Assembling the draft towers")

![Draft Towers Finished Side](images/overview-9.jpeg "Fully assembled — side")

![Draft Towers Finished Front](images/overview-10.jpeg "Fully assembled — front")

One last finishing touch, a skull bottle opener and cap catcher.

![Skull Bottle Opener](images/overview-13.jpg "The most metal bottle opener")

To see more of the build process in detail, click [here]({{< ref "/posts/danger-brewing-javascript-powered-kegerator-build/build" >}} "build overview").

## Kegerator Build
The freezer I purchased fits three corny kegs (maybe a fourth if it was smaller in size and the gas tanks were on the outside), however there are four taps. This was so I could operate 3 CO2 beers at once or some combination of CO2 and Beer Gas (nitro).

There’s the standard equipment involved:

* 3 Cornelius (corny) kegs
* 1 dual CO2 regulator and tank
* 1 NO2 regulator and tank
* 3 faucets, 1 stout faucet
* Beer and gas lines, shanks, fittings, etc.
* 1 temperature controller

To circumvent future moisture issues, an ingenious air flow solution was built, which I aggressively borrowed from [here](http://www.homebrewtalk.com/showthread.php?t=301204).

![Air Flow](images/overview-11.jpeg "Air Flow")

The goal here is to keep some air circulating in the freezer to prevent mold and keep a consistent temperature. Because I chose not to build a collar or alter the height of my freezer, my implementation deviates from the original a bit. I couldn’t physically accommodate 2" PVC with kegs vertically so I only built half of the air flow solution — which works just as well.

## Technology
Aside from monitoring keg volume and temperature, I wanted to use this project as a means to learn some new technologies. The kegerator is conceptually two main components:

* The hub - a [Raspberry Pi](https://www.raspberrypi.org/)
* The web application - built with [Ember](http://emberjs.com/)

The hub is a Raspberry Pi that sits on the lid of the kegerator (mostly just to look awesome). 

![Pi](images/overview-14.jpg "It has a matching wood shirt.")

It is responsible for collecting sensor data and reporting it to my web application. There are three sensors being used:

* Flow meters — these are built into the beer lines and record liquid that passes through them.
* Temperature sensor (in the fridge) — monitors the freezer temperature.
* Temperature sensor (in the lid) — monitors temperature and humidity around the draft towers, outside of the freezer.

The hub is running a Node application, built using [Johnny Five](http://johnny-five.io/). The data it collects is reported to [Firebase](https://firebase.google.com/). The web application is using the same Firebase project as its data source.

To read more about the technology build process in detail, click [here]({{< ref "/posts/danger-brewing-javascript-powered-kegerator-build/tech" >}} "technology build process").

## Wrapping Up
This project took a lot longer than I had anticipated. I was often discouraged, spent too much money and learned lessons the hard way. But ultimately, when I poured that first beer and saw my web application update in real time — holy. shit.

To see what I have on tap at any given moment or want to see how my freezer is doing, the web application can be found here: [dangerbrewing.io](http://www.dangerbrewing.io/). It’s currently hosted for free, so it may be slow to load. If you’re a complainer or some kind of jerk, feel free to send some dollars my way to fix that.

To read more about the build process, click [here]({{< ref "/posts/danger-brewing-javascript-powered-kegerator-build/build" >}} "build process"). Or to read more about the technology involved, head [here]({{< ref "/posts/danger-brewing-javascript-powered-kegerator-build/tech" >}} "technology build process").

If you embark on a similar journey, I’d love to hear about it.

Cheers!