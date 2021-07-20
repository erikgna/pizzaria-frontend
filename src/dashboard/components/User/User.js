import React from 'react'

import { Dropdowna } from '../Dropdown/Dropdown'
import './styles.css'

export const User = ({id, name, email }) => {
    const data = {name, email}
    return (
        <div className="user">
            <p>{name}</p>
            <p>{email}</p>
            <Dropdowna id={id} data={data} />
        </div>
    )
}
