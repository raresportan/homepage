// Gatsby supports TypeScript natively!
import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import BioFull from "../components/bio-full"

const BlogIndex = ({ data, location }) => {
  const { title } = data.site.siteMetadata;
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={location} title={title}>
      <SEO title="All posts" />
      <BioFull />

      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <article key={node.fields.slug}>
            <header>
              <h2>
                <Link to={node.fields.slug}>
                  {title}
                </Link>
              </h2>
              <small>{node.frontmatter.date} • {node.fields.readingTime.text}</small>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.excerpt,
                }}
              />
            </section>
          </article>
        )
      })}
    </Layout >
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
            readingTime {
              text
            }
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`