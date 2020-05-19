/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"


const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/avatar.jpg/" }) {
        childImageSharp {
          fixed(width: 48, height: 48) {
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

  const { author } = data.site.siteMetadata
  return (
    <div className="bio">
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author.name}

      />
      <div>
        Hey, I'm {author.name}
        <br />
        <span>{author.summary}</span>
      </div>
    </div>
  )
}

export default Bio
