import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle} className="missing">
      <SEO title="404: Not Found" />
      <div className='four-oh-four'>
        <h1>404</h1>
        <p>Oops! Guess what, there's no such page. <br /><Link to='/'>Let's go home</Link></p>
      </div>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
