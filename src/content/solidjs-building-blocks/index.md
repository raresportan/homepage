---
title: SolidJS Building Blocks
pubDate: 2022-09-05
description: SolidJS is a library for creating web apps that looks interesting enough to have our attention
keywords: ["Code", "SolidJS"]
---

SolidJS is a library for creating web apps. Like React, Vue, Angular, and many others. So you might think:
"Oh no, not another one, we have enough of them already!" That's exactly what I said when I heard about SolidJS in the "State of JavaScript 2021".
But in the end, two things made me look at SolidJS: it claims to be the fastest and Ryan Carniato.

What is [SolidJS](https://www.solidjs.com/)?

> "A declarative, efficient, and flexible JavaScript library for building user interfaces."

It is used to render web pages and apps and to keep track of the state changes on them. It has a small size, 6.4kB(minified & gzipped when I'm writing this),
has no dependencies, and is faster than all others. (And I love fast software.) It's reactive and allows surgical changes to the DOM: update only the DOM element that needs to be updated, nothing else.

SolidJS was created by [Ryan Carniato](https://twitter.com/RyanCarniato). He worked on Solid for several years in his free time (at night) --
while his day job was to code another library, [MarkoJs](https://markojs.com/). Now he works on Solid exclusively.
Ryan knows a great deal about all the web libraries and frameworks out there. And this is not just a guess: he is discussing
the innards of SolidJS and other libraries in 3-4h of weekly live streams. I've learned so much from those streams. So of course I want to give Solid a try.

When I first saw SolidJS code I thought is React. As React, Solid uses JSX, hooks, and functional components:

```jsx
import { render } from "solid-js/web";
import { createSignal } from "solid-js";

function Counter() {
  const [count, setCount] = createSignal(0);
  const increment = () => setCount(count() + 1);

  return (
    <button type="button" onClick={increment}>
      {count()}
    </button>
  );
}

render(() => <Counter />, document.getElementById("app")!);
```

As you can see, we have functional components (Counter), hooks(createSignal), and JSX.

At first glance, SolidJS code looks very similar to React code. But there are major differences.

The first one you might have noticed is that we need to call the state as a function:

```js
const [count, setCount] = createSignal(0); // create hook
...
{count()} // get hook value
```

Another important difference is that component functions are executed only once (and not every time the state changes as in React):

```jsx
import { render } from "solid-js/web";
import { createSignal } from "solid-js";

function Counter() {
  const [count, setCount] = createSignal(0);
  const increment = () => setCount(count() + 1);

  // don't show the button if count > 5
  if (count() > 5) {
    return <div>Done</div>
  }

  return (
    <button type="button" onClick={increment}>
      {count()}
    </button>
  );
}

render(() => <Counter />, document.getElementById("app")!);
```

In this example, we try to hide the button when the count is over 5. But the button will always be displayed! Why? Because Solid executes
the Counter function only once when the count() is 0.

Solid is different for a reason: performance. To understand how it works, we need to look at the pieces that make Solid what it is.

## Solid building blocks

If we think of a dynamic UI as a function of the state, we need to handle two situations:

1. the initial rendering of the UI based on the initial state and
2. the re-rendering of the UI when the state changes.

```
ui = fn(state)
```

Initially, the entire UI must be rendered, but when the state changes multiple strategies can be used:

1. re-render all UI
2. re-render only the pieces of UI that are affected by the state change

On state change, Solid aims to re-render as little as possible. It makes surgical changes to the DOM.
How it does do that? Using a virtual DOM like most other libraries? No, Solid has no VDOM, not even a diffing algorithm,
but instead, it has a reactive system composed of several reactive primitives.

### Signals

The Signal is the lead actor in reactive programming. In other places, Signals are called "observables", "streams", or "subjects."

The signal is the thing that has the data but unlike regular values, signals are also event emitters. When the data kept in the signal is
changed, the signal emits events in the system so things that depend on the signal value can be notified.

Signals are used in Solid to manage state.

Let's look again at our Counter example, to the signal that holds a counter value:

```js
import { createSignal } from "solid-js";

//     value  set value               initial value
const [count, setCount] = createSignal(0);

// reading the value
count(); // NOTE the (), getters are functions!

// setting the value
setCount(1); // value is updated and event is emitted by the signal
```

The signal looks very much like React's useState hook: `createSignal` returns a tuple
with the value getter and setter (since JavaScript doesn't have support for tuple, an array with two items is returned):

- the first item is the value _getter_
- the second item is the value setter

The only major difference is that the getter is also a function! To get the signal's value you need to use getter as a function.
So it's more correct to make clear that the getter is a function:

```js
//    get value  set value               initial value
const [getCount, setCount] = createSignal(0);

// read the value
getCount();
```

Using primitive(actually any immutable) values(numbers, strings, booleans, undefined, etc.) in signals is straightforward.
But we can also use objects as state and in this case, the things are a bit more complicated:

```js
import { createSignal } from "solid-js";

const userData = {
  name: "Jon",
  loggedIn: false,
};

//   get value  set value             initial value
const [getUser, setUser] = createSignal(userData);

// changing userData is not picked up by the signal
userData.loggedIn = true;

// setting the same value does not emit events
setUser(userData);
```

SolidJS documentation says that by default, when calling a signal's setter, the signal only updates (and causes dependents to rerun)
if the new value is different than the old value, according to JavaScript's `===` operator.

To fix this issue, createSignal has an option, called "equals" that can be used to bypass the default object equality check.

```js
const [getValue, setValue] = createSignal(initialValue, { equals: false });
```

If we set `equals: false`, calling the setter will trigger change events no matter the value:

```js
import { createSignal } from "solid-js";

const userData = {
  name: "Jon",
  loggedIn: false,
};

//   get value  set value             initial value
const [getUser, setUser] = createSignal(userData, { equals: false });

// changing userData is still not picked up by the signal
userData.loggedIn = true;

// but setting the same value NOW emit events
setUser(userData);
```

Alternatively, for objects and arrays, SolidJS has another hook, called `createStore` (but will talk about stores some other time)

### Effects

The other main piece of reactive programming is the observer. The thing that listens to data changes, the event listener.
In SolidJS effects are observers.

When the signal emits events, the effect is the one that receives them and does something in response.
To create an effect use the createEffect "hook" and provide a function as an argument:

```js
import { createSignal, createEffect } from "solid-js";

const [getCount, setCount] = createSignal(0);

createEffect(() => {
  console.log(getCount()); // 0 1 2
});

setCount(1);
setCount(2);
```

In the above example, the effect is bound to the count signal.
The effect function is called once (initially) and then when the count changes.

Every time the setCount() is called:

- the value is changed in the signal
- signal emits event
- event is received by the effect
- the effect's function is executed

You can have multiple effects using the same signal and you can use multiple signals in an effect.

If you come from React, ` createEffect`` looks similar to  `useEffect`. But _it is not_ the same thing:

- there is no dependencies array, createEffect runs when the signals inside them emit events

```js
createEffect(() => {});
```

- you can create an effect inside another effect

```js
createEffect(() => {
  createEffect(() => {
    createEffect(() => {});
  });
});
```

- the function inside the effect has a "previous" value parameter which can be useful in some cases

```js
createEffect((prev = 0) => {
  getUser(); // read signal;

  const timesCalled = prev + 1;
  console.log("Effect called ", timesCalled);
  return timesCalled;
});
```

- besides the function, createEffect can take another argument, which is the default value of "prev"
  (used for the first run of the effect when there is no prev)

```js
createEffect((prev) => {
  getUser(); // read signal;

  const timesCalled = prev + 1;
  console.log("Effect called ", timesCalled);
  return timesCalled;
}, 0); // here is the default prev value
```

### Memos

The SignalEffect combination. Both Signal and Effect. It is used as a Signal because it has data,
but the data is computed from other Signal(s) data. It is an Effect because it updates its data when source Signal(s) data change.

So it could be called SignalEffect but it's called Memo. Or you can call it a "derivation."

```js
import { createSignal, createEffect, createMemo } from "solid-js";

// create two signals
const [getA, setA] = createSignal(0);
const [getB, setB] = createSignal(0);

// create a memo which holds the sum of A & B
const sum = createMemo(() => getA() + getB());

// create an effect to see the memo in action
createEffect(() => {
  console.log("Sum", sum()); // 0 2 5
});

setA(2);
setB(3);
```

Every time the value of A or B changes, the sum is recomputed. This means the memo is an effect
(because it listens to signal changes). And every time the sum is recomputed the memo emits an event
(which can be picked up by effects). This means the memo acts like a regular signal.

The main difference between a memo and a signal is that there is no setter for memo.

Just like `createEffect`, `createMemo` provides the previous value as an argument to its function.
Also, we can set a default value for that argument.

```js
import { createSignal, createEffect, createMemo } from "solid-js";

const [getHoursSpentInMeetingsToday, setHoursSpentInMeetingsToday] =
  createSignal(0);

// create a memo which tracks total dependencies
const total = createMemo((prev) => getHoursSpentInMeetingsToday() + prev, 0);

// create an effect to see the memo in action
createEffect(() => {
  console.log("Total hours spent in meetings", total());
});

setHoursSpentInMeetingsToday(1);
setHoursSpentInMeetingsToday(1.5);
```

And, yes, `createMemo` has a equals option just like `createSignal`.

### Resources

Solid provides another signal, called resource, that is used for async requests.

It needs as argument a function that returns a promise. It returns a data getter that wraps the value returned from the fetcher function.

```js
import { createResource } from "solid-js";

// create a fetcher function that returns a promise
async function fetchData() {}

// create the resource
const [data] = createResource(fetchData);

// read the value
data();
```

Let's see a real example, which uses an API to retrieve a joke.

```js
import { createEffect, createResource } from "solid-js";

// create a fetcher function that returns a promise
async function fetchData() {
  const response = await fetch("https://icanhazdadjoke.com/", {
    headers: { Accept: "application/json" },
  });
  return await response.json();
}

// create the resource
const [data] = createResource(fetchData);

// use an effect here because initially the data is undefined
// and is set only after the data is loaded from the API
createEffect(() => {
  console.log(data()?.joke); // undefined // Why don't sharks eat clowns? Because they taste funny.
});
```

The nice thing about the data getter is that it has some properties that can be used to track the promise state:

```js
// check if promise is not resolved
data.pending;

// check if the promise was rejected
data.error;
```

With this, we can update the previous example to handle all cases:

```js
import { createEffect, createResource } from "solid-js";

// create a fetcher function that returns a promise
async function fetchData() {
  const response = await fetch("https://icanhazdadjoke.com/", {
    headers: { Accept: "application/json" },
  });
  return await response.json();
}

// create the resource
const [data] = createResource(fetchData);

// use an effect here because initially the data is undefined
// and is set only after the data is loaded from the API
createEffect(() => {
  if (data && !data.pending) {
    if (data.error) {
      // handle error
    } else {
      // all good
      console.log(data().joke); // Why don't sharks eat clowns? Because they taste funny.
    }
  }
});
```

## Conclusion

SolidJS is an interesting library. While it uses the familiar JSX, hooks, and functional components, SolidJS comes with a different way
of thinking. I didn't use SolidJS enough yet to have an opinion about it.

Using state getters instead of values feels so obvious to me, I don't know why other libraries don't do the same, even by using a [JavaScript Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) in the back.

Now the main problem of SolidJS is that it has a small ecosystem compared to the big players. There are good chances you won't
find a SolidJS version of your favorite React npm package. Even the [SolidJS Router](https://github.com/solidjs/solid-router) was initially
a one-to-one port of React Router 6. That said, porting code from React to SolidJS is not very hard, so feel free to do it. Open source contributions are welcomed!

## Resources

- [SolidJS](https://www.solidjs.com/)
- [SolidJS Tutorial](https://www.solidjs.com/tutorial/introduction_basics)
