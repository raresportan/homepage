import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"

const Layout = ({ location, title, children, className }) => {

  const data = useStaticQuery(graphql`
    query SocialQuery {     
      site {
        siteMetadata {         
          social{
            twitter
            github
            linkedin
          }
        }
      }
    }
  `)

  const rootPath = `${__PATH_PREFIX__}/`;
  const { twitter, github, linkedin } = data.site.siteMetadata.social;
  return (
    <div
      className={className}
      style={{
        margin: '0 auto',
        maxWidth: '42.5rem',
        padding: '0 1rem',
      }}
    >
      <Header title={title} isOnHomePage={location.pathname === rootPath} />
      <main>{children}</main>

      <footer>
        <a href="/rss.xml" target="_blank" rel="noreferrer">rss</a>
        <a href={`https://twitter.com/${twitter}`} target="_blank" rel="noreferrer">twitter</a>
        <a href={`https://github.com/${github}`} target="_blank" rel="noreferrer">github</a>
        <a href={`https://www.linkedin.com/in/${linkedin}`} target="_blank" rel="noreferrer">linkedin</a>
      </footer>
    </div >
  )
}

export default Layout
