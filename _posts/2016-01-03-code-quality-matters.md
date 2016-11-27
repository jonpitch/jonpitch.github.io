---
layout: post
title: Code Quality Matters
medium: https://medium.com/@jonpitch/code-quality-matters-4a7384f30f0e
tags: [web-development, devops, testing, medium]
---

Maintaining software, especially when you are not the original author, is the worst. How many times have you looked at brutal code and your first thought was, "Why don't I just re-write this?" Of course, this thought is detrimental to your time, your perception of a codebase and potentially to your team. Here are some tips to maintain code quality over time.

## Establish Best Practices

When you're working with a team of developers, without established patterns, your code can drift over time. For example, one developer might perform a common task one way while another performs the task slightly differently. Ultimately the output is correct, but over time these idiosyncrasies can become maintenance nightmares.

**Refactoring is your friend**. When you recognize common behavior, refactor into a single unit of work.

## Lint All the Things

Reading code is the same as reading anything else. If it's clear and concise, understanding increases. For a developer who inherits someone elses code, there is a tremendous perceived difference in code that is consistent then code that varies wildly.

Using a linter in your project and making it a part of the workflow has tremendous benefits in the long run. For example, in my [Ember](http://emberjs.com/) projects, I have made [JSCS](http://jscs.info/) a part of my test suite with [broccoli-jscs](https://github.com/kellyselden/broccoli-jscs). This means that tests can fail if code quality does not meet a preset standard. For example:

{% highlight JavaScript %}
var start = 0, end = 0;
// do some stuff
start += 1;
end = start;
{% endhighlight %}

This code would actually fail a test. The preferred variant would be:

{% highlight JavaScript %}
var start = 0;
var end = 0;

// do some stuff
start += 1;
end = start;
{% endhighlight %}

I'm sure most of you looking at that are saying, ***Seriously?*** Yeah, super serious. While this particular example is very trivial, I'd argue that this consistent code standard helps maintain code quality over time. While I can't prove it beyond anecdotes, I have had teammates tell me how much they appreciate it.

## Comment Your Code

Developers are typically awful at writing documentation. Who can blame them really? It's hard to write concise documentation. It's even harder to write something for someone who doesn't have the full scope of the code that was written. Commenting code can be done in a lot of different ways:

* Variable Names - should be clear as to their intent.
{% highlight JavaScript %}
var lmod = new Date(); // this is bad
var lastModified = new Date(); // this is good
{% endhighlight %}
* Function Names - should be clear as to their intent.
{% highlight JavaScript %}
function gtUsr(a) { ... } // wtf?

function getUserInformation(profileId) { ... } // much better
{% endhighlight %}
* When complexity increases, note why.
{% highlight JavaScript %}
// re-fetch data because of ...
var x = getSomeData();

// for each data, we need to ...
for (var i = 0; i < x.length; i++) {
  doSomething(i);
}
{% endhighlight %}

These are nominal changes that go a long way in maintaining readability and maintainability of your code.

## Anything Else?

There are 3rd party tools that monitor code quality for you, like [Code Climate](https://codeclimate.com/). Code Climate is great because not only does it provide linting, but it can recognize overly complex code and refactoring opportunities.

In the end, all of these practices go a long way in writing concise, maintainable code.
