---
title: "Localization Is Hard. Here's How We Solved It"
date: 2016-08-28T00:00:00-05:00
draft: false
tags: [web-development, localization, products, medium]
medium: https://medium.com/@jonpitch localization-is-hard-heres-how-we-solved-it-52dad61bfce3
url: "posts/solving-localization"
---

Localization is hard because language is hard. What makes localization especially challenging is that words and sentences can't be approached in a vacuum by a translator. The more context you can provide, the better. For example, imagine a label on a web page that just read: `High`. If you're the translator looking at the word, are we trying to convey height? Some sort of drug state?

<!--more-->

In addition to context, meaning can often be hard to convey across languages. Because of cultural differences, not every word or sentence is a one-to-one swap. Your translator not only has to perform a difficult job of translating from one language to the other, they also have to translate your meaning.

Localization is also technically challenging. Most web applications have content in several places. There's probably content in a database that needs to be localized. There's also likely to be web application specific content (like form inputs, error messages, etc.) that need to be localized. What's challenging is that providing a good user experience to someone who doesn't speak the native language, is that all of these pieces have to align at the same time.

## Solutions
Here's a look at how we solved these problems at [B Lab](http://www.bcorporation.net/). Some of these solutions are specific to our stack, but the general concepts should be applicable to most. Let's start with managing what needs to be translated.

### Crowdin
We did a lot of research on translation management tools. We landed on [Crowdin](https://crowdin.com/) because we liked its feature set and it solved all of our use cases. I won't dive in to the details of this platform, but here's what it gives us at a high level:

* We can store our content in key/value pairs, by uploading any type of file of our choosing. Think of Crowdin as a CMS for translations.
* We can `push` and `pull` content to/from Crowdin through their [API](https://crowdin.com/page/api) or [CLI](https://crowdin.com/page/cli-tool) tool.
* Someone on the business side of our application can manage the translation process. There's rarely any developer intervention.
* Translators are notified of new content; subsequently we can also be notified when translations are done (via webhooks).
* Crowdin can automatically machine translate content. Content can also be crowd-sourced or you can invite your own translators.
* Once something is translated, it's stored in `Translation Memory`. So down the road, we aren't duplicating translation efforts.

That's a lot of cool stuff. In brief, as long as we get content to Crowdin, our translators can translate it and we can pull it back when they're done without much effort. So now let's look at how we actually get content to Crowdin from different origins.

### Ember
Our web applications are written in Ember ([because it's fucking awesome](https://emberway.io/ember-get-shit-done-36383c2ccc53)). For localization in our Ember apps, we use [ember-i18n](https://github.com/jamesarosen/ember-i18n). All of our strings are stored as JavaScript objects, per locale. For example:

{{< gist jonpitch b997c88d4debee13897c34f93c6cf874 >}}

In this example, if the user's locale is set to `en`, they would see the string `Hello`. When the locale switches to `es`, without any page reload or code change, the same string is instantly changed to `Hola`.

We also enforce localization as a practice with [ember-cli-template-lint](https://github.com/rwjblue/ember-cli-template-lint). If a developer puts a bare string in a template, tests fail. We think this is important for our users to never experience a situation where they see content that isn't in the locale they chose.

#### Localized Images
We have a few assets that have text in them and of course, we want these to be localized as well. In order to do so, in our `staging` and `production` builds, we generate an asset map with [broccoli-asset-rev](https://github.com/rickharrison/broccoli-asset-rev). In these environments, our paths are fingerprinted, so we can't actually refer to them in code that easily. We can however, generate an asset map and look up the path when required.

We use an `instance-initializer` to lookup our asset map and inject it into our `i18n-image` component. When that component renders it's image, it gets its path from the asset map. Here's an example:

{{< gist jonpitch a346d4acdde3afc0b55e3dd5eeb34620 >}}

#### Integrating Ember-i18n with Crowdin
Unfortunately, this takes a little workaround. If you recall the basic workflow of pushing and pulling files to and from Crowdin. Crowdin doesn't recognize an ES6 JavaScript module. So what we do is instead of using JavaScript, we use JSON and use [ember-cli-json-module](https://github.com/IvyApp/ember-cli-json-module) to convert JSON to JavaScript objects, so that:

1. We can push/pull content to/from Crowdin
2. ember-i18n still works.

Here's an updated example:

{{< gist jonpitch 1cc40b6f1fc4b7790ac17b6bdc08c959 >}}

It's subtle, but this little change makes a huge difference for us. We can ship these `.json` files to Crowdin without modification and our content is brought in without issue. ember-cli-json-module also transpiles our `.json` files to JavaScript exports that ember-i18n understands, so everything still works well on that front.

#### Other Caveats
We initially ran in to some issues for form validations with the addon we were using. We switched over to [ember-cp-validations](https://github.com/offirgolan/ember-cp-validations) and [ember-cp-i18n-validations](https://github.com/jasonmit/ember-i18n-cp-validations) and haven't looked back. If you're not using either of these already and require localization, I would recommend making the change.

### Database Content
With all this talk of shipping files, hopefully you're wondering how we deliver and retrieve our database content. We manage this pretty easily with jobs. When English content changes, we queue up a job that grabs the relevant content we need to translate, creates a file and pushes it to Crowdin. As soon as the file gets to Crowdin, translators are notified and they translate the content. As soon as they're done, a webhook lets us know, we queue up a new job and that content is pulled back, fully translated: `Continuous Localization`.

Here's how we store our localized content in the database:

`Table A`: `id`, `some-meta-data-1`

`Table A - TL`: `id`, `table-a-id`, `locale`, `some-localized-content-1`

`Table A` always stores meta data about the resource while `Table A - TL` stores localized content. When we request localized content, we join these two tables and filter by `locale`. Because this locale is driven by the user, as the user changes their locale, this code remains the same and the user gets different content.

#### Other Caveats
Something we haven't quite solved yet is content length. Meaning, let's say a column in the database is a 255 character string. Someone writing content in English, uses most of those characters, let's say 240. When it's translated to another language, it may end up as 258 characters. This doesn't fit in our database and we don't want to just truncate the string. Rather than just making everything a giant string value, like `text` or thousands of characters, we have just been dealing with it as it comes up. If you have any suggestions we'd love to hear them.

### Shipping Files
We use [Docker](https://www.docker.com/) for local development, so we have a [container](https://hub.docker.com/r/impactbot/impact-platform-crowdin/) that pushes/pulls content to/from Crowdin for us. Based on our Crowdin config, a container is created, grabs the files we want and either pushes or pulls to/from Crowdin in a single command.

### Wrapping Up
Localization is still damn hard. The benefit for us, is that we have at least removed developers from the process entirely. It's also awesome that we can provide a really amazing global user experience without reloading the page. Our content creators and translators collaborate and we can continuously localize our application with almost no effort.

Let us know what you think! We'd love to hear your challenges and solutions to hard localization problems. We also don't support any right to left languages at the moment, so let us know what to expect.
