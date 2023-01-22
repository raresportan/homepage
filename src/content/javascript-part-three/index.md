---
title: Let's Learn JavaScript - Fundamentals
pubDate: 2021-11-14
description: One of the most used programming languages of the world, the world's most misunderstood programming language.
keywords: ["JavaScript"]
---

This is the third part of the "Let's Learn JavaScript" tutorial.
[In the first part](/javascript-part-one), we learned how JavaScript compares to other programming languages and the mindset you need to learn JavaScript.
And [in the second part](/javascript-part-two), we have seen we can run "Hello, World!" in JavaScript.

Now we continue with some fundamentals features of JavaScript.

## use strict

JavaScript was implemented in 10 days (unlike most programming languages that were implemented in several years). As you can guess, mistakes
were made. These mistakes are hard to fix because new versions of JavaScript are not allowed to break code written in older versions.

A compromise was reached when ECMAScript 5 (JavaScript v5) was introduced. JavaScript could enter a _strict mode_ if the
JavaScript source starts with `'use strict';`.

Strict mode:

- Eliminates some silent errors by changing them to errors.
- Fixes mistakes that make it difficult for JavaScript engines to
  perform optimizations: strict mode code can sometimes run faster
  than identical code that's not strict mode.
- Prohibits some syntax likely to be defined in the future.

To use the strict mode, we need to add the following as the first line in the code.

```js
"use strict";
```

> WARNING: All the code presented here runs in strict mode. Some parts will work differently if you run them in non-strict mode!

## Comments

Comments are parts of the code that are ignored by the JavaScript interpreter. A program works the same if the comments are removed.
We write comments for our future selves and our teammates. We add comments for parts of code that are complicated and are complicated for a good reason.

```js
"use strict";

/*
    Multi
    line
    comment
*/

// Single line comment
```

Add comments for complicated code, you will thank yourself later when you have to fix a bug in that code, and you forgot what that piece of code is supposed to do or why it is doing that, or how it is doing that.

## Logging

In JavaScript, we print out things using the `console` methods.

To see the console output in the browser, open the Developer Tools to the right and switch to the "Console" tab.
While following these lessons, you should keep the Developer Tools Console open. See the [previous part of this tutorial](/javascript-part-two) to learn how to open the console.

If you are using a nice browser like Chrome or Firefox, the console output is displayed on the right side of the editor so you don't have to open
the Developer Tools Console.

> Ironically console is not part of the JavaScript specification but is available on all modern browsers and Node.js

```js
"use strict";

// clears the console
console.clear();

// a simple log
console.log("Welcome to the machine");

// a warning
console.warn("JavaScript ain't easy");

// an error
console.error("Task failed successfully");
```

