---
title: Make me a Promise
pubDate: 2020-08-10
description:
keywords: ["JavaScript"]
---

Let's start with a short story.

A girl asks his father: _Daddy are there people in space right now?_
The father doesn't know but he _promises_ he'll find out.

At that point, the girl decides if there are people in space, she'll write their names in the journal. If there aren't she won't. Also, if father is unable to find this out, she'll ask mom.

_Later, after some time_, father comes back and he does one of the following:

1. He tells the girl the names of the people in space.
   _The promise was fulfilled_, father kept his promise, and the girl is writing the names in the journal.

2. He tells the girl there are no people in space.
   _The promise was fulfilled_, again father kept his promise, but the girl is not writing anything in the journal.

3. He tells the girl that he couldn't find out.
   _There was a problem, the promise was not fulfilled_, father was not able to find out who's in space, so the girl will ask mom.

Here is how the story is implemented in code:

```js
function daddyMakesPromise() {
  // makes a promise
  return new Promise((resolve, reject) => {
    // Daddy looks on the internet for the answer, this takes time
    daddyLooksOnTheInternetForAnswer("")
      .then((data) => {
        // The promise is fulfilled
        if (data) {
          resolve("There are NO people in space right now!");
        } else {
          resolve("Yes, these people are in space: ", data);
        }
      })
      .catch((error) => {
        // Internet not working, father can't keep his promise
        // There was a problem, the promise was not fulfilled
        reject("Sorry honey, I don't know if there are people in space");
      });
  });
}

// One day daddy makes a promise
const promiseForGirl = daddyMakesPromise();

// Promise is pending!
promiseForGirl
  .then((response) => {
    // Later, when daddy fullfils the promise
    if (response !== "There are NO people in space right now!") {
      // write the names in the journal
    }
  })
  .catch((error) => {
    // Later, when daddy can't fulfil the promise:
    // Ask mom
  });
```

## Why we need Promises?

Promises are supposed to help to make the code more clear, specifically to solve the
_callback hell_ problem.

Before Promises, we had to write code like this:

```js
function a(callback) {
    // do a XMLHttpRequest call
    const result = ...;
    // when done call the callback
    callback(result);
}

function b(data, callback) {
        // do a XMLHttpRequest call
    const result = use(resultsFromA);
    // when done call the callback
    callback(result);
}

// This is the callback hell (simplified here)
// Error handling is hard, you need to make sure all callbacks accept errors
a(function(resultsFromA){
    b(resultsFromA, function(resultsFromB){
        c(resultsFromB, function(resultsFromC){
            d(resultsFromC, function(resultsFromD){
                ...
             })
        })
    })
})
```

If we use promise, the code is much clearer because from a .then() we can return a new Promise:

```js
function a() {
    return Promise((resolve, reject) => {
        ...
    })
}

function b(data) {
    return Promise((resolve, reject) => {
        ...
    })
}


// This is much nicer
a()
 .then(resultFromA => b(resultFromA))
 .then(resultFromB => c(resultFromB))
 .then(resultFromC => d(resultFromC))
 .catch(error => {
     // promises handle errors by default
     // if any promise is rejected, the rest of the promises are ignored
 })
```

### Resolve and reject

When it's created a Promise is in _pending_ state.
In the end, it should be fulfilled/resolved or rejected.

How to implement code that makes a promise:

```js
return Promise((resolve, reject) => {
  // to indicate that the promise was fulfilled call resolve with data
  resolve(data);

  // to indicated that the promise was rejected, call reject with an error
  reject(error);

  // if resolve/reject are never called, the promise will always be pending
});
```

### then, catch, finally

How to implement code that receives a promise:

```js
promise
    .then(result => /* called when resolve() was called inside the Promise */ )
    .catch(error => /* called when reject() was called inside the Promise */ )
    .finally( _ => /* called when either resolve/reject was called inside the Promise */)
```

Note that in some browsers, finally is not available on Promises.

### Working with several promises in the same time

Sometimes we can work with several promises in the same, for example, we can make
several fetch calls to get some data.

We can use `Promise.all()` to resolve promises in parallel.

```js
Promise.all([promiseA, promiseB, promiseC])
  .then((results) => {
    // this code is executed after all the promises are fulfilled
    // results is an array with individual results of each promise
  })
  .catch((error) => {
    // this code is executed if at least one promise is rejected
    // if one is reject, the rest are ignored
  });
```

We can use `Promise.race()` to resolve promises in parallel, but instead of waiting
for all to finish, it fulfills/rejects when the first promise is fulfilled or rejected.

```js
Promise.race([promiseA, promiseB, promiseC])
  .then((result) => {
    // this code is executed after ONE the promises is fulfilled
  })
  .catch((error) => {
    // this code is executed if at least one promise is rejected
    // if one is reject, the rest are ignored
  });
```

Finally, we have `Promise.allSettled()` to work with promises in parallel.
This one waits for all promises to be `settled`, either resolved or rejected.

```js
Promise.allSettled([
    promiseA,
    promiseB,
    promiseC
])
.then(results => {
    // this code is executed after all the promises are settled

    // some of them might be resolved, some might be rejected
    results.forEach((result) => console.log(result.status)));
})

```

All these work by fulfilling the promises in parallel. There is no Promise method
to call them one after the other but as shown before we can do that manually:

```js
Promise.resolve()
 .then(_ => promiseA)
 .then(_ => promiseB)
 .then(_ => promiseC)
 .then(_ => promiseD)
 .catch(error => {

```
