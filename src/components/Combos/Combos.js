import React, {useState} from 'react'

import { useGlobalContext } from '../../context'
import './styles.css'
import { Button } from '../Button/Button'
import { Monte } from '../Monte/Monte'

export const Combos = ({id, img, title, desc, price, category}) => {
    const {addToCart, cart} = useGlobalContext()
    const [showMontar, setShowMontar] = useState(false)

    const handleMontar = () => {
        if(category.toLowerCase() === "pizzas" || category.toLowerCase() === "calzones") setShowMontar(showMontar? false : true)
        else addToCart({img, tamanho: title, total: price}, cart)
    }

    return (
        <div id="combos" key={id}>
            <div>
                <img src={img} alt="Combo IMG" />
                <h3>{title}</h3>
                <h4>R$ {price}</h4>
                <p>{desc}</p>
                <Button text="Carrinho" handleClick={handleMontar} />
                {showMontar&& <Monte click={handleMontar} img={img} />}
            </div>
        </div>
    )
}