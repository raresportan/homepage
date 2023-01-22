---
title: Let's Learn JavaScript - Naming things
pubDate: 2021-12-7
description: How to name things in JavaScript and what names you cannot use
keywords: ["JavaScript"]
---

Previously on "Let's Learn JavaScript":

- [How JavaScript compares to other programming languages](/javascript-part-one) and the mindset you need to learn JavaScript
- ["Hello, World!"](/javascript-part-two) in JavaScript
- JavaScript [values and bindings](/javascript-part-three)

Now it's time to see how we name things in JavaScript.

## Names

All the things you create in a JavaScript program have names.
We have seen bindings, but there are also classes, functions, methods, members, etc. All have names.

In JavaScript, a name must start with a letter, optionally followed by one or more letters, digits, or underscore.
$ (dollar sign) and \_ (underscore) can be used instead of a letter as a name prefix.

```js
let name = "Jon Snow";

// binding that starts with a letter followed by a digit
const castle1 = "Winterfell";

// binding that starts with _ followed by a digit
const _1stOne = "firstOne";

// binding that starts with $ followed by a digit
const $2nd = "second";
```

So the only constraint is that a name can't start with a digit, you will get an error if you try to do this:

```js
// This doesn't work
const 1st = "first";
const 2nd = "second";
```

By convention, the name of all members, bindings, functions starts in lower case.
Class names start with upper case.

_camelCaseNotation_ is used for names composed from several words of all other names:

```js
const nameOfTheGame = "football";
const isDone = false;
const numberOfBottles = 3;
```

JavaScript is case sensitive, this means _name_, _Name_ and _NAME_ are three different things:

```js
const name = "Jon";
const Name = "Snow";
const NAME = "JON";
```

A special case is program level constants are entirely upper case and we separate words with underscores:

```js
const DATABASE_IP = "192.34.55.11";
const LEVEL_WARNING = "LEVEL_WARNING";
```

It might be hard to see the difference between a _const_ binding and a _program level constant._
_const_ binding is a language feature, a _program level constant_ is a convention, and also it's perfectly fine to create a
JavaScript program without any program level constants. Program level constants are things that are not changing in a program and
are available in multiple parts of a program.

For example, if you make a Chess program, the number of squares on the board is 64 so you can use a program level constant, BOARD_SQUARES for that.
All Sudoku boards have 81 squares, so that's a program-level constant.

## Keywords

There are some words with special meanings in JavaScript. Like _const_ or _let_. These words are reserved and we can't use them
to name our abstractions.

```js
// This doesn't work
const const = "const";
let let = "let";
```

Some of the keywords are not used by the language but might be in future versions. New keywords may be added by newer versions of JavaScript.

Here is the list of reserved words that you cannot use to name your stuff:

|          |            |              |           |
| -------- | ---------- | ------------ | --------- |
| abstract | arguments  | await        | boolean   |
| break    | byte       | case         | catch     |
| char     | class      | const        | continue  |
| debugger | default    | delete       | do        |
| double   | else       | enum         | eval      |
| export   | extends    | false        | final     |
| finally  | float      | for          | function  |
| goto     | if         | implements   | import    |
| in       | instanceof | int          | interface |
| let      | long       | native       | new       |
| null     | package    | private      | protected |
| public   | return     | short        | static    |
| super    | switch     | synchronized | this      |
| throw    | throws     | transient    | true      |
| try      | typeof     | var          | void      |
| volatile | while      | with         | yield     |

## Naming things

In [10 Reasons Why You Are Not a Great Programmer](/10-reasons-why-you-are-not-a-great-programmer/) and [What Makes Good Code Good](/what-makes-good-code-good/),
I've talked at length about what it means to write good code.

Good programmers understand that they spend most of the time _reading_ code, not writing new code.
We write a piece of code once, but we read it many times: to fix bugs, to refactor it, to extend it, to reuse it, to use it as a base for new code.

Imagine that you come back to it after several weeks or months. If the code is not clear you will have a hard time understanding
how the code is working. If you work in a team, that piece of code you wrote a while back will be read by several people, maybe somebody else will have
to use your code and they'll have to understand it. Will they be able to understand it? Will you be able to understand it after a while?

One of the things that make the code clear or not is the naming of the abstractions from that code.
Everything, from the name of a binding to the name of a function or a class counts.

Naming things is hard but important. Please spend time to find eloquent names for things. Future you will thank you.

- Don't use one letter names
- Don't use `foo`, `bar`, or other meaningless names
- Don't use magic numbers, make them program level constants, attach a name to a number. For example, don't use `81`, use `BOARD_SQUARES`.
- Don't use confusing or unexpected names, use the right name for the context. For example, don't use an `animal` for a `car`.
- Don't name different things with the same name. For example, don't use `Header` for the site header and an article header, use `SiteHeader` and `ArticleHeader`.
- Don't use general, ambiguous names like Manager, Service, Controller, Handler, Factory, Object, Interface, etc.
- Don't exagerate with long names. For example, don't use `theNumberOfActiveUsersOnTheSite`, use `activeUsers`.

In practice this is hard to do, is fast and a no-brainer to use a bad name. Think a bit about it. Ask yourself if is the right one.

## Summary

- There are rules to name things.
- Keywords are words with a meaning
- Naming things is hard, so spend some time finding the most appropriate ones

Time is up. Looks like we didn't get to data types, so let's do that next time.
