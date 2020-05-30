/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"


const BioFull = () => {
  const data = useStaticQuery(graphql`
    query BioFullQuery {     
      site {
        siteMetadata {
          author {
            name
            summary            
          }
          description
        }
      }
    }
  `)

  const { author } = data.site.siteMetadata
  return (
    <div className='bio-full centered-content'>
      <div>
        <h1>Hey, I'm {author.name}</h1>
        <p>{author.summary}</p>
      </div>
    </div>
  )
}

export default BioFull
