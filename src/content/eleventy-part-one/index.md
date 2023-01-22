---
title: Let's Learn Eleventy (11ty) -  What is Eleventy
pubDate: 2020-08-26
description: This is the first part of the Let't Learn Eleventy series. We'll learn what is Eleventy and how to get started with it.
keywords: ["Eleventy", "11ty"]
---

[Eleventy](https://www.11ty.dev/) is a static site generator like [Jekyll](https://jekyllrb.com/), [Hugo](https://gohugo.io/)
,or [Gatsby](https://www.gatsbyjs.org/). Like Gatsby, Eleventy is a node.js application. But unlike Gatsby,
it isn't a React framework, so the generated website doesn't need to include JavaScript at all, and thus is
more performant out of the box.

A static site generator is a tool that creates web pages out of templates and pieces of content.
The main advantage over a manually created website is that you don't have to reimplement the same thing in
all pages, you just do it once in a template and it's included in all pages.

Equally important, the content is created outside of the HTML, maybe in a [CMS](https://en.wikipedia.org/wiki/Content_management_system).
so the people maintaining the content don't have to be programmers.

## Install node.js

First, you need to have node.js and npm installed on your machine.

```bash
$ node -v
v11.15.0
$ npm -v
6.7.0
```

Eleventy requires node.js version 8 or newer. If you don't have it, head on to [node.js](https://nodejs.org/) to get it.

## Install Eleventy

Create a project folder on disk somewhere, and move inside it:

```bash
$ mkdir eleventy-project
$ cd eleventy-project
```

Inside your project folder, initialize a new npm project:

```bash
eleventy-project$ npm init -y
```

Now it's time to install Eleventy:

```bash
eleventy-project$ npm install --save-dev @11ty/eleventy
```

Verify that the installation is successful:

```bash
eleventy-project$ npx @11ty/eleventy
Wrote 0 files in 0.03 seconds (v0.11.0)
```

If the above command gives errors, one of the reasons might be that you have some
files in the project that should be ignored by Eleventy. To do this you need to
create a `.eleventyignore` and put inside the folders or files that should be ignored.
If you already have a `.gitignore` that will work too, Eleventy automatically ignores
those also.

## Eleventy basics

In your project folder create an `index.html` file with the following content:

```html
---
title: 11ty website
description: Created using 11ty
---

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>{{ title }}</title>
    <meta name="description" content="{{ description }}" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body>
    <h1>{{ title }}</h1>
  </body>
</html>
```

Besides the regular HTML tags, we did add some unusual things:

- Front matter. The section between `---` is called front matter and it's a place where we can define
  some data to be used on the page. We defined a `title` and a `description` inside it.
- Used the front matter data. We used the data by enclosing it inside double curly braces like `{{ title }}`
  We can use this because by default Eleventy allows [liquid](https://shopify.github.io/liquid/basics/introduction/)
  templating syntax.

We can build the site using:

```bash
eleventy-project$ npx @11ty/eleventy
Wrote 1 file in 0.11 seconds (v0.11.0)
```

You'll notice that there is a new folder in the project, called `_site`. This is the folder
that contains our generated website. For now, it contains only one file: `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>11ty website</title>
    <meta name="description" content="Created using 11ty" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body>
    <h1>11ty website</h1>
  </body>
</html>
```

As you can see the `{{ title }}` and `{{ description }}` placeholders were replaced with the values defined
in the front matter.

To see the website running, use the following command:

```bash
eleventy-project$ npx @11ty/eleventy --serve
Wrote 1 file in 0.11 seconds (v0.11.0)
[Browsersync] Access URLs:
 --------------------------------------
       Local: http://localhost:8080
    External: http://192.123.123.123:8080
 --------------------------------------
          UI: http://localhost:3001
 UI External: http://localhost:3001
 --------------------------------------
[Browsersync] Serving files from: _site
```

Open `http://localhost:8080` in the browser.

## Eleventy configuration basics

Let's add a `styles.css` file next to `index.html`:

```css
h1 {
  color: #444;
  background-color: #ffd490;
}
```

And use it inside the index.html:

```html
---
title: 11ty website
description: Created using 11ty
---

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>{{ title }}</title>
    <meta name="description" content="{{ description }}" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="/styles.css" />
  </head>
  <body>
    <h1>{{ title }}</h1>
  </body>
</html>
```

If you run Eleventy now, the `_site` folder still contains only the `index.html`, the CSS file is ignored.
We can fix this in several ways. One is to specify `css` in the formats flag:

```bash
eleventy-project$ npx @11ty/eleventy --formats=html,css
Writing _site/index.html from ./index.html.
Copied 1 file / Wrote 1 file in 0.08 seconds (v0.11.0
```

Another way to solve this is to create an Eleventy configuration file and setup CSS handling there.
So let's create a new file called `.eleventy.js`. Notice the `.` at the beginning.

```js
module.exports = function (eleventyConfig) {
  // copy css passthough
  eleventyConfig.addPassthroughCopy("styles.css");
};
```

The above configuration will tell Eleventy to just copy `styles.css` in the `_site` folder.
Now we can use the usual build command again.

```bash
eleventy-project$ npx @11ty/eleventy
Writing _site/index.html from ./index.html.
Copied 1 file / Wrote 1 file in 0.08 seconds (v0.11.0
```

## Templates

As I've mentioned, the power of a static site generator is using templates.

Let's create a new folder called `_includes` and a `base.njk` file inside it.
Our project structure should look like this:

```
📁eleventy-project/
    📁_includes/
        base.njk
    📁_site
    📁node_modules
    .eleventy.js
    index.html
    package.json
    package-lock.json
    styles.css
```

Base.njk is a file that uses the [nunjacks templating language.](https://mozilla.github.io/nunjucks/),
hence the `.njk` extension.

This file will be the main template for all our pages, and has the following content:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>{{ title }}</title>
    <meta name="description" content="{{ description }}" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="/styles.css" />
  </head>
  <body>
    <header>
      <a href="/">Hey, I'm Joe Doe</a>
      <nav>
        <ul>
          <li>
            <a href="/about/">About</a>
          </li>
          <li>
            <a href="/work/">Work</a>
          </li>
        </ul>
      </nav>
    </header>
    {{ content | safe }}
    <footer>&copy; 2020 Jon Doe</footer>
  </body>
</html>
```

We set up the basic HTML for all the pages:

- head with metadata
- body with a header and a footer displayed on all pages
- a spot where the pages will insert their own content, with `{{ content }}`, a special
  variable
- the footer

What might be a bit strange here is that the template uses `{{ title }}` and `{{ description }}`
but these are not defined in the front matter, so the question is how base.njk has them?
Well, it turns out that if a page that uses this template defines title and description,
the layout has access to them.

We specified the spot where a page will insert its content using `{{ content | safe }}`.
`{{ content }}` is the page-specific content, and `| safe` is a filter.

Eleventy supports by default the njk templates, but just to be sure, we can specify that in
the configuration, along with other types of content we use:

```js
module.exports = function (eleventyConfig) {
  // copy css passthough
  eleventyConfig.addPassthroughCopy("styles.css");

  return {
    markdownTemplateEngine: "njk",
    templateFormats: ["html", "njk", "md"],
  };
};
```

Now that we have the template, let's modify index.html to use it:

```html
---
layout: base.njk
title: 11ty website
description: Created using 11ty
---

<h1>{{ title }}</h1>
```

We make index.html use the base.njk layout by setting the `layout` front matter.
Also notice that we still declare the `title` and `description` here, because the
values are specific to this particular page and because we use the base.njk layout,
the values are available to base.njk.

We can create two new pages, About and Work, let's use Markdown for them:

about.md

```html
---
layout: base.njk
title: About
description: About me
---

# {{ title }} I'm a developer and designer living in New York. I love Eleventy,
I do all my websites using it.
```

work.md

```html
---
layout: base.njk
title: Work
description: My work
---

# {{ title }} I've worked with many happy clients like * Levi's * Nike * etc.
```

If you didn't already, start the server and go to http://localhost:8080:

```bash
eleventy-project$ npx @11ty/eleventy --serve
```

## Recap

- What is Eleventy and how to install it
- How to use data inside a page
- Basic configuration
- Using the same template in multiple pages
