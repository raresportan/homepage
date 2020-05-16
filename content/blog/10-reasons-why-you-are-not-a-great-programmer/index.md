---
title: 10 reasons why you are not a great programmer
date: 2020-05-14
description: What you have to admit before you become a better programmer
---

Let’s assume you are a programmer with a few problems: Hard to implement change requests, buried under bugs, missed deadlines, overtime, stress, patching weak software, hating your codebase, thinking of finding another gig. 

**Why are you in such a bad shape?  🤔**

## You write magic code

Sometimes a piece of code implements a sophisticated algorithm that few people can understand. 
That code is total magic for everyone else. 

This situation should be rare and code like that should be an exception. But you make most of your code so obfuscated that is total magic for anyone else. You fantasise about people marvelling at the genius of your code, when they most likely think quite the opposite about you.  

 Magic numbers, voodoo people. That’s your thing. And you end up writing code comments like this:
```
// Magic. Do not touch !!! 
```

## Your code is hard to understand 

We spend most time reading, *not writing code*. To add a new feature, to fix a bug, to do a code review: we read code. 
If your code is hard to read, a huge amount of time is spent by anyone who tries to understand it. 
 If somebody modifies code that is hard to understand, they are very likely adding new bugs. 
Even more, after they’re done, the code will be even harder to understand.

After a while, even you can’t understand your code anymore and  you just write frustrating comments like this:
```
 // When I wrote this, only God and I understood 
// what I was doing. 
// Now, God only knows
```


## Your code is hard to use

Your code is used by other programmers. When they complain about your code, you think: 
*“What a jerk! He has the nerve to tell ME that my code is not working properly. I bet he is using it in some twisted way.”*

People use your code because they want to solve a problem not because they want to start a quarrel. When they make these type of comments about your code, it’s your fault, not theirs:
```
// At this point, I'd like to take a moment 
// to speak to you  about the Adobe PSD format. 
// PSD is not a  good format. PSD is not even a 
// bad format. Calling  it such would be an insult 
// to other bad formats,  such as PCX or JPEG. 
// 
// No, PSD is an abysmal format. 
// Having worked on this code for several weeks
// now, my hate for PSD has grown to a raging 
// fire that burns with the fierce passion of 
// a million suns.
//
// PSD is not my favorite file format. 
```


## Your code is a mess 

Sometimes we need to deliver the software ASAP and we must write fast trashy code to do that. 
That it’s OK as long as we remember to rewrite that code when the things cool down a bit.  

But you forget and let trashy code pile up. 
The more you have, the harder your life is. 
You don’t know that trashy code is like a debt. 
Sooner or later you’ll have to pay it back. 
 The good news is that is always easier to criticise and improve something real and 
working instead of a perfect unicorn that lives only in the minds of some. 

Don’t expect to write the best code of the bat, but be brutally honest with where you are so far:

```
 // This code sucks,
// you know it and I know it.   
// Move on and call me an idiot later.
```

##  You come up with lame excuses 

Some people are so good at providing lame excuses. They can find an excuse for anything. 
Nobody likes to deal with these people. These people never provide options.

They don’t think about the issue, they don’t try to find reasonable ways to handle the issue. 
They never do something about it. 

The only thing the do is to spread their lame excuses everywhere: 
```
// This isn't the right way to deal 
// with this, but today  is my last day, 
// Ron just spilled coffee on my desk, 
// and I'm hungry, 
// so this will have to do...
return 42;  
```

## Your code ignores errors

 You always think only about the ideal situation, you don’t care also about the blank state and all the error states. 
You never think about the case when somebody opens the app for the first time. 
There is no data, nothing. 

You never let the user know what you expect him to do, how to add data, what he can do with the app. 
Landing texts, on-boarding tips, there should be something but it’s not.  
Worst, you also ignore errors. 
You never let the user know there is a problem and you never provide options for fixing it. 
At least they should be able to save their work and restart the app.  

You always say *“This should never happen!”*
If people will use your software, they will break it. 
Sometimes, the way an error is handled, it’s all it takes to make the difference between a good day and a bad day for somebody. 

And yet, your code just doesn’t care: 
```
}  
catch (SQLException ex) { 
    // Basically, without saying too much, 
    // you're screwed! 
    // Royally and totally.
 }
 catch(Exception ex){ 
    // If you thought you 
    // were screwed before,  
    // boy have I news for you!!! 
} 
```

## You don’t take responsibility

 Your piece of code is just that, a piece. 
It works together with other pieces. Or should. 
There are always problems when different pieces of code are integrated in the one big app.

When problems arise, you blame others. 
You never try to find the root cause of the problem but you say strange things like: “After looking at the logs I couldn't find any error, so I think the problem is on your side!” 
You always assume is other people’s fault. 
Like a good detective, you need solid proof. 

You never take responsibility for anything and prefer to blame others or you simply don’t care: 
```
// Author here: 
// If this code works, it was written by Paul D. 
 // If not then I don't know who wrote it.
```

##  You are under thinking

 You work on a piece of code. 
You need a solution to a problem so you search for it in the existing code base or online. 
The minute you find something close enough, you just copy-paste it and you’re done. 
Fast and easy, but also wrong. 

You never adapt the solution to your specific context. 
You never fully understand the problem and the solution, you just copy somebody else’s solution. 
You prefer to not use your brain, but borrowing someone else’s. 

You never discover the one simple fact, that everything around you was made up by people that were no smarter than you. 
And that you can change what you don’t like or what you think can be better.
```
// The following was stolen in large part from 
// MSDN  by John & I. I tried to give it back, 
// but they wouldn't take it. 
// I don't blame them… 
```

## Your software is slow

 Sometimes the client says: “Finally we were not able to find any defects, everything works correctly. Just a little issue, we think the app is too slow, it must run at least ten times faster.” 

Your first priority should be to make the code work and that is correct. 
But don’t ignore the performance. 
People can live with bugs and learn how to move around them but they cannot ignore slow software. 

 Everybody hates slow software and will try to get rid of it as soon as possible. 
Never ship slow software.
 You ignore the software performance until is too late. 
When you finally try to fix it, you learn they need a big redesign. 

And the more expensive it is to make a change, the less likely you’ll make it.
```
// This was way too slow. 
 // Just say we didn't find the file. 
```


## The end

All the above problems can be fixed. 
The first step is to admit you have them, and the next time you write a piece of code
ask yourself how you could do it better.

All you need to do is to care a bit about your work.