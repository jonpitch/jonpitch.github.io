---
layout: post
title: Danger Brewing&#58; The JavaScript Powered Kegerator &mdash; Build Overview
tags: [web-development, ember, firebase, javascript, raspberry-pi, medium]
medium: https://medium.com/@jonpitch/danger-brewing-the-javascript-powered-kegerator-part-2-build-overview-e61d35fc7a13
---

![Danger Brewing](/public/img/posts/20170102/cover.jpeg "The end result — A dope looking JavaScript powered beer dispensing piece of madness.")

As mentioned in the [overview]({% post_url 2017-01-01-danger-brewing-javascript-powered-kegerator-overview %}), there are lots of ways to go about this build. For example, do a Google search for *keezer*, *coffin keezer* or *kegerator*, you’ll see what I mean.

## Getting Started
I did a lot of research around different builds. I ultimately liked this rustic looking [kegerator build](http://drewmcdowell.com/blog/9-uncategorised/81-kegerator) by Drew McDowell. There’s also a similar design in the comments of that blog post from a guy named Alex, which you can find [here](https://brewingwithalex.wordpress.com/2015/06/10/new-kegerator-design-reclaimed-wood-and-pipe/). The faux cement look was a little above my comfort level, but what I really liked was the wood look and the industrial style draft towers.

## The Skeleton
The freezer itself sits on a piece of “project board” and has some 2x4s to hold it tightly in place.

![Board](/public/img/posts/20170102/build-1.jpeg "Project board & 2x4s")

The frame itself is broken out into to sections, the base and lid. Here’s the base coming together:

![Lower Skeleton](/public/img/posts/20170102/build-2.jpeg "The base skeleton coming together")

![Lower Skeleton Complete](/public/img/posts/20170102/build-3.jpeg "The base skeleton — finished")

![Lower Shim](/public/img/posts/20170102/build-4.jpeg "There are tiny shims in the front of the skeleton — the freezer had a piece of plastic that prevented it from sitting flush.")

The lid gets a little tricky. There are 2x4s on the sides, glued to the lid itself.

![Lid Skeleton](/public/img/posts/20170102/build-5.jpeg "The skeleton portion of the lid coming together — and some giant pipe clamps.")

After those pieces are glued in, they get held tight with another 2x4 and more of the same finishing material that’s on the base.

![Lid Skeleton Complete](/public/img/posts/20170102/build-6.jpeg "Lid skeleton — finished")

After the frame is put together, I started attaching the finishing wood (pine) around the border.

![Base Pine](/public/img/posts/20170102/build-7.jpeg "Pine trim around the base skeleton")

![Lid Pine 1](/public/img/posts/20170102/build-8.jpeg "Pine trim starting on the lid skeleton")

![Lid Pine 2](/public/img/posts/20170102/build-9.jpeg "Pine trim on the lid — finished")

The finishing material for the lid is tall on purpose. This will be used to create a cavity between the freezer lid and what will ultimately be the serving area. This cavity will allow me to hide some things, like the temperature controller and other electronics (described [here]({% post_url 2017-01-02-danger-brewing-javascript-powered-kegerator-tech %})).

In its current state, the lid won’t open. There are sections cut out to allow the lid to hinge upward.

![Hinge Chisel](/public/img/posts/20170102/build-10.jpeg "Do admire the sweet chisel work")

Now that the frame is in place and lid is put together, the freezer is starting to get really heavy. There are casters attached for mobility.

![Casters](/public/img/posts/20170102/build-11.jpeg "They call me Mr. Fahrenheit — Travelin’ at the speed of light.")

## Let There Be Wood
The idea was to find some reclaimed wood or pallet wood for a really rustic look. This proved difficult for two reasons:

* This wood isn’t as easy to find in my area. Because Hipsters?
* The wood I did find was really inconsistent, had lots of nails or was in awful shape.

I opted for generic white wood that I could buy off the shelf. It was marked up to look worn, the idea of which came from [Young House Love](http://www.younghouselove.com/2011/04/at-long-last-a-completed-console/).
I have two different types of wood in play here: pine and white wood. Both of these take stain differently, so I did a lot of test strips before I made anything final.

![Wood Samples](/public/img/posts/20170102/build-12.jpeg "I don’t think these are even all of the samples — just the better samples")

The pine trim on the skeleton got stained first.

![Pine Stained](/public/img/posts/20170102/build-13.jpeg "The pine border — stained")

After a lot of permutations of stain color, time, pre-treating, sanding, etc. I wound up using Dark Walnut on the pine exclusively. For white wood pieces, some were stained with Ebony and others stained with Dark Walnut, between 1–2 minutes before wiping excess.

![White Wood Stained](/public/img/posts/20170102/build-14.jpeg "There’s a fair amount of variation even though there’s only two colors and two lengths of time.")

![White Wood Stained Side](/public/img/posts/20170102/build-15.jpeg "Side view of most of the base wood attached")

On the other side, the freezer had an exhaust vent for its compressor. A wood frame was built around it and lined with a roof gutter guard - spray painted black.

![Freezer Exhaust](/public/img/posts/20170102/overview-12.jpg "Everything went better than expected.")

I’ll cover assembling the wood for the lid later on when I go over the draft towers.

## Air Flow
One of the common problems I kept coming across from fellow kegerator owners: **air circulation**. Those with poor air circulation ran into problems of inconsistent temperatures or mold and mildew. Some remedied these problems either using a product called [DampRid](http://www.damprid.com/), or with some small PC fans. Luckily I found what I think is a more elegant solution [here](http://www.homebrewtalk.com/showthread.php?t=301204). This is my first time kegging anything, so I didn’t want to take any chances.

The gist of this air flow system is a 2" PVC system that pulls air and circulates in the freezer with a bilge fan. I couldn’t physically fit 2" PVC and my kegs vertically without altering the interior lid height (I found this out the hard way), so I built a similar solution.

![Air Flow Initial](/public/img/posts/20170102/build-16.jpeg "The air flow system — just 2" PVC with some holes")

![Air Flow Complete](/public/img/posts/20170102/build-17.jpeg "There’s a bilge fan that pulls air through the kegerator — keeping things dry.")

The bilge fan by itself pulls 2.4 amps, which means its louder than a world war attending a heavy metal concert. I connected the fan to what’s called a pulse-width modulator (PWM) motor control so I could safely limit the current to the fan, making it much quieter. The PWM I bought can be found [here](https://www.amazon.com/gp/product/B00DVGGWC0).

The original power supply I bought for the bilge fan didn’t push enough volts. When the power supply was directly connected to the fan, it worked fine, though loudly. When the PWM was in-between nothing happened. I had to buy a [power supply with more voltage](https://www.amazon.com/gp/product/B003TUMDWG) and all was good. 

Right now the fan runs non-stop on the next to lowest setting. It’s reasonably quiet and I haven’t had any mildew/water issues. My temperature also seems to remain fairly consistent. I’ll see how this goes over time, but down the road I might wire this up to a timer or by some other means to only run the fan when needed.

## Draft Towers
I knew early on that I wanted to use industrial looking supplies. Galvanized steel and black steel pipe are generally readily available at any hardware store or plumbing supply company. I had considered using copper as well, but I don’t have the tools or the know how to make that happen; it also would have been significantly more expensive.

My biggest piece of advice with draft towers: Build them first. I say that for a few reasons:

* Their placement on the lid is critical. Measure and plan multiple times before you make anything permanent.
* 1.25" galvanized pipe and fittings may be larger than you expect. Acquire these pieces ahead of time. I went through 3 different sized beer shanks until I found one that fit.

The materials used for my draft towers:

* 2 1.25" flanges
* 2 1.25"x10" nipple fitting
* 2 1.25" T-fitting
* 4 1.25" right-angle fitting
* 4 1.25" to .75" bushing
* 4 2.5" [beer shank with nipple](https://www.amazon.com/gp/product/B00829HN88)
* 24" surface mount drip tray

The beer shank is where I lost a lot of time and sanity. I originally purchased a 2.125" beer shank with a beer nut fitting. The difference is that the shank with the nut fitting already has a small amount of usable space. The locking nut and the beer line nut combined wouldn’t fit on my bushing. Here’s a photo of the 2.5" shank with the nipple assembled:

![Shank](/public/img/posts/20170102/build-18.jpeg "That’s a tight fit.")

Notice that after the bushing length and the locking nut, there’s only a tiny amount of shank left. For my particular draft tower setup, the 2.125" shank was too small and a 3.125" was too long. The 2.5" was perfect.

With the towers mapped out, I could now map out the rest of the lid. There was nothing scientific about this process, just a lot of pretending like I was pouring myself a beer and seeing where things would line up.

However, it is important to note that I was going to be putting a fair amount of electronics between the freezer lid and the kegerator lid.

![Compartment](/public/img/posts/20170102/build-19.jpeg "It looks like a lot, but the temperature controller has ~6' of slack on its power supply.")

It was very important that I be able to get to this stuff to either troubleshoot or add on to in the future. So the way my lid is laid out, the drip tray, some wood to the right and the wood in the rear right corner (near the Raspberry Pi) are all removable. They all fit together very tight so it’s not noticeable to most, but it’s easily removable.

![Tray Out](/public/img/posts/20170102/build-25.jpg "The drip tray slides out")

![Side Out](/public/img/posts/20170102/build-26.jpg "The piece to the right slides out")

![Rear Out](/public/img/posts/20170102/build-27.jpg "The rear three pieces pop out")

After laying out the pieces where the draft towers were go, holes were cut to run the beer lines through.

![Running Lines](/public/img/posts/20170102/build-20.jpeg "Figuring out drip tray and draft tower placement.")

The wood was set in place and the flanges fixed to the lid.

![Lid Flanges](/public/img/posts/20170102/build-21.jpeg "Flanges in place.")

With the lid complete, the draft tower assembly could start. If you’re playing along at home, make sure you have a large pipe wrench to tighten the galvanized pipe. They only go so far tightening by hand and often not far enough for everything to appear symmetrical.

![Lid Complete](/public/img/posts/20170102/build-22.jpeg "Lid complete — lines in place — ready for draft towers.")

![Draft Tower Assembly](/public/img/posts/20170102/build-23.jpeg "Draft towers being assembled.")

The last step is to put the shanks and bushings together and connect to your beer line and get your faucets in place.

![Draft Tower Complete](/public/img/posts/20170102/build-24.jpeg "Draft towers complete — 3 CO2 lines and 1 beer gas (stout) line")

A couple of tips here:

* Use hot water to heat your beer line when attaching to a nipple that’s physically larger than the interior diameter of your beer line.
* Oetiker clamps are designed to be permanent and are a huge pain in the ass to remove. If you have to remove one, cutting the crimp part with sharp set of linesman pliers works really well.
* The locking nut on my shank was really tight in the galvanized steel bushing. I ended up filing them down a little bit so there was no chance of them rubbing while tightening.

## Lessons Learned
If I had to do it all over, there are a few things I’d either do differently or at least consider alternatives.

* The entire kegerator is unbelievably heavy. Even with casters, it’s really difficult to move on carpet.
* The lid itself is very heavy. I do need to be able to swap kegs out and clean beer lines, so I’m nervous the lid is too much weight for the freezer hinges. I may build something like a car hood prop to add additional support.

## Wrapping Up
If you have any questions, comments, feedback or are planning to build a kegerator yourself, I’d love to hear about it.

Don’t forget to check out the [overview]({% post_url 2017-01-01-danger-brewing-javascript-powered-kegerator-overview %}) of this build as well as the [technical write up]({% post_url 2017-01-02-danger-brewing-javascript-powered-kegerator-tech %}).

Cheers!