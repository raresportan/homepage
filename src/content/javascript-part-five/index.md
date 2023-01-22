---
title: Let's Learn JavaScript - Data types
pubDate: 2022-1-12
description: Data types in JavaScript
keywords: ["JavaScript"]
---

The purpose of any program is to transform data. Any program needs data. In JavaScript, when we talk about the program's data we talk about _values_:

```js
42;
("Deep Thought");
true;
{
}
[];
undefined;
null;
```

Using values like this is perfectly fine, but we don't have their meaning (values like these are called _magic values_ because nobody knows why they are what they are, they just work like magic).

To solve this problem we can bind values to names so we can reference them and understand their purpose and meaning:

```js
const answer = 42;
const superComputerName = "Deep Thought";
let isThisTheAnswer = true;
const emptyness = {};
const empty = [];
let bookName = undefined;
let author = null;
```

One thing you can notice in both examples is that we don't say what is the _type_ of a value.
So what does this mean? Do the values have no type? The type is implied by value? It doesn't matter?

We'll answer all these questions.

## Every value has a type

Data can have different roles or meanings, can be of different types. A value is a piece of data of a specific type.
Values are things that are. Types are things that could be.

```js
42; // type number
("Deep Thought"); // type string
true; // type boolean
{
} // type Object
[]; // type Object (should be Array)
undefined; // type undefined
null; // type null
```

To find the type of a value, we use the built-in `typeof` operator:

```js
typeof 42; // "number"
typeof "Deep Thought"; // "string"
typeof true; // "boolean"
typeof {}; // "object"
typeof []; // "object" (should be "array")
typeof undefined; // "undefined"
typeof null; // "object" (should be "null")
```

The operator always returns a string value! For example, it returns the "number" string for numbers.

Sadly `typeof` operator has some bugs and returns the wrong value for some of the types:

- for array, it returns "object" instead of "array"
- for null it returns "object" instead of "null"

_These bugs are from the early days of JavaScript and cannot be fixed because some part of the Internet relies on them. All new versions of JavaScript are perfectly compatible with old ones, old code will never break when JavaScript changes._

What about bindings? Can we find the type of the bound value? Yes, `typeof` operator works with bindings also:

```js
const answer = 42;
typeof answer; // "number"

const superComputerName = "Deep Thought";
typeof superComputerName; // "string"

let isThisTheAnswer = true;
typeof isThisTheAnswer; // "boolean"

const emptyness = {};
typeof emptyness; // "object"

const empty = [];
typeof empty; // "object"

let bookName = undefined;
typeof bookName; // "undefined"

let author = null;
typeof author; // "object"
```

What if we just declare a binding without a value?

```js
let x;
typeof x;
```

The type of `x` is undefined. Try it out!
_Everything that is not initialized by you, is initialized by JavaScript with `undefined`._

## Primitive values and objects

JavaScript types can be primitive types or objects.

_The big difference is that the primitive type values are immutable, they cannot be changed_

If you have the value `1` there is no way to change it to value `2`. If you have the value `"Hello"` you can't change it to `"Hey"`. No way.

You can use bindings to change the bound value, but that doesn't mean you change the value `1` into value `2`, it means you bind `2` where `1` was bound:

```js
let x = 1; // x is bound to 1
x = 2; // x is bound to 2
```

What happens to `1`? It is _garbage collected_, removed from memory, wiped.

Same with strings, you can't change `"Hey"` to `"Hello"`, only bind a new value:

```js
let greeting = "Hey";
greeting = "Hello"; // you can only bind another value

const firstname = "Jon";
const surname = "Snow";
const name = firstname + " " + surname;
```

Strings have methods, will see that in a bit, but all those methods return new strings, they don't change the string they are called on:

```js
const name = "Jon Snow";
name.toUpperCase();
console.log("Name:", name); // still "Jon Snow"

// you need to get the new string
const upper = name.toUpperCase();
console.log("NAME:", upper); // JON SNOW
```

On the other hand, objects are mutable, their "content" can be changed:

```js
// a person object with a "name" property
const person = {
  name: "Jon Snow",
};
console.log(person);

person.name = "JON SNOW";
console.log(person);
```

Programming with immutable values and mutable values are two different development paradigms.
Both have advantages and issues. While there are programming languages that only work with immutable values by design, most
have immutable primitives and objects, just like JavaScript.

Working with immutable values means creating new values all the time you need a new value. Working with mutable values means changing an existing value.

From my experience, using immutable values (and pure functions) as much as possible improves the resilience and understanding of the program. But the downside is you create a lot of values.
Working with mutable objects has the big downside that you don't know what piece of code changed the objects, especially in a multithread environment this is a nightmare.

## Numbers

JavaScript has two types for all the numbers, integers, floating-point numbers, etc.:

- Number - 64-bit floating-point doubles
- BigInt - double-precision floating-point approximation of the integer values

