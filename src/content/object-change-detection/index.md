---
title: How to detect object changes in JavaScript
pubDate: 2020-11-20
description:
keywords: ["JavaScript"]
---

Recently I've run into a frustrating issue: I worked with another team and we were supposed to exchange
some objects between us. The problem was that the objects were supposed to be changed/updated between the start
and the end of the journey. And of course, something was changing the objects in a bad way.

Third-party libraries were used by both ends, a lot of configurations and settings done by many people for many purposes.
This was not a walk in the park.

I controlled only the start of the journey, someone else was using the objects at the end. So we asked each other: Who is the culprit?
Because each of us was using a different JavaScript library, we had to put the objects on `window`. Every JavaScript piece of code
has access to `window` so finding the culprit is not easy.

So, at the start of the journey I put an object on window like this:

```js
window.pageData = {
  pageName: "Payment",
  userStatus: "anonymous",
  event: ["payByCard"],
};
```

For some reason they receive:

```js
window.pageData = {
  pageName: "",
  userStatus: "",
  event: [],
};
```

What can be done in this case? Blaming each other :) is one option, but not very helpful.

The first thing I did was to freeze the object, to see if they get it that way:

```js
window.pageData = Object.freeze({
  pageName: "Payment",
  userStatus: "anonymous",
  event: ["payByCard"],
});
```

That helped, it was clear that I was sending the correct data in some cases.
But there were still some cases that broke some legit functionality that needed to update the object.

The second thing I did was to create a Proxy around the data, and log each change to it:

```js
window.pageData = new Proxy(
  {
    pageName: "Payment",
    userStatus: "anonymous",
    event: ["payByCard"],
  },
  {
    set: function (target, key, value) {
      target[key] = value;

      try {
        throw new Error("window.pageData changed by something!");
      } catch (err) {
        console.warn(err);
      }
      return true;
    },
  }
);
```

Each time something was changing the object, a console.warn was triggered indicating the JavaScript source that attempted
the change. Busted! We now understood what happened and were able to fix the issues.

Bottom line: Being able to understand what happens in a complex system is very important.
Most problems can be fixed correctly only if you understand what's going on.