There are many more [console methods](https://developer.mozilla.org/en-US/docs/Web/API/console), but these are the most used.

When console methods are not enough for debugging, you can use the `debugger` statement. The interpreter will stop at that line of code:

```js
console.log("Before debugger");

debugger;

console.log("After debugger");
```

When this code runs, you'll see only "Before debugger" in the console and the browser's debugging controls will be displayed.

## Values

> "When the creators built the machine, they put in the processor and the memory. From these arise the two aspects of the program. The aspect of the processor is the active substance. It is called Control. The aspect of the memory is the passive substance. It is called Data." -- Master Yuan-Ma, The Book of Programming

The purpose of any program is to transform data. So any program needs data.
Data can have different roles or meanings, it can be of different types. A value is a piece of data of a specific type.

_Values are things that are. Types are things that could be._

Here are some examples:

| Type      | Example Value |
| --------- | ------------- |
| number    | 1             |
| string    | "ABC"         |
| boolean   | true          |
| undefined | undefined     |
| object    | new Date()    |

Let's see how you can make values:

```js
"use strict";

// Need a number? Just type it and it will be summoned
7;

// Want to do arithmetic? The result will be another number.
// Here is how to add 7 with 3
7 + 3;
// Or how to multiply 5 with 5
5 * 5;

console.log(7 + 3);
console.log(5 * 5);

// Need to compare some numbers? The result will be a boolean, true or false
7 >= 3;
5 < 5;

console.log(7 >= 3);
console.log(5 < 5);

// Need a string? You can create it in different ways, using " ", ' ' or ` `:
("Below the surface of the machine, the program moves.");
("Without effort, it expands and contracts");
`In great harmony, electrons scatter and
regroup. The forms on the monitor are but ripples on the water. The
essence stays invisibly below.
 -- Master Yuan-Ma, The Book of Programming`;
```

To _summon_ a value, you just have to type it.

## Bindings

Having values is not enough. We need to give them a meaning, we need to name them. For example, a `7` can have different meanings,
depending on how we use it in a piece of code, like the day of the week, the maximum of a series of numbers, the sum, the position in a list, and so on.

```js
// what is this 7?
7;
```

Another problem we have with values is that we can't use a previous value because we have no way of grasping it.

```js
// sum
7 + 3;

// how to add 1 to sum ??
```

To solve all these issues we can create _bindings_. A binding is the result of binding a name to a value.
You can bind a value to a name using `const` or `let`.

```js
const language = "JavaScript";

let sum = 7 + 3;
```

After that, you can use the binding name to get the bound value.

```js
const language = "JavaScript";
console.log(language); // JavaScript

let sum = 7 + 3;
sum = sum + 1; // use sum to add 1
```

You can assign a value to a binding using `=`. The same value can be bound to several names.

> NOTE: Bindings are also called variables. But calling a constant a variable is kind of confusing. So here we stick with bindings.

Think of a binding not as a box containing a value, but as a _tentacle_ that grasps a value.
The same value can be bound to several names, meaning the same value can be grasped by several tentacles not that there are several boxes with the same value.

> NOTE: There is another, old way of binding a value, using "var" but nobody uses it anymore since it can cause some strange and unexpected behavior. Please use instead "const"
> by default, and "let" only if you need to change the binding.

Let's see how we create some bindings:

```js
// Previously we had to repeat the 7 + 3 operation when we printed the result,
// by binding the result of 7 + 3 to 'sum', we can print it using the binding
const sum = 7 + 3;
console.log(sum);

// Bindings that never change are declared with "const"
const person = "Dr. Cham";

// Tip: If you attempt to change a const you will get an error

// Bindings that change are declared with "let"
let whatHeDid = "He did dynamite a retirement home";
// Let's change it
whatHeDid = "He did dynamite a retirement home full of grannies";

// You can bind several values in a single line
let born = 1894,
  missing = 1941;

// Also you can just declare a "let" binding, without providing a value
let died;
// You need to provide a value to "const" or you'll get an error:
// const wentMad;

// Log a binding's value using console.log
console.log("person:", person);
console.log("born, missing, died :", born, missing, died);
```

Understanding how bindings work in JavaScript is very important. Let's look at a simple example and see what's going on:

```js
"use strict";

let x = 100;
let y = x; // What is happening here?

x = 0;
// What is y?
// console.log(y)
```

Can you guess what is the value of `y`?

- `let x = 100;` means that we summon the value 100 and create a binding for it, called `x`.
- `let y = x;` means we create a binding called `y` and bind the value that is bound to `x`, which means we bind `y` to 100, not x.
- `x = 0;` means we summon value 0 and we bind `x` to that value. `y` is not affected.
- `y` is still bound to 100.

There are values and bindings. A binding binds a name only to a value. To cannot bind a binding to another binding.

## Summary

- 'use strict' runs the code in a mode that fixes some of the old mistakes
- Comments are written for you and ignored by the JavaScript interpreter
- Logging helps you see what's going on
- Values are the data in your program
- Use bindings to reference data

This concludes the third part of the tutorial. You now know the JavaScript basic concepts, you should be able to log and debug programs, _summon_ values and work with bindings.

In the next part, we will learn about naming things and data types in JavaScript.
