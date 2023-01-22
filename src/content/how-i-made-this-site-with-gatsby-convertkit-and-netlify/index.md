---
title: How I made this site with Gatsby, ConvertKit, and Netlify
pubDate: 2020-05-21
description: How to make a personal blog in 2020 using the JAMStack (JavaScript, APIs and Markdown)
keywords: ["Gastby", "ConvertKit", "Netlify"]
---

Over the years, I've started a few blogs but I never got serious about it. They were soon abandonware.
A few days ago I found Swyx's [How to Market Yourself](https://www.swyx.io/writing/marketing-yourself) and it made me think. My online presence was not much.

Around the same time, in an email [Joel from egghead](https://joelhooks.com) said:

> Your voice is important.
> Everything that needs to be said hasn’t been written down yet. You don’t need to write masterpieces, just to share solutions to problems that you have.
> We will all appreciate it.

That is when I decided to make a personal website and share with you the things I think are worth sharing.

## Gatsby

From the start I decided to implement the site in React and build it with [Gatsby](https://www.gatsbyjs.org/). This was an easy choice because I like to code with both of them and have a ton of experience with them. And of course, I wanted my site to be blazing fast 🔥.

### gatsby-blog-theme

After a quick lookup, the obvious starting point was supposed to be the [Gatsby starter blog theme](https://www.gatsbyjs.org/packages/gatsby-theme-blog/).

```shell
gatsby new homepage https://github.com/gatsbyjs/gatsby-starter-blog-theme
```

But I soon ran into a showstopper: _there was no way to change the default heading font._

Gatsby has these concepts of plugins, themes, and starters:

- **Plugins** are packages the provide certain functionality, like grabbing data from a database or transform markdown to HTML. You just add these plugins in the Gatsby configuration file and provide some options for them. In most cases you don't do anything else, they just work.

- **Themes** are partial sites with pre-configured functionality for a certain thing. A blogging theme that contains the blogging piece of a site, e-commerce theme for the e-commerce section, etc. The idea is that a theme is like just a piece of a site and _you can use multiple themes_ to create a complete site.
  (By the way, I found the name "theme" very misleading, a theme is IMHO a collection of colors, fonts, layouts, etc, a graphical thing not a "site piece". I would have suggested, simply, "preset" instead)

- **Starters** are essentially complete sites with pre-configured functionality for everything. For example a starter can include blogging functionality, portfolio section, e-commerce section, etc. You get the starter, start to customize it, and fill your content. _You can use only one starter for your site._

I wanted to use the blog theme because I wanted to add additional themes, to make a website that has a blog section but also something else, maybe a portfolio/projects section, maybe an e-commerce section (since I'm planning to make some courses). So the theme was the perfect choice.

The themes are supposed to be customizable in a certain way: you could overwrite any source file from the theme by creating a file with the same name in your project. This is called **shadowing**. Now there are two problems with this (at least today):

- You need to know the theme source code and see what files are there in order to know how to shadow them
- Is not always working for all files

For example to create my own `bio.js` component I created `components/bio.js`. To overwrite the Theme UI files, I created a folder called `gatsby-plugin-theme-ui` and created all the files from it to showdow those from the theme since I wanted my very own styles.

```
├── gatsby-config.js
├── gatsby-node.js
└── src
    ├── components
    │   ├── bio-content.js
    │   ├── bio.js
    ├── gatsby-plugin-theme-ui
    │   ├── colors.js
    │   ├── index.js
    │   ├── prism.js
    │   ├── styles.js
    │   └── typography.js
    └── templates
        └── post.js
```

The problem was that I couldn't shadow `gatsby-plugin-theme-ui/index.js` which defined the fonts for the header and monospace fonts:

```js
import merge from "deepmerge";
import typography from "./typography";
import colors from "./colors";
import styles from "./styles";
import prism from "./prism";

export default merge(typography, {
  initialColorMode: `light`,
  colors,
  fonts: {
    heading: `Montserrat, sans-serif`,
    monospace: `Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace`,
  },
  sizes: {
    container: 672,
  },
  styles,
  prism,
});
```

Initially, I wanted to open an issue on this, but the `gatsby-theme-blog` is not a separate project on Github, but part of the Gatbsy project so I moved on (for the moment, I still want to hunt this down at some point, otherwise Monserrat will be the default font on a ton of Gatsby blogs).

There were some other little annoying things with this theme, like not including the [external links plugin](gatsby-remark-external-links), and thus all the external links were opening in the same tab.

### gatsby-blog-starter

In the end, I had to use the [Gatsby starter blog](https://www.gatsbyjs.org/starters/gatsbyjs/gatsby-starter-blog/)

```shell
gatsby new gatsby-starter-blog https://github.com/gatsbyjs/gatsby-starter-blog
```

I copied over here what I liked from the `gatsby-theme-blog` and moved on. Now I was able to customize it as I wanted.

One of the things I've made differently is styling. I know there are a ton of styling options these days but I prefer plain old CSS files. I have three of them:

- styles.css for the main styles (including light & dark themes)
- prims-dark.scss for the code snippets
- newsletter.scss for the newsletter section, where I had to split the ConvertKit provide code in two: a React component and a CSS file.

That's it. React components set only class names and not inline styles. I like to keep things simple. I might move to SCSS if things get more complex, but for now plain CSS plus CSS variables are OK.

### Saved theme problem

You can change the theme and that is saved in the local storage using a React hook. The problem was that the saved theme is read by React after the hydration (site is rendered server-side with Gatsby with the default light theme). And this caused the initial rendering of the site using the light theme even if your preference was the dark one.

To fix this, I had to [override the Gatsby default html.js](https://www.gatsbyjs.org/docs/custom-html/) and read the saved theme sooner. Here is the interesting bit:

```jsx
<script
  dangerouslySetInnerHTML={{
    __html: `
        var theme;
        try {
            theme = localStorage.getItem('theme');
        } catch (err) { }

        if(!theme && 
            window.matchMedia('(prefers-color-scheme: dark)') && 
            window.matchMedia('(prefers-color-scheme: dark)').matches) 
        {                
            theme = 'dark'
        }               
        document.body.className = theme || 'light';
    `,
  }}
/>
```

As you can see something else is going on: if there is not saved theme, the theme to use matched the system one. So if you are using on your computer a dark theme, the site will be displayed by default with the dark theme. (I know, is not working in IE11, who cares?)

## Netlify

I already had a few other sites on [Netlify](https://netlify.com) so I decided to host there also this one. I simply love Netlify. It has a great free plan that is enough for me (for now at least.)

Using, Gatsby and Netlify together, the site a blazing fast indeed. It managed to get a near-perfect high score on [Page Speed Index](https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fwww.raresportan.com&tab=desktop).

One strong alternative would have been [Vercel (ex Zeit)](https://vercel.com). As far as I see they provide the same features as Netlify.

## ConvertKit

The newsletter was the final step. There are a lot of options there but I was too lazy to verify all of them and choose the best. I've heard about ConvertKit good things and I know [Nathan Barry](https://nathanbarry.com/) from his book, [Authority](https://nathanbarry.com/authority/). So all other things being equal I've gone with ConvertKit.

As soon as I started using ConvertKit with my Gmail, it complained that I should use my personal domain email.
Netlify doesn't provide email service but it allows you to [set up the Netlify DNS records to use another service.](https://community.netlify.com/t/support-guide-how-can-i-receive-emails-on-my-domain/178)

## Inspiration

Dan Abramov's site, [overreacted.io](https://overreacted.io/) was my starting point.
It is [open source](https://github.com/gaearon/overreacted.io) and is also build using [Gatsby Blog Starter](https://www.gatsbyjs.org/starters/gatsbyjs/gatsby-starter-blog/).
It was incredibly helpful to see how Dan solved some of the issues I also had, especially the flash of unstyled content and the ConvertKit form integration. Thank you, Dan! I'm thinking about making this open source also.

[iA Writer](https://ia.net/writer) is my favorite writing app on iPad and there I found the [IBM Plex sans font](https://fonts.google.com/specimen/IBM+Plex+Sans?query=IBM+).

The dark theme was a bit hard to get right and I've used [Teresa Man's](https://blog.superhuman.com/how-to-design-delightful-dark-themes-7b3da644ff1f) ideas.

## The story of the lightbulb 💡☝️

There are two themes: a light one and a dark one.
The default one is the same as your system: if you are using a dark theme on your system, this site's theme is also dark. But I wanted to allow you to change it.

I didn't want to use the default toggle button(with the sun and moon as on overreacted.io) and I also wanted to add a unique touch. And thus after a few iterations on different ideas, I chose the lightbulb.

Besides the functionality it provides, to change the theme, the lightbulb attracts the eye since it is the only fancy decoration on the page. Also since it's an SVG, I'm using it to create various site icons.

## The end

I'm just starting, there are still things to be done, but so far things look good.
My goal was to start this site with free but excellent services and I think I was successful. It's incredible what you can do these days even without a credit card. Thank you all.

You should start a site too. As Joel says:

> Your voice is important.
> Everything that needs to be said hasn’t been written down yet. You don’t need to write masterpieces, just to share solutions to problems that you have.
> We will all appreciate it.
