import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NewsletterConfirmPage = ({ data, location }) => {
    const siteTitle = data.site.siteMetadata.title

    return (
        <Layout location={location} title={siteTitle}>
            <SEO title="Thanks for subscribing" />
            <div>
                <h1>Thanks for subscribing</h1>
                <p>You need to do one more thing, check your email for a message from
                Rares Portan and click the link in that email..
                </p>
                <p><Link to='/'>Let's go home</Link></p>
            </div>
        </Layout>
    )
}

export default NewsletterConfirmPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
