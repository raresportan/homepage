// Gatsby supports TypeScript natively!
import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import BioFull from "../components/bio-full"
import { formatDate } from "../common"

const BlogIndex = ({ data, location }) => {
  const posts = data.allMdx.edges

  return (
    <Layout location={location}>
      <Seo title="Home" />
      <BioFull />

      <div className='centered-content'>
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
                <time dateTime={node.frontmatter.date}>{formatDate(node.frontmatter.date)} • {node.timeToRead} min read
                 {node.frontmatter.keywords ? <> • <em> {node.frontmatter.keywords.join(', ')}</em></> : ''}
                </time>
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
      </div>
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
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC },
      filter: {fields: {isFuturePost: {eq: false}}}
    ) {
      edges {
        node {
          excerpt
          fields {
            slug           
          }
          timeToRead
          frontmatter {
            date
            title
            keywords
          }
        }
      }
    }
  }
`
