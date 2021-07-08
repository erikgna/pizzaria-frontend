import React from 'react'

import { useGlobalContext } from '../../context'
import './styles.css'

export const Product = ({id, img, title, desc, price}) => {
    const {addToCart, cart} = useGlobalContext()

    return (
        <div id="product">
            <img src={img} alt="Product Img" />
            <h4>{title}</h4>
            <p>{desc}</p>
            <h4 id="price">R$ {price}</h4>
            <button 
                onClick={() => addToCart(id, cart)}>
                    Carrinho
            </button>
        </div>
    )
}
