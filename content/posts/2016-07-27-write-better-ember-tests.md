---
title: "Write Better Ember Tests"
date: 2016-07-27T00:00:00-05:00
draft: false
medium: https://medium.com/@jonpitch write-better-ember-tests-d2e22fb76bf2
tags: [web-development, ember, javascript, testing, medium]
url: "posts/write-better-ember-tests"
---

If you're not testing your code, well, you've got some nerve. For the rest of us rational people, let's look at some basic tips for writing better Ember tests.

<!--more-->

## What Makes a Good Test

There are three core components:

### 1. Easy to Reason
Tests must be easy to understand. While [code quality is important](https://medium.com/@jonpitch code-quality-matters-4a7384f30f0e) for developers to understand, tests often communicate a business requirement or decision which is often more important.

### 2. Specificity
Tests must be very granular. Being specific is a great way of creating a manifest of all of the pathways, states and other vagaries that may not be immediately obvious.  

### 3. Speed
Tests must be fast. The faster the test runs, the faster the developer can regression their code. The faster a developer can setup and write a test for their new code, the faster a developer can write more code and tests.

## Be Verbose

By default, Ember uses [QUnit](http://qunitjs.com/) under the hood. There are two ways we can leverage QUnit that make our tests easier to reason about.

* Test Name

{{< gist jonpitch fbfb8eb18c02f85843900da197ed8206 test-name.js >}}

* Assertion Message

{{< gist jonpitch 7d9727910838af52bfafdfa2a8533587 assertion-message.js >}}

## Page Object

The [Page Object Design pattern](http://martinfowler.com/bliki/PageObject.html) is a powerful one for writing re-usable, easy to understand tests. Here's an example:

{{< gist jonpitch a4b76e258d0a03d58437898727c7313b basic-page-object.js >}}

In this trivial example, the first test demonstrates a problem where as you start to add more tests, you will end up writing the same selectors multiple times. In the second test, it should be clear that the `page` variable could be refactored and re-used across tests. Now all of your tests reference `page.$button`; One change to the page object now updates all of your tests using it.

An even better approach would be to leverage the [ember-cli-page-object](http://ember-cli-page-object.js.org/docs/v1.4.x/) addon:

{{< gist jonpitch fd8e3e8152652291f0b064a76303e3de ember-page.js >}}

In this example, we setup a `page` object which has all the parts of the page we care about, similar to the examples prior. With `ember-cli-page-object`, tests become much easier to reason because our assertions become almost human readable: `page.button.isVisible` could be understood by non-developers. `ember-cli-page-object` also makes writing tests faster for developers. Tests can be quickly read and understood without having to recall which jQuery selector to use to find your element.

**Pro Tip:** I have found `id` and `class` selectors volatile over time. I have found using a `data-test` attribute to be much more stable. For example:

{{< highlight html >}}
<p class="strong" data-test="description">Something</p>
{{< /highlight >}}

In this piece of HTML, we have a `<p>` tag that has two attributes, `class` and `data-test`. `class` may change over time as styles change, or naming convention changes. `data-test` is more of a universal selector for this element that denotes what the element is and signals to the developer that it's used by tests and should be changed with hesitation.

## Mock Server Requests

Chances are your application works with some kind of backend or API. Mocking your API in Ember is a great idea for several reasons:

* No backend dependency to run your app tests
* Data and state are ephemeral
* It's faster to mock various server scenarios

There are a few ways to achieve this, but my personal favorite is [ember-cli-mirage](http://www.ember-cli-mirage.com/). TL;DR:

* Your application is going to make web requests, for example: `GET /api/things`
* You're going to use Mirage to intercept web requests.
* You're going to send a "mock" response so your tests can run without actually hitting a backend.

**Pro Tip:** `ember-cli-mirage` does not currently support the idea of scenarios. For example, I want `GET /api/things` to return a specific response most of the time, but in some different case, I want it to return something else.

Here's what I have found to be a good solution:

* [Define your Routes](http://www.ember-cli-mirage.com/docs/v0.2.x/defining-routes/) as if they were the "happy path" - the data that is returned most of the time.
* In the test that expects something different, specifically override that route, for example:

{{< gist jonpitch 5e480906625ba3f26284180af8b6f413 >}}

This is recommended by Mirage and can be found in their documentation [here](http://www.ember-cli-mirage.com/docs/v0.2.x/acceptance-testing/#asserting-a-server-call-was-made-in-a-test).

## Final Thoughts

Are you using a CI tool? You should be. There are [a lot of options](https://xebialabs.com/the-ultimate-devops-tool-chest/continuous-integration/) out there. A popular option, [Travis](https://travis-ci.org/), is free for open source projects. As application complexity increases, or the number of developers increases, it becomes pretty difficult for any one person to know everything. Writing lots of good tests and having them pass before integrating new code is important for the sanity of the team and it helps build confidence in the application's stability over time. Find a bug? No worries, write a test that reproduces it, fix the bug and never worry about it again.

Make no mistake, tests can be challenging. They often involve the same amount, or more code than your application. And no matter how easy it is to write tests, they still take time, which could be time spent writing more features or fixing bugs. The real key to writing good tests is understanding their worth. Your time is the most valuable asset you have. Don't waste it by debugging things a simple test would have caught.

Have some tips of your own? I'd love to hear them.
