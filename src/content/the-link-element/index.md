---
title: The <link> element
pubDate: 2021-04-03
description:
keywords: ["HTML"]
---

The &lt;link&gt; element is used to load an external resource in the HTML. Link elements are part of the page metadata and not
inside the page's visible content. _Don't use this element to create links between web pages, use &lt;a&gt; element for that._

Initially, I wanted to continue the HTML Basics series - started with [part one here](https://www.raresportan.com/html-basics-part-one/) -
but I had to stop at the first element I wanted to talk about, the link element. I've felt it is so important
that deserves it's own post.

Link element has lots of uses. So many that I cannot even cover all in here.

Link element always has at least two attributes:

- **href**: the URL of the external resource to load
- **rel**: the relationship between the HTML and the loaded resource, it instructs the browser how to handle the resource

Links are to be set inside the &lt;head&gt; element because they are part of the page metadata.
They can be set inside &lt;body&gt; but that is considered a bad practice, so don't.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    ... ALL LINK ELEMENTS GO HERE ...
  </head>
  <body>
    ...
  </body>
</html>
```

Let's see some of the most common.

## Load stylesheets

A very common use of link is to load CSS stylesheets.

```html
<link href="main.css" rel="stylesheet" />
```

If you have many stylesheets to load and they take time, you need a better strategy:

- First, you need to inline the _critical_ CSS using a &lt;style&gt; element

```html
<style>
  body {
    background-color: rebeccapurple;
    color: #fff;
  }
  ...;
</style>
```

- Then load the next important styles using link

```html
<link href="main.css" rel="stylesheet" />
```

- Finally, load the other styles using a trick

```html
<link
  rel="stylesheet"
  media="print"
  href="other.css"
  onload="this.media='all'"
/>
```

Using this trick the browser will not prioritize the loading of `other.css`, but when is loaded,
we use a bit of JavaScript to change the media from print to all to apply it to the page.

## Set icons

Another usage of the link element is to set web page icon (displayed by browsers with the title, not part of the page content)

```html
<link rel="icon" href="favicon.ico" />
```

You can set icons for Apple devices in the same way:

```html
<link
  rel="apple-touch-icon-precomposed"
  sizes="114x114"
  href="apple-icon-114.png"
  type="image/png"
/>
```

## Set canonical links

Sometimes the same content is used on different websites. For example, a blog post written on a personal blog is shared on Medium, Dev.to, etc. The problem is search engines like Google Search hates duplicated content and tries to promote the original source. But no matter where you share your content, you should always set the canonical link back to your blog.

The canonical link for this page is this, no matter where this content will be shared on:

```html
<link rel="canonical" href="https://raresportan.com/html-basics-part-two/" />
```

## Set alternative content

Using rel="alternate" you can specify alternative versions of a web page or site.
Many sites have a RSS feed and the feed is linked like this:

```html
<link href="/rss.xml" rel="alternate" type="application/rss+xml" />
```

If your site have content in different languages, another use for alternatives is to specify the pages in another languages.
For example, each MDN page is translated in different languages. In this case we need to set a new attribute, hreflang to specify the page's language (and region).
Here is how some of those pages are set inside the en-US page:

```html
...
<link
  rel="alternate"
  href="https://developer.mozilla.org/ru/docs/Web/HTML/Element/link"
  hreflang="ru"
/>
<link
  rel="alternate"
  href="https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/link"
  hreflang="pt"
/>
<link
  rel="alternate"
  href="https://developer.mozilla.org/pl/docs/Web/HTML/Element/link"
  hreflang="pl"
/>
<link
  rel="alternate"
  href="https://developer.mozilla.org/ja/docs/Web/HTML/Element/link"
  hreflang="ja"
/>
<link
  rel="alternate"
  href="https://developer.mozilla.org/fr/docs/Web/HTML/Element/link"
  hreflang="fr"
/>
...
```

You need to be careful to set the correct canonical link on all those pages. For example, the https://developer.mozilla.org/ru/docs/Web/HTML/Element/link page
will have the https://developer.mozilla.org/ru/docs/Web/HTML/Element/link set as a canonical link, not https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link

## Preloading resources

Today this is still experimental so it's not supported in all modern browsers. But is useful when you want a bit of control of the way the page resources are loaded.

A very good use case is to preload fonts. Usually, the fonts are loaded by the CSS and while the CSS and the fonts are loading you see the page text rendered with a system font. You can improve this by forcing the browser to load the font earlier.

```html
<link
  rel="preload"
  href="comicsans.woff2"
  as="font"
  type="font/woff2"
  crossorigin="anonymous"
/>
```

As you can see, here we need to set another attribute, called `as` to specify the type of the resource, in this case, font.
We use the type attribute as a subtype if needed. Here is used because are different types of fonts that can be loaded.

Another related use case is prefetching resources. Unlike preloading, prefetching should be used for loading resource or other pages which the user might visit. For example, if the user is on the Login page you might know the next page the user will see. Same, if the user hovers a link, there is a good chance the user will use that link.

```html
<link rel="prefetch" href="/about.html" crossorigin="anonymous" />
```

And finally, if you use third-party resources, you might want to speed the connection to them by preconnecting,
this way at least you don't wait for DNS to resolve that third-party domain.

```html
<link rel="preconnect" href="https://third-party.com" />
```

In conclusion, learn to use the link element, it's one of the most important elements. Using link's power
you can create a better website.

## Resources

- [MDN: The Link element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link)
- [MDN: Link types](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types)
- [Preload, Prefetch And Priorities in Chrome](https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf)
- [The Simplest Way to Load CSS Asynchronously](https://www.filamentgroup.com/lab/load-css-simpler/)
