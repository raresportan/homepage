const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const title = require('title')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const result = await graphql(`
    query {
      site {
        siteMetadata {        
          siteUrl
          social {
            twitter
          }
        }
      }
      allMdx {
        edges {
          node {
            id
            frontmatter{
              title
              date
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    throw result.errors
  }

  const { siteUrl, social } = result.data.site.siteMetadata;

  // Create blog posts pages.
  const posts = result.data.allMdx.edges

  posts.forEach(({ node }, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    // create share on twitter link if all things are set
    let twitterShareLink = null;
    if (siteUrl &&
      social &&
      social.twitter &&
      node.frontmatter &&
      node.frontmatter.title) {
      twitterShareLink = `https://twitter.com/share?url=${siteUrl}${node.fields.slug}&text=${encodeURIComponent(node.frontmatter.title)}&via=${social.twitter}`
    }

    createPage({
      path: node.fields.slug,
      component: blogPost,
      context: {
        id: node.id,
        slug: node.fields.slug,
        previous,
        next,
        twitterShareLink
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark` || node.internal.type === `Mdx`) {
    // sadly remark-capitalize doesn't capitalize frontmatter title
    node.frontmatter.title = title(node.frontmatter.title);

    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
