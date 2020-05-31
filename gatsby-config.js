module.exports = {
  siteMetadata: {
    title: `Rares Portan`,
    author: {
      name: `Rares Portan`,
      summary: `I'm a web developer & designer living in Timisoara, Romania 🇷🇴. I prefer to code in JavaScript and I love simple and fast software 🚀.`,
    },
    description: `Always looking to make better software.`,
    siteUrl: `https://raresportan.com`,
    social: {
      twitter: `raresportan`,
      github: `raresportan`,
      linkedin: `rares-portan`
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
            }
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
        remarkPlugins: [require("remark-capitalize")],
      }
    },
    {
      resolve: `gatsby-plugin-twitter-card`,
      options: {
        tinypngApiKey: process.env.TINY,
        width: 1280,
        height: 669,
        templateImage: 'content/assets/twitter-card-template.jpg',
        backgroundColor: '#fff',
        fonts: [
          {
            file: 'content/fonts/IBMPlexSans-SemiBold.ttf',
            family: 'IBM Plex Sans'
          }
        ],
        texts: [
          {
            text: '$title',
            color: '#222',
            font: '48pt "IBM Plex Sans"',
            x: 450,
            y: 669 / 2,
            maxWidth: 700,
            lineHeight: 60
          },
          {
            text: 'raresportan.com',
            font: '26pt "IBM Plex Sans"',
            x: 'center',
            y: 669 - 66,
            color: '#444',
          }
        ],
        borderTop: {
          width: 30,
          color: '#fce000'
        }
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-166862236-1`,
      },
    },
    {
      resolve: `gatsby-plugin-feed-mdx`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }]
                });
              });
            },
            query: `
              {
                allMdx(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Rares Portan's RSS Feed",
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Rares Portan Blog`,
        short_name: `Rares Portan`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/raresportanicon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`
  ],
}
