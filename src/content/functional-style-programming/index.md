---
title: Functional Style Programming
pubDate: 2020-08-17
description: What is functional style programming and why it's useful
keywords: ["Functional programming", "Functional style", "JavaScript"]
---

The vast majority of us, programmers, use an OOP language like Java, C++, or C#. Very few are using a functional programming language like Haskell, Elixir, or Clojure.

And then we use some languages that support both paradigms, OOP and Functional, like JavaScript, Python, or Ruby.

But for some reason, we tend to use them in an OOP way and seldom in a Functional way.
I think that is a mistake, there are some great ideas in both paradigms, and we should
use the best of both worlds.

There is real value in following e functional style of programming, even when we
use OOP language, everything we know, all our hard-won knowledge.

The good news is that, no matter what language you work in, programming in a functional
style provides benefits. You should do it whenever it is convenient, and you should
think hard about the decision when it isn’t convenient.

Let's see what a functional style programming means.

## Pure Functions

One of the core ideas of functional programming is the concept of `pure function`.
A pure function is a function that, given the same input, will always return the same output and
does not have any observable side effect.

- It has no side effects: nothing outside the function is affected in any way.
- It doesn't use global state.

```js
// impure because it uses global variable
const increase = () => {
  window._count = window._count || 0;
  window._count++;
  return window._count;
};

// pure
const increase = (state = 0) => state + 1;
window._count = increase(window._count);
```

- It doesn’t uses outside state or functions that use outside state.

```js
// impure because it uses external variable
let counter = 1;
const addImpure = (n) => (counter += n);
// pure
const add = (n, counter) => counter + n;
```

- It doesn’t maintain internal state.

```js
// impure because it uses maintains state
class Counter() {
  constructor(initial = 0){
    this.value = initial;
  }

  increase(){
    this.value = this.value + 1;
    return this.value;
  }
}
```

- It doesn't perform any IO.

- It doesn't mutate any of the input parameters.

```js
// impure because it uses mutates arguments
function tomorrow(date) {
  date.setDate(date.getDate() + 1);
  return date;
}

// pure
function tomorrow(date) {
  const d = new Date(date.getTime());
  d.setDate(d.getDate() + 1);
  return d;
}
```

Pure functions have a lot of nice properties:

- Thread safety: A pure function is thread-safe because it does not affect on its arguments and exterior.
- Reusability: It is much easier to move a pure function to a new environment again because it has no side effects.
  You can be sure you don't create nasty surprises.
- Easy to test: A pure will always give the same result for the same parameters no matter when it is called, and how many times it is called.
  When you find a complicated piece of code now, it's so useful to extract the most complicated bits in separate pure functions
  and write tests for those functions. So often you'll find something wrong.
- Maintainability: Everything is there in your face, no need to do `code surfing`. Pure functions are the easiest to understand and debug.

Pure functions are not used by many people. Most of them don't even know about them.
Of course, not everything can be pure. Any program needs to interact with the outside world. 
Side effects like saving and loading files, network calls, etc. are necessary.

It doesn’t even have to be all-or-nothing also. An almost-pure function is almost as useful as
a completely-pure one, but the difference from an almost pure function to a spaghetti abomination is immense. 
Moving a function towards purity improves the code, even if it doesn’t reach full purity.

## Immutability

In functional programming, data is immutable (or at least is treated so.) New data is created
using existing data instead of _mutating_ existing data.

As we saw, pure functions don’t mutate arguments and always return an output. They always
create new things and treat everything as immutable even if they are not.

There are some big advantages to this style of programming: No code can mutate data by mistake.
An entire class of bugs is gone.

