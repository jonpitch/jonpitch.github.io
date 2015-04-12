---
layout: post
title: Ember &amp; Firebase&#58; Go Where Eagles Dare
---

At a recent [EmberJS Philly](http://www.meetup.com/EmberJS-Philly/) meetup, Brendan O'Hara ([&commat;BrendanOHara](https://twitter.com/BrendanOHara)) gave a great overview of [Ember](http://emberjs.com) and [Firebase](https://www.firebase.com/) (via [EmberFire](https://github.com/firebase/emberfire)). I thought the best takeaway from the talk was the following:

> "Your app isn't special". - Brendan O'Hara

While that sounds harsh initially, I think it's a terrific notion that more developers should embrace. The idea here is that most web applications have two basic needs:

* Persist &amp; retrieve data
* User authentication

Firebase gives you both. The beauty of Firebase is that there's no need to spin up your own server to handle these tasks. Not only does Firebase handle these basic tasks well, it provides some awesome-sauce in the form of web sockets. Behind the scenes, web sockets are handled for you so you get out of the box real time persistence.

# Why You Should Care

Let's say you're building an application that consumes your web service. You have at least two code bases here, your Ember application and your backend (Rails, PHP, Node, whatever). To make your life easier, your backend probably has some notion of models. Your Ember application is also likely to have models. Unless what you're building is completely trivial, chances are your server models vary a bit from your Ember models. Either you have some different data structures in place, you're working with date objects, your ORM builds associations in a different way, etc. Because of this, you might have to flatten your server side models before you send JSON back to Ember and or you have some deserialization logic in your Ember application. If you're using Firebase, your Ember models **are** your application models. What you're working with in Ember is seamlessly persisted to the datastore. There's no duplication of effort and your productivity skyrockets.

Authentication is awful (I said it). Authentication generally isn't difficult, but most people think of it as a pain; something you just have to do to get started. So why go through the headache of setting up a server, generating user tables, implementing password recovery, social logins, etc? Firebase has all of those areas covered. On top of basic authentication and social logins, you can even wire in access control without much more than some basic configuration.

# Where Eagles Dare

Most of us work on side projects, tinker with new technologies and so forth. The combination of Ember and Firebase is a beautiful thing. It's like getting to start a marathon at mile 25.2 while everyone else starts at 0. While they're painfully building out their API, user authentication, access and social login crap, you're focused on building killer features and a great user experience.
