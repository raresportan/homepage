---
title: How to contribute to open source
pubDate: 2021-10-09
description: We use open source packages to create our software, but we could also contribute to open source by fixing bugs, documentation, tests and so on.
keywords: ["Open source", "Gatsby"]
---

The company I work for, [3PillarGlobal](https://www.3pillarglobal.com/), had a proposal for us: we can allocate a part of our time to work on open source. Each one
can work solo or in groups on open source issues, documentation, tests, whatever we like. I've decided to fix some issues on the [Gatsby repo](https://github.com/gatsbyjs/gatsby),
and one of them was approved and merged. This was my first contribution to open source, but I hope it was not the last.

This is a "postmortem" of that merge, which details my experience and that will hopefully help you contribute to open source as well.

One note, this guide assumes you want to contribute to an open-source project hosted by Github. There are others (like BitBucket) that might use different terminology or things you need to do, but the principles are the same.

## Find a project to contribute to

You should look for something you already use and love. For example, if you use React and Gatsby - like me, look to contribute to those projects because you already have a good idea of how they work.

Another way to find a project to contribute to is by looking at your code dependencies. Find the dependency repo and look for issues to solve.

> A good mental model of how something works is a must.

If you want to contribute with code, another important thing is to know well the programming language that is used to write the code in that project.

> Finally, find out if the project is still maintained. Look around the repo to see when the last code commit was, when the last response from maintainers was, and so on.
> Sadly some projects are abandoned since most open source contributions are voluntary and the contributors are not paid.

## Read and follow the "How to contribute" guide

The first thing you need to do is to find the "How to contribute" guide. The guide is usually present as a `CONTRIBUTING.md` file (e.g here is Gatsby's [CONTRIBUTING.md](https://github.com/gatsbyjs/gatsby/blob/master/CONTRIBUTING.md)).
It doesn't matter if you just want to report an issue, fix an issue, or documentation, you still want to read this guide because it will tell you what is expected from you.

For example, do you want to report an issue? Fine. Did you look if the issue was already reported or not? Can you provide clear steps to reproduce the issue? Ask yourself
how can you help the maintainers fix the issue as best and as fast as possible. You can even investigate the issue yourself and propose a fix.

> If you can find any guide, at least read [Open Source Guides](https://opensource.guide/).

## Find an issue to fix

You can open a new issue and fix it, or just find an existing one.

My advice is to start with small, easy-to-fix issues. It's not very realistic to dream that you can refactor the entire code base or change the architecture of the code.

To find issues to fix, go to the repo's "Issues" and filter the _open_ issues by the following labels (they might be different from one repo to another):
`good first issue`, `help wanted`, `contribution welcome`, `Difficulty: starter`, `Difficulty: easy`.

Look at issue comments to see if somebody else is already working on it or not. Even if they have, try to fix the issue yourself and compare your solution with the others.

## Learn to work with repo forks

Github has a [good starter guide](https://docs.github.com/en/get-started/quickstart/fork-a-repo) for this.
But while you _fork_ a repo once, you need to periodically sync your fork with code from the original repo.

In my case, the origin repo is https://github.com/gatsbyjs/gatsby, and its main branch is called "master".
The first thing I did was to create an "upstream" branch as a _remote_ for my fork:

```bash
$ git remote add upstream https://github.com/gatsbyjs/gatsby
```

The steps I had to repeat each time I've wanted to get in my fork the changes from the original repo were these:

```bash
$ git fetch upstream

$ git rebase upstream/master

$ git push origin master --force
```

## Learn how to run the code on local machine

First, you need to download your fork locally:

```bash
$ git clone --depth=1 https://github.com/your-github-name/your-fork-name.git
```

Then you need to install the dependencies and learn how to start it, run tests, format, and lint the code, and so on.

The way to do any of these is different for each project and should be documented somewhere (e.g for example [Gatsby's Code Contributions](https://www.gatsbyjs.com/contributing/code-contributions/)).

If it is not documented, use your common sense. For example, if you ever worked on an npm project, you know that inside `package.json` is a `scripts` section with the commands that are supported by the project.

After you are comfortable with your setup and everything works _before_ you do any code changes, reproduce the issue you want to fix!
Only after you can reproduce the issue, you should create a new branch and start modifying the code to fix the issue.

> While I did this on the Gatsby repo, I discovered that some tests were failing. This was such a huge disappointment for me that I've almost abandoned it.

## Learn how to make a Pull Request

When you think you have a fix on your branch run tests, code formatters, and linters. Make sure the issue is not reproducing on your branch but is reproducing on the main branch!

Now you need to find out:

- How to name your Pull Request(also called PR) (some repos require specific things to be in a PR name)
- How to link your Pull Request to the issue you're fixing

Make sure you got everything right. You don't want your PR to be lost among many others because you didn't specify the correct info in the PR.

Finally, push your branch and [create your Pull Request](https://docs.github.com/en/github/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork).
Most projects have a CI/CD pipeline in place that runs tests and other things on all PRs. Make sure those checks pass.

> I was lucky, my PR was merged even if the tests didn't pass. Although they didn't pass without my changes also.

## Communicate with the community

> Now you need patience. Don't expect the maintainers to jump on your PR right away. Most likely they have a ton on their plate and other things are more pressing.

Of the two PRs I've opened on Gatsby repo, one was merged, but the other is still there, ignored for now.
That's fine, I'm waiting for the maintainers to comment on it, or close it for some reason, just to do something.

Don't take it personally if somebody asks you to change the code or if they reject your PR. It happens.
But if the maintainers request you something please be ready to help if you can.

You don't have to stay all day refreshing the PR page. For each update to your PR you'll get an email with the update, so make sure you read your email.

Among the things you'll find on a repo is a `CODE_OF_CONDUCT.md` file. Please make sure you follow that code of conduct.

Here is a part of Gatsby's [Code of Conduct](https://www.gatsbyjs.com/contributing/code-of-conduct/):

- Examples of behavior that contributes to creating a positive environment include:

> Using welcoming and inclusive language

> Being respectful of differing viewpoints and experiences

> Gracefully accepting constructive criticism

> Focusing on what is best for the community

> Showing empathy towards other community members

- Examples of unacceptable behavior by participants include:

> The use of sexualized language or imagery and unwelcome sexual attention or advances

> Trolling, insulting/derogatory comments, and personal or political attacks

> Public or private harassment

> Publishing others’ private information, such as a physical or electronic address, without explicit permission

> Other conduct which could reasonably be considered inappropriate in a professional setting

Please follow your repo's code of conduct. Or, you know, just be a nice person 😊.
