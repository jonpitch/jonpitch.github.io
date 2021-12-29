---
title: "Google Plus ListView Animation"
date: 2013-06-24T00:00:00-05:00
draft: false
tags: [android, mobile]
---

The Google Plus app for Android has a nice `ListView` animation when scrolling down in a list, `ListView` items slide up into place. This transition only happens on list items you haven't viewed yet and only in the scroll down direction, not in the scroll up direction. 

<!--more-->

Here's how you can achieve this effect:

{{< highlight java >}}
public class YourAdapter extends ArrayAdapter {

    private int mLastPosition = -1;
    // ... constructor, etc.

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        // Do all your drawing, ViewHolder stuff, etc.

        // animate the item
        TranslateAnimation animation = null;
        if (position > mLastPosition) {
            animation = new TranslateAnimation(
                Animation.RELATIVE_TO_SELF,
                0.0f, Animation.RELATIVE_TO_SELF, 0.0f,
                Animation.RELATIVE_TO_SELF, 1.0f,
                Animation.RELATIVE_TO_SELF, 0.0f);

            animation.setDuration(600);
            convertView.startAnimation(animation);
            mLastPosition = position;
        }

        return convertView;
    }
}
{{< /highlight >}}
