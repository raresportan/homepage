import React from "react"
import { Link } from "gatsby"

import Lightbulb from "./lightbulb";


const Header = ({ title, isOnHomePage }) => {
    let header;
    if (isOnHomePage) {
        header = <h1>{title}</h1>
    } else {
        header = <h3><Link to={`/`}>{title}</Link></h3>
    }

    return (
        <>
            {isOnHomePage ?
                <div className="waves-container">
                    <svg className="waves" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
                        <defs>
                            <path id="gentle-wave-login"
                                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                        </defs>
                        <g className="parallax">
                            <use href="#gentle-wave-login" className='wave1' x="48" y="0" />
                            <use href="#gentle-wave-login" className='wave2' x="48" y="3" />
                            <use href="#gentle-wave-login" className='wave3' x="48" y="5" />
                            <use href="#gentle-wave-login" className='wave4' x="48" y="7" />
                        </g>
                    </svg>
                </div>
                : <div className="waves-container">
                    <svg className="waves" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
                        <defs>
                            <path id="gentle-wave-login"
                                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                        </defs>
                        <g className="parallax">
                            <use href="#gentle-wave-login" className='wave1' x="0" y="0" />
                            <use href="#gentle-wave-login" className='wave2' x="48" y="3" />
                            <use href="#gentle-wave-login" className='wave3' x="120" y="5" />
                            <use href="#gentle-wave-login" className='wave4' x="68" y="7" />
                        </g>
                    </svg>
                </div>}
            <header className='main-header centered-content'>
                <Lightbulb />
                {header}
            </header >
        </>
    )
}

export default Header;