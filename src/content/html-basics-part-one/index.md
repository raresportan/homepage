---
title: HTML Basics
pubDate: 2021-02-20
description: What are the basic HTML parts of a web page
keywords: ["HTML"]
---

Looks to me that many web developers, especially "full-stack web developers," are
not sure what is the correct HTML for a webpage and use divs and spans instead
of other, more semantically meaningful tags.

The HTML output of your website it’s way more important than the tooling you’ve used to create that output. User experience is more important than developer experience.

Sadly many of us web developers care more about the JavaScript framework we're using, we're studying CSS tricks, but never about the HTML. Many of us don't even think
about HTML as programming.

Let's learn how to use some HTML.

## Too long; didn't read

```html
<!DOCTYPE html>
<html lang="en">
  <head>
  	<title>PAGE TITLE</title>
  	<meta name="description" content="WHAT IS THIS PAGE ABOUT" />
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
  </head>
  <body>

    <a href="#content">Skip to content</a>

    <header role="banner">
        <a href="/" aria-label="Home">
          <svg aria-hidden="true" focusable="false">...</svg>
        </a>
        <nav aria-label="primary">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            OTHER LINKS
          </ul>
        </nav>
    </header>

    <main tabindex="-1" id="content">
      <article>
        <h1>PAGE TITLE</h1>
        ...
        REST OF CONTENT
        ...
      </article>
    </main>

    <aside>
      <h2>You might also like<h2>
      <ul>
        <li>
          <a href="/intersting-article">Interesting article</a>
        </li>
        <li>
          <a href="/must-read-article">Must read article</a>
        </li>
      </ul>
    </aside>

    <footer>
      <nav>
        <ul>
          <li>
            <a href="https://twitter.com/my_twitter_name"
            target="_blank" rel="noreferrer">Twitter</a>
          </li>
          <li>
            <a href="https://github.com/my_github_name"
            target="_blank" rel="noreferrer">Github</a>
          </li>
        </ul>
      </nav>
      <span>&copy; 2021 All rights reserved.</span>
    </footer>

  </body>
</html>
```

## HTML, head, and body

All webpages should have the following bare minimum HTML:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>PAGE TITLE</title>
    <meta name="description" content="WHAT IS THIS PAGE ABOUT" />
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
  </head>
  <body></body>
</html>
```

Let's see why we need each part:

### DOCTYPE tag

```html
<!DOCTYPE html>
```

In the past, when different browsers were following different standards, there were
multiple doctypes, and based on it, the browsers rendered the same page in different
ways. These days, we only need to use `<!DOCTYPE html>` to make browsers follow standards.

This line must always be the first in the document.

_HTML is very forgiving, and will work even if you don't add this, but:_
Some browsers might surprisingly render the webpage and you will have no idea why.

### html tag

```html
<html></html>
```

The HTML`<html>` element represents the root of an HTML document. There can be only one html in a page.
All other elements must be descendants of this element.

One important attribute you want to set on the html element is "lang" to indicate
the language used on the page. Usually, the browsers can detect the language, if
you don't have content in different languages on the same page. Still, to avoid
surprises you should set the "lang" attribute.

_HTML is very forgiving, and will work even if you don't add this, but:_
Browsers will have to guess where the html tag should be and could lead to
different results in some browsers.

### head tag

```html
<head> </head>
```

The HTML `<head>` element contains machine-readable information (metadata) about the webpage.
The information in the head is not used by humans but by browsers and search engines.
There can be only one head in a page.

You can set many things in the head but what is important is:

- `<title>PAGE TITLE</title>` : the name of your webpage like the news article title, the page purpose (e.g. About, Contact), etc.
  It is displayed along with the site logo inside the browser tab that shows your site.
  This is indexed by search engines and appears in search results. You want to be very careful with titles.
- `<meta name="description" content="WHAT IS THIS PAGE ABOUT"/>` : usually the title is not enough and you need to provide a description. For example, the
  title is the name of your fancy startup, in the description you need to say what is your startup about.
  Besides the title, the description also appears in the search results so provide a helpful description.
- `<meta charset="UTF-8" />` : you should specify the character encoding of the content of your
  webpage. UTF-8 is a safe bet. If you use only ANSII characters on your website it's ok to not set it
  but to be future-proof set it to UTF-8.
- `<meta name="viewport" content="width=device-width, initial-scale=1.0" />` : the problem is that
  on the small mobile screens you can't read the content of the website and the smartphone tries all
  kind of tricks to make that better. If you want to have control and stop smartphones
  zoom like crazy, add the above metadata. You'll also need some CSS to make that better, but this
  metadata is the first step.
- `<meta http-equiv="X-UA-Compatible" content="ie=edge" />` : allows us to choose what version
  of Internet Explorer the page should be rendered with. It's a legacy meta. Hopefully, soon nobody
  will use Internet Explorer, but till then, this metadata is very useful.

_HTML is very forgiving, and will work even if you don't add this, but:_

- Search engines will not know the name of your website
- Browsers might use different content encodings, so your content can look
  strange in some.
- Mobile browsers will zoom and resize your webpage in weird ways.

### body tag

```html
<body></body>
```

The HTML `<body>` element represents the content of an HTML document. There can be only one body in a page.
All visible content goes here.

## Page landmarks

If you think about it, most of the web pages have several parts:

- header with logo or site name
- several links to navigate through main website pages
- the main content of the page
- a footer with small prints, copyright, links to related websites, and so on.
  And guess what, users expect these parts to be there. These parts are called page landmarks.

### Main content

Maybe some websites don’t have all of the above, but for sure they have
some content. To indicate what is the content we use `<main>`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    ...
  </head>
  <body>
    <main>CONTENT GOES HERE</main>
  </body>
</html>
```