Special numbers are `NaN` (Not a Number), `Infinity` and `-Infinity`.
`Number.MAX_SAFE_INTEGER` ( 2<sup>53 - 1</sup> ) and `Number.MIN_SAFE_INTEGER` -(2<sup>53 - 1</sup>),
`Number.MAX_VALUE` (1.79E+308, or 2<sup>1024</sup>) and `Number.MIN_VALUE` (5E-324), are the Number limits.

If you need numbers over that limit you need to use BigInts. Note that BigInt is a new addition to the language and it doesn't work in older browsers.

```js
const n = 1;
const half = 0.5;
const solarSystemAge = 4.568e9;

// Problems with precision, don't use this for money calculations
const dollars = 0.1 + 0.2;
console.log("Dollars:", dollars);  // 0.30000000000000004

// Numbers have some methods even if they are primitives
console.log("Dollars with precision:", dollars.toPrecision(1));

// You cannot use methods on literal numbers but you cand do this:
// 7.toString // throws error
7.0.toString();
(7).toString();
7..toString();
7 .toString();

// Transform string to numbers
const minutes = parseInt("08");
console.log("Minutes:", minutes); // 0 NOT 8 in some browsers!

const hours = parseInt("08", 10); // always set radix
console.log("Hours:", hours);

// Another way to convert strings to numbers using Number function
// (Yes, it's a function not a class even if it starts with capital N)
const seconds = Number("08");
console.log("Seconds:", seconds);

// And yet another way
const millis = +'123';
console.log("Millis:", millis);

// To create BigInts, you need to add 'n' after the number;
const bigInt = 2n ** 53n + 1n;
console.log("Type of bigInt", typeof bigInt);
console.log("bigInt", bigInt);

// Binary
let five = 0b101
console.log(five);

// Hex
let red = 0xFF0000
console.log(red);

// Working with Infinity
console.log("0 < Infinity:", 0 < Infinity) // 0 < Infinity: true
console.log("-Infinity < 0:", -Infinity < 0) -Infinity < 0: true

console.log("typeof Infinity:", typeof Infinity) // typeof Infinity: number
console.log("typeof -Infinity:", typeof -Infinity) // typeof -Infinity: number

```

Basic operations:

```js
let sum = 1 + 2;

let diff = 2 - 1;

let product = 2 * 3;

let quotient = 6 / 2;

let pow = 2 ** 10;

let isLower = 3 > 2;

let reminder = 13 % 5;

// we also got assignment versions of most of the operators
sum += 3; // same as: sum = sum + 3;

diff -= 10; // same as: diff = diff - 10;

product *= 3; // same as: product = product * 3;

quotient /= 2; // same as: quotient = quotient /2;

pow **= 10; // same as: pow = pow ** 10;

reminder %= 5; // same as: reminder = reminder % 5;
```

We can also do bitwise operators.

Not a number, `NaN` is a very very special number. Yes, NaN _is a number_ and is called _not a number_. You get NaN when you try to get a number
from something that can't be a number. NaN is supposed to denote the result of a nonsensical computation.

```js
// When strings cannot be converted to numbers you get NaN
const time = Number("01:02:08.123");
console.log("Time:", time); // Time: NaN

// NaN is supposed to denote the result of a nonsensical computation,
// so it isn’t equal to the result of any other nonsensical computations.
console.log("Nan === NaN?", NaN === NaN); // Nan === NaN? false

// Check if the value is not a number
const isNotANumber = isNaN("abc");
console.log("abc is not a number:", isNotANumber); // abc is not a number: true

console.log("typeof NaN:", typeof NaN); // typeof NaN: number  ¯\_(ツ)_/¯
```

Another small weirdness is the number `-0`. I'll mention it just so you're aware of it.

```js
let zero = 0; // 0
let plus0 = +0; // 0
let minus0 = -0; // -0

// The difference matters in some cases:
1 / 0; // Infinity
1 / -0; // -Infinity

Math.atan2(0, 0); // 0
Math.atan2(0, -0); // PI
```

`Math` object provides mathematical operations that work with numbers, here are some of them:

```js
Math.random(); // Random number between 0 and 1
Math.PI
Math.abs(x) // Absolute value
Math.ceil(x) // Smallest integer greater than or equal to x.
Math.cos(x) // Cosine of x
Math.floor(x) // Largest integer less than or equal to x
Math.max([x[, y[, …]]]) // Largest of zero or more numbers.
Math.min([x[, y[, …]]]) // Smallest of zero or more numbers.
Math.random() // Pseudo-random number between 0 and 1
Math.round(x) // x rounded to the nearest integer
Math.sin(x) // Sine of x
Math.sqrt(x) // Positive square root of x
Math.trunc(x) // Integer part of x, removing any fractional digits.
```

## Summary

- Every value has a type
- Some times produce immutable values, some not
- Working with numbers is relatively easy, but there are some gotchas.

### Previously on "Let's Learn JavaScript"

- [How JavaScript compares to other programming languages](/javascript-part-one) and the mindset you need to learn JavaScript
- ["Hello, World!"](/javascript-part-two) in JavaScript
- JavaScript [values and bindings](/javascript-part-three)
- How to [name things](/javascript-part-four) in JavaScript
