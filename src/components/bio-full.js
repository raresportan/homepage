/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"


const BioFull = () => {
  const data = useStaticQuery(graphql`
    query BioFullQuery {
      avatar: file(absolutePath: { regex: "/avatar.jpg/" }) {
        childImageSharp {
          fixed(width: 80, height: 80) {
            ...GatsbyImageSharpFixed
          }
        }
      }
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

  const { author, description } = data.site.siteMetadata
  return (
    <div className='bio-full'>
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author.name}
      />
      <div>
        <span>{author.summary}</span>
        <span>{description}</span>
      </div>
    </div>
  )
}

export default BioFull