If you also have a header and navigation it's a good practice to provide a "Skip to
content" link. This link can be used by screen readers to skip the navigation and
jump straight to content:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    ...
  </head>
  <body>
    <a href="#content">Skip to content</a>
    <main tabindex="-1" id="content">CONTENT GOES HERE</main>
  </body>
</html>
```

We add an "id" to `<main>` to allow it to be programmatically focused.
When someone clicks the "Skip to content" link, the `<main>` element will get the focus.
That's why we also set a "tabindex" with value `-1` to send focus to the next focusable element inside `<main>`

Also, note that a webpage must have a single `<main>` element.

### The header

It's the place where we put the website logo and the links to other pages (navigation).
Usually, the header is displayed on every page.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    ...
  </head>
  <body>
    <a href="#content">Skip to content</a>
    <header role="banner">
      <a href="/" aria-label="Home">
        <svg aria-hidden="true" focusable="false">...</svg>
      </a>
      <nav aria-label="primary">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          OTHER LINKS
        </ul>
      </nav>
    </header>
    <main tabindex="-1" id="content">CONTENT GOES HERE</main>
  </body>
</html>
```

- The header goes between "Skip to content" and `<main>`, the purpose of "Skip to content"
  is exactly to skip the header.
- The webpage `header` should have the "banner" role to make it clear for screen readers
  about its purpose. You can have other headers, those should not have banner role.
- The `<nav>` element is the website's main navigation. It's a good practice to set
  "aria-label" to "primary" or "main" to it. This way we can have multiple `<nav>`,
  but the others will have different values for "aria-label", so it will be clear the purpose of
  each one.
- For the links inside `<nav>` we use an unordered list, a `<ul>`, as we do in general
  for any collection of items.
- The logo is an SVG file, a drawing that cannot be read by screen readers.
  So we use `<svg aria-hidden="true" focusable="false">` to hide it from them.

### The footer

We use the `<footer>` element to create the website footer.
Normally, the footer contains some links and copyright texts.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    ...
  </head>
  <body>
    <a href="#content">Skip to content</a>
    <header role="banner">...</header>

    <main tabindex="-1" id="content">CONTENT GOES HERE</main>

    <footer>
      <nav>
        <ul>
          <li>
            <a
              href="https://twitter.com/my_twitter_name"
              target="_blank"
              rel="noreferrer"
              >Twitter</a
            >
          </li>
          <li>
            <a
              href="https://github.com/my_github_name"
              target="_blank"
              rel="noreferrer"
              >Github</a
            >
          </li>
        </ul>
      </nav>
      <span>&copy; 2021 All rights reserved.</span>
    </footer>
  </body>
</html>
```

### The article

If the page is a piece of writing about something like a blog post or a news piece,
a product page, a person, and so on, you should add the content inside a `<article>`.
And inside the `<article>` add an `<h1>` with the page title, the same used in `<head><title>`.

Screen readers and search engines will have a better understanding of your page.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    ...
  </head>
  <body>
    <a href="#content">Skip to content</a>
    <header role="banner">...</header>
    <main tabindex="-1" id="content">
      <article>
        <h1>PAGE TITLE</h1>
        ... REST OF CONTENT ...
      </article>
    </main>
    <footer>...</footer>
  </body>
</html>
```

If the page has multiple articles, for example, a collection of the latest news or
latest posts, you can use multiple `<article>` elements.

### Aside

Sometimes we need to provide content that is indirectly related to the main content like:

- Similar/related/popular/recommended articles
- Call-out or pitch boxes
- Sidebars
- Tables of content

In this case we use the `<aside>` element.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
  	...
  </head>
  <body>
    <a href="#content">Skip to content</a>
    <header role="banner">
      ...
    </header>
    <main tabindex="-1" id="content">
     ...
    </main>
    <aside>
      <h2>You might also like<h2>
      <ul>
        <li>
          <a href="/intersting-article">Interesting article</a>
        </li>
        <li>
          <a href="/must-read-article">Must read article</a>
        </li>
      </ul>
    </aside>
    <footer>
      ...
    </footer>
  </body>
</html>
```

You can have multiple `<aside>` elements on a page. For example, you can have an
aside to the main content and an aside to a section of the content, no problem.

## Final words on landmarks

`<main>`, `<header>`, `<footer>`, `<nav>`, `<article>` and `<aside>` have meaning,
they have a role on the page and you should use them.

But this doesn't mean you shouldn't sprinkle some `<div>` and `<spa>` here and there
to help you build the layout you need.

## Resources

- [HTML5 Sectioning Elements](https://www.w3.org/TR/2017/NOTE-wai-aria-practices-1.1-20171214/examples/landmarks/HTML5.html)
- [The practical value of semantic HTML](https://www.brucelawson.co.uk/2018/the-practical-value-of-semantic-html/)
