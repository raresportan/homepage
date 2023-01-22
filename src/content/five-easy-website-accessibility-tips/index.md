---
title: Five easy website accessibility tips
pubDate: 2020-09-28
description: Things I've learned from Inclusive Design 24 2020
keywords: ["a11y", "HTML", "CSS"]
---

Lots of excellent talks at [Inclusive Design 24](https://inclusivedesign24.org/2020/).
Two of them, _"Writing even more CSS with Accessibility in Mind"_ by Manuel Matuzovic and _"Emergency Website Kit"_ by Max Böck
were particularly useful for me, I've learned a few things and used some of them to improve the accessibility of this site.

Hopefully, you'll find them useful also. Here they are:

### Set the correct base font size

While I use `rem` units in CSS in most cases, I set up the body font as `16px`. Looks like this was a mistake,
I should use `1rem` because some users might need a larger default font size.
_Lesson learned: Never use px for font sizes!_

```css
html,
body {
  margin: 0;
  padding: 0;
  font-size: 1rem;
  font-family: "IBM Plex Sans", Arial, Helvetica, Verdana, sans-serif;
  min-height: 100vh;
  color: var(--color);
}
```

### Disable animations when user prefers no motion

Animations can trigger nausea, dizziness, and headaches in some users so they would not want to
see out fancy animations. We can use the `prefers-reduced-motion: reduce` media query to detect
this situation and disable all animations:

```css
@media (prefers-reduced-motion: reduce) {
  .dark .missing .lightbulbstring .lightcircle,
  .lightbulbstring:hover .lightcircle,
  .parallax > use {
    animation: none !important;
  }

  a {
    transition: none;
  }

  .post {
    scroll-behavior: auto;
  }
}
```

### ARIA attributes

I already had semantic HTML tags, `<header>`,`<main>`, and `<footer>` but it looks like we can improve the accessibility
by setting the role of these sections.

```html
<header role="banner">...</header>

<main role="main">...</main>

<footer role="contentinfo">...</footer>
```

I also have a couple of SVGs that are used just for making the site look more interesting. They have no functional value,
so I've added `role=presentation` on them, so they are ignored by screen readers and other ARIA compliant tools:

```jsx
<div role="presentation" className={`waves-container ${className || ""}`}>
  <svg
    className="waves"
    viewBox="0 24 150 28"
    preserveAspectRatio="none"
    shapeRendering="auto"
  >
    <defs>
      <path
        id={id}
        d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
      />
    </defs>
    <g className="parallax">
      <use href={`#${id}`} className="wave1" x={wave1X} y="0" />
      <use href={`#${id}`} className="wave2" x={wave2X} y="3" />
      <use href={`#${id}`} className="wave3" x={wave3X} y="5" />
      <use href={`#${id}`} className="wave4" x={wave4X} y="7" />
    </g>
  </svg>
</div>
```

### Using time tag

I've used a `<small>` tag to display the post publication date but `time` is much better:

```jsx
<time dateTime={node.frontmatter.date}>
  {formatDate(node.frontmatter.date)} • {node.timeToRead} min read
</time>
```

### Fix site name header

For the site name, I've used an `h1` on the index and an `h3` on the blog post pages.
The problem is that this is not correct on the blog post since the page headings are in the wrong order: h3, h1, h2.
To fix it, I've replaced the `h1` and `h3` with a simple `div`.

```jsx
<header role="banner" className="main-header centered-content">
  ...
  <div className={"site-name"}>{header}</div>
  ...
</header>
```

## Resources

You can find more interesting tips here:

- [Writing even more CSS with Accessibility in Mind](https://www.youtube.com/watch?v=o6ssu5oKyaU) / [Slides](https://noti.st/matuzo/lWUq2w/writing-even-more-css-with-accessibility-in-mind)
- [Emergency Website Kit](https://www.youtube.com/watch?v=8RdrRCq8VzU&list=PLn7dsvRdQEfGkK9xxk54XdKTLk7zf_Qwp&index=11) / [Slides](https://noti.st/mxb/a1xCB1/emergency-website-kit)
- [The entire Inclusive Design 24 #id24 2020 playlist](https://www.youtube.com/playlist?list=PLn7dsvRdQEfGkK9xxk54XdKTLk7zf_Qwp)
- [Accessibility for Vestibular Disorders: How My Temporary Disability Changed My Perspective](https://alistapart.com/article/accessibility-for-vestibular/#section5)
