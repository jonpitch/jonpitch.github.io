---
layout: post
title: Why Ember is the Cat's Pajamas
tags: [ember, web-development, javascript]
---

If you have recently blinked, it's likely that you have missed the plethora of web development tools, frameworks, etc. There is one in particular that has my full attention however, [Ember](http://emberjs.com/).

<!--more-->

Full disclosure, I have spent far more time exploring Ember than similar tools like [Angular](https://angularjs.org/), [Backbone](http://backbonejs.org/), [Knockout](http://knockoutjs.com/), [React](http://facebook.github.io/react/), etc. Given that, this will not be a comparison of frameworks and tools, instead, just why I think Ember is completely awesome.

## Reasons To Love Ember

### Convention

Convention is a huge deal with Ember, and it's something you'll either love or hate. Let's say your application has one resource `Post`. Once you declare a `Post` resource, Ember will look for the following:

* PostRoute
* PostController
* post.hbs ([Handlebars](http://handlebarsjs.com/) template)

The names here are important. If you spell `PostController` incorrectly, it just won't get picked up by Ember. Tools like Angular aren't as convention driven. Developer A could create `PostCtrllr` while developer B creates a `PostController`, both of which are perfectly acceptable. I'd wager that someone familiar with Ember jumping into a legacy Ember application will come up to speed much faster then a developer familiar with Angular jumping into a legacy Angular application. Again, it's not that Angular is bad, it's that there's a lack of convention.

### MVC

Model View Controller - a familiar software design pattern. If you have spent any time doing web development with other frameworks, like Express, Rails, Zend/Laravel/Cake, etc. it's very likely that you have come across this pattern before. The MVC principal in Ember is basically the same.

### Forward Thinking

If you're getting started with Ember, you're probably looking at [Ember CLI](http://www.ember-cli.com/). Ember CLI uses the [ES6 Module Transpiler](https://github.com/square/es6-module-transpiler) so you get ES6 support built in. Ember CLI's build tool [Broccoli](https://github.com/joliss/broccoli) gives you lightning fast application builds; no more do you have to wait for [Grunt](http://gruntjs.com/) to finish. Ember also comes with [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) built in.

### Data-Binding & Managing State

Data-binding and managing state are also benefits of Angular, Knockout, Backbone, React, etc. It's one of the big selling points of even pursuing any of these tools in the first place over plain old JavaScript/jQuery.

For a common task of fetching data from a server and displaying the data, the flow might be:

* Click X
* X's state changes to "loading"
* Make AJAX request
* On success, update DOM, revert X's state. On failure, notify user, revert X's state.

Using a tool like Ember can essentially remove all of the DOM/state manipulation that you would otherwise do by hand. Because the DOM is bound to a model, as the model updates, so does the DOM, automatically. So you're doing the same function, but writing a lot less code, that's more maintainable.

### Ember Data

[Ember Data](https://github.com/emberjs/data) is an optional library to manage your application's data. I say optional because like a Birthday party, you can technically not serve cake, but if you don't, everyone will cry a little on the inside.

Ember Data can be thought of as an ORM, with a consistent data retrieval/persist interface as well as adapter architecture that can be used to connect Ember Data up to any datastore without effecting your application logic. Also there's promises! Here's an example:

{% highlight JavaScript %}
var person = this.get('model');
person.set('firstName', 'Hugh');
person.set('lastName', 'Mann');

person.save().then(function (response) {
    // do something with response
}).catch(function (reason) {
    person.rollback();  // keep state of person in sync
    // do something with error
});
{% endhighlight %}

Easy right? As mentioned before, what's great is that not only is this easy to use and understand, you can swap in a different adapter if you want and your code here stays the same; it just persists to a new place.

### Tools

[Ember Inspector](https://github.com/emberjs/ember-inspector) is an awesome tool that works in most modern browsers. It provides developers with lots of things like view hierarchies, resolved/rejected promises, a look into the data store, routes/controllers/views that it knows about, etc. Developing an Ember application without it could be dismissed as crazy talk.

I mentioned Ember-CLI and Broccoli earlier. Ember-CLI has a growing list of [addons](http://www.emberaddons.com/) that helps you be more productive out of the gate, while Broccoli supports all of the things you'd expect like SASS, LESS, CoffeeScript, etc. Of course you can still use Grunt or any other build tool of your choosing.

### Testing Support Built In

Ember-CLI comes with built in [QUnit](http://qunitjs.com/) and Integration test support build in. Every time you generate something through CLI:

```
ember generate controller foo
```

Not only does this scaffold your controller, but you get a corresponding unit test. You elaborate on these generated tests of course, but Ember CLI is doing the grunt work for you, making sure you don't ignore testing. There's also built in support for integration testing which is achieved through Ember [Test Helpers](http://emberjs.com/guides/testing/test-helpers/). If you've ever written acceptance tests for Selenium, these are kind of the same thing, only much more performant with less overhead. Did I mentioned speed yet? Both QUnit and integration tests are so fast, that it's not unheard of to re-run your entire test suite in between saves. That's pretty powerful as a developer, knowing if I broke something within seconds rather than minutes.

### Community

While I don't think the Ember community is quite as large as Angular's, they are just as active and engaging. If you live in a major market, chances are there's an EmberJS Meetup near you.

## Reasons Not To Love Ember

### Learning Curve

Depending on where you're coming from as a web developer, your intro to Ember may fall somewhere between "painful" and "please shoot me in the face". When I first dove in to Ember, I was coming from the traditional jQuery build-everything-yourself world of web development. It definitely took me some time to get into, but once I did, my productivity increased. Think Logarithm curve; that initial curve is steep but it starts to level off.

I'd recommend people new to Ember to approach it with a small project in mind. I find it a lot easier to learn something when applied to a topic of your choosing than to step through more trivial tutorials.

### Documentation

Ember documentation is getting better. However, Ember is very actively developed and it's quite possible that the documentation you're looking at from 6 months ago is stale.

## Conclusion

Having spent a year with Ember, watching it evolve, going from "global Ember" toward Ember-CLI has been a blast. For me, Ember makes web development fun. Never once do I really feel hindered by the framework and given that most of the mundane stuff is abstracted for me, I can really focus on things that matter like UI/UX, features and being ambitious with my applications.
