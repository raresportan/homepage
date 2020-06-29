/**
 * SEO component renders page metadata using Helmet.
 */
import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"


// send analytics data
function sendData() {
  const sitedata = {
    useragent: navigator.userAgent,
    title: document.title,
    origin: window.location.origin,
    pathname: window.location.pathname,
    search: window.location.search,
    referrer: document.referrer,
    language: navigator.language || navigator.userLanguage,
    offset: new Date().getTimezoneOffset(),
    screensize: window.screen.width * window.devicePixelRatio + "x" + window.screen.height * window.devicePixelRatio
  }
  return fetch('/.netlify/functions/send', {
    body: JSON.stringify(sitedata),
    method: 'POST'
  })
}


const SEO = ({ description, lang, meta, title, twitterImage }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            author {
              summary
            }
            description
            siteUrl
            social {
              twitter
            }
          }
        }       
      }
    `
  )

  const metaDescription = description || (site.siteMetadata.author.summary + site.siteMetadata.description)
  const twitterImageUrl = (site.siteMetadata.siteUrl || '') + '/' + (twitterImage || 'twitter-cards/raresportancom.jpg');
  return (
    <Helmet
      onChangeClientState={() => sendData()}
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:image`,
          content: twitterImageUrl,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.social.twitter,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        }
      ].concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO
