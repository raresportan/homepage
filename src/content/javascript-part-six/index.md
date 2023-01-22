---
title: Let's Learn JavaScript - Strings
pubDate: 2022-1-31
description: Strings in JavaScript
keywords: ["JavaScript"]
---

Another important primitive data type is the String. Strings are composed of one or more characters and are used to keep words and texts.
In JavaScript there is no char type for characters, we can work with a string's individual characters, but each character is considered a one-letter string.

Like any other primitive data type, strings are immutable, each time you need a new string you have to create a new one instead of modifying an existing one.

## How to create strings

We have several ways to create strings, the most common are the following:

```js
// using double quotes (" ")
const name = "Jon Doe";
console.log(typeof name); // string

// using single quotes (' ')
const color = "blue";
console.log(typeof color); // string

// using back-ticks (` `)
const poem = `
    Roses are red
    Violets are blue
    Unexpected } on line 32
`;
console.log(typeof poem); // string
```

There is no difference between the first two ways, but the back-ticks version allows us to create multi-line strings and also allows parameter interpolation.

If you need to use the chars used to create strings inside the string content you have two options:

- Escape the chars inside

```js
const name = 'Jon "The Legendary" Doe';
```

- Use different quotes

```js
const name = 'Jon "The Legendary" Doe';
```

Other useful ways to create strings:

```js
// combine several strings into one using the + operator
const abc = "a" + "b" + "c";
console.log(abc); // abc

// use + with numbers and strings and get strings back
const stringFromNumber = 1 + "";
console.log(stringFromNumber); // 1

// transform primitives to string using String function
const stringFromSomething = String(123);

// numbers to string
(10).toString();
Math.PI.toPrecision(3); // 3.14
```

## Methods

Strings have lots of useful methods, all of them return new values, none of them modifies the string itself. As said, strings are immutable.
Here are some of the available methods:

- length
- indexOf
- substring
- toLowerCase & toUpperCase
- replace
- repeat

```js
const fix = "Have you tried turning it off and on again?";

// length
console.log(fix.length); // how many chars are in the string

// indexOf
const indexOfOff = fix.indexOf("off");
console.log("index of off", indexOfOff); // position of 'off', starts from 0

// substring
const substring = fix.substring(4);
console.log("substring", substring); // create a new string from a part of the original string

// toUpperCase
console.log(fix.toUpperCase()); // HAVE YOU TRIED TURNING IT OFF AND ON AGAIN?

// replace
const replacements = fix.replace("on again", "go home"); // Have you tried turning it off and go home?

// repeat
const chorus = "Because I'm happy.\n";
console.log(chorus.repeat(3));
// Because I'm happy.
// Because I'm happy.
// Because I'm happy.
```

## Parameter interpolation

Strings enclosed by the back-tick are called template literals. Template literals allow string interpolation:

```js
const lang = "Java";
const interpolated = ` 
    - Honey, I can't open the jar!
    - You need to download ${lang}!`;

console.log(interpolated);
// - Honey, I can't open the jar!
// - You need to download Java!`
```

## How to get a character from a string

To get a specific character from a string we need to provide the character position in the string (0 is the position of the first character):

```js
const opinion = "yikes";

// access a char
const firstChar = opinion[0];
console.log(firstChar); // y
const lastChar = opinion[opinion.length - 1];
console.log(lastChar); // s

// we get undefined if the position is out of limits
const charOverLimit = opinion[10];
console.log(charOverLimit); // undefined
```

## How to compare strings

To check if two strings are equal we use the === operator and use < and > to find which one is bigger.

```js
const s1 = "Hello";
const s2 = "HELLO";

console.log("Equal?", s1 === s2);
console.log("First is bigger", s1 > s2); // true
console.log("Second is bigger", s1 < s2); // false
```

The comparison works by comparing the number associated with each character. You may have heard about the ASCII table, where a numeric "code" is assigned to each character. Well, the ASCII table contains just a small set of characters. To represent a lot more characters, UNICODE was born.
Sometimes comparison doesn't work as expected, especially if you use some non-English characters like `ß` or `ü`. If that's the case you need to use comparison by location:

```js
const s1 = "Hello";
const s2 = "HELLO";

console.log(s1.localeCompare(s2));
```

## String length

When we're using normal characters all is good, the `length` returns what we expect. But when we start to add emojis or Asian characters `length` is not working as expected:

```js
const s1 = "Hello";
console.log(s1.length); // 4

const s2 = "🏳️‍🌈";
console.log(s2.length); // 6!!!
```

Emojis are special, what you see on the screen is not what is actually coded in the value. For instance the pride flag 🏳️‍🌈 is a white flag 🏳 and a rainbow 🌈, mashed together with an invisible emoji that says "hey mash these two together".
Each part is 2 bytes so in total there are 6 bytes = 6 characters.

If you need to interpret emojis as one char, you can use a library called [grapheme-splitter](https://github.com/orling/grapheme-splitter).

## Exercises

Format a 10 digit phone number to a human-readable version: 0742552233 -> 0742.552.233 using `substring`:

```js
function formatPhoneNumber(phoneNumber) {
  let result = "";
  // your code here

  return result;
}
console.log(formatPhoneNumber("0742552233")); // 0742.552.233
```

Censor word: Given a phrase and a word, replace each word's chars with `*`, leave all other words as they are. Use `replaceAll` and `repeat`:

```js
const censor = (phrase, word) => {
  let result = "";
  // your code here

  return result;
};
console.log(censor("JFK was killed by KGB", "KGB")); // JFK was killed by ***
console.log(censor("JFK was killed by Mafia", "Mafia")); // JFK was killed by *****
```

## Summary

- Strings are an important part of JavaScript, mastering them is a must.
- There are several ways to declare string bindings
- Strings have a lot of useful methods
- Strings are immutable, each time you need a new string you have to create a new one instead of modifying an existing one.

### Previously on "Let's Learn JavaScript"

- [How JavaScript compares to other programming languages](/javascript-part-one) and the mindset you need to learn JavaScript
- ["Hello, World!"](/javascript-part-two) in JavaScript
- JavaScript [values and bindings](/javascript-part-three)
- How to [name things](/javascript-part-four) in JavaScript
- [Data types](/javascript-part-five) in JavaScript
