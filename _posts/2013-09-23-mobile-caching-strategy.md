---
layout: post
title: Mobile Caching Strategy
---

Caching in a mobile application serves two important purposes and a good caching strategy should cover both:

* Reduce battery consumption
* Improve performance

In HTTP based mobile applications, it's important to understand that using the cellular radio is expensive. Meaning the more HTTP requests you make using the cellular radio, the more battery drain you introduce on the user's device. There is a very good article on this topic on the Android developer guide, titled <a title="android developers" href="http://developer.android.com/training/efficient-downloads/efficient-network-access.html" target="_blank">Optimizing Downloads for Efficient Network Access</a>. If you only skim this article, the important thing to take away is the concept of the radio state machine. The idea being that initiating a single HTTP request on a cellular radio uses power to make the request, but also uses power after the request has been made until the radio goes into standby. If your'e making several HTTP requests on a regular basis, the cellular radio remains "on", draining battery power.

There are two ways this problem can be addressed:

* Reduce HTTP requests (obviously)
* Caching

Depending on your application, reducing HTTP requests may or may not be possible. However, where it is possible, try to either combine requests into one so you're only making one HTTP request but receiving more data from the server. This is more overhead for the user upfront, but has the benefit of reducing battery drain as well as increasing perceived performance of your application.

Caching will also greatly help in this scenario. Depending on the application, there's some thought that should go into deciding what to cache, when, for how long, etc. Your caching strategy is important, so spend some time thinking about it. Caching properly can reduce server load, increase performance on the application and reduce battery drain from HTTP requests, all of which make your user happy. When planning your caching strategy, try asking yourself the following questions:

* How often does this data actually change?
* How often do my users need to see the most recent content?
* How long shuld content be cached?
* What would clear the cache?

Your caching strategy will depend on how you answer these questions. For a basic starting point, consider the following:

* Make an HTTP request
  * Are there cached results of this request? If so, use them
  * If not, make the request
    * Cache the results
* Do something with the results

This pattern should be sufficient for most HTTP based applications. The gaps will need to be filled in with your answers to the questions from before, however after doing so, your application should not only be more efficient with network transfers, your users will thank you for not destroying their battery life.