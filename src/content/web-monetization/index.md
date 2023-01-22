---
title: How to make some money with a simple metadata
pubDate: 2021-02-13
description: Web monetization is here (kind of)
keywords: ["Monetization"]
---

While doing some research for an upcoming post, I've noticed several people added a strange metadata on their
website. A metadata named _monetization_. Hmmm, what is this about?

Then I've remembered about _web monetization._ The idea behind it is that content creators can receive money
from people how like their content. So instead of filling their websites with annoying ads, content creators
(like bloggers for example) can get paid directly by users of their content.

There is a [W3C proposal](https://webmonetization.org/specification.html) for this - if approved, browsers will implement the JavaScript API for this -
but for now, people who want to pay need to use a browser extension. So don't expect to get rich via web
monetization. Still, it costs nothing to get your website monetized so why not?

You can find out all the details on [webmonetization.org](https://webmonetization.org/docs/getting-started) but the gist is that
all you need to do is to add a metadata on your website:

```html
<html>
  <head>
    ...
    <meta name="monetization" content="$wallet.walletprovider.com/yourid" />
    ...
  </head>
  <body>
    ...
  </body>
</html>
```

I've used [uphold.com](https://uphold.com/) as my wallet provider and my metadata looks like this:

```html
<html>
  <head>
    ...
    <meta name="monetization" content="$ilp.uphold.com/FzNEikF9pkQJ" />
    ...
  </head>
  <body>
    ...
  </body>
</html>
```

That's it. I've added that metadata and I wait for the money :)

I don't know if this will catch up or disappear in the future, but I think is a good idea.
Mozilla seems to support it, hopefully, others will do it.

## Resources

- [DEV is now Web Monetized](https://dev.to/devteam/dev-is-now-web-monetized-21db)
- [Innovating on Web Monetization: Coil and Firefox Reality](https://hacks.mozilla.org/2020/03/web-monetization-coil-and-firefox-reality/)
- [Web Monetization](https://interledger.org/rfcs/0028-web-monetization/)
- [No More Ads - The New Era of Web Monetization - Stefan Thomas (Ripple)](https://www.youtube.com/watch?v=mglJoVAGkuE)
