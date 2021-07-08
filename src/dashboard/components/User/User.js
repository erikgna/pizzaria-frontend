import React from 'react'

import { Dropdown } from '../Dropdown/Dropdown'
import './styles.css'

export const User = ({id, name, email, phone}) => {
    const data = {name, email, phone}
    return (
        <div className="user">
            <p>{name}</p>
            <p>{email}</p>
            <p>{phone}</p>
            <Dropdown id={id} data={data} />
        </div>
    )
}
