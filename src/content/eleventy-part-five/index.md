---
title: Let's Learn Eleventy (11ty) - How to make a JavaScript bundle
pubDate: 2021-04-25
description: In the fifth part of the Let't Learn Eleventy series, we'll learn how handle JavaScript
keywords: ["Eleventy", "11ty"]
---

"Let's Learn Eleventy" series continues with something hard to find in the official documentation or various Eleventy tutorials:
How to bundle runtime JavaScript.

Interestingly, Eleventy has **strong support** for JavaScript at **build time**: templates, plugins, filters, shortcodes, data loaders, and so on.
But all that JavaScript is used to create the website and is not present at **runtime**, is not present in the browser.

I think there are two good reasons why Eleventy doesn't provide great support for runtime JavaScript:

- Sites with a lot of JavaScript are slow and Eleventy doesn't want to encourage this.
- JavaScript code can't be used as it is. It must be transpiled and minified. For this, we usually use a tool like Webpack, Gulp, or Rollup.

So far in this series we've seen:

- [Eleventy basics](/eleventy-part-one)
- [Eleventy collections](/eleventy-part-two)
- [What are slots, includes, and shortcodes, or how to create components](/eleventy-part-three)
- [How to use images](/eleventy-part-four)

And now we'll see how to bundle runtime JavaScript.

## Passthrough

Assuming you have the JavaScript ready to be used (transpiled, minified, etc), you can tell Eleventy to copy the JavaScript files
in the build. Let's say we keep all our JavaScript files inside `src/assets/scripts`. Then we add the following in the `.eleventy.js`:

```js
module.exports = config => {
  ...
  // Copy JavaScript files
  config.addPassthroughCopy('./src/assets/scripts/');
  ...
};
```

That's it. You can use them in HTML like this:

```html
<script src="{{ '/assets/scripts/main.js' | url }}" defer></script>
```

## Inline script content

Inlining script content can be useful to limit the network calls and to load some of the JavaScript earlier.

If you put your scripts under the `_includes` folder, you can get the script content and put it inside a `script`.

For example, let's assume we have a `main.js` with the following content:

```
console.log('main.js source');
```

And we put it inside \_includes:

```
src/
  _includes/
    main.js
```

We can use main.js like this inside a ".njk" file:

```html
{% set js %} {% include "main.js" %} {% endset %}
<script>
  {
    {
      js | safe;
    }
  }
</script>
```

The content of the script will be inlined and will look like this:

```html
<script>
  console.log("main.js source");
</script>
```

### Minification

We can go further and create a filter the minimize the script content.
First, we need to install a minifier, like `terser`:

```
npm install terser
```

Then, create the filter in `./src/filters.js`:

```js
const { minify } = require("terser");

module.exports = {
  jsmin: async function (code, callback) {
    try {
      const minified = await minify(code);
      callback(null, minified.code);
    } catch (err) {
      console.error("Minify error: ", err);
      callback(null, code);
    }
  },
};
```

Add the filters to the `.eleventy.js` configuration file:

```js
const filters = require('./src/filters.js');

module.exports = config => {
  ...
  // Copy async filter
  config.addNunjucksAsyncFilter('jsmin', filters.jsmin);
  ...
};
```

The finally we can use it:

```html
{% set js %} {% include "main.js" %} {% endset %}
<script>
  {
    {
      js | jsmin | safe;
    }
  }
</script>
```

## Webpack pipeline

If all the above options are not sufficient, we can create a Webpack pipeline that will do the transpiling and minification.
Note that this option is complex and **is not documented anywhere**, but I've seen it used on some Eleventy starters.

