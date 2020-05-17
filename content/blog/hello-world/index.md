---
title: Hello, World!
date: 2020-05-01
description: What I'm writing about
---

Turns out there is good side to this pandemic situation we all have to live with in 2020: I finally have time to start a blog.

I'll write about programming. About the things I've learned along the way all these years and I'm still learning every day as a programmer. About how to be a better programmer.

I like to write in first person style. While I'm writing, I imagine I'm talking with my reader.

So, let's begin.
___

Let’s make it clear from the beginning that our job as programmers is to create and deliver software. 

##  Software that works is our number one priority 

We are not paid to create designs, write code, do tests, documentation, build scripts, make plans and schedules. 
These are just the means to reach the goal, these are just the costs of creating the software. 

We are paid to deliver software that works. 

## Good software is all we care about

 There is software that is successful and software that is not. 

Successful software is the one people like to use. 
It might not be always the best, but it is always good.  
Our job is to do whatever it takes to deliver good software. 

Even if we are frustrated when requirements change all the time or we are unhappy because there is no time to polish a feature. 
Even when we are disappointed because we cannot use the latest shiny technology that makes waves on the Internet. 

Why we always forget that horrible software or awesome software can be created using the same tech?

```
 Good Software =  Meets requirements + 
                 Delivered when needed + 
                 Appropriate cost + 
                 Quality product  
```

All of the terms from the equation are equally important. One of them is quality. And it represents 25% of the equation. 
Sadly all of them are really important.
We don’t ship source code, our users don’t look at our code and say *“Ah, that’s so pleasant”.* 
They don’t make wallpapers with our source code. 

They run our software. 

##  Better software, not the best 

The goal of this blog is to share some ideas that made me question the way I code, and ultimately the way I create software. 
Ideas that made me think differently. I didn’t found yet the magic bullet to create the perfect software but that’s fine, 
I just want to get better at it.

We are all unique, have unique experiences, we are the shape revealed by connecting the dots of our experiences. 
You should consider the things you’ll read, just as some of the dots you have to connect. 
You will not find here a full image, a dogma to follow blindly, a miraculous methodology. 
Just some dots that you will hopefully connect someday.

Maybe there is no magic bullet to create perfect software. But let’s try to get better at it. Every day.


> We are simply never going to realise a state of software nirvana where everything is supremely satisfying. 
That’s an important emotional realisation. The fundamental reward of an improvement process is the experience 
of betterment, not some mythical destination.  - [Mark Slee](https://engineering.fb.com/uncategorized/thoughts-on-software-quality/) 



```js
'use strict';            

/*    

    As the other primitive values, Strings are immutable.
    16 bits per character.
    You can compare similar strings with ==

    Can use double quotes (" ") and single quotes (' ') for strings.
    For multiline strings use back-ticks (` `).

    A string has lots of useful methods like:
    - length
    - indexOf 
    - substring 
    - toLowerCase & toUpperCase    

    There's no char type, but you can work with a string's chars.

*/

const fix = "Have you tried turning it off and on again?";
console.log(fix);

// strings have methods
console.log(fix.toUpperCase()); 
console.log(fix.length); 

// to combine several string into one you can use +
const abc = "a" + "b" + "c";
console.log(abc);

const stringFromNumber = 1 + ""; 
console.log(stringFromNumber); 

// another way to transform primitives to string using String function
const stringFromSomething = String(123);

const hiragana = "\u3041";
console.log(hiragana);

const specialChars = "One\nTwo";
console.log(specialChars);

const multiline = `
    Roses are red
    Violets are blue
    Unexpected } on line 32
`
console.log(multiline);

// Strings enclosed by the back-tick are called template literals 
// Template literals allow string interpolation
const lang = "Java";
const interpolated = ` 
    - Honey, I can't open the jar!
    - You need to download ${lang}!`
console.log(interpolated);


// -- Exercises --

// Format a 10 digit phone number to a readable version: 0742552233 -> 0742.552.233
// using substring 
const formatPhoneNumber = phoneNumber => {
    let result = '';
    // your code here


    return result;
}
console.log(formatPhoneNumber("0742552233")) // 0742.552.233


// Black out word: Given a phrase and a word, replace each word's chars with *, 
// leave all other words as they are. Use indexOf and substring
const censor = (phrase, word) => {
    let result = '';
    // your code here

    return result;
}
console.log(censor('JFK was killed by KGB', 'KGB')) // JFK was killed by ***




```