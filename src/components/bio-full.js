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
          social {
            twitter
          }
        }
      }
    }
  `)

  const { author, social } = data.site.siteMetadata
  return (
    <div className='bio-full'>
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author.name}
      // imgStyle={{
      //   borderRadius: `50%`,
      // }}
      />
      <div style={{
        lineHeight: 1.2,
        display: 'flex',
        fontSize: '1.2rem',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        Hey, I'm Rares.
        <br />
        <span style={{
          fontSize: '1rem'
        }}>
          I'm a web designer and developer from Timisoara, Romania.
          <br />
          {/* I love JavaScript and functional programming.
          <br /> */}
          Here I write about programming, mostly how to get better at it.</span>
      </div>
    </div>
  )
}

export default BioFull
