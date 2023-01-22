---
title: Let's Learn Eleventy (11ty) - Collections
pubDate: 2020-09-03
description: This is the second part of the Let't Learn Eleventy series. We'll learn how to use collections.
keywords: ["Eleventy", "11ty"]
---

This is the second part of _Let's Learn Eleventy_ series and will talk about collections.
In the [first part](/eleventy-part-one) we have seen:

- What is Eleventy and how to install it
- How to use data inside a page
- Basic configuration
- Using the same template in multiple pages

## What is a collection in 11ty?

A collection is a group of content pieces.

For example a blog has a posts collection, a landing page has a testimonials collection, a portfolio is a collection of showcases.

### Tip

Before we begin, I want to share a debugging tip.
It can be very useful to have a way of inspecting the collections or an item from
a collection. Today, 11ty comes with a `dump` filter for this purpose but it doesn't work in some cases.
We need to overwrite it by creating our own `dump` filter inside the `.eleventy.js` config:

```js
const util = require("util");

module.exports = function (eleventyConfig) {
  //..

  eleventyConfig.addFilter("dump", (obj) => {
    return util.inspect(obj);
  });

  // ...
};
```

In a page you can do:

```markdown
{% set items = [1, 2, 3] %}
{{ items | dump }}

{{ collection.portfolio | dump }}
```

## Group content with tags

The simplest way to create a collection is by setting the same tag to all the content pieces that must be in
the collection.

If you have a portfolio page where you want to show your work, create a folder called `portfolio` and create a
markdown file for each of your portfolio item (it doesn't really matter where you put the files, but it's nice
to organize the content a bit).

restaurant.md

```markdown
---
title: Restaurant website
description: Allow clients to make reservations online
tags: portfolio
---
```

shop.md

```markdown
---
title: Shop website
description: Local shop website, allowed them to survive during lockdown
tags: portfolio
---
```

travel.md

```markdown
---
title: Travel website
description: Travel agency website, complex location search and recomandations
tags: portfolio
---
```

All these files have a `tag` set to `portfolio` and because of this, 11ty will create a portfolio colletion with them.

Now, on the page where you want to show them, e.g portfolio.md, you can do this:

portfolio.md

```markdown
{%- for portfolio in collections.portfolio -%}

  <article>
    <header>{{ portfolio.data.title }}</header>
    {{ portfolio.data.description }}    
  </article>
{%- endfor -%}
```

You might wonder how the items are sorted. 11ty docs say that:

> The default collection sorting algorithm sorts in ascending order using:

- The input file’s Created Date (you can override using date in front matter)
- Files created at the exact same time are tie-broken using the input file’s full path including filename

So the simplest way to make sure the items are sorted in the exact order you want, is to add `date`
in each file frontmatter.

restaurant.md

```markdown
---
title: Restaurant website
date: 2020-01-01
---
```

shop.md

```markdown
---
title: Shop website
date: 2020-01-03
---
```

travel.md

```markdown
---
title: Travel website
date: 2020-01-02
---
```

If you want them reversed, you can add `reversed` next to collection name:

```markdown
{%- for portfolio in collections.portfolio reversed -%}

<article>
  <header>{{ portfolio.data.title }}</header>
</article>
{%- endfor -%}
```

### Multiple tags

You can use multiple tags with a single content and there are two ways to set it.

Single line:

```markdown
tags: ['portfolio', 'highlight']
```

Multiple lines:

```markdown
tags: - 'portfolio' - 'highlight'
```

Now the same piece of content, will be present in two different collections.

Portfolio collection

```markdown
{%- for portfolio in collections.portfolio -%}

  <header>{{ portfolio.data.title }}</header>
{%- endfor -%}
```

Highlight collection

```markdown
{%- for highlight in collections.highlight -%}

  <header>{{ highlight.data.title }}</header>
{%- endfor -%}
```

### Exclude content from collection

If you want a piece of content to be excluded from a collection, use `eleventyExcludeFromCollections: true`
in frontmatter. For example, to exclude restaurant item you can do:

restaurant.md

```markdown
---
eleventyExcludeFromCollections: true
title: Restaurant website
description: Allow clients to make reservations online
tags: portfolio
---
```

Now only the other two piece of content will be present in the portfolio collection.

## Custom collections

11ty puts all the content, with or withour tags, into the `collections.all` collection.
This way you have access to all the content by iterating over a single collection.

We can use the `collection.all` to create our own collections by filtering and/or sorting
this collections inside the 11ty configuration file, `.eleventy.js`

We could have created the portfolio collection without tags, by using the fact that
they are in the same folder, /portfolio:

```js
module.exports = function (eleventyConfig) {
  eleventyConfig.addCollection("portfolio", function (collectionApi) {
    return collectionApi
      .getAllSorted()
      .filter((item) => item.url && item.inputPath.startsWith("./portfolio"));
  });
};
```

Here is another example, how to create a collection with Top 3 highlights:

```js
module.exports = function (eleventyConfig) {
  // ...

  // collection with first top 3 portfolio highlights
  eleventyConfig.addCollection("top3", function (collectionApi) {
    // get content with highlight tag
    const highlights = collectionApi.getFilteredByTags("highlight");
    // return first 3
    return highlights.slice(0, 3);
  });
};
```

## Global data

11ty has a special folder where you can put global data, by default this folder is `_data` ( but
you can specify your own if you want in the .eleventy.js).

The global data can be objects or arrays. If an array is there, we can use it as a collection.

So another way to create the portfolio items is to create a `portfolio.json` inside the `_data` folder:

```json
[
  {
    "title": "Restaurant website",
    "description": "Allow clients to make reservations online"
  },
  {
    "title": "Shop website",
    "description": "Local shop website, allowed them to survive during lockdown"
  },
  {
    "title": "Travel website",
    "description": "Travel agency website, complex location search and recomandations"
  }
]
```

Inside a page we have access to `portfolio` data directly:

```markdown
{%- for item in portfolio -%}

<article>
  <header>{{ item.title }}</header>
</article>
{%- endfor -%}
```

Two things to note here:

- use `portfolio` not `collections.portfolio`
- use `item.title` not `item.data.title`

## Recap

- Add tags to content and 11ty automatically creates collections
- Create custom collections by filtering and/or sorting existing collections
- Can use global data collections
