---
layout: post
title: Building a MEAN Pi
tags: [web-development, javascript, raspberry-pi]
---

If JavaScript isn't your thing, turn back now because we're going to be implementing the MEAN stack on a Raspberry Pi. The MEAN stack (MongoDB, Express, AngularJS and NodeJS) is a web stack based entirely in JavaScript.

Before we get started, you'll need a few things:

* Raspberry Pi - Preferably the 512 MB version</li>
* Micro SD card - at least 8 GB</li>
* Peripherals for your first boot into the Pi (e.g. keyboard, monitor)</li>
* Lots of free time

## A Few Notes First
My motivation for this project is home automation.  My Pi will be making use of z-wave to control some devices around my house.  Specifically, I'll be using the [RaZberry](http://razberry.zwave.me/) project as a basis for my home automation.  What's nice about Razberry is that it provides JSON API for accessing your z-wave devices and has a somewhat decent web application as well.  The downside is that development of this project is fairly slow for my liking and there are a few features lacking, namely authentication.  My end goal is to be able to control my house with my Android phone and I'm not about to open up my home automation controller to the world without at least some basic authentication wrapped around it.  Additionally, the Razberry web app is more complicated than what I really need; what I really want is just a responsive web application with basic functionality and a REST API that I can later hook a future Android application up to.

