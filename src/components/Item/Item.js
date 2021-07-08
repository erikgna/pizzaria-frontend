import React from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'

import './styles.css'

export const Item = ({img, title, price, deleteCart, index}) => {
    return (
        <div className="item">
            <img src={img} alt="Error" />
            <div className="item-th">
                <h4>{title}</h4>
                <h5>R${price}</h5>
                <div className="item-buttons">
                    <FaRegTrashAlt className='icon' onClick={() => deleteCart(index)}/>
                </div>
            </div>
        </div>
    )
}
