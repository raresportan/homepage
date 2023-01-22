---
title: Make the code efficient
pubDate: 2021-03-06
description: Software that works is not enough. It must be fast and efficient. Here are some ideas.
keywords: ["How to Write Better Software"]
---

One quote that I hear a lot is this one: “Premature optimization is the root of all evil.” I hate that quote because
is used by people as an excuse to make slow and laggy code.

They say: _don't tell me about performance and optimizations, we should not care about such things now, we will do it later._
That quote is out of context. If we look at the context, we get a different interpretation:

> We should forget about small efficiencies, say about 97% of the time: premature optimization is the root of all evil. Yet, we should not pass up our opportunities in that critical 3%. - Donald Knuth

Forget about the small things but do not skip **the critical 3%.**

At the function level, you can optimize later. But a bad design cannot be fixed. So you need to spend some time thinking about the design of your software.

At some point, I and my team released an app that was very hard and tedious to do. When we believed we're out of the woods, we received the following
feedback from our client: _"Everything works correctly, but it must run *ten times faster*."_ We had to redesign almost the whole thing.

What do you need to do to make the software more efficient? Here are some ideas.

## Use your common sense

Move around the smallest amount of data. I worked on two similar projects. Both had a UI and a server.
The amount of data moved between the UI and server was much higher in one of the projects. One project always
moved around ALL the data and the other project moved around ONLY what was changed.

Process the smallest amount of data. Back to the two projects example:

- In the first case, you always get from the server the response with ALL the data. So you have to check all the data if is changed or not.
- In the other case, you get a small response with partial data from the server. Processed data is much smaller in this case.

### Outcome:

- CPU usage will decrease
- Memory usage will decrease

## Skip unnecessary processing

If the value you are interested in doesn't change, skip the value change handling.
How do you know if a value has changed? You keep a version and compare it with the new version. What is the fastest way to compare two values? You compare them by reference.

This is one of the strong points of functional programming where you never mutate data.

### Outcome:

- CPU usage will decrease
- Memory usage will _increase_

## Cache expensive processing results

Caching network resources like images and other static files is a known practice.
But you can also cache the results of expensive processing. If you have pure factions that for the same input return the same output, you can cache the outputs.

Also, think about the API calls whose responses can be cached. You don't want to do the same API call every minute and get back the same response.
Yes, cache invalidation is complicated, but the gains are worth it.

### Outcome:

- CPU usage will decrease
- Memory usage will _increase_
- Network traffic will decrease

## Batch process things

Do this when the setup/teardown of the processing is expensive.

I'll never forget one issue I had on a project, the system was incredibly laggy because of the logger. In most systems, the logger writes strings to a file on disk synchronously. Each time you log something, the file must be open, blocked from other writes, released, etc.
Working with the disk is very slow.

A simple improvement of a logger would be to gather multiple log messages in a buffer and write them only when the buffer reaches a limit or a certain amount of time has passed.
This small change in the logger had made my system much more performant.

### Outcome:

- CPU usage will decrease
- Memory usage will _increase_

## Parallel processing

Try to decouple auxiliary and secondary processing from the core one. Things like logging, audits, etc., should run on separate processes/threads so they don’t interfere as
much with the core processing.

This is simple when you use functional programming, but had when everything can mutate objects anytime.

### Outcome:

- All CPU cores will be used

## Reuse expensive things

We reuse a car but we throw away plastic coffee cups. Some things are expensive and some are not, so - as in real life where you don't buy a new car
every time you need a drive - treat expensive things with care.

Creating and destroying things in memory is sometimes expensive and slow. In these cases keep the expensive objects in pools.
When you need it get it from the pool instead of creating it. When you are done with it, release it back to the pool instead of destroying it.

### Outcome:

- CPU usage will decrease
- Memory usage will _increase_

## Use shared data templates

Or how to reduce memory usage.

Imagine you have a data structure for 1 million objects. Each object has some common properties with others but also has
unique properties. Those common properties like size, color, type, etc., are duplicated 1 million times in memory, once for each object.

A better option is to create a single object, called Template that has the size, color, type, etc., and an extra id.
In all the objects replace the common properties with the id of the template. Each time you need to access them just get them from the associated template.

This technique, called the [Flyweight pattern](https://en.wikipedia.org/wiki/Flyweight_pattern) is one of the very few ways to reduce memory usage.

### Outcome:

- Memory usage will decrease

## Things you need to know about optimizations

- Measure something before you optimize it. How do you know if you are making it better or worse? Or which optimization works best? Have to measure and compare the results and see what works best.
- Always improve the performance of the weakest link. Your code is as fast as the slowest piece of your code.
- Improving one module doesn’t always mean the same overall performance improvement. For example, if you improve the performance of a module by 50% and the module usage is 10% of the entire app, you can see a 5% overall improvement. You get the same 5% improvement if you improve by 10% the performance of a module with 50% usage.
- Use the right algorithm or data structure. There are some types of problems that can be solved very efficiently by some algorithms. If you don’t know the algorithms, you cannot optimize the code.

Software that works is not enough. It must be fast and efficient.
