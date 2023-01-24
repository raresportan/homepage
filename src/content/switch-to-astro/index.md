---
title: Switching from Gatsby to Astro
pubDate: 2023-01-22
description: I've switched my blog from Gatsby to Astro. It was not as easy as I dreamed. 
keywords: ["Astro"]
---
I've switched my blog from Gatsby to [Astro](https://astro.build/). It was not as easy as I dreamed. In fact, I had to wait for Astro v2 to be released to finally be able to implement all the features my Gatsby blog had. If you're thinking of doing the same switch, I hope here you'll find some helpful things.

Long story short, before v2, Astro didn't provide the frontmatter data present in the `.md` and `.mdx` files to the various plugins that had to read it. Thus, I was not able to implement some things, the most important being I could not generate Twitter cards for each post as I did before - because the twitter card for a blog post needs to render the post title.

Why I like Astro?
* Ships no JavaScript by default.
* Uses vite, so build time is fast.
* File-based routing
* Islands: I can use any framework I like where I like
* `.astro` file format feels obvious to me

Why I decided to switch from Gatsby?
* I started the blog with Gatsby v2, and now most of the plugins I've used are stuck with that version or Gatbsy v3 and are not maintained. I was constantly bombarded by messages to update them due to security issues.
* I was stuck with React. Don't get me wrong I like React but I also like to play with other things.
* Build times can be huge. Scary huge.
* They heavily promote their own Cloud which I'm not interested in.

I really liked Gatsby for a couple of years. It was fast and simple, just like Astro is now. I even contributed with a couple of bug fixes. I'll still use Gatsby for some projects, but for this blog, I'll use Astro from now on. Probably history will repeat itself and in several years Astro will turn into a big corporation and I'll have to switch again. But that is fine. Sic transit gloria mundi.


