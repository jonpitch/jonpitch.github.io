---
layout: post
title: Turning personal site into PWA
tags: [web-development, javascript, progressive-web]
---

Intro
<!--more-->

`gh-pages`
![GitHub Pages](/public/img/posts/20180109/github-pages-lighthouse.png "GitHub Pages - Lighthouse")

- PWA: Does not use HTTPS
- Best Practices: Does not use HTTPS
- Best Practices: Does not use HTTP2

`netlify`
![Netlify](/public/img/posts/20180109/netlify-lighthouse.png "Netlify - Lighthouse")

- Performance: First meaningful paint - 1.35s (compared to 1.0s GH pages)
- Performance: First interactive paint - 2.06s (compared to 1.65s GH pages)

## first
migrate to netlify
- easy score increase
- custom domain
- free ssl

`move dns`
- tell netlify your domain
- configure your dns
- wait for propagation
- provision cert
- redirect http to https

`after`
![Hosted with Netlify](/public/img/posts/20180109/netlify-hosted-lighthouse.png "Hosted Netlify - Lighthouse")

## asset optimization
before build: https://deploy-preview-9--jonpitch.netlify.com/

Sites requests before asset optimization:

`no optimization`
![No asset optimization](/public/img/posts/20180109/no-asset-optimization.png "No asset optimization")

first meaningful paint - 1.35s
first interactive paint - 2.06s

![performance lighthouse - no asset optimization](/public/img/posts/20180109/no-asset-optimization-lighthouse.png "performance lighthouse - no asset optimization")

`asset optimization`
![with asset optimization](/public/img/posts/20180109/asset-optimization.png "With asset optimization")

first meaningful paint - 1.04s
first interactive paint - 1.7s

This is back to GitHub pages level of performance.

![performance lighthouse - asset optimization](/public/img/posts/20180109/asset-optimization-lighthouse.png "performance lighthouse - asset optimization")

after build: https://5a55802081987672d5bbca5d--jonpitch.netlify.com/

## service worker and manifest

[borrowed](https://jamesiv.es/jekyll/amp/2017/05/09/serviceworkers-with-jekyll.html)

caches first 5 posts only, nothing crazy.
front-matter in javascript is jenky.

`before`
![before service worker and manifest](/public/img/posts/20180109/before-worker-manifest.png "before service worker and manifest")

`after`
![after service worker and manifest](/public/img/posts/20180109/after-worker-manifest.png "after service worker and manifest")

## accessibility improvements
- improve tag contrast

install [aXe](https://chrome.google.com/webstore/detail/axe/lhdoppojpmngadmnindnejefpokejbdd) chrome extension

[tool](http://leaverou.github.io/contrast-ratio/) to help pick better contrast

## anything i can do about disqus?
both best practices failed audits are from disqus.

## performance at 100?
css blocking by 250ms.

## keep it that way
lighthouse bot