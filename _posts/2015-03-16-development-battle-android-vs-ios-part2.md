---
layout: post
title: Development Battle &mdash; Android vs. iOS &#45; Part 2&#58; Code
tags: [android, ios, mobile]
---

To communicate effectively, you have to know the language. Let's take a look at the native languages of both platforms at a very high level; For iOS: Objective-C/Swift and for Android: Java.

<!--more-->

## iOS

There are two languages a developer can use to write native iOS applications, Objective-C and Swift. Objective-C is a language that was created in the early 80s, while Swift was released in late 2014. Given that stark age difference, one can picture Objective-C as the grumpy old man and Swift as the hipster millenial. As you can imagine, both languages are quite different with Objective-C being very C like, verbose, etc. Swift on the other hand, while it has some Objective-C influence, it primarily looks like a scripting language, does type inference, no header files, less verbose, etc. Let's look at a few simple examples:

#### Instantiation

{% highlight Objective-C %}
// Objective-C
SomeObject *object = [[SomeObject alloc] init];
{% endhighlight %}

{% highlight Swift %}
// Swift
var object = Object()
{% endhighlight %}

#### Null String Check

{% highlight Objective-C %}
// Objective-C
if (someString == (id)[NSNull null] || someString.length == 0) { ... }
{% endhighlight %}

{% highlight Swift %}
// Swift
if someString.isEmpty { ... }
{% endhighlight %}

#### Classes

{% highlight Objective-C %}
// Objective-C

// Person.h - header
@interface Person : NSObject
- (void) printName;
@end

// Person.m - implementation
#import "Person.h"

@implementation Person
- (void) printName {
    NSLog(@"print name to log");
}
@end
{% endhighlight %}

{% highlight Swift %}
// Swift
class Person {
    func printName() {
        println("print name to log")
    }
}
{% endhighlight %}

While these examples are very trivial, take my word for it, you can extrapolate what your code base will look like. While most people are willing to put up with Objective-C to get their apps on a very popular platform, I have talked with several that just outright don't enjoy writing Objective-C code and quite frankly neither do I. Swift however is much easier to work with. In my experience, I thought I was more productive with Swift than Objective-C by a magnitude of 10. Unfortunately, given how new Swift is and how many hundreds of thousands of apps existed before it, Objective-C will be around for quite some time.

## Android

Native Android = Java. If you have been developing for a while, there's a chance you have encountered it in the wild. In regards to Objective-C and Swift, Java sits about in the middle in regards to age, being released around the mid 90s. For me, I started programming with C++ in high school which quickly gave way to Java, so there wasn't much new to learn, unlike Objective-C and Swift which I had put some time into. Let's look at Java with our trivial examples above:

#### Instantiation

{% highlight Java %}
SomeObject object = new SomeObject();
{% endhighlight %}

#### Null String Check

{% highlight Java %}
if (someString.equals("") || someString.equals(null)) { ... }
{% endhighlight %}

#### Classes

{% highlight Java %}
class Person {
    public void printName() {
        // ... print name here
    }
}
{% endhighlight %}

Pretty straight forward. In my opinion, Java has always been pretty easy to understand and work with. Java can become verbose pretty quickly, especially when working with some of the Android SDK, but I'll take verbosity when it means the underlying concept is understandable, for example, URL encoding:

{% highlight Java %}
// Java
String encoded = URLEncoder.encode("Some String", "UTF-8");
{% endhighlight %}

{% highlight Objective-C %}
// Objective-C
NSString *s = [string stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
{% endhighlight %}

Ugh.

## Final Thoughts

One of the negatives Android/Java has going for it, is that I typically find it takes a lot of code to accomplish something. Personally, when working on Android apps it feels to me as if things are more decoupled and I'm spending a good bit of time wiring things together. With Xcode on the other hand, there seems to be a tighter integration, so I'm accomplishing more with less. I'm not sure if that's a good thing or not.

If I had to chose a preference, Java or Swift would be a draw, which is saying a lot for Swift. While Swift is new to me, I feel productive in both it and Java. On the other hand, Objective-C can die a horrible death.

**Edge:** `Draw`

What are your thoughts? Do you like/dislike one language more than the other? I also glanced over a lot, like namespaces, callbacks, etc., is there anything you find appealing/unappealing of one vs. the other?

Next, [testing and debugging in both platforms](/2015/03/24/development-battle-android-vs-ios-part3/).
