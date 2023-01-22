---
title: Let's Learn Eleventy (11ty) - Slots, includes and shortcodes
pubDate: 2020-10-21
description: This is the third part of the Let't Learn Eleventy series. We'll learn how to use slots, includes and shortcodes.
keywords: ["Eleventy", "11ty"]
---

In the [first part](/eleventy-part-one) and the [second part](/eleventy-part-two) parts we have seen:

- What is Eleventy and how to install it
- How to use data inside a page
- Basic configuration
- Using the same template in multiple pages
- How to use collections

This is the third part of the _Let's Learn Eleventy_ series and will talk slots, includes, and shortcodes, or how to create components in Eleventy.

## Components in Eleventy

_Problem:_ All modern JS frameworks like React, Vue, Angular are component based frameworks. A web page created with these frameworks is a tree of components.

Eleventy is not component based. Looks layer based to me, an Eleventy web page is a layer on top of another layer on top of another layer, and so on.

For example, usually, there is a _base_ layout with the `html`, `head`, and `body` tags and which renders the header and footer (the same on all pages). Then we have a _home_ layout that extends the _base_ layout for the index page, a _post_ layout for a blog post, and so on.

It was really hard for me, to switch my mental model of thinking in components to something else and I think this is one of the primary reasons Eleventy looks strange to React & Co people like myself.

