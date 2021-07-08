import React from 'react'

import './styles.css'

export const Button = ({text, handleClick}) => {
    return (
        <button id="button" onClick={handleClick}>
            {text}
        </button>
    )
}

export const ButtonPlus = ({text}) => {
    return(
        <div id="button-plus">
            <button>-</button>
            <p>{text}</p>
            <button>+</button>
        </div>
    )
}