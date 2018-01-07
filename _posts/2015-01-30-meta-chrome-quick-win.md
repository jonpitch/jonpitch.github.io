---
layout: post
title: Using &lt;meta&gt; for a Quick Win
tags: [misc, web-development]
---

For websites and web applications, a minor detail that often goes overlooked is the use of the
"theme-color" meta attribute.

<!--more-->

By simply adding the following meta tag to the head of your page:
{% highlight html %}
<meta name="theme-color" content="#795548" />
{% endhighlight %}

For a trivial amount of effort, there's a very nice benefit for Chrome v39+ for Android:

<img src="/public/img/posts/20150130/1.png" alt="Recents View" style="display:inline;" />
<img src="/public/img/posts/20150130/2.png" alt="Web View" style="display:inline;" />
