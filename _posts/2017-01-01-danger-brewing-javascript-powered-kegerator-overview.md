---
layout: post
title: Danger Brewing&#58; The JavaScript Powered Kegerator
tags: [web-development, ember, firebase, javascript, raspberry-pi]
---

![Danger Brewing](/public/img/posts/20170102/cover.jpeg "The end result — A dope looking JavaScript powered beer dispensing piece of madness.")

If you like completely unnecessary, over-engineered appliances that dispense beer, have their own web application and report data in real-time, keep reading.

---

I had wanted to keg my own beer since I started brewing 7 years ago, mostly because bottling beer is the worst. The initial plan was to build a [collar-style keezer](https://www.northernbrewer.com/learn/resources/how-to-build-a-keezer-or-freezer-kegerator/). But then I remembered I’m a software engineer, I like building things and I love a flimsy pretext to interject all the technology.

## Project Goals

* Know how much beer I have left in a keg
* Monitor the temperature of the fridge
* It has to look like a piece of furniture rather than an appliance

## Just To Say It
There are a few important things I’d like to point out before getting started:

* This project isn’t economical — nor did I try to make much effort to be economical.
* There are hundreds of ways to approach this project. I do not claim that this is the best approach by any means; it’s just how I went about it.
* It’s completely unnecessary (but in our crazy world, **very** necessary).
* Huge shout out to my buddy Mark who luckily for us, uses his tools and craftsmanship for good an not evil. I couldn't have done it without him.

## Freezer build
Here’s where the journey started:

![The Freezer](/public/img/posts/20170102/overview-1.jpeg "Just a generic chest freezer. No big deal.")

This is an off-the-shelf chest freezer from Home Depot, more specifically, [this one](http://www.homedepot.com/p/Frigidaire-7-2-cu-ft-Chest-Freezer-in-White-FFFC07M1QW/205555886). What may be the reason why I even embarked on this build in the first place is that a non-white chest freezer doesn’t exist. You can find a few of them out there, but they’re either enormous, too small or camouflage. None of those traits is acceptable for my purposes, so I purchased a white freezer and wrapped it in wood. The inspiration of which can be found [here](http://drewmcdowell.com/blog/9-uncategorised/81-kegerator).

There’s a 2x4 skeleton around the freezer.

![Base Skeleton](/public/img/posts/20170102/overview-2.jpeg "Skeleton around the lower portion of the freezer.")

With a similar skeleton around the lid.

![Lid Skeleton](/public/img/posts/20170102/overview-3.jpeg "The skeleton frame around the lid portion.")

The original goal was to use reclaimed wood, pallet wood or something up-cycled. This proved to be quite difficult to find enough consistent building materials. I ended up using generic “white wood” (I’m still not sure what this is exactly) and pine from the hardware store. The “reclaimed” look was inspiration from [Young House Love](http://www.younghouselove.com/2011/04/at-long-last-a-completed-console/). The wood was roughed up randomly and stained with two different colors at different time intervals.

![Stained Pine](/public/img/posts/20170102/overview-5.jpeg "The pine trim pieces — stained.")

No worries about the freezer exhaust, it was accounted for:

![Freezer Exhaust](/public/img/posts/20170102/overview-12.jpg "The cover is a gutter guard spray painted black.")

The draft towers are off the shelf 1.25" galvanized steel pipe and fittings. Most of which I was able to acquire locally with only a few pieces requiring purchase online.

![Stained White Wood](/public/img/posts/20170102/overview-6.jpeg "The interior pieces coming together. Each piece was stained at different time intervals and roughed up.")

![Lid Complete](/public/img/posts/20170102/overview-7.jpeg "The lid is complete — about to assemble draft towers.")

![Draft Towers In Place](/public/img/posts/20170102/overview-8.jpeg "Assembling the draft towers")

![Draft Towers Finished Side](/public/img/posts/20170102/overview-9.jpeg "Fully assembled — side")

![Draft Towers Finished Front](/public/img/posts/20170102/overview-10.jpeg "Fully assembled — front")

One last finishing touch, a skull bottle opener and cap catcher.

![Skull Bottle Opener](/public/img/posts/20170102/overview-13.jpg "The most metal bottle opener")

If you want to see more of the build process in detail, click [here]({% post_url 2017-01-02-danger-brewing-javascript-powered-kegerator-build %}).

## Kegerator Build
While the freezer I purchased only fits three corny kegs (maybe a fourth if it was smaller in size and the gas tanks were on the outside), there are four taps. This was so I could operate 3 CO2 beers at once or some combination of CO2 and Beer Gas (nitro).

There’s nothing unusual about the beer equipment involved:

* 3 Cornelius (corny) kegs
* 1 dual CO2 regulator and tank
* 1 NO2 regulator and tank
* 3 faucets, 1 stout faucet
* Beer and gas lines, shanks, fittings, etc.
* 1 temperature controller

What may be unusual is the airflow solution, which I aggressively borrowed from [here](http://www.homebrewtalk.com/showthread.php?t=301204).

![Air Flow](/public/img/posts/20170102/overview-11.jpeg "Air Flow")

The goal here is to keep some air circulating in the freezer to prevent mold and keep a consistent temperature. My implementation deviates from the original only because I couldn’t physically fit 2" PVC along the bottom of the freezer with the kegs on top without increasing the height of the freezer lid.

## Technology
Aside from monitoring keg volume and temperature, I wanted to use this project as a means to learn some new technologies. The kegerator is conceptually two main components:

* The hub (a [Raspberry Pi](https://www.raspberrypi.org/))
* The web application (built with [Ember](http://emberjs.com/))

The hub is a Raspberry Pi that sits on the lid of the kegerator (mostly just to look awesome). 

![Pi](/public/img/posts/20170102/overview-14.jpg "It has a matching wood shirt.")

It is responsible for collecting sensor data and reporting it to my web application. There are three sensors being used:

* Flow meters — these are built into the beer lines and record liquid that passes through them.
* Temperature sensor (in the fridge) — this sensor monitors the freezer temperature.
* Temperature sensor (in the lid) — this sensor monitors temperature and humidity around the draft towers, outside of the freezer.

The hub is running a Node application, built using [Johnny Five](http://johnny-five.io/). The data it collects is reported to [Firebase](https://firebase.google.com/). The web application is using the same Firebase project as its data source.

If you’d like to read more about the technology build process in detail, click [here]({% post_url 2017-01-02-danger-brewing-javascript-powered-kegerator-tech %}).

## Wrapping Up
This project took a lot longer than I had anticipated. I was often discouraged, spent too much money and learned a lot of lessons the hard way. But ultimately, when I poured that first beer and saw my web application update in real time — holy. shit.

If you want to see what I have on tap at any given moment or want to see how my freezer is doing, the web application can be found here: [dangerbrewing.io](http://dangerbrewing.io). It’s currently hosted for free, so it may be slow to load. If you’re a complainer or some kind of jerk, feel free to send some dollars my way to fix that.

If you would like to read more about the build process, click [here]({% post_url 2017-01-02-danger-brewing-javascript-powered-kegerator-build %}). Or if you’d like to read more about the technology involved, head [here]({% post_url 2017-01-02-danger-brewing-javascript-powered-kegerator-tech %}).

If you embark on a similar journey, I’d love to hear about it.

Cheers!