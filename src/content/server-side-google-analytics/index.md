---
title: Server-side Google Analytics
pubDate: 2020-06-28
description: Google Analytics javascript in blocked by many browsers and users. Here is how to use Google Analytics server-side, more exactly from a lambda function.
keywords: ["Analytics", "Server-side", "Gatsby", "Netlify", "Lambda"]
---

At Apple's WWDC this year, among the Safari improvements is a new feature that [blocks the trackers on a website](https://appleinsider.com/articles/20/06/22/safari-now-blocks-google-analytics-on-sites-new-privacy-report-feature-shows),
and Google Analytics is one of those blocked trackers. Turns out [this is not true](https://www.simoahava.com/analytics/no-safari-does-not-block-google-analytics/)
but still I decided to get rid of the Google Analytics in the browser since there are many ways to block it anyway.
Another problem with using Google Analytics in the browser is that you need to add a Cookie policy to respect some rules like the GDPR.

I still want to know if somebody visited my site. So my question was: Is there a way to do server-side analytics?
Since my website is hosted on Netlify, the easy solution would be to use [Netlify Analytics](https://www.netlify.com/products/analytics/)
but that is not cheap for me at $9/month/site. Maybe that makes sense for websites that make any revenue, but this is not my case.

My solution was to still use Google Analytics but from the server-side. More exactly by calling `www.google-analytics.com/collect`
from a lambda function.

## The lambda

This website is hosted on Netlify, so the solution is to implement a [Netlify function](https://docs.netlify.com/functions/overview/?_ga=2.219207577.1057640386.1593408076-330896924.1584543554),
but even if you are using something else, you can still follow along. The idea is to have some server-side code that can
be called from the browser.

First, we need to install `netlify-lambda`:

```bash
npm i --save-dev netlify-lambda
```

Then the Netlify configuration file, `netlify.toml` needs to be updated to indicate where the functions are built:

```yaml
[build]
  command = "npm run build" # the command you run to build this file
  functions = "built-lambda" # netlify-lambda builds to this folder AND Netlify reads functions from here
  publish = "public" # gatsby builds to this folder, Netlify should serve all these files statically
```

Finally, we need to add the scripts that start & build the functions in `package.json`.
I like to start both `gatsby` and `netlify-lambda` with a single command so I'm using the `npm-run-all` package but
this is optional.

```json
"scripts": {
    "build": "run-p build:**",
    "build:app": "GATSBY_EXPERIMENTAL_PAGE_BUILD_ON_DATA_CHANGES=true gatsby build --log-pages",
    "build:lamda": "netlify-lambda build src/lambda",
    "develop": "gatsby develop",
    "start": "run-p start:**",
    "start:app": "npm run develop",
    "start:lambda": "netlify-lambda serve src/lambda",
    ...
  }
```

All the functions must be under a specific folder, I use `src/lambda`, and that folder path must be passed to `netlify-lambda` command.

The whole purpose of the lambda makes is to make a call to `https://www.google-analytics.com/collect` with some
data. It requires your [Gatsby Analytics id](https://support.google.com/analytics/answer/1008080?hl=en#:~:text=Find%20your%20Tracking%20ID%20and,in%20to%20your%20Analytics%20account.&text=Select%20an%20account%20from%20the,the%20top%20of%20the%20page.), something like `UA-166862236-1`.
Also, we need to make sure we log only requests comming from our domain.

I use `node-fetch` to make the calls (but you can use something else):

```bash
npm i --sade-dev node-fetch
```

Here is the lambda code:

```javascript
const { default: fetch } = require("node-fetch");

exports.handler = async (event) => {
  // we accept only post
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const data = JSON.parse(event.body);

  // what is the allowed domain?
  const allowedDomain = "raresportan";
  const origin = data.origin;

  // we accept only requests from the allowed domain
  if (!origin.includes(allowedDomain)) {
    return { statusCode: 403, body: "Invalid Domain" };
  }

  const url = origin + data.pathname + data.search;

  // create a hash to be used as sessionid
  const hash = require("crypto")
    .createHash("sha256")
    .update(data.useragent + data.screensize + data.offset + data.language)
    .digest("hex");

  const endpoint = "https://www.google-analytics.com/collect";
  const payload = encodeURI(
    `v=1&t=pageview&tid=UA-166862236-1&cid=${hash}&ua=${data.useragent}&aip=1&ds=web&dl=${url}&dt=${data.title}&ul=${data.language}&dr=${data.referrer}`
  ).replace(/\//g, "%2F");

  try {
    const response = await fetch(`${endpoint}?${payload}`, {
      method: "POST",
      cache: "no-cache",
    });
    if (response.ok) {
      return { statusCode: response.status, body: response.statusText };
    }
  } catch (err) {
    return { statusCode: 500, body: "NOK" };
  }
};
```

## The client code

Before all, you need to be able to call the functions while we're developing. To do this, you add the following in
`gatsby-config.js`, assuming the functions run on port 9000 (which they do by default):

```javascript
const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = {
    ...
    plugins: [
        ...
    ],
    developMiddleware: app => {
        app.use(
            "/.netlify/functions/",
            createProxyMiddleware({
                target: "http://localhost:9000",
                pathRewrite: {
                    "/.netlify/functions/": "",
                },
            })
        )
    },
}
```

Create a JavaScript function that calls the lambda:

```javascript
function sendData() {
  const sitedata = {
    useragent: navigator.userAgent,
    title: document.title,
    origin: window.location.origin,
    pathname: window.location.pathname,
    search: window.location.search,
    referrer: document.referrer,
    language: navigator.language || navigator.userLanguage,
    offset: new Date().getTimezoneOffset(),
    screensize:
      window.screen.width * window.devicePixelRatio +
      "x" +
      window.screen.height * window.devicePixelRatio,
  };
  return fetch("/.netlify/functions/send", {
    body: JSON.stringify(sitedata),
    method: "POST",
  });
}
```

Now you need to decide when the call the function.
In my case, the page titles are changed using [React Helmet](https://github.com/nfl/react-helmet) and it took a while to figure out when to call `sendData`
because the page title was updated after `sendData` was called inside a `useEffect()` hook, so the old title was sent to the lambda.

Finally I found that there is a callback that can be registered to React Helmet that is called after it did the updates:

```jsx
<Helmet
      onChangeClientState={() => sendData()}
      htmlAttributes={{
        lang,
      }}
      title={title}
      ...
```

Remove the Google Analytics Gatsby plugin from `gatsby-config.js` if you have it and you're done.

## Conclusion

I think server-side analytics are the future because more and more people care about their privacy.

While this solution is not 100% compatible with using Google Analytics in the browser, since it doesn't use cookies
and doesn't track the user, it is a step forward in how analytics should be handled.

---

I'm building [this blog with Gatsby](/how-i-made-this-site-with-gatsby-convertkit-and-netlify/).
It is still work in progress, here are some of the things I've implemented and you might find useful:

- Generating [Twitter cards](/how-to-automate-twitter-card-images-for-your-blog/) for blog posts.
- How to handle [future posts](/how-to-handle-future-posts-in-gatsby/).
