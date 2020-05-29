# gatsby-plugin-twitter-card

Generates images that can be used as Twitter cards. 
For example you can generate a different image for each article on your blog/magazine/portfolio.

The images are generated inside `static/twitter-cards/` and have the same name as the page slug.

It is recommended that you add them on the your source repository so that they are not created again. Is also recommended to use a [TinyPng API key[(https://tinypng.com/developers)] to generate compressed images.

# Install
```shell
npm i --save-dev gatsby-plugin-twitter-card
```

## gastby-config.js
Add the `gatsby-plugin-twitter-card` under `gatsby-transformer-remark` in plugins:

```js
module.exports = { 
  plugins: [  
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [          
          {
            resolve: `gatsby-plugin-twitter-card`,
            options: {
              overwrite: false, // by default will not generate again any image that exists
              width: 1280, // 1280 by default
              height: 669, // 669 by default
              templateImage: 'content/assets/twitter-card-template.jpg',
              backgroundColor: '#fff',
              fonts: [
                {
                  // path to the font   
                  file: 'content/fonts/OpenSans.ttf', 
                  // map the font to a family
                  family: 'Open Sans'
                }
              ],
              // add as many texts as you want
              // you can use the frontmatter's title, description or excerpt
              texts: [
                {
                  text: '$title', // $description or $excerpt
                  color: '#222',
                  font: '48pt "Open Sans"',
                  x: 400,
                  y: 669 / 2,
                  maxWidth: 700,
                  lineHeight: 60
                },
                {
                  text: 'savethebear.com',
                  font: '26pt "Open Sans"',
                  x: 'center', // horizontal centered
                  y: 669 - 36,
                  color: '#444',
                }
              ],
              borderTop: {
                width: 30,
                color: '#fce000'
              }
            }
          }
        ]
      }
    }
  ]
}
```

## Update queries
Add `twitterCardImage` as a field of `markdownRemark`.

```js
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {   
    markdownRemark(fields: { slug: { eq: $slug } }) {
      ...
      fields {
        twitterCardImage
        ...
      }
    }
  }
`
```

## Set it as og:image meta
```jsx
<Helmet
    htmlAttributes={{
        lang,
    }}
    title={title}
    titleTemplate={`%s | ${site.siteMetadata.title}`}
    meta={[
        ...
        {
            property: `og:image`,
            content: twitterImage,
        },
        {
            name: `twitter:card`,
            content: `summary_large_image`,
        },
    ]}
/>
```        

## Options

The following options are available:

## width
The image width. Default 1280.
```js
width: 1280
```

## height
The image height. Default 669.
```js
height: 669
```

## tinypngApiKey
Your Tinypng API Key. You can get one for free [here.](https://tinypng.com/developers)
Use this if you want to compress your images. Highly recommended.

## output
The image name. Default test.jpeg
It must include the extension: .png, .jpg or .jpeg.
```js
output: './awesome.png'
```

## backgroundColor
The backround color to use. It will fill the entire image.
All HTML color values are accepted.
```js
backgroundColor: '#444'
```

## templateImage
The path to the image to use as a template. Default none.
This should be the static part on all cards, like logo, patterns, etc. 
It will be drawn from the top left position of the image.
```js
templateImage: './twitter-card-template.png'
```


Example:
![Template example](./test/twitter-card-template.png "A template example")


## fonts
The fonts to use for the texts rendered on the card.
Each font file must available locally on the machine.

For each font you specify the file and the family. The family you'll set later for texts.

Example:
```js
fonts: [
    file: 'Roboto-Bold.ttf',
    family: 'Roboto'
]
```

## texts
The texts to render on card.
For each text entry the following parameters can be set:
* text: string, the actual text to render e.g. 'Hello,world!'
* font: string, the font size and family. e.g. '30pt "Open Sans"'
* x: horizontal start drawing position as number or spacial value 'center' (to put in on the horizontal middle on the image)
* y: vertical start drawing position as number or spacial value 'center' (to put in on the vertical middle on the image)
* maxWidth: the text maximum width, number. If the text si bigger it will be split and rendered on multiple lines.
* lineHeight: the text line height, number.

Example:
```js
texts: [
    {
        text: 'Will Grizzly Bears Survive Being Hunted?',
        font: '64px "Roboto"',
        x: 500,
        y: 669 / 2,
        color: '#222',
        maxWidth: 700,
        lineHeight: 64
    },
    {
        text: 'savethebear.com',
        font: '26pt "Roboto"',
        x: 'center',
        y: 669 - 36,
        color: '#444',
    }
],
```


### borderTop
The settings for the top border. You can provide either a color or a gradient and a width.
It is rendered before all other borders.

```js
borderTop: {
    color: '#ffc100',   
    width: 20
}  
```   

Or using a gradient:
```js
borderTop: {  
    gradient: [
        {
            color: '#e66465',
            stop: 0
        },
        {
            color: '#9198e5',
            stop: 50
        },
    ],
    width: 20
}  
```   

### borderRight
The settings for the right border. You can provide either a color or a gradient and a width.
It is rendered after the top border but before the other borders, so it renders over the top border.
 
### borderBottom
The settings for the bottom border. You can provide either a color or a gradient and a width.
It is rendered after the top and right border but before the left border, so it renders over the right border.

### borderLeft
The settings for the left border. You can provide either a color or a gradient and a width.
It is rendered after all other borders, so it renders over the top and bottom borders.

### roundedBorder
To render a rounded-corners border use this option with the following parameters:
* color or gradient.
* radius: the rounder-corner radius, number
* width: the border width, number.

```js
roundedBorder: {
    color: 'red',
    gradient: [
        {
            color: '#e66465',
            stop: 0
        },
        {
            color: '#9198e5',
            stop: 50
        },
    ],
    radius: 20,
    width: 30
}
```