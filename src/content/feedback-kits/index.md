---
title: Software Feedback Kits
pubDate: 2021-02-07
description: Create feedback kits to nail down the requirements and for the exploration of ideas.
keywords: ['How to Write Better Software']
---

There are times in every programmer's life when they must implement things that are hard to explain, hard to
put down on paper, things that nobody knows exactly how to verbalize. Sometimes nobody knows what they want.
So what we do in this case?

You can create feedback kits.

These pieces of software are very useful, although you sometimes end up throwing away all the code used to make them.
Some people call them prototypes or proof of concepts and are bare-bone versions of some known/unknown requirements.

_They are incredibly useful to nail down the requirements and for the exploration of ideas._

## The Steve Jobs Roll Your Own Calculator Construction Set

Years ago, at Apple, Chris was working on documenting the Macintosh. Chris wanted to write a demo program using
Quickdraw, a 2D graphics library. He decided to draw a calculator.

After playing around for a while, he came up with a calculator that he thought looked pretty good.
But the acid test was showing it to Steve Jobs.

When the day came, the entire team gathered around as Chris showed the calculator to Steve. He held his breath,
waiting for Steve’s reaction. “Well, it’s a start,” Steve said, “but basically, it stinks. The background color
is too dark, some lines are the wrong thickness, and the buttons are too big.” Chris told Steve he’ll keep changing it until Steve thought he got it right.

So, for a couple of days, Chris would incorporate Steve’s suggestions from the previous day, but Steve would
continue to find new faults each time he was shown it. Finally, Chris got a flash of inspiration.

The next afternoon, instead of a new iteration of the calculator, Chris unveiled his new approach, which he called
“the Steve Jobs Roll Your Own Calculator Construction Set”. Every decision regarding the graphical attributes of the
calculator was parameterized by pull-down menus. You could select line thicknesses, button sizes, background patterns, etc.

Steve took a look at the new program and immediately started fiddling with the parameters. After trying out
alternatives for ten minutes or so, he settled on something that he liked. When the team implemented the
calculator UI for real a few months later, they used Steve’s design, and it remained the standard calculator
on the Macintosh for many years.

## Why feedback kits

Over time, I made a few feedback kits also. They were very popular and saved a lot of useless meetings and
discussions. When everyone is looking and using the same thing, the discussion is more focused and the feedback
crystal clear.

For example, I've made a small app that animated the different ways of folding paper inside an industrial printer.
That app was never shipped to customers, it was only used internally. People seeing the animation were able to quickly tell me what was wrong and what was correct. After all the animations
were correct, the app was used for years to compare the folding controls of the newer generations of software.

Several times in my career, I've rewritten the same code multiple times, each time based on new customer feedback.
The customer didn't know what they want so I've just iterated on the code over and over until the customer was
satisfied.

These days, UI prototypes may be done by UX designers, the tools used by the UX people allow
them to create advanced interactive prototypes so you might not need to create feedback kits yourself, they’ll
do it for you. So if your team includes a UX, this is not something you want to do every day, but there are
situations when the best option you have, is to make a feedback kit yourself: sometimes it has to be implemented,
people want to see it working before they can decide.

## When to create feedback kits

Create feedback kits to:

- Experiment quickly with different options. Sometimes nobody is sure which is the best option. Not even you.
  Some might think option “A” is the best, some think option “B” and so on. Implement all the options so they can be easily switched between and compared.
- Receive feedback from more people. Involve non-programmers in the feedback loop. The most important people
  that must give feedback on the software are not programmers. So before you implement a feature, create a
  prototype and share that with these people.
- Bring ideas to life. Some ideas cannot be easily expressed in words. You can talk for hours, and nobody will
  know what you mean. What can you do? Implement those ideas, show them running software.
- Solve hard problems. When you need to find the right algorithm for something or the right way to fix a
  problem you need quick feedback. Running the entire software is overkill and time-consuming.
  Create a smaller program that isolates the code you are interested in, and that allows you to iterate fast on it.
- See how something works, not just how it looks. Sometimes people that make decisions are wrong, but you
  cannot tell them that. You need proof. One option you have is to implement the software in two ways:
  the way they insist on and the way you think is the right way.

When the time will come, remember that this is an option you have. It's much better to spend some time on an isolated
piece of code that might be thrown away, than to refactor your entire code base to add or remove a feature
that might be or might not be required.

More often than not, even the client doesn’t know what he wants. Sometimes the only way to find the
answer is to do A/B testing for a feature with the client or with the users of the software.
You need to be prepared to handle those situations.

## Resources

[Calculator Construction Set](https://www.folklore.org/StoryView.py?project=Macintosh&story=Calculator_Construction_Set.txt&sortOrder=Sort+by+Date&topic=Software+Design)
