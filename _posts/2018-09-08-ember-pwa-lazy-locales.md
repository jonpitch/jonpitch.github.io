---
layout: post
title: Progressive Ember - Lazy Locales
tags: [ember, progressive-web, web-development, javascript]
---

A walk through the real effort to transition an enterprise level Ember application to a progressive web application.

Part three: Lazy Locales
<!--more-->

## Primer
First, a quick overview of what an internationalized Ember application looks like. I'm using [ember-intl](https://github.com/ember-intl/ember-intl) and the basic gist is:

In templates, all strings are rendered with the `t` helper:

```handlebars
{% raw %}
<p>{{t 'path.to.string'}}</p>
{% endraw %}
```

`ember-intl` resolves `path.to.string` to a corresponding JSON file based on the user's language.

`/translations/en-us.json`:
```json
{
    "path": {
        "to": {
            "string": "Hello!"
        }
    }
}
```

`translations/it-it.json`:
```json
{
    "path": {
        "to": {
            "string": "Ciao!"
        }
    }
}
```

`ember-intl` by default includes all of you translation content in your application build. My application is very content heavy and is currently supporting 5 locales. This leads me to a whopping **45 kB** in my application (roughly half the size of my entire application build).

The majority of my users don't switch languages, so it would be in everyone's interest to only load languages that are needed.

## Low and Lazy
The bulk of the how-to is right from the [ember-intl docs](https://github.com/ember-intl/ember-intl/blob/2.x/docs/asynchronously-loading-translations.md). However there are some gotchas and we'll go over those.

First, tell `ember-intl` to exclude locales from the build:

```javascript
// config/ember-intl.js
module.exports = function() {
  return {
    publicOnly: true
  }
};
```

Next, I'm going to inform `ember-intl` what locales I support:

```javascript
// config/ember-intl.js
module.exports = function() {
  return {
    locales: ['en-us', 'es-es', 'fr-fr', 'pt-br', 'it-it']
  }
};
```

Finally, in the few spots where languages need to load (on boot, on language switch), load the translations from my asset map:

```javascript
import { task } from 'ember-concurrency';
import fetch from 'fetch';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend({
    intl: service(),
    assetMap: service('asset-map'),

    _fetchTranslations: task(function*() {
        const intl = get(this, 'intl');
        const [locale] = get(intl, 'locale');
        let translationsUrl = yield get(this, 'assetMap').resolve(`translations/${locale}.json`);

        const translationSource = yield fetch(translationsUrl);
        const translations = yield translationSource.json();
        intl.addTranslations(locale, translations);
        intl.setLocale(locale);
    })

    ...
```

Pretty easy. It's basically the same as the `ember-intl` documentation.

## Quirks

#### Mirage
I need to tell Mirage to let requests for translations passthrough and not treat them like an API request. Add the following to the Mirage config:

```javascript
// local Ember development
this.passthrough('http://localhost:4200/translations/**', ['get']);

// Travis
this.passthrough('http://localhost:7357/translations/**', ['get']);
```

#### Hosting Assets
It's absolutely critical that you use a CDN to upload your assets. At the time, we were hosting our application (and serving assets) from Heroku, which is ephemeral. Given the nature of the single page application, users tend to have longer running sessions. We saw a lot of cases where:

- user has `app-ABC.js` running, which has locales built in. the asset map has `en-us-ABC.json`
- the deployment goes out, `en-us-ABC.json` is destroyed, replaced with `en-us-XYZ.json`
- user still has `app-ABC.js` and now can't see any content because `app-ABC.json` is gone

## Results
Our previous build and lighthouse:

![Post-Showdown - Build](/public/img/posts/20180914/post-showdown-build.png "Post-Showdown - Build")

![Post-Showdown - Lighthouse](/public/img/posts/20180914/showdown-mono-lighthouse.png "Post-Showdown - Lighthouse")

After:

![Lazy Locales - Build](/public/img/posts/20180915/lazy-locales-build.png "Lazy Locales - Build")

![Lazy Locales - Lighthouse](/public/img/posts/20180915/lazy-locales-lighthouse.png "Lazy Locales - Lighthouse")

This is great, we dropped **74 kB** from our application build (not vendor build), which was half of our entire application. The tradeoff here is users now incur an additional web request to fetch initial content.

The first meaningful paint time has dropped lower to 4.3 seconds. Our JavaScript boot time and main thread time is half of what it was when I started.

Lighthouse is still bothering me about loading fonts, so let's revisit that next.

## Keep reading
- [Baseline]({% post_url 2018-09-01-ember-pwa-baseline %})
- [Add web manifest]({% post_url 2018-09-02-ember-pwa-manifest %})
- [Remove liquid fire]({% post_url 2018-09-03-ember-pwa-no-liquid-fire %}) 
- [Bundle web fonts]({% post_url 2018-09-04-ember-pwa-include-web-fonts %}) 
- [Random Lodash]({% post_url 2018-09-05-ember-pwa-random-lodash %})
- [Moment Timezones]({% post_url 2018-09-06-ember-pwa-moment-timezones %})
- [Remove Showdown]({% post_url 2018-09-07-ember-pwa-showdown %}) 
- [Lazy Locales]({% post_url 2018-09-08-ember-pwa-lazy-locales %}) _(you are here)_