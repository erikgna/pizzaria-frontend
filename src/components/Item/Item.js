import React from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'

import './styles.css'

export const Item = ({img, title, borda, sabores, price, deleteCart, index, extra}) => {
    return (
        <div className="item">
            <img src={img} alt="Error" />
            <div className="item-th">
                <div id="title">
                    <h4>{title}</h4>
                    {(borda) && <p><span>Borda: </span>{borda}</p>}
                    {(sabores)&& <div className="sabores">
                        <span>- Sabores:</span>
                        {sabores?.map((item, index) => (
                            <p key={index}>- {item}</p>
                        ))}
                    </div>}
                    {(extra)&& <div className="sabores">
                        <span>- Ingredientes:</span>
                        {extra?.map(({name}, index) => (
                            <p key={index}>- {name}</p>
                        ))}
                    </div>}
                </div>
                <h5>R$ {price}</h5>
                <div className="item-buttons">
                    <FaRegTrashAlt className='icon' onClick={() => deleteCart(index)}/>
                </div>
            </div>
        </div>
    )
}
