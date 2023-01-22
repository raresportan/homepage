---
title: On Software Design
pubDate: 2021-05-21
description: How much design is needed? What is important to design? How do we communicate the design to others?
keywords: ["How to Write Better Software"]
---

There are always the questions of design:

- How much design is needed?
- What is important to design?
- How do we communicate the design to others?

Some people design everything, some design nothing. Most start with a good design but in time that design is buried under a thick layer of compromises and changes.

## Do we need to design our software?

We, software developers, like to code, not to waste time with design documents and drawings, endless meetings, and emails.

The problem is that some design is crucial to the development of the software. Unless you’ve made the same type of software before, it is almost impossible to get the design right from the first time.

_Everything, code and design, must be an iterative process._ It takes several tries to come up with an acceptable solution.

### What you get if you don’t design?

You get the most popular design in the world: **The Big Ball of Mud**, a.k.a Spaghetti code.

> A Big Ball Of Mud is haphazardly structured, sprawling, sloppy, duct-tape and baling wire, spaghetti code jungle.

- Brian Foote

The code will show signs of unregulated growth, and repeated, expedient repair. It will have no overall structure, no organization whatsoever.

Data will need to be shared globally, among unrelated parts of the code, until nearly all the important data becomes global or duplicated. Data will end up in unexpected states, pieces of code will step on each other’s toes, nobody will know what is happening.

You will spend all of your time patching bugs and duck-taping leaks.

### Why is “The Big Ball of Mud” so popular?

It turns out this way of making software is very popular.
Here is why:

- Is easy, is natural, and practical.
- Is the default way of doing it.
- You are constrained by time and budget.
- The alternative is too much thinking.
- You do fast prototypes and we keep the code.
- You simply don’t care.

### Should you avoid it?

Depends. Sometimes is not even worth considering alternatives.
If your codebase will never be big enough just let it be. Avoiding it is not cheap. It requires time and effort and discipline.

It’s OK while you are doing a prototype or a spike when you are not sure what is the solution yet when you are doing throwaway code.

It’s OK if you need the software running ASAP. But you’ll have to handle the debt.

It’s OK for the short term. It is not for the long term.

It’s OK for the first iterations of code. But it’s not OK if you stop iterating the code and you leave it in this state. Sadly this is done too many times. Sooner or later you will end up working on a piece of code like this.

### How to deal with the “The Big Ball of Mud”?

There are four ways to deal with it:

1. Keep the code healthy. Alternate periods of expansion (adding new code) with periods of consolidation (rewriting, refactoring, and improving existing code).
2. Make the code healthy. When you are working with legacy code, your job is pretty much this.
3. Throw the code away and start over. This is the most drastic but sometimes necessary alternative. It is also the hardest to get right because is very hard to understand all the little quirks and compromises that make the code work the way it works. And thus you will not be able to move these details to the new version of the software. The bigger the software the harder is to rewrite.
4. Simply surrender to entropy, and accept your fate. I bet you’ll look for something else to work on pretty soon.

### What happens if "The Big Ball of Mud” stays?

If the software needs to be expanded with new features or if bugs need to be fixed, things will be bad.

Just as it is easier to be verbose than concise, it is easier to build complex systems than it is to build simple ones.
Skilled programmers are able to add complexity very quickly.

Complexity will increase rapidly until it reaches a level just beyond that with which you can comfortably cope.
At this point, complexity and your abilities to contain it reach an uneasy equilibrium.

Let me remind you what happens when you have too much complexity:

- You cannot estimate correctly how much work will take to implement new things because you no longer understand the code.
- You are afraid to touch any code because you can always break something.
- Every code change is a pain. You cannot reason about the ramifications of the code change. Often the code breaks in surprising places.

## What does it mean to design software?

Usually living with the “The Big Ball of Mud” is not an option. A good design is necessary.

At the highest level, the design of the software is called architecture and is done by one or two experienced people.

But good architects will not design the smaller parts. They let the implementers complete those parts of the design for which they are responsible. An excellent programmer needs to feel he or she has some authority over what they are responsible for. So everybody contributes to the overall design.

Designing software means finding answers to questions and breaking the big problem into smaller, easier problems.

The steps in coming up with a design for a piece of code are the same for everybody:

### What’s the big idea?

The first step is to understand the problem.

Start with just a one-line statement about your app, module, feature, piece of software. What does your software stand for? What’s it really all about?

Before you start designing or coding anything you need to know the purpose of your software. Find out or define as much information as possible about the thing you’re about to create. More input, better output.

The best software is created after iterating it for some time. Is almost impossible to come up with a good design from the first try. The reality is that you have more information later after you did the design, so be prepared to adjust your design based on new information.

### Epicenter design

Focus on the true essence of the code and then builds outward. This means that, at the start, you ignore the extremities: the navigation/tabs, footer, colors, logo, etc. Instead, you start at the core and design the most important piece first.

Whatever the software absolutely can’t live without is the epicenter. Only when that piece is complete, you begin to think about the second most critical element. Then after the second most critical element, you’d move on to the third, and so on. That’s epicentre design.

Epicenter design allows you to focus on what really matters on day one. Essentials first, extras second. The result is a more friendly, focused, usable software.

### Break your software into little pieces

Your job as a designer is to _“disentangle”_ things. Design is about separating the system into parts, breaking the big problem into little problems. This is where people start to do mistakes, they tend to break the code based on the wrong reasons, based on common functionality or behavior.

Instead of breaking code into parts with common functionality:

- Break code apart by what it does not share with the rest.
- Isolate the most frustrating parts to write, maintain, or delete away from each other.
- Do not build parts around being able to re-use them, but being able to change or replace them.
- Each hard problem should be handled by one part. A piece of code can do two things, when changing one thing requires changing the other. Is often easier to have one awful component with a simple interface, than two components requiring careful coordination between them. Just as most of the systems out there are single-star systems but binary-star systems are not unexpected.

> Start with a list of difficult design decisions or design decisions that are likely to change. Each module is then designed to hide such a decision from the others - David Parnas

If you have a good design, with good parts, when you find new information about your software you’ll just replace some of the parts, not start the entire design from scratch.

When you are not sure if the design for a feature is good enough, just try to answer this question: How hard it is to remove or replace all the code for the feature if necessary?

## The farm-like software

Programming deals with nonphysical things. There is not much difference between a small program and a large program, there are no real limits of how big a program can be. Unlike other fields where the system is limited by physical laws, in programming the only limit is our minds.

### Complexity generates big issues

The real issues of programming are not present when you try to make small programs but when you build big programs, programs implemented in thousands of lines of code. Programs so long that nobody can hold them in their head.

### Analogies from the real world

So when we have to deal with the growing complexity of our programs we look around at how other people handle similar complexity.

The most popular analogies are between software development and building construction, I’m sure you ran into these at some point. (There are all kinds of terms from the construction industry we borrowed, like architect, designer, developer. And the whole idea of design patterns is borrowed from the writings of an architect, Christopher Alexander.)

The most common analogy is between software development and building a house. But that analogy is too simplistic and a bit misleading so let’s raise the stakes and use the analogy of building a skyscraper vs. a farm to see determine the extremes of the software we make.

Not only the building process of a skyscraper is quite different from building a farm but the results are very different also:

| SKYSCRAPER                              | FARM                                                             |
| --------------------------------------- | ---------------------------------------------------------------- |
| Beautiful exterior                      | Mundane exterior                                                 |
| Fixed, inflexible interior              | Cozy, flexible interior                                          |
| Requires precise design and plans       | Not much design, starts as a small house and a barn              |
| Never modified                          | New rooms are added for kids, then for grandma                   |
| Nothing is ever added or removed        | Stables, canning rooms by the house, a wing for cows             |
| Isolated and perfect                    | The whole remains unchanged but parts often change               |
| Abandoned by its builders after is done | Changing and growing all the time, never perfect, never finished |
| Idea of total replacement               | Idea of repair and growth                                        |

So which kind of software should be built? Something monumental but inflexible like a skyscraper or something mundane but flexible like a farm?

If possible, you should always build Farm-like software:

- Programs that live and grow, like farms, one part at a time.
- Software that is created, modified, and improved.
- Software that is rarely replaced entirely.

The way the software looks in the end is not important because there is rarely an end, and if there is one it isn’t planned.

### Designs that work

People always try to come up with something different, something better (they say), no matter if the status quo is good or bad. The same happens with software development also.

New designs are invented all the time, but most of them are quickly forgotten because they complicate things so much.

_The road to hell is paved with good intentions._

Fortunately, over and over again people rediscover the same fundamental ideas, rebranded under new names.

In following posts, we’ll talk about some fundamental software designs. Once I understood the pros and cons of these designs and when to use them I became a much better developer. I have no doubt you will feel the same.
