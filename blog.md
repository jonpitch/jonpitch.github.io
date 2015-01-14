---
layout: page
title: Blog
---

{% for post in site.posts %}
<div>
	<div><a href="{{ post.url }}">{{ post.title }}</a></div>
	<span class="post-date">{{ post.date | date_to_string }}</span>
	<p><small>{{ post.excerpt }}</small></p>
	<!--
	<p><small><a href="{{ post.url }}#disqus_thread">{{ post.title }}</a></small></p>
	-->
</div>
<hr />
{% endfor %}