---
title: The two styles of writing code
pubDate: 2020-09-26
description: Writing code is like writing prose (The top-down approach) and Compression-oriented programming (The bottom-up approach)
keywords: ["How to Write Better Software"]
---

What is programming fundamentally about? Programming is about transforming data: is the act of
creating a sequence of computer instructions describing how to process input data to create
some output data.

It's all about data and transforming the data:

| DATA            | TRANSFORMATION  |
| --------------- | --------------- |
| Information     | Procedures      |
| Types           | Behaviour       |
| Data structures | Transformations |
| Collections     | Operations      |
| Facts           | Processing      |
| Memory          | CPU             |

Programming is **NOT** fundamentally about the code. There are alternatives to code. For example, Quartz Composer
is a famous design tool used by many professionals to create animations, prototypes, and demos. Facebook built
Origami Studio on top of it. Scratch is a visual programming environment used to teach kids programming concepts.

Yes, code is usually the best tool for the job but its just a tool. Sadly we are not learning this. Teachers,
books, learning materials always focus on code instead of problem-solving and this is pretty bad.

When the emphasis is put on the code not on solving the problem, bad things happen, just as when we try to
sound smart instead of using a simple and clear language. Use the code as just as it is: a tool.
You should write simple and straight code that helps solve problems, not code that creates new problems.

There are two ways to write good code:

- Writing code is like writing prose (The top-down approach)
- Compression-oriented programming (The bottom-up approach)

## Writing good code is like writing prose

> You might not think that programmers are artists, but programming is an extremely creative profession. It’s logic-based creativity. - John Romero

Most people believe that the best way to create software is the top-down approach.
To start at the highest level and drill down to the lowest levels. To create software very much like prose.
In some ways, writing software is very much like writing anything else: a blog post, a book, a paper.
Maybe we are software writers more than software engineers.

An important difference between prose and code is that once the prose is published, it is done.
No so with code, the code is always changing. Also while people read prose for entertainment, people read code so
they can modify it. (Truth is, some do it for entertainment also, those who consider horror novels too soft, can read some code for a change.
The abominations they can find in some codebases are incomparable to anything else.)

Successful prose is at least readable, comprehensible, follows some logic, and maybe is even interesting.
Good code should be just as easy to read and follow as prose.

The process of writing prose and code has some unquestionable similarities. They start the same,
with a fuzzy idea on the back of a napkin, and some evolve to a finished product.

### The Big Idea

Everything starts with an idea. With an urge, with a wish.
The path from idea to the final product is very long and tough. You have to make sure it is worth it.
It is much better to abandon a bad idea than to invest your time in a finished bad product.

But let’s say you have a great idea of a book or for software. (I had the idea of this book, so yes, this is possible.
Also, I had an awesome idea of making a code teaching software but Apple beat me to it with Swift Playgrounds)

### Outline

I start writing prose with an outline. Is not perfect, nor is it final, but is a great way for organising my thoughts.
Once an outline is in place, the rest of the writing becomes much easier.

An “outline” is also great for writing software. I like to take some time to think about the functionality I’m adding, what interface it might have,
what data it needs, and what data it returns, how data flows. Sometimes I draw things on paper, sometimes I create a flow chart,
and sometimes I write an actual outline as comments. Depends on how complex is the problem I’m trying to solve.

The key is that I take some time to think through what I’m trying to build before I start building it. We, software developers, call this phase “design”.

### Draft

After the outline is in place, I try to write everything I have to say to connect my bullet points. I am not worried about
the quality just yet. I like to take the same approach with code. Once I have a general idea of what I am trying to build
I go for it. Most of the time when I start to write something, I don’t know how things will end up. I need the freedom
to experiment.

We, developers, call this phase a “spike”. I use TODOs, hardcode things, copy-paste things, I do what I have to do to make
it work. I’m done, right? Some people stop here. They have working code so they think they are done.

### Proofreading

No, what I wrote was just a first draft. Now that the code is working is time to focus on clarity.
While when writing I should omit needless words when writing code I need to omit needless abstractions and complications.

After my draft is done, I like to go back and read my prose slowly out loud. I strive for my writing to roll off the tongue
as if I am having a conversation. Often I end up rewriting full sentences and paragraphs.
Sometimes I throw away large portions of text. I cut out filler words that add no value.

