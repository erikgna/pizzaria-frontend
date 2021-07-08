import React from 'react'

import { useGlobalContext } from '../../context'
import './styles.css'
import { Button } from '../Button/Button'

export const Combos = ({id, img, title, desc, price}) => {
    const {addToCart, user} = useGlobalContext()

    return (
        <div id="combos">
            <div>
                <img src={img} alt="Combo IMG" />
                <h3>{title}</h3>
                <h4>R$ {price}</h4>
                <p>{desc}</p>
                <Button text="Carrinho" handleClick={() => addToCart(user._id, {id: id, cart: user.cart})} />
            </div>
        </div>
    )
}
