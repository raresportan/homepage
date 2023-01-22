---
title: Why there is so much weak software?
pubDate: 2020-07-13
description: We could write better code, we could create better software. But we don’t. Why? There are some good reasons for bad software and we can avoid them.
keywords: ["How to Write Better Software"]
---

We have many great programming languages, IDEs, methodologies, excellent hardware,
best practices, and so on, but still, a lot of weak software is released to users every day.

We could write better code, we could create better software. But we don’t. Why?
Based on my own experience, the main reasons for writing poor code and creating weak software are these:

## Wrong people doing the wrong things

All the stuff we do, all the stuff we put in place, all methodologies, won’t work
unless we fix the root problem: without excellent people, we cannot achieve excellent results.

The best engineers are several times more productive than an average engineer.
This is not because good engineers write code several times faster. It is because they
make better decisions that save several times the work. The software is not written by tools, methodologies,
languages, or frameworks, but by people.

Bug rate (per line of code) is almost constant from the 70s when there were no IDEs,
no methodologies, no fancy languages. Why? Because people still write poor code.

Only excellent people can achieve excellent results. But we are not all experts.
So what can be done? The right people must work on the right job. Not everybody can do the same work.
Everyone should work on the appropriate tasks.

Based on your skill level, you are in one of the following stages:

- Junior/Novice/Beginner
- Advanced beginner
- Competent
- Proficient
- Expert

All projects start nice and pleasant, and usually, everybody is assigned to the right tasks, all is good.
But after a while, when the deadline is approaching, things are starting to get worse.
Experts have too much on their plate and some of the work has to be done by juniors or
by people with little knowledge related to the work they do.

There are teams where everybody does everything. Those teams will create great products only
if they understand this problem: an expert in one domain is usually a novice in another.
I’m not saying that a database developer should always work on databases and a GUI developer
should always do GUIs. Au contraire. Just remember that an expert in one domain will be a novice in another one.

The goal should be to help people advance their skill levels by giving them the appropriate tasks to work on.
We generally take pleasure in a task when it falls in a sort of optimal-challenge zone;
not so easy as to be boring, not too hard to achieve.
A happy programmer is one who is neither underutilized nor weighed down. We like happy programmers.
Speak up if you feel your tasks are too hard or too boring.

## Narrow skill sets

People will apply what they know in all situations. That’s why they should not
try to do tasks they don’t have the skills to do.

> If all you have is a hammer, everything looks like a nail

Everybody, from juniors to experts must improve their skill set.
And everybody must be honest about their skills. There is nothing more dangerous
than expecting experts in one area to perform the same in a different area.
They will try to apply their skills in a context that requires different skills.

No matter what you know:

- Try a new language
- Try a new paradigm
- Try a new type of application
- Try something different

Always learn something new. Improve your skillset. Do you know who gets new work?
Curious people, learners, those who love to tinker with the unknown.
Some people expect the company they work for to provide trainings for new skills
and they will not move a finger on their own. This is a mistake. A good developer
finds time to learn new things on his own.