I like to do similar things with my code. I find this time ideal for writing tests. I already know how and what I am trying to build,
yet I still refactor things, making them easier to test. This is a great time to rename variables and function names.
I imagine myself reading my code for the first time. Can I tell what my code is doing? Take a function, a class, and ask:
How can I rewrite it to make it better? More simple and clear? Adding comments to functions or variables sometimes
has a weird effect: the comment says something but the function name says something else — so I have to change one of the
two to make them consistent.

The rule of thumb is this: a good name is better than a good comment, but a good comment is better than nothing.
Names > Comments > Nothing. We, developers, call this phase “implementation”.

> Vigorous writing is concise. A sentence should contain no unnecessary words, a paragraph no unnecessary sentences, for the same reason that a drawing should have no unnecessary lines and a machine no unnecessary parts. This requires not that the writer make all his sentences short... but that every word tell. - William Strunk Jr.

### Editing

I do my best proofreading after I get some time away from my writing, but, no matter how many times I review my prose,
I always miss something. My chance of having a better prose increase exponentially with every person that gets to read it.

The same thing can be said about my code. That is why code reviews so invaluable. Reviewers are always able to find something
that I’ve missed or given me a new perspective. Just the thought that I’ll have to show the code to somebody else and
explain to them what I was trying to do, makes me refactor and rename things. Some people use a rubber duck as a reviewer
with great success.

This phase is “code refactoring”.

### Fixing errors

My writing is never perfect. I always welcome feedback, both positive and negative, because it gives me a chance to do better.

The same is the case with software. While I try hard not to crash the software, I accept that I will make mistakes. In writing, I monitor what people are saying about my work. In code, I monitor what users are saying about my software and audit logs.
I throw errors when unexpected things happen. We call this phase “bug fixing”.

Writing anything is not hard science, you cannot measure how good your writing is, how successful your book or software will be.
There is no list to follow to produce great writing all the time. You have to develop an eye for it. Different people have different approaches to writing code.

Writing a to-do on a sticky note is a very different process from writing “Game of Thrones”. In the same way, writing a “Hello world” will be a very different process from writing “Microsoft Word”. Usually, we end up writing something in between, so more or less, we can follow a single process.

This approach works when:

- You want to nail down a design
- You do Test Driven Development
- You have enough information
- You have other examples to follow
- You add a piece to a big piece
- You don’t need the best solution and you don’t worry about performance

But this approach doesn’t always work.

## Compression-oriented programming

Some programmers hate the previous approach. Their idea of doing quality software is quite different.
They argue that software should be built the other way around, taking a bottom-up approach, sometimes called _compression-oriented programming_.

There are some valid complaints against the traditional top-down approach, here are the most important and how they can be fixed.

### Not getting the details right.

Most programming methodologies claim to do things abstractly (UML diagrams, class hierarchies, systems of objects, etc.)
but they usually fail to achieve the best solutions, because the hard part of code is getting the details right.

Starting when the details don’t exist, inevitably means you forget or miss something that will make your design fail or lead to suboptimal results.
But starting with the details and repeatedly _compressing_ the code until you arrive at the eventual design, avoids all the pitfalls of trying to conceive the design ahead of time.

### Wasting time and ending up more confused.

Some object-oriented “methodologies” tell you to start writing things on index cards (like the “class responsibility collaborators” methodology), or using a UML modeler to show how things
“interact” using boxes and lines that connect them. You can spend hours with these methodologies and end up more confused about the problem than when you started.

### Code is not about objects.

The fallacy of object-oriented programming is exactly that: code is at all _“object-oriented”_ when it isn’t.
Code is procedurally oriented, it's about behavior, about functions and the _“objects”_ are simply constructs that arise that allow procedures/functions to be reused.

If you understand this instead of trying to force everything to work backward, programming becomes immensely more pleasant.

### Unnecessary complex code.

But if you just forget all those methodologies, and write simple code, you can always create your objects after the fact and you will
find that they are exactly what you wanted. If you’re not used to programming like this, you may think this is an exaggeration, but it's the only way for some developers.

## When performance is crucial

For some (sadly not all) programmers, like game developers, performance is crucial. They need to squeeze performance from every bit of memory and CPU cycle.
If they use objects, they load in-memory data that is not needed and thus they have cache misses and reduced performance.

Let’s explain this with a simple example. A game typically has a loop might look like this:

- Game logic updates
- Rendering
- Physics updates

