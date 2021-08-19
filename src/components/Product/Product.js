import React, {useState} from 'react'

import {Monte} from '../Monte/Monte'
import './styles.css'
import {useGlobalContext} from '../../context'

export const Product = ({img, title, desc, price, category, categorys}) => {
    const {addToCart, cart} = useGlobalContext()
    const [showMontar, setShowMontar] = useState(false)

    const handleMontar = () => {
        let showable = false
        categorys.forEach(({isSpecial, name})=> {
            if(name === category && isSpecial === true) showable = true
        })
        if(showable === true) setShowMontar(showMontar? false : true)
        else addToCart({img, tamanho: title, total: price}, cart)
    }

    return (
        <div id="product">
            <img src={img} alt="Product Img" />
            <h4>{title}</h4>
            <p>{desc}</p>
            <h4 id="price">R$ {price}</h4>
            <button onClick={handleMontar}>
                    Carrinho
            </button>
            {showMontar&& <Monte click={handleMontar} img={img} />}
        </div>
    )
}
