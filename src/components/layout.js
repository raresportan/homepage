import React from "react"
import Header from "./header"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  return (
    <div
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
        <a href="https://twitter.com/raresportan" target="_blank" rel="noreferrer">twitter</a>
        <a href="https://github.com/raresportan" target="_blank" rel="noreferrer">github</a>
        <a href="www.linkedin.com/in/rares-portan" target="_blank" rel="noreferrer">linkedin</a>
      </footer>
    </div >
  )
}

export default Layout
