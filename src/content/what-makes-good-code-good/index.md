---
title: What makes good code good
pubDate: 2020-06-12
description: What is good code? Ask ten people and you’ll get ten different answers. Read ten books and you’ll find ten different answers. Different people, different experience, different problems, different contexts, different answers.
keywords: ["How to Write Better Software"]
---

There are things that make or break software, like good User Experience Design, marketing that should
come up with the right features for the right app, or management that should pick up the right people for
the right job.

Those things might be out of your control. What you can control is the other important part:
designing and writing the code.

So the question is: What is good code? What should you look for?
Ask ten people and you’ll get ten different answers. Read ten books and you’ll find ten different answers.
Different people, different experiences, different problems, different contexts, different answers.
Truth is there is no good answer. Context matters, timeframe matters, money matters.

## How can we describe good code

But no matter the situation or context, good code has a few evergreen qualities:

### Simple

The code is simple to understand, simple to modify, untangled, decoupled, obvious. This means the code is not
complex, not tangled, not coupled, not spaghetti.

Simple code doesn’t cause side effects outside of its scope
and cannot be influenced by outside scopes. A classic example: if the code receives a mutable object as input,
it will not change the object causing outside side effects, and any change to the object will not change
the state of the code.

But beware, simple does not necessarily mean _easy or familiar._

### Clear

Clarity of code means clarity of purpose. The code must tell what it’s doing at every level.
There should be no obfuscations, no hidden things, no mess. It's clear in which state it is.
It's clear if something is wrong. It's clear if it can’t complete its task or if it is waiting for something.
Everything happens for a reason, and the reason should be clear.

This is maybe the hardest thing to get right. Thousands of small or big decisions are taken in the lifetime of
a codebase. And those decisions are lost. The whys are lost.

### Reliable

Works in the same way no matter the conditions or context. It is hard to be used in incorrect ways,
hard to break. When incorrect input is used, the software clearly indicates why the input is wrong and what
to use instead. It doesn’t return references to the inner state.

This is the edge functional languages have over the object-oriented ones. Coding with immutable data is
the most efficient way to create reliable code.

### Efficient

It is designed to be as fast as possible. It is designed to consume as little memory as possible.
Everybody heard that _“premature optimization is the root of all evil”._ This quote was perverted in all
possible ways as an excuse for slow and inefficient software. Just remember this: At the function level,
you can always optimize later. But at higher design levels, you must plan for performance.

You must think not only about the data flow but also about the flow rate.
If the design is bad, expect a laggy app.

### Composable

It means your code is built like everything else around you. Look around, you can always find a hierarchy,
smaller things are combined to create greater things. By understanding the hierarchical structure of things,
you can understand the roles each component plays and how they fit into the larger picture.

Good code creates big systems from smaller ones, which are built from even smaller components.

## Balance, compromise, and trade-offs

Usually, some of these qualities are at odds with others.

The clearest code might not be the fastest one. Most reliable code might not be the simplest.
You need to find the right balance between them, depending on context and the problem you try to solve.
First aim to make the code clear and simple.
Then modify it to make it more reliable and efficient, giving up on some of the clarity and simplicity.