```js
// objects are mutable, but we treat them as immutable
const state = {
  loggedin: false,
};

// instead of mutating the original object we create a new object
const newState = {
  ...state,
  loggedin: true,
  user: "johnny",
};

const login = (state = {}, user) => {
  return {
    ...state,
    loggedin: true,
    user,
  };
};

const stateAfterLogin = login(state, "johnny");
console.log("Original state", state);
console.log("State after login", stateAfterLogin);

//  Arrays are mutable but they can used in a immutable way
const numbers = [1, 2, 3];
// instead of mutating original array we create a new array
const newNumbers = [...numbers, 4];
// built-in filter creates a new array
const filteredNumbers = numbers.filter((n) => n > 2);

const addNumber = (numbers, newNumber) => [...numbers, newNumber];

const removeNumber = (numbers, numberToRemove) =>
  numbers && numbers.filter((n) => n !== numberToRemove);
```

Of course, no concurency issues and another advandage is that you can detect changes
by comparing references instead of comparing property with property.

```js
const oldState = {
  loggedin: false,
};

const newState = {
  loggedin: true,
  user: "Joe",
  level: 10,
  id: "jnjnr32r3432mmvv",
  address: {
    city: "London",
  },
};

// instead of
if (
  oldState.loggedin !== newState.loggedin ||
  oldState.user !== newState.user ||
  oldState.level !== newState.level ||
  oldState.id !== newState.id ||
  oldState.address !== newState.address ||
  (oldState.address &&
    newState.address &&
    oldState.address.city !== newState.address.city)
) {
  // do something
}

// you can do this
if (oldState !== newState.id) {
  // do something
}
```

But creating new things instead of mutating existing ones has some performance penalties.

Programming with pure functions involves more copying of data, and in some cases,
this is not the best way to do it. Copying huge objects or huge lists of objects is not a good idea.

## Composition

Another core idea of functional style programming is the composition of functions to create higher-level functions,
that implement business logic.

This can be done only if functions are first-class in your language, that is if they can be sent as arguments to
other functions and can be returned from other functions.

```js
const replaceWithSpace = (s) => s.replace(/\s{2,}/gi, " ");
const split = (s) => s.split(" ");
const toLower = (x) => x.toLowerCase();

// a bunch of small functions are used to create bigger functions
const dasherize = compose(
  replaceWithSpace,
  split,
  (words) => words.map(toLower),
  (words) => words.join("-")
);
```

One of the issues of the composition is that we can use only functions that accept only one argument because the output
of one function becomes the argument to the next.

For this, we need to break the functions with many arguments into a series of functions
that each take one argument and ultimately produce the same result as the original function.

```js
// original
const add = (x, y) => x + y;
add(1, 2);

// using currying and arrow functions
add = (x) => (y) => x + y;
add(1)(2);
```

## Functional core, imperative shell

My strong belief is that every codebase must have a functional part. Ideally,
every piece of code should have a functional core and an imperative shell:
Functional core handles state mutations by implementing the complex and hairy logic that updates the state.
Leveraging the power and simplicity of the pure functions and immutable data,
this code is easily testable and easily made rock solid.

The Imperative shell, around the Functional core, handles the binding with the
rest of the world, it uses the data to perform side effects in the world: saving
or loading data from file system or network, rendering on the screen,
logging and any other operation with performance implications.

```js
// Pure
const repeat = (howManyTimes) => (str) => str.repeat(howManyTimes);
const repeat3 = repeat(3);
const emojis = repeat3("\uD83D\uDE02");
const textWithEmoji = (emoji) => (joke) => joke + emoji;
const textWithTearsOfJoy = textWithEmoji(emojis);
const joke = (json) => json.joke;

const formatJoke = (data) => {
  const jokeText = joke(data);
  return textWithTearsOfJoy(jokeText);
};

// Impure
const getJSON = (url) =>
  fetch(url, { headers: { Accept: "application/json" } });

// App has a functional core (formatJoke)
// inside an imperative shell (all other)
const app = (url) => {
  getJSON(url)
    .then((result) => result.json())
    .then((json) => formatJoke(json))
    .then((x) => console.log(`%c${x}`, "font-size: x-large"));
};
app("https://icanhazdadjoke.com/");
```