Astro requires [Node](https://nodejs.org/) v16+, so make sure you have that installed.

## How I started the Astro project
You need to decide how to start your Astro project. You have multiple choices. 

1. Start with a bare minimum project:
```
npm create astro@latest
```
From there you can add piece by piece, all the features you need.

2. Start with a template.
```
npm create astro@latest -- --template [template-name]
```
At [astro.new](https://astro.new/) you can find the "official" templates:
* basic
* blog
* docs
* portfolio
* minimal

If those are still too basic for your needs you can use [Astro themes](https://astro.build/themes/), which in my view are supercharged templates, more complete templates.

I've started with the official blog template for several reasons:
* A need a blog theme 
* A minimal project structure, without features I don't need
* I already have the CSS from the old blog, so I don't need any new CSS config, framework, or settings

After you've bootstrapped the project, you can start it using: 
```
npm run dev
```
Navigate to `localhost:3000` to see how it looks.

Before you deploy the site, you need to build it using:
```
npm run build
```
The project is built in a `dist` folder, this folder is the one you want to deploy.


## Project organization
A simple Astro project is organized similarly to this:
```
/dist
/node-modules
/public
    ├── favicon.ico
    ├── logo.svg
    └── robots.txt
/src
    ├── /components
    |   ├── BaseHead.astro
    |   ├── Footer.astro
    |   └── Header.astro
    └── /content
    |   ├── /blog-post1
    |   |   └── index.md
    |   └── /blog-post1
    |       └── index.mdx
    └── /layouts
    |   └── BlogPost.astro
    └── /pages
    |   └── index.astro
    └── /styles
       └── global.css

├── astro.config.mjs
├── packages.json
└── tsconfig.json        
```
* the `public` folder contains files that will be copied in the build, usually without any processing. In the Gatsby world, this is called "static".
* the `src` folder contains the source files: `.astro`, `.jsx`, `md`, `mdx`, or anything else that needs to be "executed". Same in Gatsby.
* the `src/pages` folder contains the site pages. It contains the "index.astro" file that will be transformed into the site's "index.html". In Gatsby, this is "index.js" or "index.ts"
* the `src/components` is where you put your components.
* the `src/content` folder contains the blog posts.  
* `astro.config.mjs` as its name implies is the Astro configuration file. In Gatsby, we have "gatsby-config.js" instead.

Gatsby has two more config files, "gatsby-browser.js" and "gatsby-node.js". As far as I tell there is no equivalent for them in Astro. You add your plugins and integrations inside `astro.config.mjs`.

### Content rant
One thing that I cannot do anymore is to keep my "content" folder outside of "src". Ideally, I would just grab my content folder (with all the blog posts and images used by them) and move to another framework. I could not find a way to do this.

Another problem is that to use images from the post folder I was forced to use Astro's `<Image/>` and `<Picture/>` and transform the post into `.mdx` from `.md`.

Astro still needs some work in this area, using plain Markdown images from the local folder should be possible.

## Astro files
You can put your code in `.jsx` for `.astro` files. If you have used Gatsby you know all about `.jsx`, you can still use it but I recommend taking a look at `.astro` files also. It can speed up the migration to Astro since they provide most of the examples in `.astro` format.

Here is a small page example:
```astro
---
import Header from "../components/Header.astro";
import Footer from "../components/Footer.astro";

const posts = await Astro.glob("../content/*/*.{md,mdx}");
---
<!DOCTYPE html>
<html lang="en">
    <head><title>All posts</title></head>
    <body>
        <Header/>
        <main>
            { posts.map((post) => (
                <article>
                    <header>{post.frontmatter.title}</header>
                </article>    
            )}   	
        </main>
    </body>
</html>    
```
The file has two parts:
1. The "logic" part: Delimited as a Markdown frontmatter, between two sets of `---`. This is the equivalent of a React functional component minus the return part. All bindings declared here are available in the other part.
2. The "render" part: The rest of the file represents the page's markup. It's the equivalent of "return" from a React functional component.

One important thing to notice is that we can use top-level await.

The other thing to notice is that the markup declaration in Astro looks very similar to `JSX`. This is a huge design decision, instead of inventing yet another HTML-like markup format they decided to use JSX which is known to all React developers. 

Finally, there are no `graphQL` queries in Astro. In this example, we use `Astro.glob()` to get the posts, which are `.md` or `.mdx` files in the project. To retrieve data from a CMS or some other source, you'll need to come up with your own library. Fear not, [Astro already has guides to connect to some](https://docs.astro.build/en/guides/cms/).

## Astro configuration
For this blog this is the configuration I use:
```js
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { remarkReadingTime } from './src/lib/remark-reading-time.mjs';
import { remarkSocialImage } from './src/lib/remark-social-image.mjs';
import image from "@astrojs/image";
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// https://astro.build/config
export default defineConfig({
  site: 'https://raresportan.com',
  markdown: {
    extendDefaultPlugins: true,
    syntaxHighlight: 'prism',
    remarkPlugins: [remarkSocialImage],
    rehypePlugins: [remarkReadingTime, rehypeSlug, rehypeAutolinkHeadings],    
  },
  integrations: [
    mdx({
      remarkPlugins: [remarkSocialImage],
      rehypePlugins: [remarkReadingTime, rehypeSlug, rehypeAutolinkHeadings],
    }), 
    sitemap(),   
    image()]
});
```
I'm using both Markdown and MDX, so I have a configuration section for each.

### Markdown configuration  
Astro has built-in support for Markdown, so no other plugin or package is needed.

However I've extended the default support with four plugins: *remarkSocialImage*, *remarkReadingTime*, *rehypeSlug* and *rehypeAutolinkHeadings*.
```js
markdown: {
    extendDefaultPlugins: true,
    syntaxHighlight: 'prism',
    remarkPlugins: [remarkSocialImage],
    rehypePlugins: [remarkReadingTime, rehypeSlug, rehypeAutolinkHeadings],    
},
```
* _remarkSocialImage_ is a custom plugin I've made that to generate Twitter cards for each blog post. It uses *puppeteer* and creates the images in `public/twitter-cards` folder. Once the image is there it will not be created again.
* _remarkReadingTime_ is again a custom plugin implemented by me to add in the post frontmatter the `minutesRead` and `excerpt`.
* _rehypeSlug_ was added only because rehypeAutolinkHeadings requires it.
* _rehypeAutolinkHeadings_ generates links for each heading.

Most of my post are about programming, so I tend to include code snippets. `syntaxHighlight` setting indicates what syntax highlighter Astro should use. It comes with built-in support for _Shiki_ and _Prism_. I've used Prism before, so I use that again.

### MDX configuration  
The issue with Markdown is that you cannot use custom components inside it. For example let's say that you want to include a chart inside a Markdown page, how do you do that? You can only include an image of that chart. 

MDX solves this issue. It allows you to use JSX inside Markdown, meaning you can write your component just as any regular component and then you can import it and use it inside Markdown.

Unlike Markdown, MDX is not buit-in Astro, if you want to use it, you need to add it as a _integration_:
```js
integrations: [
    mdx({
      remarkPlugins: [remarkSocialImage],
      rehypePlugins: [remarkReadingTime, rehypeSlug, rehypeAutolinkHeadings],
    }), 
    ...
```

Other integrations I use:
* _sitemap_ : generates a sitemap based on your routes when you build your Astro project.
* _image_ : Astro's image optimization

### RSS
Astro provides a package for [RSS](https://docs.astro.build/en/guides/rss/). For some reason this is not provided as a plugin or integration.

### How to look for missing plugins
It's very likely that the Gatsby plugins you are using are not available for Astro and for most of them there is no obvious alternative. 

Here is how you can look for alternatives:
* Look at existing integrations: [Using Integrations](https://docs.astro.build/en/guides/integrations-guide/)
* Check the CMS integrations : [Use a CMS with Astro](https://docs.astro.build/en/guides/cms/)
* You can integrate remark and rehype Markdown plugins directly: [Markdown Plugins](https://docs.astro.build/en/guides/markdown-content/#markdown-plugins)
* Build your own integration: [Astro Integration API](https://docs.astro.build/en/reference/integrations-reference/)

## SEO
For SEO I didn't used any special package, I have a `BaseHead.astro` component that is included in the `<head>` of every page. It uses frontmatter and the social image generated by _remarkSocialImage_ to set the page title, description and social metadata.

```js
import "../styles/styles.css";

export interface Props {
	title: string;
	description: string;
	image?: string;
	twitterImage?: string
}

const { title, description, twitterImage } = Astro.props;
---

<!-- Global Metadata -->
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="manifest" href="/site.webmanifest" crossorigin="anonymous">
<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
<meta name="msapplication-TileColor" content="#da532c">
<meta name="theme-color" content="#0077aa">
<meta name="generator" content={Astro.generator} />

<!-- Primary Meta Tags -->
<title>{title}</title>
<meta name="title" content={title} />
<meta name="description" content={description} />
<meta name="monetization" content="$ilp.uphold.com/FzNEikF9pkQJ" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content={Astro.url} />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={twitterImage} />

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content={Astro.url} />
<meta property="twitter:title" content={title} />
<meta property="twitter:description" content={description} />
<meta property="twitter:image" content={twitterImage} />
```
 
To help with SEO, I ship very little JavaScript. Lighthouse should show 100/100 performance.  


## Final thoughts
This is my first Astro project, there are still things that I need to learn or clarify, but so far the experience was great. Once the migration was finished, I added a few extra things very quickly.

I didn't had the chance to explore Islands and other nice features but I'm looking forward to use them in next projects.