> Easy to use almost mandates garbage collection, but that collides with ‘fast’ and ‘simple to implement’.
> Removing pointers makes the language safer, but at a steep loss of generality.
> Trying to make pointers safe with a ton of language rules makes the language hard to use.
> I could go on. - [Bert Hubert](https://berthub.eu/articles/posts/cpp-rust-go/)

## Why don’t people code like that?

This question has always intrigued me. Everybody likes to brag with their skills and knowledge and the awesome
languages or tools they use. But somehow they make poor code. The answer is simple: it is easy to write bad code
and quite hard to write good code.

At some point, somebody made these observations about code implementations:

| CODE                          | IMPLEMENTATION           |
| ----------------------------- | ------------------------ |
| Appears to work               | Easy                     |
| Correct                       | Far more difficult       |
| Can be understood by others   | Very difficult           |
| Can be modified in the future | Very very difficult      |
| Efficient                     | Very very very difficult |

Most of the code is at the “appears to work” level. Some of it is “correct” and “can be understood by others.”
Almost none “can be modified in the future” with the confidence that changes will not break something.
This happens because people stop iterating on the code too soon. They think they are done when they are not.

Everything, code and design, must be an iterative process.
**Software is never written, is always rewritten.**

> What you can do as a programmer, though, is get through the assignments doing something that
> works, and then look back at it and see how you could have made it better or faster or more concise. This
> is one thing that seriously differentiates programmers from excellent programmers. - [Brian “Beej” Hall](https://beej.us/guide/bgc/pdf/bgc_A4.pdf)

## Simple vs. easy

While most of the qualities of good code are obvious, one is not.
People often don’t understand what simple code means. Many people think simple means easy.
This is not true. Simple means something that works with one thing at a time or does one thing at a time.

| SIMPLE CODE                | EASY CODE                     |
| -------------------------- | ----------------------------- |
| One purpose                | Many purposes                 |
| Values                     | Objects                       |
| Data                       | Classes                       |
| Map/Reduce/Filter          | Imperative loops              |
| Pure function              | Method mutating state         |
| Function that does a thing | Add an “if” in a function     |
| Object using object        | Class extending class         |
| Consistency                | Inconsistency                 |
| Implement yourself         | Download it from the Internet |

See [Rich Hickey's illuminating presentation](https://www.infoq.com/presentations/Simple-Made-Easy/).

## Trade-offs of doing simple code

| SIMPLE CODE vs. EASY CODE                                 |
| --------------------------------------------------------- |
| Development starts slow vs. fast                          |
| Development speed grows to a level vs. slows down forever |
| Development speed remains constant vs. is near zero       |

Simple code implies a slow start. Doing easy code, you get fast initial development time but it slows
down constantly. At some point, after you have enough code, the development speed is near zero.
For simple code, you get slow initial development time but it grows and remains at a constant level.
Simple code requires more effort and discipline.
You have to think more, you have to resist the easy way.

Simple code is underrated and unappreciated. Usually, nobody notices it, but when they notice it they are
not happy about it:

- Developers don’t notice it because it doesn’t get in their way.
- Teachers don’t like it because they think it is too mundane and below their level of intelligence.
- Consultants and methodologists don’t like it because they can’t ask a ton of money for something simple.
- Managers don’t like it because they think you waste too much time on trivial things. “What? You spent days thinking about this simple and obvious code? A novice would have done it in 5 minutes”

Still, _there is nothing more sophisticated than simple code._

## The parable of two programmers

A while ago, two companies, the Automated Co. and the Consolidated Co. decided that they
need the same program. Here is how they handled the problem.

### Day 1

Automated hires a very expensive consultant, Alan, to solve their problem.

Consolidated decides to let one of their bright programmers, Charles, to do the job.

### Day 10

At Automated, Alan, with a long experience in difficult programming projects, decides to use a well-established
design methodology. He asks for three more programmers. The team goes to work, making preliminary analyses,
UML diagrams, meetings, Excel spreadsheets.

At Consolidated, Charles spends time thinking about the problem.
He often sits with his feet on the desk, scribbling on paper and drinking coffee.

### Day 30

At Automated, the team is starting to write code. The programmers are spending about half their time
writing and building code, and the rest of their time in the conference, discussing the interfaces between
the various modules. _They finally release an implementation schedule._
In two months they will have a test version of the program.
In four months they will have the gold version.

Meanwhile, at Consolidated, Charles is busy coding.

### Day 90

At Automated, the team has completed two of the four major modules required for their program.
These modules are now under testing while the other modules are finished.
When tested it seems to satisfy most of the original specifications.
It has omitted one or two features and is very fussy about the format of its input data.
However, the company decides to go with the program.
They can always train their data-entry staff to enter data in the strict format required.
The program is handed over to some maintenance programmers to eventually incorporate the missing features.

Charles completes the project at Consolidated.
When tested, the program does everything required in the specifications. Except for some quickly corrected oversights, it performs well.
It even has a few additional convenience features which might significantly improve the usability of the program.

### Aftermath

Alan was complimented for completing his project on schedule.
His manager at Automated looked over the program. He saw that the company standards were present.
_He quickly gave up attempting to read the program however; it seemed quite incomprehensible._
He was convinced the project was really much more complex than he had originally assumed.
Alan was given a hefty pay raise and promoted as a reward for his achievement.

At first Charles’ manager at Consolidated was impressed. But as he read through the source code,
_seeing how simple it was, he was convinced that the project was really much simpler than he had originally thought._
It seemed that this was not much of a challenge.
At his next salary review, Charles was given a small raise. He was not given a promotion.
After about a year he left the company.

(An adaptation of [The Parable of the Two Programmers](http://www.bruceblinn.com/parable.html))

## Who are you?

Alan, who writes code that only he understands, but thus securing his job.
Or Charles, who writes simple code, but is not appreciated because of this.
I'll always be a Charles. Maybe just because the world is full of Alans.
