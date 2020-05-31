import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Newsletter from "../components/newsletter"
import Bio from "../components/bio"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"

const shortcodes = { Link } // Provide common components here

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.mdx;
  const { frontmatter } = post;

  const { previous, next } = pageContext

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
          <small>{frontmatter.date} • {post.timeToRead} min read
          {frontmatter.keywords ? <> • <em> {frontmatter.keywords}</em></> : ''}
          </small>
        </header>
        <MDXProvider components={shortcodes}>
          <MDXRenderer>{post.body}</MDXRenderer>
        </MDXProvider>
        <Bio />
      </article>



      <section className="post-footer">

        <div className="waves-container footer">
          <svg className="waves" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
            <defs>
              <path id="gentle-wave-login"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
            </defs>
            <g className="parallax">
              <use href="#gentle-wave-login" className='wave1' x="0" y="0" />
              <use href="#gentle-wave-login" className='wave2' x="48" y="3" />
              <use href="#gentle-wave-login" className='wave3' x="120" y="5" />
              <use href="#gentle-wave-login" className='wave4' x="68" y="7" />
            </g>
          </svg>
        </div>

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
        date(formatString: "MMMM DD, YYYY")   
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
