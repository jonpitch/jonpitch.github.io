---
layout: post
title: Setting Up Email with Postfix, Dovecot and MySQL
tags: [misc, infrastructure]
---

I had recently set up a Linode (which is awesome by the way) to handle the incoming and outgoing mail of a domain of mine. Linode actually has very good instructions on the subject, which can be found [here](https://library.linode.com/email/postfix/postfix2.9.6-dovecot2.0.19-mysql).

<!--more-->

After following these instructions to the letter and configuring my Android mail client to theoretically send and receive mail at my domain, I was having no luck.

What was helpful in tracking down the problem was:

{% highlight bash %}
tail -f /var/log/mail.log
{% endhighlight %}

When I would send or receive mail, the email wouldn't bounce, but instead I would see an error:

{% highlight bash %}
postmaster_address setting not given
{% endhighlight %}

Linode's documentation did not mention this anywhere, but after many Google searches later, what I had to edit was:

{% highlight bash %}
/etc/dovecot/conf.d/15-lda.conf
{% endhighlight %}

In this config, I just had to add:

{% highlight bash %}
postmaster_address = your.email@somedomain.com
{% endhighlight %}

And restart Dovecot.

{% highlight bash %}
sudo service dovecot restart
{% endhighlight %}

Now I could start deleting the flood of test emails I had sent to myself trying to figure out the problem. Hopefully this saves somebody else a bit of time.
