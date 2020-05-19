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

  const { author, description } = data.site.siteMetadata
  return (
    <div
      style={{
        display: `flex`,
        marginBottom: '2.5rem',
      }}
    >
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author.name}
        style={{
          marginRight: '1rem',
          marginBottom: 0,
          minWidth: 48,
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
      <div style={{
        lineHeight: 1.2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        Hey, I'm {author.name}
        <br />
        <span style={{
          fontSize: 'smaller'
        }}>{author.summary}</span>
      </div>
    </div>
  )
}

export default Bio
