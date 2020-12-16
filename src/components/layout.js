import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import shortcodes from "./mdx/shortcodes"

import Header from "./header"

const Layout = ({ location, children, className = 'content' }) => {

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
    <MDXProvider components={shortcodes}>
      <div className={className}>
        <Header title="raresportan.com" isOnHomePage={location.pathname === rootPath} />
        <main role="main" id="main">{children}</main>

        <footer>
          <ul className='centered-content'>
            <li><a href="/rss.xml" target="_blank" rel="noreferrer">rss</a></li>
            <li><a href={`https://twitter.com/${twitter}`} target="_blank" rel="noreferrer">twitter</a></li>
            <li><a href={`https://github.com/${github}`} target="_blank" rel="noreferrer">github</a></li>
            <li><a href={`https://www.linkedin.com/in/${linkedin}`} target="_blank" rel="noreferrer">linkedin</a></li>
          </ul>
        </footer>
      </div>
    </MDXProvider>
  )
}

export default Layout
