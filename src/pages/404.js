import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = ({ data, location }) => {
  return (
    <Layout location={location} className="content missing">
      <SEO title="404: Not Found" />
      <div className='four-oh-four centered-content'>
        <h1>404</h1>
        <p>Oops! Guess what, there's no such page. <br /><Link to='/'>Let's go home</Link></p>
      </div>
    </Layout>
  )
}

export default NotFoundPage
