---
title: What is an application programming interface?
pubDate: 2020-06-19
description:
keywords: ["API", "JAMstack", "programming"]
---

Lots of people have a rather vague or incorrect idea about what an API is.
Some even think it is a kind of beer because it sounds like India Pale Ale (IPA). No, API is an acronym for
Application Programming Interface. It is a technical term that all programmers should know.

Let's look first at how Wikipedia defines it:

> An application programming interface (API) is a computing interface which defines interactions between
> multiple software intermediaries. It defines the kinds of calls or requests that can be made,
> how to make them, the data formats that should be used, the conventions to follow, etc. - [Wikipedia](https://en.wikipedia.org/wiki/Application_programming_interface)

That sounds rather complicated. An API is just the public part of a codebase, the part that is intended to be used by someone else.

The most eloquent metaphor I can think of is an iceberg. It has a small tip, above the water, that you can see.
But the bulk of it is underwater. In the same way, the API is the code you can use, which is just a small part
of the entire codebase.

So you might ask why we need to care about the API? Why we can't just use the entire codebase as we please.
Glad you asked, there are a lot of reasons for this. Let's see some API examples and the reasons for them.

## Service API

There is a good chance you've heard about APIs when you tried to use an online service from your code or from a tool you use.
For example, right now I'm using GitHub APIs to push my code in the repo.
These service APIs are available online through some URLs.

You need to know what the URLs, what data it needs, and what data it sends back, you don't know and you don't
care how the API is implemented, in what programming languages, or how it works internally.

A simple example, is the API offered by [Open Notify](http://open-notify.org/) that provides some of NASA’s awesome data.
To find how many people are now in space you can call the API in the following way:

```js
async function getSpacePeople() {
  const data = await fetch("http://api.open-notify.org/astros.json").then(
    (response) => response.json()
  );

  const people = data.people;
  const result = people.map((x) => x.name + " aboard " + x.craft);
  console.log("Who is space right now?");
  console.log("\n", result.join("\n "));
}

try {
  getSpacePeople();
} catch (err) {
  console.log(err);
}
```

Why a service API?

- it's an easy to use way to access the service, you don't need to know all the codebase
- it hides the implementation details of the service
- it doesn't matter what programming language was used to implement it, and that can change anytime without impacting service users
- it needs and returns data in a language-independent format like JSON, XML, text, etc.
- the way the API data is rendered doesn't matter, is common these days that a web site and a mobile app use the same API

JAMstack is a way of thinking about web sites and web apps that implies simpler developer experience,
better performance, lower cost, and greater scalability. JAM stands for JavaScript, API & Markup.
So an important part of the JAMstack is the Application Programming Interface.
Static pages are deployed on fast CDNs (Content Delivery Networks) all over the globe and use JavaScript to retrieve data from APIs.

## Framework or Library API

But an API doesn't mean only online services, all the frameworks or libraries you use and love provide an API,
it's through that API you use the framework/library.

For example React library provides a `React` API and through it you can create DOM elements.
Even if you don't use this API directly because you use JSX, behind the scenes, this API is used.

```js
return React.createElement(
  "div",
  { className: "shopping-list" },
  React.createElement("h1" /* ... h1 children ... */),
  React.createElement("ul" /* ... ul children ... */)
);
```

Why a library API?

- it hides the implementation details of the library
- having a public API, the newer versions of the library can still be backward compatible.
- private(non-public) code can be refactored, optimized, changed without affecting users

## Public API vs Private api

Every good programmer creates an API for its codebase, no matter how small that codebase it is.
Even a simple class, can have private state and functions that cannot be called directly outside the class.
The public functions of the class are the API of the class.

It's a good idea to have a small API on top of large private code. You will be able to change the inner code
as much as you want and not affect the code users, but this is not true when you change the public part of your
code. That in general means breaking changes and nobody likes breaking changes. Absolutely nobody.

So think hard about how your code will be used before you release it in the wild because after that it will
be very hard to fix APIs.

## Good API, Bad API

As you know if you ever used an API, not all APIs a good. Some are extremely bad and confusing.

It's very easy to get it wrong in the beginning, somebody said an API needs at least two different clients
before one can be sure is on the right track. So write code that uses your API to see how it feels to use it
(you can at least write some unit tests.)

Here are some things to look out for:

- Do not provide functions that look similar but work differently. Even today I have to look up which
  one does what I what from these two:

```js
// Don't do this
array.splice();
array.slice();
```

- Be consistent, do not use similar words for the same action:

```js
// Don't do this
user.remove();
company.delete();
```

- Instead of requiring a lot of parameters, try to find alternatives.
  Nobody remembers the order if there are many parameters at the same time.
  In JavaScript, you can provide a single object. The advantage is that you can add or remove parameters any time
  without breaking the backward compatibility.

```js
// Do this
function doSomething({ a, b, c, d, e, f }) {}

doSomething({
  a: 1,
  c: "Sam",
});
```

- Do not mutate the parameters unexpectedly and do not create unexpected side effects

```js
// Don't do this
function daysFromNow(date, n) {
  // set new day
  date.setDate(date.getDate() + n);
  const day = date.getDay(); // Sunday - Saturday : 0 - 6
  let dayName;
  switch (day) {
    case 0:
      dayName = "Sunday";
      break;
    case 1:
      dayName = "Monday";
      break;
    case 2:
      dayName = "Tuesday";
      break;
    case 3:
      dayName = "Wednesday";
      break;
    case 4:
      dayName = "Thursday";
      break;
    case 5:
      dayName = "Friday";
      break;
    case 6:
      dayName = "Saturday";
      break;
  }
  return dayName;
}

const now = new Date();
daysFromNow(now, 2); // now is changed!!!!
daysFromNow(now, 3); // wrong result
```

- Split big functions and methods in smaller ones. The API surface remains the same but it is easier to use.

```js
// Don't do this
function big(a, b, c) {
  // small function logic requires a
  // smaller function logic requires b
  // even smaller function logic requires c
}

// Do this
function small(a) {}
function smaller(b) {}
function evenSmaller(c) {}
```

It doesn't matter if you make a service, a library, a command-line app.
Whatever you make, you should make a good API.
