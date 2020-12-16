import React from "react";
import glitchStyles from "./glitch.module.css"


const Glitch = ({version=0}) => {    
    let containerClass;
    switch(version) {
        case 1: containerClass = glitchStyles.container1; break;
        case 2: containerClass = glitchStyles.container2; break;
        case 3: containerClass = glitchStyles.container3; break;
        default: containerClass = glitchStyles.container;
    }
    return (
        <div className={containerClass}>
            <img src='/cyberpunk.jpg' alt='Cyberpunk 2077 screenshot'/>
            <span className={glitchStyles.overlay}>
            </span>
            <span className={glitchStyles.warning}>
                Animation blocked because you prefer reduced motion.
            </span>

        </div>
    )
}

export default Glitch;