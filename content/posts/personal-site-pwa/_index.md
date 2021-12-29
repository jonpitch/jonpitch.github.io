---
title: "A Step by Step Jekyll Blog to Progressive Web App Guide"
date: 2018-01-09T00:00:00-05:00
draft: false
tags: [web-development, javascript, progressive-web]
medium: https://medium.com/@jonpitch/turning-my-jekyll-blog-into-a-progressive-web-application-58f9046eb6b2
---

In recent years, web technologies have started to catch up to mobile devices in terms of offering a first-class mobile experience. Here's a step by step guide in the effort required to migrate my personal website to a progressive web application (PWA).
<!--more-->

## Before Getting Started
In order to track my progress, I made extensive use of the open-source project, [Lighthouse](https://github.com/GoogleChrome/lighthouse). There's a handy chrome extension available [here](https://developers.google.com/web/tools/lighthouse/). 

For those unfamiliar, Lighthouse will audit your site and give you a score over five categories:

- Progressive Web Application
- Performance
- Accessibility
- Best Practices
- SEO

Scores range from 0 (worst) to 100 (best) and very often it will report tips or suggestions on improving your score.

## Establish a Baseline
At the start of this project, this site is:

- Built with [Jekyll](https://jekyllrb.com/)
- Uses [Hyde](http://hyde.getpoole.com/) as a theme
- Hosted on [GitHub Pages](https://pages.github.com/)

Here's that baseline score:

![GitHub Pages](../images/github-pages-lighthouse.png "GitHub Pages - Lighthouse")

I'm immediately docked points for not using HTTPS. As of this blog post, GitHub does not offer HTTPS for static sites that use custom domains (they do offer HTTPS for non-custom domains, for free). There's an [open issue](https://github.com/isaacs/github/issues/156) around supporting it; but rather than wait for GitHub to maybe support this feature, I decided to migrate my site to [Netlify](https://www.netlify.com/), which offers SSL for custom domains.

I was initially worried I might have some performance degredation with Netlify over GitHub. I connected my repository and built my site. Here are the results:

![Netlify](../images/netlify-lighthouse.png "Netlify - Lighthouse")

My scores increased with no effort and I saw comparable performance to GitHub pages. For example, I was seeing ~1 second to [first meaningful paint](https://developers.google.com/web/tools/lighthouse/audits/first-meaningful-paint) on GitHub pages and ~1.3 seconds on Netlify. That was close enough without any optimization to move forward.

#### Netlify + HTTPS
Migrating my site to Netlify was a snap, so I won't dive in to it. There is good documentation [here](https://www.netlify.com/docs/) and [here](https://www.netlify.com/blog/2017/05/11/migrating-your-jekyll-site-to-netlify/).

After getting my repository connected:

- Enabled my custom domain
- Enabled my free SSL certificate
- Re-pointed my DNS from GitHub pages to Netlify

Here are the results:

![Hosted with Netlify](../images/netlify-hosted-lighthouse.png "Hosted Netlify - Lighthouse")

## Asset Optimization
This can be a complicated topic in web development, luckily this is literally a checkbox in Netlify ([here](https://www.netlify.com/blog/2017/02/15/how-to-shave-time-off-of-your-load-time-its-really-really-easy/) is an overview).

Without asset optimization enabled, here are the asset requests:

![No asset optimization](../images/no-asset-optimization.png "No asset optimization")

And the lighthouse score:

![performance lighthouse - no asset optimization](../images/no-asset-optimization-lighthouse.png "performance lighthouse - no asset optimization")

- First meaningful paint - 1.35 seconds
- First interactive paint - 2.06 seconds

After enabling the asset optimization feature:

![with asset optimization](../images/asset-optimization.png "With asset optimization")

And the lighthouse score:

![performance lighthouse - asset optimization](../images/asset-optimization-lighthouse.png "performance lighthouse - asset optimization")

- First meaningful paint - 1.04 seconds
- First interactive paint - 1.7 seconds

Now we're back to GitHub levels of performance.

## Service Worker and Manifest
Service worker is a recent web technology which enables things like push notifications, background sync, caching, etc. There's a good overview [here](https://developers.google.com/web/fundamentals/primers/service-workers/). I found a great tutorial on service worker with Jekyll [here](https://jamesiv.es/jekyll/amp/2017/05/09/serviceworkers-with-jekyll.html).

[Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest) is another best practice for progressive web applications. In general, they provide metadata and allows users to "install" your site, similar to a native mobile application.

Here is the lighthouse score before having a service worker and a robust manifest:

![before service worker and manifest](../images/before-worker-manifest.png "before service worker and manifest")

Here are the results after:

![after service worker and manifest](../images/after-worker-manifest.png "after service worker and manifest")

`:thumbs-up-emoji:`

## Accessibility
Most of my room for improvement here had to do with:

- Improving color contrast
- Missing [landmark](https://www.w3.org/TR/wai-aria-practices/examples/landmarks/HTML5.html)

I'm not a designer, so I found a couple great tools to help in this area. I installed a the [aXe](https://chrome.google.com/webstore/detail/axe/lhdoppojpmngadmnindnejefpokejbdd) chrome extension. It adds a new tab to DevTools and will point out accessibility issues. I also used [this](http://leaverou.github.io/contrast-ratio/) online tool to help compare color contrast.

Here are the results after:

![after contrast](../images/a11y-after-lighthouse.png "after a11y updates")

## Room for Improvement
My best practices score seems to be out of my control:

```
'window.webkitStorageInfo' is deprecated. Please use 'navigator.webkitTemporaryStorage' or 'navigator.webkitPersistentStorage' instead.

TypeError: Math.max is not a function at PerformanceObserver.window.PerformanceObserver.entryList (<anonymous>:8:30)
```

I couldn't track down the culprit, but I suspect it's Chrome or some extension.

My performance score is almost 100, but is currently docked for [CSS blocking paint](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-blocking-css) by 250 milliseconds. I'm pretty happy with this score as is, but perhaps in the future I'll optimize this further.

It would also be great to integrate lighthouse into [CI](https://github.com/ebidel/lighthouse-ci), also for another time.

## Wrapping Up
I know this is a pretty trivial web site, but making it progressive was pretty simple. I'd love to hear about more complicated web applications, or single page web applications and how easy or difficult it is to build and maintain them as progressive web apps.

If you are a Jekyll user and like the Hyde theme, I made a [progressive variant](https://github.com/jonpitch/progressive-hyde) that you can use to get started with your site.