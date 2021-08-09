import React from "react";
import {
    container1,
    container2,
    container3,
    container,
    overlay,
    warning
} from "./glitch.module.css"


const Glitch = ({version=0}) => {    
    let containerClass;
    switch(version) {
        case 1: containerClass = container1; break;
        case 2: containerClass = container2; break;
        case 3: containerClass = container3; break;
        default: containerClass = container;
    }
    return (
        <div className={containerClass}>
            <img src='/cyberpunk.jpg' alt='Cyberpunk 2077 screenshot'/>
            <span className={overlay}>
            </span>
            <span className={warning}>
                Animation blocked because you prefer reduced motion.
            </span>

        </div>
    )
}

export default Glitch;