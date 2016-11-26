---
layout: post
title: "Ember Theming"
description: "Here is how you could implement a theme service in an Ember application"
medium: https://medium.com/@jonpitch/ember-theming-97e9562084c7
tags: [web-development, ember, javascript, medium]
---

## Intro
Theming a web application typically involves swapping out stylesheets or moving CSS classes around. But what if you have a single page application? It's a little tricky, but [EmberJS](http://emberjs.com/) and [SASS](http://sass-lang.com/) make it incredibly easy.

## Goals
There are two primary goals that I wanted to achieve:

#### Swap Themes Quickly
Rather than have code change colors, fonts, etc. on the fly, it makes a lot more sense to already have those styles pre-defined in CSS.

#### Be Extensible
When exposed as an Ember Addon, our implementation should allow for 3rd parties to add their own themes easily.

## How It Works
This implementation assumes a few things:

* [Ember Services](https://guides.emberjs.com/v2.4.0/applications/services/)
* [ember-cli-sass](https://github.com/aexmachina/ember-cli-sass)

The bulk of the theme-switching work is done by a theme service and some SASS mixins.

### Let's Get SASSy
Let's first look at the SASS code. There's a `$themes` map declared. It's written so that there are `base` themes and themes within the base. For example, suppose you had different areas of your application to theme, but they should still be a part of your overall theme (like a namespace):

* `foo-primary`
* `foo-secondary`

In this example, `foo` is the base theme and `primary` and `secondary` are the sub-themes.

The properties of the map are arbitrary, but they are what you'll refer to later on in CSS, sort of like a theme API. Think of it like _"for this `div.class-name`, use the `primary` color for the background"_.

**Note:** We will be using a `data-theme` attribute on HTML tags. I thought this was cleaner than swapping `class` attributes and the intent is clear in the markup.

Here is a gist of the SASS functionality to make theme switching happen. I'll come back to using it momentarily.

{% gist jonpitch/655194358902cf3a0c05647dc1aca6a0 themes.scss %}

### Theme Service
Now let's take a look at the theme service. Anything that's going to consume this service will be able to:

* bind to the current theme
* set the `base` theme
* set the sub-theme

{% gist jonpitch/655194358902cf3a0c05647dc1aca6a0 theme-service.js %}

### Theming Your Application

How you determine when themes change is up to you. But here's an example of swapping themes at a route:

{% gist jonpitch/655194358902cf3a0c05647dc1aca6a0 example-usage-route.js %}

Determining what you want to theme is also up to you. Let's assume you have a component, here's an example of using the theme service:

{% gist jonpitch/655194358902cf3a0c05647dc1aca6a0 example-usage-component.js %}

{% gist jonpitch/655194358902cf3a0c05647dc1aca6a0 example-usage-template.hbs %}

Two things to note:

* Your component injects the theme service
* Your template has a `div` with a `data-theme` attribute that is bound to the `theme.name`.

As the `theme.name` property changes, your `data-theme` will as well.

Last, to wire this all together, you have to style your `div` with the theme property you want. For example:

{% gist jonpitch/655194358902cf3a0c05647dc1aca6a0 example-usage.scss %}

Only the first couple lines are relevant, the remainder displays what the resulting CSS will look like.

## Extending

In the SASS code, it merges a property `$theme-additional` if it exists into the `$themes` map. If this code were available as an addon, you could add your own themes as follows:

* Create your own theme map, so long as it is named `$theme-additional`.
* Make sure you `@import` it prior to `$themes`.

## Wrapping Up

If you thought this was interesting, found a way to make it better or wound up doing something awesome with it, I'd love to hear about it.

Here's an example of theme switching in action:

{% img posts/20160402/ember-theming@2x.gif alt:'Ember Theming' %}

You can view the full gist [here](https://gist.github.com/jonpitch/655194358902cf3a0c05647dc1aca6a0).