But not all hope is lost, there are some ways to use component like structures in Eleventy. Let's see what they are.
_(Note: I'm still learning Eleventy so there might be other ways, or some other ways will be added in the future - when I wrote this Eleventy was at v0.11.0)_

## Blocks

You can think of blocks as slots, as places in your layout (template) where you allow content to be inserted by pages
using the layout or by layouts that extend the layout.

Here is an example, a `base.njk` layout:

```html
<!DOCTYPE html>
<html lang="en" class="no-js">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    {% block head %} {% endblock %}
  </head>
  <body>
    {% block content %} {% endblock content %}
  </body>
</html>
```

The `head` block allows content to be added to the head.
The `content` block allows content to be added to the body.

Pages can now add some critical CSS in the `head` and the content in the `body`

```html
---
title: "Homepage"
---

{% extends 'layouts/base.njk' %} {% block head %}
<style>
  html,
  body {
    margin: 0;
    padding: 0;
    font-size: 1rem;
    min-height: 100vh;
    color: #fff;
    background-color: #222;
  }
</style>
{% endblock %} {% block content %}
<main id="main-content">...</main>
{% endblock %}
```

### Pros

Very useful when you create several layouts, a base one, and then more specific ones,
so you have an hierarchy of layouts.

Like the base layout adds the `html`, `head`, and `body` tags,
the next layout adds the `nav`, `main`, and `footer`, the third layout add other context specific tags to the main page, or a blog post page.

### Cons

You need to add a new block for each page, so you end up will too many blocks, some used
on some pages and some used only on other pages. Things get confusing.

The block position is fixed so you cannot inject content dynamically in different places.

## Includes

You can split the page content into several smaller files (very similar to React/Vue/Angular components) and
then include those files in the proper places.

For example, you can have a `navigation.njk` that renders the site navigation, and even better it can
render different navigation items for different pages:

```html
{% if navigation.items %}
<nav class="nav">
  <ul>
    {% for item in navigation.items %}
    <li class="nav-item"><a href="{{ item.url }}">{{ item.label }}</a></li>
    {% endfor %}
  </ul>
</nav>
{% endif %}
```

And you used it by _including_ it in a site header component:

```html
<header role="banner">
  <a href="/">
    <img src="logo.svg" alt="My logo" />
  </a>
  {% include "components/nav.njk" %}
</header>
```

_Note:_ the path to include must be relative to `_includes` folder (e.g. `_includes/components/nav.njk`) not
relative to the file that includes `nav.njk`!

What that does is it simply takes the content of `nav.njk` and inserts its content in the header,
like there was a single file from the beginning:

```html
<header role="banner">
  <a href="/">
    <img src="logo.svg" width="50px" height="50px" alt="My logo" />
  </a>
  {% if navigation.items %}
  <nav class="nav">
    <ul>
      {% for item in navigation.items %}
      <li class="nav-item"><a href="{{ item.url }}">{{ item.label }}</a></li>
      {% endfor %}
    </ul>
  </nav>
  {% endif %}
</header>
```

Of course, you can then use the `header.njk` in the `base.njk` layout or somewhere else:

```html
<!DOCTYPE html>
<html lang="en" class="no-js">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    {% block head %} {% endblock %}
  </head>
  <body>
    {% include "components/header.njk" %} {% block content %} {% endblock
    content %} {% include "components/footer.njk" %}
  </body>
</html>
```

### Pros

Conceptually, includes are very similar to components, they allow us to split and organize the code in small, independent pieces.

### Cons

You cannot parametrize them, they can use only data available on the page (so for example you cannot include the same file twice to do different things.)

You cannot have nested content.

## Filters

A filter is a (pure) function that modifies some content. While the purpose of filters is usually to provide some utility functionality,
nothing stops you from creating a full component markup from a filter.

First, you need to create the filter's function:

```js
module.exports = function dateFormatFilter(dateString) {
  const options = { year: "numeric", month: "long", day: "2-digit" };
  const date = new Date(dateString);
  try {
    return date.toLocaleDateString("default", options);
  } catch (err) {
    // handle IE 11
    return date.toLocaleDateString();
  }
};
```

Now you need to register the filter with Eleventy, in the configuration file, `.eleventy.js`:

```js
const dateFormatFilter = require('./<path-to-file>/date-format-filter.js');

module.exports = function(eleventyConfig) {
  ...

  // Note that we register the filter under "dateFormat"
  eleventyConfig.addFilter("dateFormat", dateFormatFilter);

  ...
};
```

Finally, you can use the filter in a layout or page, with the pipe `|` symbol followed by the filter name:

```html
{% post.date | dateFormat %}
```

As said, nothing stops us from using filters to create content like this:

```js
module.exports = function greeting(name) {
  return `
        <section>
            <header>Hey ${name}!<header>
            Welcome to our fabulous website.
        </section
    `;
};
```

Then, after registering it with Eleventy:

```html
{% user.name | greeting %}
```

### Pros

Filters are a great way to add small utility functions to format dates, encode URLs, minify CSS, etc.
Eleventy provides some built-in filters: [url](https://www.11ty.dev/docs/filters/url/),
[slug](https://www.11ty.dev/docs/filters/slug/), [log](https://www.11ty.dev/docs/filters/log/), and
[get\*CollectionItem](https://www.11ty.dev/docs/filters/collection-items/).

They are reusable, you can use the same filter as many times as you want in a single page, each instance
can take different arguments.

You can write them in JavaScript.

### Cons

I wouldn't use filters to create components. The other options are better for that.

You cannot have nested content.

## Shortcodes

Shortcodes are a way to extend the vocabulary of the template language, to teach the old template engine new tricks :)
Using shortcodes we can again extract reusable chunks of code in separate components.

Just as filters, we first create a function:

```js
module.exports = function card(title, text, cta, link, type) {
  return `
        <article class="card ${type}">
          <header>${title}<header>
          ${text}
          <footer>
            <a href="${link}">${cta}</a>
          </footer>
        </article>
  `;
};
```

Then we need to register the function with Eleventy in `eleventy.js`:

```js
const card = require('./<path-to-file>/card.js');

module.exports = function(eleventyConfig) {
  ...
  eleventyConfig.addShortcode("card", card);
  ...
};
```

Then use it by specifying "card" then the list of parameters, separated by `,`:

```html
{% card "Webdesign", "Our webdesign services...", "See examples",
"/portfolio/webdesign" %}
```

Another, more powerful type of shortcodes are the "paired" shortcodes, meaning they have an open and close tag:

```
{% card "title", "cta", "link" %}

Here goes the card content

{% endcard %}
```

In this case, the implementation is a bit different:

```js
// First argument is the content between the open and close tags
module.exports = function card(content, title, cta, link, type) {
  return `
        <article class="card ${type}">
          <header>${title}<header>
          ${content}
          <footer>
            <a href="${link}">${cta}</a>
          </footer>
        </article>
  `;
};
```

Also, you need to register these types of shortcodes differently with Eleventy, using `addPairedShortcode` instead of `addShortcode`

```js
const card = require('./<path-to-file>/card.js');

module.exports = function(eleventyConfig) {
  ...
  eleventyConfig.addPairedShortcode("card", card);
  ...
};
```

### Pros

They can have parameters, so you can use on the same page multiple times the same shortcode to do different things.
And you can write them in JavaScript :)

This is the most powerful option to create components, they can have nested content.

### Cons

While the most powerful, this option is also the hardest to get right.

## Resources

For more info, you can check the [11ty docs](https://www.11ty.dev/docs/).

But I recommend you to check how blocks, includes, filters, and shortcodes are used in real life.
Search for `{% block`, `{% include`, `.addFilter` and `.addShortcode` in the following repos:

- [eleventy-base-blog](https://github.com/11ty/eleventy-base-blog)
- [eleventy-high-performance-blog](https://github.com/google/eleventy-high-performance-blog)
- [11ty-contentful-starter](https://github.com/contentful/11ty-contentful-starter)
- [personal-site-hylia](https://github.com/hankchizljaw/personal-site-hylia)

Sadly I couldn't find good examples of real-life usage of `.addPairedShortcode`, please let me know if you know any.
