import React from "react"
import { Link } from "gatsby"

import Lightbulb from "./lightbulb";
import Waves from "./waves";

/**
 * Renders a title string as a header.
 * On the home page it doesn't render it as link, unlike on the other pages.
 * @param {*} props
 */
const Header = ({ title, isOnHomePage }) => {
    let header = isOnHomePage
        ? title
        : <Link to={`/`}>{title}</Link>

    const waves = isOnHomePage
        ? <Waves id="gentle-wave-header" wave1X="48" wave2X="48" wave3X="48" wave4X="48" />
        : <Waves id="gentle-wave-header" wave1X="0" wave2X="48" wave3X="120" wave4X="68" />

    return (
        <>
            {waves}
            <header role="banner" className='main-header centered-content'>
                <Lightbulb />
                <div className={"site-name"}>{header}</div>
            </header>
        </>
    )
}

export default Header;