import React from "react"
import { Link, graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Newsletter from "../components/newsletter"
import TwitterShare from '../components/twitter-share'
import Waves from "../components/waves"
import { formatDate } from "../common"

const shortcodes = { Link } // Provide common components here

/**
 * Template used to render the blog posts
 * @param {*} props
 */
const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.mdx;
  const { frontmatter } = post;
  const { previous, next, twitterShareLink } = pageContext

  return (
    <Layout location={location} className='content article'>
      <SEO
        title={frontmatter.title}
        description={frontmatter.description}
        twitterImage={post.fields.twitterCardImage}
      />
      <article className='post centered-content'>
        <header>
          <h1>
            {frontmatter.title}
          </h1>
          <small>{formatDate(frontmatter.date)} • {post.timeToRead} min read
          {frontmatter.keywords ? <> • <em> {frontmatter.keywords.join(', ')}</em></> : ''}
          </small>
        </header>
        <MDXProvider components={shortcodes}>
          <MDXRenderer>{post.body}</MDXRenderer>
        </MDXProvider>
        <TwitterShare twitterShareLink={twitterShareLink} />
      </article>

      <section className="post-footer">
        <Waves id="gentle-wave-login" className="footer" wave1X="0" wave2X="48" wave3X="120" wave4X="68" />
        <div className='centered-content'>
          <Newsletter />
        </div>

        <nav className='centered-content'>
          <ul>
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </section>


    </Layout >
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($id: String!) {   
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
        date
        description   
        keywords  
      }
      fields {
        twitterCardImage
      }
      timeToRead     
    }
  }
`
