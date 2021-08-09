/**
 * Bio component 
 */
import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Image } from "gatsby-plugin-image"


const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/avatar.jpg/" }) {
        childImageSharp {
          gatsbyImageData(layout: FIXED)
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
        <span>Hey, I'm {author.name}</span>
        <span>{author.summary}</span>
      </div>
    </div>
  )
}

export default Bio
