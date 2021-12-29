---
title: "Coffeebot"
date: 2017-04-30T00:00:00-05:00
draft: false
tags: [web-development, javascript, raspberry-pi, medium]
medium: https://medium.com/@jonpitch/building-a-coffee-bot-61b6a41fa2cb
---

The coffee situation in a crowded office can be difficult. If you don't get the jump on a fresh pot of coffee, you might miss out entirely. Enter coffeebot.
<!--more-->

## How It Works
Coffeebot monitors your drip coffee maker's electrical current. More specifically, it monitors how long it takes a [capacitor](https://en.wikipedia.org/wiki/Capacitor) to discharge while the coffee maker is drawing current. Fortunately, drip coffee makers draw electrical current in three distinct phases: ***idle***, ***brewing*** and ***heating***.

The coffeebot keeps watches for the ***brewing*** phase. When it identifies the coffee maker as brewing, it sends a notification. When your coffee pot is done brewing, there's another notification.

Knowing exactly when coffee is ready is an incredible power; wield responsibly.

## Build Your Own Coffeebot
If you would like to build your own, the source code and wiring diagram can be found [here](https://github.com/jonpitch/coffeebot).