> If you want to get good at something you need to focus on it, which means choosing
> to exclude some other things from your life. Keep a little journal of what you are
> working on each day, you may find that you aren't applying yourself all that hard.
> Learn something new every single day. - [John Carmack](http://d3dvortex.blogspot.com/2005/07/programming-advice-from-john-carmack-i.html)

## Blindly following “success recipes”

In software development, there is always something new and shiny, trends change all the time.
You read a book or a blog post, watch a video, or find about it at a conference.
There will always be someone presenting the holy grail, a success recipe that
worked for him with incredible results.

There are hordes of methodology gurus, tool vendors, zealots, consultants offering you help.
Everyone claims that their thing is the best, everybody hates the other guy’s thing.
The problem is that those people offering you help never talk about the tradeoffs you have to make.

You don’t know the bad parts of anything (well, maybe except JavaScript), you don’t
know what you give up when you chose some recipe.

There is no such thing as the best solution, be it a tool, a language, or an operating system.
There can only be choices that are more appropriate in a particular context.
But some people are instant believers and will start using that new thing —
this is especially true for those with smaller skillset — the less they know about something,
the more they are inclined to believe everything is said about it.

How many people can tell the bad parts of using a certain famous pattern?
You know the pattern but not when NOT to use it. It’s a hammer in your hand.
Beware that sometimes the cure is not worst than the disease.

One day you realize that you can write the same bad code, the same bad software no
matter the tech stack you are using. You realize the tech stack is not the problem,
but you. That is a good day.

> In the South Seas there is a cargo cult of people. During the war they saw airplanes
> land with lots of good materials, and they want the same thing to happen now.
> So they’ve arranged to imitate things like runways, to put fires along the sides
> of the runways, to make a wooden hut for a man to sit in, with two wooden pieces
> on his head like headphones and bars of bamboo sticking out like antennas—he’s
> the controller—and they wait for the airplanes to land. They’re doing everything
> right. The form is perfect. It looks exactly the way it looked before.
> But it doesn’t work. No airplanes land. So I call these things cargo cult science,
> because they follow all the apparent precepts and forms of scientific investigation,
> but they’re missing something essential, because the planes don’t land. - [Richard Feynman](https://en.wikipedia.org/wiki/Cargo_cult_science)

## Overengineering

One of our greatest sins as developers is overengineering.
We feel like the simple and obvious solutions are not good enough, our great minds
must always create something complicated and incomprehensible. Some of the
overengineering is caused by the languages we use, there is simply no way to do
some things without a lot of boilerplate.

But usually, we are the sinners, with our greed for abstraction and smartness.

> Any intelligent fool can make things bigger and more complex... It takes a touch of genius —
> and a lot of courage to move in the opposite direction. - E. F. Schumacher

Look at your code and design and ask yourself: Will anybody ever understand
what I'm doing here? Try to explain your design to somebody: Did they understand any of it?
Did they understand the reasons behind it? If you can’t explain it simply,
you don’t understand it well enough.
If they have problems understanding it while you are there, answering their question,
how somebody that will read your code later will understand any of it?
Sometimes the best solution to a problem is to not solve it. We try too much to solve too many problems.

Remember this:

- Less code is better than more code.
- Small is better than big.
- Simple is better than complex.
- Isolated is better than coupled.
- Obvious is better than clever.

## Data lost in code

When you ask people to explain the design of their app they will tell you about
classes, objects, inheritance hierarchies. How data flows through the app?
Nobody knows for sure, is too complicated to explain.

When something changes, what is the execution flow? Which things are affected and in which way?

_The purpose of any code is to transform data._ Only write code that has direct, provable value,
that transforms data in a meaningful way. Design the data, not the code.

When looking at the structure of a system, we’re less interested in seeing how the code interacts — 
we want to see how the data interacts and flows. If someone tries to explain a system by
describing the code structure and does not understand the rate and volume of data flow,
they do not understand the system.

If you don’t understand the data you don’t understand the problem.
Different programs require different solutions. Understand the problem by understanding the data.

If you don’t understand the cost of solving the problem, you don’t understand the problem.

## Inconsistency

One of the most important generator of code complexity is inconsistency.

Inconsistent code means:

- Chaos
- Bugs due to misunderstandings
- Communication problems
- People will not understand other people's code
- Bad decisions will never be fixed because will never be recognized
- The complexity of the code will grow forever

_Most_ of the code should be consistent. It should follow the same principles, guidelines,
techniques, programming language, programming style, etc.

Consistent code reduces cognitive load:

- You can read the code made by somebody else
- You can read code you made months ago
- You can understand code that is consistent with the code you make
- You can fix code that is consistent with your code

Also, consistency can remedy most of the previous causes of bad code:

- There are rules and guides to follow so people will do the wrong things less often.
- People will have to learn the techniques and guides to be consistent, their skill set will improve.
- Little room for “success recipes," all the recipes that can be used will be obvious.
- No more over-engineering, just follow the rules to fit in new code

> Most serious software development projects use coding guidelines. These guidelines are
> meant to state what the ground rules are for the software to be written: how it
> should be structured and which language features should and should not be used.
> Curiously, there is little consensus on what a good coding standard is. - [Gerard J. Holzmann - NASA](http://spinroot.com/gerard/pdf/P10.pdf)

## Complexity unleashed

No matter how hard we think about the design of the app, how carefully we are when
adding new code, or change existing code, as the code base grows, complexity will creep in.
There will be occasional shortcuts, hard-codings, quick fixes and there will be always
change requests: requirements change so our code changes.

One day you will realize your carefully crafted architecture is no more, is lost in a sea of noise.
Every project starts nice and pleasant. It’s a beautiful day, we got our stand-ups, our methodologies.
Features are implemented with ease. Everyone is happy. As the code base grows, a new presence is
starting to lurk in the corners: the code already written.

It will completely dominate what we do. Features are becoming harder and harder to add,
there are always unexpected side effects, things get broken more often. We add new features,
implement change requests. We have to make that software do more, differently, better.
And as we try to do that, we are challenged to understand our existing code: Once your
software is of a certain size you’ll be dominated by the complexity. No matter what
processes you’re using, how well you test, anything else. The complexity of already
written code will dominate what you can do. One day you no longer understand the size
and the power of the code already written.

You cannot estimate correctly how much work will take to implement new things because
you don’t understand the size and the power of the technical debt elephant.
The situation becomes worst and worst. You are afraid to touch any code because you
can always break something. Every code change is pain. You cannot reason about
the ramifications of the code change. Often the code breaks in surprising places.

> Reduce the complexity you have, so you can do more. Other things are important but this dominates. - [Rich Hickey](https://www.youtube.com/watch?v=rI8tNMsozo0)

Knowing how to code is not enough. The same problem can be solved in many ways.
But only some of those ways are good. You need to develop a sense of what is good
and what is not. When you know what to avoid, good solutions are much obvious.

---

This post is part of the `How to Write Better Software` series, in which I try to articulate
my throughs and believes while searching for better ways to make software:

- [What Makes Good Code Good](/what-makes-good-code-good/)
- [10 Reasons Why You Are Not a Great Programmer](/10-reasons-why-you-are-not-a-great-programmer/)
