---
title: Make your code testable
pubDate: 2021-01-06
description: How a code that can be easily tested is better than one that is not
keywords: ["How to Write Better Software"]
---

There are two types of programmers: those who like to write tests and those who hate it.
The hardest thing for me is always to convince one of those test haters to change his mind.
They come up with all kind of arguments:

- I don’t have time man, I need to write code that is shipped to the client.
- I checked my code manually and it works, why bother writing tests?
- We have QA people that test the code anyway, why should I? I’m a bloody developer.
- I wrote a couple of tests but they kept failing every time I made a code change so I deleted them. Too much trouble.
- Nobody else on the team writes tests, why should I?
- It takes ages to write a single test, I have to create a ton of mockups.

These are valid arguments. Working software that gets shipped to the clients is what really matters. But tests are very important for this single reason: tests make the code better.

## First use of your code

When you write tests, you are actually making a first client for your code.
You need to instantiate your objects, create the data flow, call functions, and use their outputs.

If you feel that your code is hard to use, is very picky about data or order of operations,
now is a good time to refactor it a bit, to make it easier to use, more clear.
At least add some comments for the tricky parts.

You’ll be surprised to find that, in some cases, the code is not working as you were thinking.
You’ll find ignored edge cases, unhandled errors, inconsistencies, and most likely some bugs.

## Easier to test means better code

Good code is easy to test. Good code is made from small and independent parts and nothing is easier to test than small,
independent parts. Especially if those small parts are pure functions. Just think about it: you give it an input and it gives you an output, all you need to do is check if the output is the expected thing.

If you find yourself writing many tests for a single piece of code usually that means it is too complex and you should
simplify it by breaking it into several pieces.

Or if you need to write a lot of test set up code, to simulate a certain state — because only
in those conditions the code can be tested — you need to improve your code.

When your code is good, it is very easy and fast to write tests for it. This means is more likely to write more tests, have better coverage, and test all kinds of niche situations that are very hard to simulate by manual testing.
But when the code is not good you’ll have a hard time writing tests.

## Prevent silly mistakes

Sometimes in order to add a new feature or fix a bug, you need to refactor or change a piece of code to suit
your new needs. But that piece of code is also used in other parts, which you are not interested in.
So inadvertently, you break code.

If the code is tested, the moment you run the tests, you will notice that the tests fail and thus you’ll be
forced to fix your new code so the old code doesn’t break anymore.

_Several years ago I worked with a very esteemed colleague that had the bad habit of committing code that doesn’t
compile. It happened once, then twice, then we blocked his credentials from committing to the repo. Later he used the build automation credentials to commit code and again code that doesn’t compile ended on the repo.
Finally, we set up the repository to not allow commit of code that doesn’t pass tests.
Of course, the code had to be compilable in order to even start the tests. And that is how our problem was solved. _

## Remember what the code is supposed to do

When you write code, you know the problem it needs to solve, the context, the constraints, all the edge cases.
But when you return to the same code months later you don’t remember all those little details.
You hardly remember how the code works. Wouldn’t be nice to have a way to remember that? Maybe the documentation
(if anyone writes low-level documentation anymore). Or maybe the tests! Just look over the tests and you’ll remember
how the code is supposed to be used, what data it needs, and what the code returns.

## Better quality, fewer bugs

This one is obvious, tested code has better quality because bugs are found and fixed while is tested. Not always, but most of the time when I write tests for my code I find at least one issue.

It happens that we write fast and trashy code to get to the solution as soon as possible. And then we see the
code works and everybody is happy. This should not be the end of the story. Next, we should write tests to prove
that the code works. And then, once all the tests are written and are running successfully we need to rewrite our trashy code. To make code that not only works but is also great.
Because of the tests, you can be sure that the code still works as before but now is way better: simpler, more robust, easier to read, more efficient.

Over time, in the life of every project, comes a period of refactoring, enhancements, improvements, reducing
the technical debt, etc. The goal is always to take code the works and make it better somehow. But most of the
time something else happens: working code becomes a better code that doesn’t work the same. Always something slips,
something is missed, something is broken. Why? Because there were no unit tests that caught the mistake.

_I didn’t always write tests. I didn’t bother to write them. But as I became a better developer I find them invaluable.
Tests are like one of those things you don’t miss until you use and then you can live without._