There are several versions of this integration between [Eleventy and Webpack](https://www.codecookbook.dev/asset-bundling-eleventy-webpack-tailwind/), but the one I'm presenting here is in my opinion the nicest
and cleanest because the Webpack code is in one file only and we don't need to mess with Webpack from the command line. We only need to
start Eleventy and that will take care of Webpack too.

We need to install a bunch of packages:

```
npm install --save-dev webpack
npm install --save-dev memfs
npm install --save-dev babel-loader @babel/core @babel/plugin-transform-runtime @babel/preset-env
```

This pipeline will use Webpack and Babel to transpile our code and will keep the JavaScript files in memory while the build is running.
When the JavaScript files are used inside HTML, the files will be copied to the build folder.

This technique uses Eleventy's JavaScript template, files with `11ty.js` extension. These templates must provide a `render` method that
is used by Eleventy to get the template's content.

We need to create a `scripts.11ty.js` file that used webpack to transpile and minify our JavaScript.
See [Max Böck's Eleventastic starter](https://github.com/maxboeck/eleventastic/blob/master/src/assets/scripts/__scripts.11ty.js) and
[Mike Riethmuller's Supermaya starter](https://github.com/MadeByMike/supermaya/blob/master/site/utils/compile-webpack.js)

```js
// This file handles the JS build.
// It will run webpack with babel over all JS defined in the main entry file.

// main entry point name
const ENTRY_FILE_NAME = "main.js";

const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const { fs: mfs } = require("memfs");

const isProd = process.env.ELEVENTY_ENV === "production";

module.exports = class {
  // Configure Webpack in Here
  async data() {
    const entryPath = path.join(__dirname, `/${ENTRY_FILE_NAME}`);
    const outputPath = path.resolve(__dirname, "../../memory-fs/js/");

    // Transform .js files, run through Babel
    const rules = [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
    ];

    // pass environment down to scripts
    const envPlugin = new webpack.EnvironmentPlugin({
      ELEVENTY_ENV: process.env.ELEVENTY_ENV,
    });

    // Main Config
    const webpackConfig = {
      mode: isProd ? "production" : "development",
      entry: entryPath,
      output: { path: outputPath },
      module: { rules },
      plugins: [envPlugin],
    };

    return {
      permalink: `/assets/scripts/${ENTRY_FILE_NAME}`,
      eleventyExcludeFromCollections: true,
      webpackConfig,
    };
  }

  // Compile JS with Webpack, write the result to Memory Filesystem.
  // this brilliant idea is taken from Mike Riethmuller / Supermaya
  // @see https://github.com/MadeByMike/supermaya/blob/master/site/utils/compile-webpack.js
  compile(webpackConfig) {
    const compiler = webpack(webpackConfig);
    compiler.outputFileSystem = mfs;
    compiler.inputFileSystem = fs;
    compiler.intermediateFileSystem = mfs;

    return new Promise((resolve, reject) => {
      compiler.run((err, stats) => {
        if (err || stats.hasErrors()) {
          const errors =
            err || (stats.compilation ? stats.compilation.errors : null);

          reject(errors);
          return;
        }

        mfs.readFile(
          webpackConfig.output.path + "/" + ENTRY_FILE_NAME,
          "utf8",
          (err, data) => {
            if (err) reject(err);
            else resolve(data);
          }
        );
      });
    });
  }

  // render the JS file
  async render({ webpackConfig }) {
    try {
      const result = await this.compile(webpackConfig);
      return result;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
};
```

We don't need to understand all the details, the only thing we need to know is that this file is looking for a `main.js` file in the same folder,
so we should have a `main.js` that can import other scripts if necessary.

So for example if we have several JavaScript files, we need to import them all in main.js:

```js
import 'eleventy-plugin-share-highlight/share-highlight'
...

import './navigation'
import './lazyload'
...

```

As you can see, we import both packages like 'eleventy-plugin-share-highlight/share-highlight' and our code from 'navigation' and 'lazyload'.
Now, all we have to do is to use `main.js`(src/assets/scripts/main.js) in a template:

```html
<script
  type="text/javascript"
  src="{{ '/assets/scripts/main.js' | url }}"
></script>
```

If you need to bundle your JavaScript in several files please check [Max Böck's personal site](https://github.com/maxboeck/mxb/blob/57c0abd216ba0d93dfc5f7e6cfe74c1f9d1c69d6/src/tasks/scripts.11ty.js)
where instead of `ENTRY_FILE_NAME` he is working with `ENTRY_POINTS`.

## Resources

- [Eleventy docs](https://www.11ty.dev/docs/quicktips/inline-js/)
- [Max Böck's Eleventastic starter](https://github.com/maxboeck/eleventastic/blob/master/src/assets/scripts/__scripts.11ty.js)
- [Mike Riethmuller's Supermaya starter](https://github.com/MadeByMike/supermaya/blob/master/site/utils/compile-webpack.js)
- [Asset Bundling Workflow for Eleventy with Webpack](https://www.codecookbook.dev/asset-bundling-eleventy-webpack-tailwind/)
- [Eleventy Official Asset Pipeline Issue](https://github.com/11ty/eleventy/issues/272)