Each of the above loop piece iterates over a collection of things. Each piece needs its specific data:

- Game logic needs to iterate over game logic data
- Rendering needs to iterate over rendering data
- Physics needs to iterate over physics data.

There are two ways to implement this:

- Using “Game objects”: Each object has its game logic data, rendering data, and physics data. For example, a “Character” object contains logic data (health, damage, position, etc.), rendering data (sprites, textures, animations, etc.), and physics data. The problem is that when the game logic update runs, all data, for all characters is loaded in the CPU, including unneeded data (rendering data is not used by the game logic.)
- Using “data collections”: Instead of having “Character” objects, we have a couple of “data collections”: game logic collection, rendering collection, physics data collection. For each game character, we have an entry in each of the collections. Now when the game logic runs, it will iterate only over the game logic data collection, the rest of the collections will not be used. The CPU cache will be loaded only with the needed data.

Taking a top-down approach would have led us to the “Game objects” implementation because — ignoring the details — that is the obvious solution but not the optimal solution.

The steps of creating the software using compression-oriented programming approach are very different:

## Just code

Write lots of trashy code. Without any regard to “DRY,” “correctness,” “abstraction” or any other buzzword, begin by just typing out exactly
what needs to happen in each specific case and get that working. Don’t resist it, at the end of the day you need code that runs, so usually it’s best just go write a substantial amount of trashy code.

## Pull out reusable portions of code

When you find yourself doing the same thing a second time somewhere else, that is when you should pull out the reusable portion in a function or class, effectively “compressing” the code.
**Compressing** the code is better as an analogy, because it means something useful, as opposed to the often-used “abstracting,” which doesn’t imply anything useful.

Waiting until there are (at least) two examples of a piece of code means you not only save time thinking about how to reuse it until you need to,
but it also means you'll have at least two different real examples of what the code has to do before trying to make it reusable.

## Make your code usable before you try to make it reusable.

Is much much easier to handle duplicate code than twenty wrong _interleaved abstractions_.
This is crucial, because if you only have one example, or worse, no examples (in the case of code written preemptively), then you're very likely to make mistakes and end up with code that isn’t conveniently reusable.
This leads to even more wasted time once you use it, because either it will be hard to use, or you’ll have to rewrite it to make it work the way you need it to.

So try hard to not make code “prematurely reusable.”

## Focus first on functionality then focus on architecture

We need to deliver quality software on time and under budget. Therefore, focus first on features and functionality, then focus on architecture. Get it wrong a few times and iterate on it.
It’s quicker to rewrite code instead of refactoring the design.

Business logic is code characterized by a never-ending series of edge cases and quick and dirty hacks, sometimes cutting corners
to save a considerable amount of time is reasonable. Why? A lot of programming is exploratory, and it’s quicker to get it wrong a few times and iterate than to get it right the first time.

## The story of the video game health bar

While in a game programming class, two colleagues got the task of implementing (in Java) a “health bar” for the player.

_Developer #1_
Thinks he needs some pixels on the screen. Some green pixels that resemble a rectangle. He’ll just use the `Rectangle` class.
It has `x` and `y` for the position, `width` and `height` for size… should be OK.
Creates some code that puts the rectangle on the screen. Adds a function that animates the resizing of the rectangle.
Two hours later he is done.

_Developer #2_
Thinks about what he learned… He needs some classes, to encapsulate things… Spends some time thinking if he needs an Abstract class or an Interface or a Factory.
He finally starts doing a `VideoGameHealthBar` class. `VideoGameHealthBar` has methods like `increaseHealthBarPointByOne`.
So he creates this nice code structure, verbose and explanatory. But he doesn’t know how to implement them.

A week later he asks the other developer for help.

The first programmer asks the second _“Why you don’t use a rectangle? Call it RectangleHealthBar or whatever but is just a rectangle: it has an x and y, width and height, a color.”_
The second programmer is speechless. He cannot comprehend the simple solution, he is thinking in classes and connection between classes,
he simply cannot see the forest for the trees.

_No matter what style you like, top-down or bottom-up is important to write code that solves the problem!_

## Resources

- [Writing Good Code is a lot Like Writing Prose](https://www.alexkras.com/writing-code-is-a-lot-like-writing-prose/)
- [Semantic compression](https://caseymuratori.com/blog_0015)
- [What Programming is Never About](https://www.youtube.com/watch?v=Lzc3HcIgXis)
