---
title: Using Fetch
pubDate: 2020-08-01
description: Fetch API is one of the most important feature added in the browsers in the recent years. But they have some gotchas
keywords: ["JavaScript", "fetch"]
---

For years, the default way to call [APIs](/what-is-an-application-programming-interface/) from a web page
was XMLHttpRequest. But working with XMLHttpRequest was not easy, so on top of it were build lots of popular libraries like [jQuery.ajax()](https://api.jquery.com/jquery.ajax/)
or [Axios](https://github.com/axios/axios) who wrapped the XMLHttpRequest functionality in a Promise based interface and also hiding away its complexities.

These days browsers provide a better alternative to XMLHttpRequest: `fetch()`.
Recently I migrated some code that used Axios to fetch. I was surprised by how
hard that was.

Fetch has a few gotchas that we all should know about before we start using it,
but using a native browser feature, should be preferred over a library,
even for the simple fact that you can get rid of a few 3rd party kilobytes of JavaScript.

## A simple example

```js
// the only required parameter is the URL
fetch("http://api.open-notify.org/astros.json")
  .then((response) => {
    // do something with the response
  })
  .catch((error) => {
    // do something with the error
  });
```

Fetch function returns a Promise.
A Promise can be:

- `resolved` when it is successful (in this case when the response from the server is received )
- `rejected` when it fails (in this case when the response from the server cannot be received)

Since the Promise is resolved/rejected at a later time, asynchronously, we need to register callback functions:

- `then` is called when the promise is successful
- `catch` is called when the promise fails

Or if you prefer async / await, you can use that too:

```js
try {
  const response = await fetch(url);
  // do something with the response
} catch (err) {
  // do something with the error
}
```

But any useful fetch() is a bit more complicated.
The response of a fetch() request is a stream, so depending on the type of data returned by the server, you need to get the data from the stream.

For example, if the server response is JSON, you need to call `response.json()` that returns a Promise that resolves with
the result of parsing the body text as JSON.

```js
fetch('http://api.open-notify.org/astros.json')
    .then(response => response.json() // or .text(), .blob(), .arrayBuffer(), .formData()
    .then(data => {
        // do something with data
    })
    .catch(error => {
        // do something with the error
    });
```

We can use fetch() to load all kind of data, like image files, audio or video files:

```js
fetch("/image.jpg")
  .then((response) => response.blob()) // returns promise
  .then((blob) => {
    image.src = URL.createObjectURL(blob);
  })
  .catch((error) => {
    // do something with the error
  });
```

## How to handle errors

Now here is something unexpected. Here is it, straight from [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API):

> The Promise returned from fetch() won’t reject on HTTP error status even if the response is an HTTP 404 or 500. Instead, it will resolve normally (with ok status set to false), and it will only reject on network failure or if anything prevented the request from completing.

I have no idea why it's working like this, none of the alternatives work this way, but
this happens when you fetch an URL and the server responds with a [4xx or 5xx error](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status):

```js
fetch(url)
  .then((response) => {
    // This code is executed even for 4xx-5xx errors!
    // But the response will not contain expected data!
  })
  .catch((error) => {
    // This is not called for 4xx-5xx errors!
  });
```

We need to detect these errors and handle them. The `response` has an `ok` flag that is set to false
when the server responds with an error, so we can use that flag:

```js
fetch(url)
    .then(response => {
        if(!response.ok) {
            const error = new Error(response.statusText || 'Fetch failed')
            error.response = response;
            throw error;
        }
        return response;
    })
    .then(response => response.json() // this is skipped for 4xx-5xx errors!
    .catch(error => {
        // this is now called for 4xx-5xx errors!
    });
```

We can extract error related code in a separate function so we can use it with multiple fetch calls:

```js
function checkForErrors(response) {
    if(!response.ok) { //
        const error = new Error(response.statusText || 'Fetch failed')
        error.response = response;
        throw error; // or Promise.reject(error)
    }
    return response;
}

fetch(url)
    .then(checkForErrors)
    .then(response => response.json() // this is skipped for 4xx-5xx errors!
    .catch(error => {
        // this is now called for 4xx-5xx errors!
    });
```

## Advanced usage

Besides the URL, fetch accepts an object with different options

```js
fetch(url, options)
  .then((response) => {})
  .catch((error) => {});
```

Here they are (those with \* in front are the default values)

```js
{
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json' // 'application/x-www-form-urlencoded', multipart/form-data, text/plain
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  }
```

This means the following are the same:

```js
fetch(url)
  .then((response) => {})
  .catch((error) => {});

fetch(url, {
  method: "GET",
  mode: "cors",
  cache: "default",
  credentials: "same-origin",
  headers: {
    "Content-Type": "application/json",
  },
  redirect: "follow",
  referrerPolicy: "no-referrer-when-downgrade",
  body: "",
})
  .then((response) => {})
  .catch((error) => {});
```

Let's dive into some of the options and see how we can use them.

### method option

By default fetch() will make a [GET request](https://www.restapitutorial.com/lessons/httpmethods.html).
If you want to do a POST you'll need to set the method option to POST. Usually, you'll also send some data:

```js
const data = { user: 'Jon', city: 'London'}

fetch(url,
    {
        method : 'POST'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {})
    .catch(error => {});
```

### mode option

The fetch mode can be cors, no-cors, or same-time.

```js
fetch(url, {
  mode: "cors",
})
  .then((response) => {})
  .catch((error) => {});
```

CORS headers are used by some servers to accept requests only from certain domains
(e.g. company.com doesn't accept requests from others.com)
By default, the `cors` mode is used by fetch. This means that if the server doesn't have the [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) headers set correctly,
the fetch will be canceled. These are the most frustrating errors I ever encountered.

### credentials option

To access some resources on some servers you need to authorized, e.g. to read your Gmail
you need to be logged in with your Google credentials.

You are asked to log in once, and any subsequent fetch requests made by your browsers are allowed if
your requests include the credentials.

```js
fetch(url, {
  credentials: "include",
})
  .then((response) => {})
  .catch((error) => {});
```

Usually, credentials are saved as cookies, and thus when you use credentials include, all
cookies are sent to the server. And this can sometimes create problems, as some servers accept
only a limited length of cookies.

## Timeout

Sadly fetch() doesn't provide out-of-the-box support for timeouts. This means that the fetch
request will wait forever for the server to respond.

Luckily we can implement this by wrapping the fetch in a Promise that we can resolve or reject:

```js
// create a wrapper
function fetchTimeout(url, options, timeout = 5000)
    // return the promise
    return new Promise(resolve, reject) {

        const timer = setTimeout(() => {
            reject(new Error('Request timed out'));
        }, timeout);

        const clearTimer = response => {
            clearTimout(timer);
            return response;
        }

        fetch(url, options)
            .then(clearTimer) // clear the timer
            .then(resolve)
            .catch(reject);
    }
}

// use the wrapper instead of fetch
fetchTimeout(url, {}, 10000)
    .then(response => response.json()
    .then(data => {
        // do something with data
    })
    .catch(error => {
        // do something with the error
    });
```

## Cancel

Sometimes we want to cancel a fetch().

Let's assume you are on Youtube or Netflix, you fetch a video but then you change your mind
and want to see another video. You start fetching the new one, but what happens with
the other one? You don't want to see it anymore so you want to cancel it. How you do that?

Well, you can use [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController),
a shiny new experimental technology! (FYI It's already available in all major browsers)

```js
// create a controller
const controller = new AbortController();
const { signal } = controller;

// call abort() if you want to cancel it
controller.abort();
```

Here is how you can use it with fetch, you pass the `signal` as an option:

```js
const controller = new AbortController();
const { signal } = controller;

fetch(url, {
  signal,
})
  .then((response) => {})
  .catch((error) => {
    if (error.name === "AbortError") {
      console.log("Fetch aborted");
    } else {
      // error not caused by abort
    }
  });

// Abort request
controller.abort();
```

If you pass the same `signal` to multiple fetch calls, `controller.abort()` will
cancel all requests with that signal.

If you call .abort() after the fetch has completed, nothing happens, abort is ignored.

It took a long time for the Abort API to be accepted:

> The key disagreement is one group wanted the abort method to exist on the object returned by fetch(), whereas the other wanted a separation between getting the response and affecting the response. -- [Jake Archibald](https://developers.google.com/web/updates/2017/09/abortable-fetch#the_history)

I would prefer the object returned by fetch() to have the abort method.
Since is best to keep the abort details hidden we would need to create a wrapper like this:

```js
function abortableFetch(request, opts) {
  const controller = new AbortController();
  const signal = controller.signal;

  return {
    abort: () => controller.abort(),
    ready: fetch(request, { ...opts, signal }),
  };
}
```

Because the above solution breaks the interface of the object returned by fetch(), we could
add the abort() on that object (e.g. as proposed by the group that lost)

```js
function abortableFetch(url, options) {
    const controller = new AbortController();
    const signal = controller.signal;

    // return the promise
    const promise = new Promise(resolve, reject) {
        fetch(url, {...options, signal)
            .then(resolve)
            .catch(reject);
    }
    promise.abort = () => controller.abort();

    return promise;
}
```

This allows us to combine the timeout and cancel functionality in a single wrapper:

```js

/**
 * Fetch that can timeout and is cancellable
 */
function enhancedFetch(url, options, timeout = 5000) {
    const controller = new AbortController();
    const signal = controller.signal;

    const timer = setTimeout(() => {
        reject(new Error('Request timed out'));
    }, timeout);

    const clearTimer = response => {
        clearTimout(timer);
        return response;
    }

    // return the promise
    const promise = new Promise(resolve, reject) {
        fetch(url, {...options, signal)
            .then(clearTimer) // clear the timer
            .then(resolve)
            .catch(reject);
    }
    promise.abort = () => controller.abort();

    return promise;
}

```

## Progress

We can track the download progress (but not upload progress) using
`response.body`, that is a [ReadableStream](https://streams.spec.whatwg.org/#rs-class),
a source of data, from which we can read data as it becomes available.

Unlike `response.json()` and other methods, `response.body` gives full control over
the reading process, and we can see how much data is received at any moment.

```js
const progressIndicator = (length, total) => {...}

fetch('https://reqres.in/api/users/1')
    .then(response => {
        // get reader from response body
        const reader = response.body.getReader();
        // get total length
        const contentLength = +response.headers.get('Content-Length');
        let receivedLength = 0;
        let chunks = [];

        while(true) {
            const { done, value } = await reader.read();

            if (done) {
                break;
            }

            chunks.push(value);
            receivedLength += value.length;
            console.log(`Received ${receivedLength} of ${contentLength}`);
            // here you can call a function with the current length
            progressIndicator(receivedLength, contentLength)
        }

        // when all data is available it's time to parse it
        let contentArray = new Uint8Array(receivedLength);
        let position = 0;
        for(let chunk of chunks) {
            contentArray.set(chunk, position);
            position += chunk.length;
        }
        // decode content array into a string
        const result = new TextDecoder("utf-8").decode(contentArray);
        // finally get data
        const data = JSON.parse(result);
    })
    .catch(error => {});
```

## Polyfill

All major browsers support fetch these days, but if you want support for IE11 or
some other old browser, you'll need to use a polyfill (like [https://github.com/github/fetch](https://github.com/github/fetch))

## Resouces

- https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
- https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
- https://developer.mozilla.org/en-US/docs/Web/API/AbortController
- https://github.github.io/fetch/#response-body
- https://davidwalsh.name/fetch-timeout
- https://davidwalsh.name/fetch
- https://fetch.spec.whatwg.org/
- https://developers.google.com/web/updates/2017/09/abortable-fetch
- https://javascript.info/fetch-progress
