---
layout: post
title: Ubuntu 64 bit and Juniper VPN
---

I've got 99 problems and installing the Juniper VPN in Ubuntu is all of them. If you have ever had that thought, then you're in the right spot.

Getting Juniper up and running on Ubuntu can be a bit of a pain, but it's actually much simpler than it seems at first.  You basically only need two things:

* 32 bit version of Firefox
* A 32 bit version of Java

The VPN I connect to requires a username, password and token.  There are other methods out there that you might be able to get working without using the browser to launch, but I'm not convinced this is possible if your VPN requires all three pieces of information (somebody prove me wrong).  So let's talk about launching Juniper through the browser.

1. Download a 32 bit version of Java
  * Download it from [here](http://java.com/en/download/index.jsp)
  * Save it wherever
  * You can even extract it wherever, it doesn't matter.  We won't actually be using this for anything but Juniper.
2. Install a 32 bit version of Firefox
  * There are methods of doing this where you can run 64 bit and 32 bit simultaneously. If you want to do that, feel free.  For me I don't really care.  I primarily use Chrome and the only time I need to use Firefox is for web development or Juniper.  So 32 bit is fine for me.
3. Symbolic link your libnpjp2.so
  * Your 32 bit version of Java came with this .so file, which you can find at: `<your Java JRE directory>/lib/i386/libnpjp2.so`
  * Symlink this file to your 32 bit Firefox plugins directory
    * sudo ln -s <Your libnpjp2.so file path> /usr/lib/mozilla/plugins
    * Execute this in your terminal, without quotes and replacing the correct paths
4. Test out your Java installation
  * Visit [this URL](http://www.java.com/en/download/testjava.jsp) in your 32-bit Firefox and make sure you're in fact using 32 bit Java
    * If this works, proceed to step 5
5. Launch Juniper
  * Visit your Juniper URL, enter your credentials and you should be all set.

Granted this isn't as nice as going through network manager, but it works.  I do occasionally run into an issue where my Juniper applet doesn't start.  However, going through the Juniper URL a 2nd time always works.
