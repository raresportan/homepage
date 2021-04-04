import React from "react"

/**
 * Waves compoent
 * @param {*} props
 */
const Waves = ({ id, className, wave1X, wave2X, wave3X, wave4X }) => {

    return (
        <div aria-hidden="true" className={`waves-container ${className || ''}`}>
            <svg className="waves" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
                <defs>
                    <path id={id}
                        d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                </defs>
                <g className="parallax">
                    <use href={`#${id}`} className='wave1' x={wave1X} y="0" />
                    <use href={`#${id}`} className='wave2' x={wave2X} y="3" />
                    <use href={`#${id}`} className='wave3' x={wave3X} y="5" />
                    <use href={`#${id}`} className='wave4' x={wave4X} y="7" />
                </g>
            </svg>
        </div>
    )

}

export default Waves;