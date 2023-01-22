---
title: "CSS units Cheat Sheet"
pubDate: "2022-5-29"
description: "There are a lot of ways to specify the size of text or a container, so here is a Cheat Sheet with most the units available"
keywords: ["CSS"]
---

Long gone are the days when we used to use only 'px' (pixels) in our CSS. Today there are a lot of options to choose from.
What unit you choose depends on the context, some should be used for text, some for containers, some for print.

| Unit  | Name                               | Equivalent to                                                | Relative to                        |
| ----- | ---------------------------------- | ------------------------------------------------------------ | ---------------------------------- |
| cm    | centimeters                        | 1cm = 37.8px = 25.2/64in                                     | Absolute (Used for print)          |
| mm    | millimeters                        | 1mm = 1/10th of 1cm                                          | Absolute (Used for print)          |
| Q     | quarter-millimeters                | 1Q = 1/40th of 1cm                                           | Absolute (Used for print in Japan) |
| in    | inches                             | 1in = 2.54cm = 96px                                          | Absolute (Used for print)          |
| pc    | picas                              | 1pc = 1/6th of 1in                                           | Absolute (Used for print)          |
| pt    | points                             | 1pt = 1/72th of 1in                                          | Absolute (Used for print)          |
| px    | pixels                             | 1px = 1/96th of 1in                                          | Absolute                           |
| em    | parent font size                   | 1em = parent font size                                       | Font                               |
| rem   | font size of the root element      | 1rem = size of root element                                  | Font                               |
| ex    | height of letter 'x'               | 1ex = height of the glyph 'x'                                | Font                               |
| rex   | height of root letter 'x'          | 1rex = height of the root element glyph 'x'                  | Font                               |
| ch    | width of number 0                  | 1ch = width of glyph '0'                                     | Font                               |
| rch   | width of root number 0             | 1ch = width of root element glyph '0'                        | Font                               |
| ic    | width of gliph 水                  | 1ic = witht of glyph '水'                                    | Font                               |
| ric   | width of root gliph 水             | 1ic = witht of root element glyph '水'                       | Font                               |
| cap   | height of capital letters          | 1cap = height of a capital letter                            | Font                               |
| rcap  | height of root capital letters     | 1cap = height of a root element capital letter               | Font                               |
| lh    | line height of the element         | 1lh = height of the text line                                | Font                               |
| rlh   | line height of the root element    | 1rlh = height of the root text line                          | Font                               |
| vw    | default viewport width             | 1vw = 1% of the default viewport's width.                    | Viewport                           |
| vh    | default viewport height            | 1vh = 1% of the default viewport's height.                   | Viewport                           |
| vi    | default viewport inline size       | 1vi = 1% of the size of the viewport in the inline direction | Viewport                           |
| vb    | default viewport box size          | 1vb = 1% of the size of the viewport in the block direction. | Viewport                           |
| vmin  | default viewport minimum dimension | 1vmin = 1% of the default viewport's smaller dimension.      | Viewport                           |
| vmax  | default viewport maximum dimension | 1vmax = 1% of the default viewport's larger dimension.       | Viewport                           |
| lvw   | large viewport width               | 1lvw = 1% of the large viewport's width.                     | Viewport                           |
| lvh   | large viewport height              | 1lvh = 1% of the large viewport's height.                    | Viewport                           |
| lvmin | large viewport minimum dimension   | 1lvmin = 1% of the large viewport's smaller dimension.       | Viewport                           |
| lvmax | large viewport maximum dimension   | 1lvmax = 1% of the large viewport's larger dimension.        | Viewport                           |
| svw   | small viewport width               | 1svw = 1% of the small viewport's width.                     | Viewport                           |
| svh   | small viewport height              | 1svh = 1% of the small viewport's height.                    | Viewport                           |
| svmin | small viewport minimum dimension   | 1svmin = 1% of the small viewport's smaller dimension.       | Viewport                           |
| svmax | small viewport maximum dimension   | 1svmax = 1% of the small viewport's larger dimension.        | Viewport                           |
| dvw   | dynamic viewport width             | 1dvw = 1% of the dynamic viewport's width.                   | Viewport                           |
| dvh   | dynamic viewport height            | 1dvh = 1% of the dynamic viewport's height.                  | Viewport                           |
| dvmin | dynamic viewport minimum dimension | 1dvmin = 1% of the dynamic viewport's smaller dimension.     | Viewport                           |
| dvmax | dynamic viewport maximum dimension | 1dvmax = 1% of the dynamic viewport's larger dimension.      | Viewport                           |
| deg   | degrees                            | 1deg = 1/360 of a full circle                                | Circle                             |
| grad  | gradians                           | 1grad = 1/400 of a full circle                               | Circle                             |
| rad   | radians                            | 1rad = 1/2π of a full circle                                 | Circle                             |
| turn  | turn                               | 1turn = a full circle                                        | Circle                             |
| s     | second                             | 1s = 1/60 of a minute duration                               | Time                               |
| ms    | millisecond                        | 1ms = 1/1000 of a second duration                            | Time                               |
| Hz    | Hertz                              | 1Hz = one occurrence per second                              | N/a                                |
| kHz   | killoHertz                         | 1kHz = 1000Hz                                                | N/a                                |
| dpi   | dots per inch                      | 1dpi = one dot per inch                                      | Resolution                         |
| dpcm  | dots per centimeter                | 1dpcm = one dot per centimeter                               | Resolution                         |
| dppx  | dots per pixel                     | 1dpcm = one dot per pixel                                    | Resolution                         |
| fr    | flex fraction                      | 1fr = a fraction of available free space                     | Grid layout only                   |

Soon there will also be container relative units:

| Unit  | Name                   | Equivalent to                         | Relative to |
| ----- | ---------------------- | ------------------------------------- | ----------- |
| cqw   | container width        | 1% of a query container’s width       | Container   |
| cqh   | container height       | 1% of a query container’s height      | Container   |
| cqi   | container inline size  | 1% of a query container’s inline size | Container   |
| cqb   | container block size   | 1% of a query container’s block size  | Container   |
| cqmin | container minimum size | The smaller value of cqi or cqb       | Container   |
| cqmax | container maximum size | The larger value of cqi or cqb        | Container   |

## Using multiple units together with CSS functions

CSS has some very useful functions that can determine values by using a single unit or multiple units.
Here are some examples:

### calc

You can use `calc()` function to determine a dimension using multiple units:

```css
width: calc(100% - 16px);
```

The width is calculated dynamically by subtracting 16px from the maximum width.

### clamp

`clamp()` function accepts a minimum, an ideal and a maximum value. All those units can be different if necessary:

```css
font-size: clamp(18px, 4vw, 3rem);
```

The font size will be a minimum of 18px, a maximum of 3rem and 4vw in the rest.

### min and max

`min()` and `max()` are two functions that can limit a value depending on context:

```css
width: min(100vw - 3rem, 80ch);
```

Here the width will be the minimum between 100vw - 3rem and 80ch. On different screen sizes, there will be a different minimum.

### minmax

There is also `minmax()` function that defines a range of values:

```
width: minmax(30ch, 80ch)
```

In this case the width will have a minium value of 30ch, a maximum of 80ch and any value between.

## Resources

- [CSS values and units](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units)
- [Units: Every Layout](https://every-layout.dev/rudiments/units/)
- [Stephanie Eeckles - Scaling CSS Layout Beyond Pixels](https://www.youtube.com/watch?v=8slZJrTK3nE)
