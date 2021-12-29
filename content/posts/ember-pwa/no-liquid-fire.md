---
title: "Progressive Ember - Remove Liquid Fire"
date: 2018-09-03T00:00:00-05:00
draft: false
tags: [ember, progressive-web, web-development, javascript]
---

A walk through the real effort to transition an enterprise level Ember application to a progressive web application.

Part three: Removing `liquid-fire`
<!--more-->

## First
I love [liquid-fire](https://github.com/ember-animation/liquid-fire). I'm also really looking forward to Ed Faulkner's next animaton toolkit for Ember, [ember-animated](https://github.com/ember-animation/ember-animated).

There's nothing wrong with `liquid-fire`, but I'm on a quest to reduce my vendor payload to improve application performance. My application really doesn't do a lot of animation. The primary interaction that used animation was an expand/collapse animation. For **27 kB**, I'm willing to part with it in order to reduce my vendor build size.

**Pro Tip:** Just because you can `ember install` something, doesn't mean you need to. In my case, I don't need 27 kB of JavaScript to achieve something that I can do for a few hundred bytes and some of my time.

## Expand/collapse alternative
The main code we're replacing is something like:

{{< highlight handlebars >}}
{{#liquid-spacer}}
    {{#liquid-if showContent}}
        some content
    {{/liquid-if}}
{{/liquid-spacer}}
{{< /highlight >}}

When `showContent` is `true`, my containing element (`liquid-spacer`) will animate smoothly to fit my content. When `showContent` becomes false, my content will smoothly animate back to collapsed.

Animating from one height to the next is somewhat simple and can be achieved in several ways. Here is a way you could tackle this using [window.requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame):

```javascript
import { run } from '@ember/runloop';

animateHeight(selector, from, to) {
    run(() => {
        // this.element => assuming this is an Ember component
        const element = this.element.querySelector(selector);
        requestAnimationFrame(() => {
            element.style.height = `${from}px`;
            requestAnimationFrame(() => {
                element.style.height = `${to}px`;
            });
        });
    });
}
```

Simple. The real magic though, is when you don't know the height. In my expand/collapse example, I know that I have a `<div>` that's going to animate to some final state. Because I am conditionally displaying the content, that content isn't in the DOM when the div is collapsed, so I don't know what to animate to. If my content is static, I could give a rough approximation. For dynamic content, this is more challenging.

My general solution is to:
- let the user click the container to expand
- determine the container's height at that time - something like:
```javascript
this.element.querySelector('.some-selector').offsetHeight
```
- toggle the attribute to make your dynamic content render to the DOM
- determine the container's height again
- now you know the start height and the final height, you can animate between the two states

In practice, this might look something like:

```javascript
import { task, waitForQueue } from 'ember-concurrency';
import { get, set } from '@ember/object';

animate: task(function*() {
    // compute initial height
    const initialHeight = this.getElementHeight();

    // toggle the content in the DOM - show/hide
    set(this, 'showContent', !get(this, 'showContent'));

    // wait for the Ember run loop
    yield waitForQueue('afterRender');

    // compute the final height
    const finalHeight = this.getElementHeight();

    // perform the animation
    this.animateHeight(initialHeight, finalHeight);
})
```

You will also need some basic CSS to make this work:

```css
.your-element {
    overflow: hidden;
    transition: height 0.4s ease-out;
    height: auto;
}
```

## Results
My vendor build before:

![Baseline Build](../images/baseline-build.png "Baseline - Build")

After refactoring my animation, removing `liquid-fire` and `velocity-animate` from my vendor build:

![No Liquid Fire - Build](../images/no-liquid-fire-build.png "No Liquid Fire - Build")

**27 kB** removed! Up next, lets optimize our web font loading.

## Keep reading
- [Baseline]({{< ref "/posts/ember-pwa/baseline" >}} "baseline") 
- [Add web manifest]({{< ref "/posts/ember-pwa/manifest" >}} "web manifest") 
- [Remove liquid fire]({{< ref "/posts/ember-pwa/no-liquid-fire" >}} "remove liquid fire") _(you are here)_
- [Bundle web fonts]({{< ref "/posts/ember-pwa/web-fonts" >}} "web fonts") 
- [Random lodash]({{< ref "/posts/ember-pwa/random-lodash" >}} "random lodash")
- [Moment Timezones]({{< ref "/posts/ember-pwa/moment-timezones" >}} "moment timezones")
- [Remove Showdown]({{< ref "/posts/ember-pwa/showdown" >}} "remove showdown")
- [Lazy Locales]({{< ref "/posts/ember-pwa/lazy-locales" >}} "lazy locales")
- [Service worker]({{< ref "/posts/ember-pwa/service-worker" >}} "service worker")