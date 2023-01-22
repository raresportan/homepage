---
title: Migrate to Gatsby v3
pubDate: 2021-08-16
description: Notes on migrating this website from Gatsby 2 to Gatsby 3
keywords: ["Gatsby"]
---

I decided to migrate this website to [Gatsby 3](https://www.gatsbyjs.com/blog/gatsby-v3/) and write here how it went.

The first question is of course "Why you did it?" The main reason is that I was using some libraries(npm packages) that were becoming
deprecated and the only solution was the upgrade. Another was the faster local development. For some folks, the higher Lighthouse scores promised by Gatsby 3 should be
a great reason to upgrade, but in my case, the score was already at 100.

Maybe the "incremental builds" feature is why some people want to migrate. If you use some CMS and want fast feedback this is a must. (I'm using Netlify and incremental builds are supported)

The second question is "Is the upgrade complicated?" What I can say, it is not easy. Gatsby provides a [Migrating from v2 to v3](https://www.gatsbyjs.com/docs/reference/release-notes/migrating-from-v2-to-v3/)
with detailed steps for the migration and there are a lot of them. Fortunately, I could skip some of them because I didn't use some of that stuff.

Here are the things I had to change:

## Upgrade packages

Inside the project folder (where the project's package.json resides), use npm to install the latest Gatsby version:

```bash
> npm install gatsby@latest
```

Upgrading only Gatsby would be ideal but that's not the case. You need to upgrade all the others.

First, you need to find out which packages are deprecated:

```bash
> npm outdated
```

The result of that command is a table with the current and newer versions of each package you have in package.json:

```
Package                               Current   Wanted   Latest  Location
@babel/core                             7.9.0   7.15.0   7.15.0  node_modules/@babel/core
@testing-library/react                 10.0.3   10.4.9   12.0.0  node_modules/@testing-library/react
babel-preset-gatsby                     0.3.6    0.3.6   1.11.0  node_modules/babel-preset-gatsby
...
```

You can update most of them using:

```bash
> npm update
```

If, after the update, you run `npm outdated` again, and the table is not empty you need to update each one individually.

## Use the correct node version

For Gatsby 3, the minimal Node.js version is 12.13.0. This means Gatsby will not run on older versions so you need to update Node.js also to
at least v12.13.0 or you can use a tool like [nvm](https://github.com/nvm-sh/nvm) to switch between multiple versions of Node.js on the same machine.

I deploy this site to Netlify, and by default, it uses an older version of Node.js so my new Gatsby 3 build failed to run.
Following directions from[ Netlify's Manage build dependencies](https://docs.netlify.com/configure-builds/manage-dependencies/) I've created a `.node-version`
file with `14` as content. It means I want Node.js v14.

## Other major requirements

Besides Node.js 12.13.0, Gatsby 3 requires:

- webpack 5
- React 17
- GraphQL 15
- ESLint 7

Lucky me (heard some horror stories), I didn't have any webpack config, so nothing to move to v5, but you might not be so lucky.

## Plugins update

I'm using plain CSS here so I had to install `gatsby-plugin-postcss` plugin and configure it in `gatsby-config.js`:

```js
module.exports = {
  ...
  plugins: [
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        cssLoaderOptions: {
          camelCase: false,
        },
        postCssPlugins: [require(`postcss-preset-env`)({ stage: 0 })],
      },
    }
    ...
  ]
}
```

Another plugin I need to switch to was `gatsby-plugin-image` instead of the old `gatsby-image`, [more details here](https://www.gatsbyjs.com/docs/reference/release-notes/image-migration-guide/).

## Code updates

### CSS modules

CSS modules are imported as ES modules to allow a better tree shake and generate smaller files. If you have used a lot of CSS modules,
it will a bit of work to change all that.

Before we just imported all as a single object:

```js
import glitchStyles from "./glitch.module.css"

<span className={glitchStyles.container1}>
```

Now we need to be specific about what we import:

```js
import  { container1 } from "./glitch.module.css"

<span className={container1}>
```

### Images

Update the images to use the new `gatsby-plugin-image`:

Before we had:

```js
import Image from "gatsby-image"

childImageSharp {
  fixed(width: 48, height: 48) {
    ...GatsbyImageSharpFixed
  }
}
```

It now becomes:

```js
import { Image } from "gatsby-plugin-image"

childImageSharp {
  gatsbyImageData(layout: FIXED)
}
```

## Camel Case components

Don't know if this is React or Gatsby related (because I've upgraded both at the same time) but now I have to use Camel-case component names.
For example, before I've imported an `SEO` component, now I have to name it 'Seo' (which is a bit of a bummer)

```js
import Seo from "../components/seo"

...
<Seo
    title={frontmatter.title}
    description={frontmatter.description}
/>
```

## Incremental builds

As I've said, Gatsby's "incremental builds" feature can be very useful, especially if you use some CMS and want fast feedback.
Initially, this was supported only by the Gatsby Cloud, then also by Netlify, then with Gatsby v2.20.

Starting with Gatsby v3, you can create your own CI/CD pipeline that supports incremental builds. The secret is that you need to
have the `.cache` and `public` folders, both generated by Gatsby. For more details, here is an example that uses Github Actions: [Gatsby Incremental Builds and Github Actions](https://raulmelo.dev/blog/cache-gatsby-github-actions)

## Conclusion

Migrating to Gatsby v3 from v2 is not so easy.

Especially the library update part can be very tricky, usually with a
major version bump comes breaking changes so most likely you'll need to make some code changes.

And if you want to upgrade because you want "incremental builds" be ready to implement your CI/CD that does that.
