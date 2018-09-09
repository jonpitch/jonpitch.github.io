---
layout: post
title: Progressive Ember - Web Manifest
tags: [ember, progressive-web, web-development, javascript]
---

A walk through the real effort to transition an enterprise level Ember application to a progressive web application.

Part two: Adding a web manifest
<!--more-->

## What is a web manifest?
It's metadata that describes your web application when it's installed by your users. There's a great overview [here](https://developers.google.com/web/fundamentals/web-app-manifest/#top_of_page).

## ember-web-app
There is a great addon in the Ember ecosystem, [ember-web-app](https://github.com/san650/ember-web-app) that can take care of this for you.

At the time of this post, this addon does not support localization, which my application requires. Meaning I don't want to deliver an English manifest to my Italian speaking users. I opened a [feature request issue](https://github.com/san650/ember-web-app/issues/88); if anyone would like to collaborate on building that functionality, let me know. But as we'll see, it's a little more involved.

## Localization
In the case of my application, there are four attributes that I need localized:

- `name`
- `short_name`
- `description`
- `lang`

Users of my application also have the ability to switch languages, and a very few of them switch languages frequently.

I use [ember-intl](https://github.com/ember-intl/ember-intl) as my localization tool of choice, but [ember-i18n](https://github.com/jamesarosen/ember-i18n) is also a good option and well maintained. However do be mindful that `ember-i18n` may [deprecate](https://github.com/jamesarosen/ember-i18n/issues/481) in favor of `ember-intl`.

The end objective is that in the `<head>` of my application, I have the following:

```html
<link rel="manifest" href="path/to/manifest.json">
```

Let's break this down a bit. I need a manifest that can be localized for 5 languages. The web app manifest specification doesn't allow for this, so I will either need the text to change at run-time as users switch languages or 5 different manifest files. The latter is much simpler, so let's start there:

```html
<link rel="manifest" href="path/to/en-us/manifest.json">
<link rel="manifest" href="path/to/es-es/manifest.json">
<link rel="manifest" href="path/to/pt-br/manifest.json">
<link rel="manifest" href="path/to/it-it/manifest.json">
<link rel="manifest" href="path/to/fr-fr/manifest.json">
```

We can only provide one of these links on the page at a time (I believe Chrome would pick the first one and discard the rest). Luckily I'm already using [ember-cli-ifa](https://github.com/RuslanZavacky/ember-cli-ifa) to resolve localized assets from my asset map already. So my result is now:

```handlebars
{% raw %}
<link rel="manifest" href={{asset-map (concat "manifest/" user.locale "/manifest.json")}}>
{% endraw %}
```

The problem here is that `index.html` does not know what `asset-map` is nor does it know about my user's language. So what I might need here is [ember-cli-head](https://github.com/ronco/ember-cli-head), which provides a way to inject content into the `<head>` at my application route and at other run time events that I might care about. What I end up with is something like:

```javascript
import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend({
  intl: service(),
  headData: service(),

  afterModel() {
    set(this, 'headData.locale', get(this, 'intl.locale'));
    set(this, 'headData.description', get(this, 'intl').t('manifest.description'));
  }

  ...
```

I move my `<link>` in to ember-cli-head's `head.hbs` template (note the `model` change):

```handlebars
{% raw %}
<link rel="manifest" href={{asset-map (concat "manifest/" model.locale "/manifest.json")}}>
{% endraw %}
```

So on boot, after my user's language is know, I can set the locale of my user and the correct localized asset will resolve. When my user's switch their language, they'll get the updated manifest.

This is going to come back to haunt me when I add a service worker, but more on that later.

## Translation workflow
What further complicates this is that I want the content of my web manifest to live in the context of my existing translation workflow. Our application has a lot of content in it, that syncs with [Crowdin](https://crowdin.com/).

I have the manifest content that I want translated in our `ember-intl` translation files and it gets translated by our translation team. But I don't want developers to have to copy and paste content if it changes into 5 different web manifest files. So to try and help facilitate this, we have an in-repo addon that hooks in to our translation workflow. The gist of which is:

```javascript
function localizeWebManifest(locale, path) {
  var translations = fs.readFileSync(path);
  var sourceJson = JSON.parse(translations);

  var manifestPath = 'public/manifest/' + locale + '/manifest.json';
  var manifest = fs.readFileSync(manifestPath);
  var manifestJson = JSON.parse(manifest);

  manifestJson.name = sourceJson.manifest.name;
  manifestJson.short_name = sourceJson.manifest.short_name;
  manifestJson.description = sourceJson.manifest.description;

  fs.writeFileSync(manifestPath, JSON.stringify(manifestJson, null, 2), function (err) {
    if (err) {
      return console.log(err);
    }
  });
}
```

For each locale we support, we update our manifest files with the content from our `ember-intl` JSON files. Like I said earlier, there are a lot of moving parts here and it would be great if there was a way to contribute this back to `ember-web-app`.

## Results
Before:
![Baseline Lighthouse](/public/img/posts/20180908/baseline-lighthouse.png "Baseline - Lighthouse")

After:
![Web Manifest Lighthouse](/public/img/posts/20180909/manifest-lighthouse.png "Web Manifest - Lighthouse")

_note: the big dip in performance is related to Lighthouse switching major versions, not adding a web manifest._

Our scores went up across the board, which is terrific. That performance number is still terrible though, so let's see what it takes to slim down our build size.

## Keep reading
- [Baseline]({% post_url 2018-09-01-ember-pwa-baseline %}) 
- [Add web manifest]({% post_url 2018-09-02-ember-pwa-manifest %}) _(you are here)_
- [Remove liquid fire]({% post_url 2018-09-03-ember-pwa-no-liquid-fire %}) 
- [Bundle web fonts]({% post_url 2018-09-04-ember-pwa-include-web-fonts %})  