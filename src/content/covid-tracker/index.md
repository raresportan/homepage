---
title: Building a COVID-19 tracker
pubDate: 2020-07-24
description: When the other COVID-19 trackers are not exactly what you need, it's time to build your own one.
keywords: ["Tracker"]
---

Here in Romania, every day, at 13:00, the latest COVID-19 data is communicated to
the public.
The data is presented as a series of cold numbers: total infections (in the entire
country and each county), total cured, and total deceased. Unless you kept
yesterday's data, there is no way to know how many new cases there are. And maybe
even more important, you don't know how many new cases are in your county (there is no per city data)
or in the county you want to travel.

A very important aspect that is hard to see in the way official data is communicated,
is the evolution of the cases. There are counties with many cases in total, but few active cases,
and others with few total cases but most of the cases are new. Where the number of cases is rising
faster, the danger is more present.

This year we decided to spent our vacation in the country, to travel around in several
counties. The problem was I couldn't figure out how dangerous this will be. So I've built
[my COVID-19 tracker](https://romania-covid-cases.netlify.app/) which shows the evolution of the cases in each county.

## Data

The first step was to find a way to get official data.

There is no official API that gives the data, but I knew about [datelazi.ro](https://datelazi.ro/)
which was built specially to communicate the official data. While inspecting it, I discovered
that it loads a JSON file with all the data I need. Jackpot!

```javascript
fetch("https://datelazi.ro/latestData.json")
  .then((result) => result.json())
  .then(console.log)
  .catch(console.error);
```

## Charts

Next, I've looked around for a charting library. In the end, I've chosen [chartist.js](https://gionkunz.github.io/chartist-js/)
because it was very easy to use and it looked nice.

First import the .js and .css files:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/chartist.js/latest/chartist.min.css"
/>
<script src="https://cdn.jsdelivr.net/chartist.js/latest/chartist.min.js"></script>
```

Then create a new chart like this:

```javascript
const data = {
  series: [[...cases]],
};
const options = {
  lineSmooth: true,
  width: 320,
  height: 200,
  low: 0,
  showArea: true,
  axisX: {
    showLabel: false,
    showGrid: false,
  },
};
new Chartist.Line(".ct-chart", data, options);
```

I've created 44 charts on the same page and the performance looks acceptable.

## Implementation

I've used vanilla JavaScript, HTML, and CSS. Everything is inside a single `index.html`, 400 lines in total.

The most challenging part was to transform the JSON into the data I needed.
The JSON is organized by days, but I wanted to collect all daily data for each county and then use it to create a graph.

The cases by county are not available for some days, so I had to ignore those.
Also, some cases don't belong to any county, which is weird. I had to create a special "Unknown county" for them.

Sorting the data by county name, new cases and total cases had its challenges.
Initially, I recreated all the graphs on sort, but the result was not nice. I could
see graphs being recreated, elements jumping all over the place.

So instead of recreating the graphs with sorted data, I sorted the DOM elements instead:

- get all elements with county graphs in an array
- sort the elements based on a specific attribute
- remove all graphs from container and add the sorted elements.
  Element sorting was possible because I've added the sort data as attributes:

```javascript
const article = document.createElement("article");
article.setAttribute("label", label);
article.setAttribute("newcases", newCases);
article.setAttribute("totalcases", totalCases);
```

The sorting functions use the attributes, for example:

```javascript
const sortByNewCases = (a, b) =>
  b.attributes.newCases.value - a.attributes.newCases.value;
```

## Links

The [site is live](https://romania-covid-cases.netlify.app/) and the data is updated
every day around 13:00. The [source code](https://github.com/raresportan/romania-covid-cases) is also available
in case you are interested.