Secondly, you really do want a 512 MB Pi.  You can get by with a 256 MB version, but you will run into complications installing MongoDB.  You also want at least an 8 GB SD Card.  If you install the basic Raspbian image for your Pi (which we're going to do), Raspbian (with X) and MongoDB by itself are almost 4 GB.  You may be able to scrape by with a 4 GB card if you remove non-essential packages or use a slimmed down version of Raspbian, but SD cards are practically free these days, so just get one with adequate space.

## Setting Up Your Raspberry Pi
For the sake of a tutorial, I'll assume this is entirely new for those reading.  If you have built a Pi before, you could probably disregard this section.  To get started, you'll need to drop the latest Raspbian image onto your SD card.  You can download Raspbian [here](http://www.raspberrypi.org/downloads).

For Windows and OSX, there are plenty of image writing tools out there, which I won't be covering.  Since I'm using Linux, to write the image to the SD card:

{% highlight bash %}sudo dd if=/path/to/raspbian/image of=/dev/sdc{% endhighlight %}

After that completes, attach all your peripherals to your Pi, insert your SD card and boot into Raspbian.  On your first boot, you'll be presented with the <em>raspi-config</em> utility.  It's a tool that will help us configure a few basic things about our Pi.  You'll want to do the following:

* Expand the file system
* Change your locale and timezone (not really necessary, but might as well)
* Memory split - change from 64 to 16.  We won't be running any intense graphics or even X, so we don't need much video memory.
* Enable SSH
* Change your hostname - if you want
* Change your password - this is highly recommended.

After saving and rebooting, you can always get back to this utility with:

{% highlight bash %}sudo raspi-config{% endhighlight %}

Once your Pi is back up, let's log in.  The default user is "pi" (without quotes) and the password is either the default "raspberry" or whatever password you chose earlier.  Let's update our system to the latest:

{% highlight bash %}sudo apt-get update
sudo apt-get upgrade{% endhighlight %}

This next bit is optional, but we'll be giving the Pi a static IP address.  First, backup your network interfaces config file:

{% highlight bash %}sudo cp /etc/network/interfaces /etc/network/interfaces.bak{% endhighlight %}

Now let's edit the file:

{% highlight bash %}sudo nano /etc/network/interfaces{% endhighlight %}

Here's a copy of my network interfaces file:

{% highlight bash %}
auto lo wlan0

iface lo inet loopback
iface eth0 inet dhcp

iface wlan0 inet static
address 192.168.1.x
netmask 255.255.255.0
gateway 192.168.1.1
wpa-essid MySSID
wpa-psk APasswordIWontTellYou
{% endhighlight %}

One thing to note:  I'm using wireless on my Pi, which you don't have to.  If you're on wired ethernet, your eth0 config section will look similar to my wlan0 section.  Now reboot your pi, or bring down and up your network interface.  Check that you did indeed receive your static IP address:

{% highlight bash %}ifconfig{% endhighlight %}

Whichever you setup, eth0 or wlan0, you should now have a static IP.  At this point, we're going to ditch all the peripherals and just SSH into our Pi (again, I'm using Linux).

{% highlight bash %}ssh pi@your.static.ip.address{% endhighlight %}

At this point your Raspberry Pi is configured.  Now for the fun part.

## Installing NodeJS
Installing NodeJS on the Pi is pretty straight forward.  You can opt to install NodeJS from the apt repository with:

{% highlight bash %}sudo apt-get install nodejs{% endhighlight %}

But we're going to install the latest version.  At the time of this article, that's 0.11.4 (the version in apt is a bit behind).  Here we go:

{% highlight bash %}sudo mkdir /opt/node{% endhighlight %}

Now we're going to download the latest NodeJS:

{% highlight bash %}wget http://nodejs.org/dist/v0.11.4/node-v0.11.4-linux-arm-pi.tar.gz
tar xvzf node-v0.11.4-linux-arm-pi.tar.gz
sudo cp -r node-v0.11.4-linux-arm-pi/* /opt/node{% endhighlight %}

We have to add NodeJS to our path variable:

{% highlight bash %}sudo nano /etc/profile{% endhighlight %}

Add the following lines to the file prior to the 'export' command:

{% highlight bash %}NODE_JS_HOME="/opt/node"
PATH="$PATH:$NODE_JS_HOME/bin"
export PATH{% endhighlight %}

Log out from the Pi so the settings take effect:

{% highlight bash %}logout{% endhighlight %}

We're going to create a startup script for NodeJS.  It'll assume the user "pi", use a "web-server.js" file in "/home/pi/application", but you can change these to your needs.  Create a <em>nodejs.sh </em>file in your current directory and add the following:

{% highlight bash %}#!/bin/bash

NODE=/opt/node/bin/node
SERVER_JS_FILE=/home/pi/application/web-server.js
USER=pi
OUT=/home/pi/nodejs.log

case "$1" in

start)
  echo "starting node: $NODE $SERVER_JS_FILE"
  sudo -u $USER $NODE $SERVER_JS_FILE > $OUT > $OUT &
  ;;

stop)
  killall $NODE
  ;;

*)
  echo "usage: $0 (start|stop)"
esac

exit 0{% endhighlight %}

Make the script executable with <em>chmod </em>and copy it to <em>/etc/init.d:</em>

{% highlight bash %}chmod 755 nodejs.sh
sudo cp nodejs.sh /etc/init.d
sudo update-rc.d nodejs.sh defaults{% endhighlight %}

Now let's create the NodeJS web server and get it up and running:

{% highlight bash %}mkdir /home/pi/application
nano /home/pi/application/web-server.js{% endhighlight %}

Add the following:

{% highlight JavaScript %}var http = require('http');

http.createServer(function(req,resp) {
    resp.writeHead(200, {"Content-Type": "text/plain"});
    resp.write("Hello World");
    resp.end();
}).listen(8080);{% endhighlight %}

To start and stop NodeJS, you can use the following commands respectively:

{% highlight bash %}sudo /etc/init.d/nodejs.sh start
sudo /etc/init.d/nodejs.sh stop{% endhighlight %}

You should now have your NodeJS server up and running on port 8080.  Special thanks to Matthias Rüedlinger who put this together.  You can read more in depth about his process [here](http://blog.rueedlinger.ch/2013/03/raspberry-pi-and-nodejs-basic-setup/).

## Install Express
In the directory of our application, which we had as <em>/home/pi/application</em>, we'll want to create a file called <em>package.json:</em>

{% highlight JavaScript %}{
    "name": "your application name",
    "description": "something",
    "version": "0.0.1",
    "private": true,
    "dependencies": {
        "express": "3.x"
    }
}{% endhighlight %}

In the directory of your application, execute the following:

{% highlight bash %}npm install{% endhighlight %}

Easy right?

## Installing MongoDB
So this part is pretty terrible.  It's not very difficult, but it will take somewhere in the 5-10 hour range to complete.  Once you start compiling or installing, I'd highly recommend you go outside and live your life.

First, let's install the essentials to compile Mongo:

{% highlight bash %}sudo apt-get install build-essential libboost-filesystem-dev libboost-program-options-dev libboost-system-dev libboost-thread-dev scons libboost-all-dev python-pymongo git{% endhighlight %}

We'll clone Mongo, and start compiling:

{% highlight bash %}git clone https://github.com/skrabban/mongo-nonx86
cd mongo-nonx86/
scons
sudo scons --prefix=/opt/mongo install{% endhighlight %}

The last two steps are what take a tremendously long time.  Don't say I didn't warn you.  After that completes, here's the last bit of it:

{% highlight bash %}
sudo adduser --firstuid 100 --ingroup nogroup --shell /etc/false --disabled-password --gecos "" --no-create-home mongodb
sudo mkdir /var/log/mongodb/
sudo chown mongodb:nogroup /var/log/mongodb/
sudo mkdir /var/lib/mongodb
sudo chown mongodb:nogroup /var/lib/mongodb
sudo cp debian/init.d /etc/init.d/mongod
sudo cp debian/mongodb.conf /etc/
sudo ln -s /opt/mongo/bin/mongod /usr/bin/mongod
{% endhighlight %}

Thanks to Andy Felong who helped out with this.  You can read his blog post on the subject [here](http://andyfelong.com/2013/02/raspberry-pi-meets-mongodb/).

## Conclusion
You're probably asking yourself, where the hell is the 'A'?  I asked for a MEAN Pi, not a MEN Pi <em>(insert a joke of your choice here)</em>.  My next entry will include the actual development stack, wiring up NodeJS with MongoDB, data binding with Angular, creating a NodeJS REST API, etc.  Stay tuned!
