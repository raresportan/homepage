import React from "react"
import { Link } from "gatsby"

import Lightbulb from "./lightbulb";


const Header = ({ title, isOnHomePage }) => {
    let header;
    if (isOnHomePage) {
        header = <h1><Link to={`/`}>{title}</Link></h1>
    } else {
        header = <h3><Link to={`/`}>{title}</Link></h3>
    }

    return (
        <header className='main-header'>
            <Lightbulb />
            {header}
        </header>
    )
}

export default Header;