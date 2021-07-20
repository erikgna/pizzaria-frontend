import React, {useEffect, useState} from 'react'
import {AiOutlineWhatsApp} from 'react-icons/ai'

import { useGlobalContext } from '../../context'
import './styles.css'

export const Acompanhar = () => {
    const {trackOrder} = useGlobalContext()
    const [order, setOrder] = useState(null)

    const getOrder = async () => {
        setOrder(await trackOrder(localStorage.getItem('email')))
    }

    const handleContact = () => {
        window.open(`https://api.whatsapp.com/send/?phone=5547932694930&text=Email do pedido: ${order?.email}`, '_blank').focus()
    }

    useEffect(() => {
        getOrder()
        const interval = setInterval(() => {
            getOrder()
        }, 120000)
          return () => clearInterval(interval) // eslint-disable-next-line
    },[])

    return (
        <div className="tracker">
            <div className="tracker-white">
                {!order&& <h5>Você ainda não fez um pedido!</h5>}
                {(order?.accept === false)&& <h5>Seu pedido ainda está em análise!</h5>}
                {order?.accept&& !order?.ready&& <h5>Seu pedido já foi aceito e está sendo preparado!</h5>}
                {order?.ready&& <h5>Seu pedido está pronto!</h5>}
                {order?.cart.map(({sabor, tamanho, total, borda, extra}) => (
                    <div className="item" key={tamanho}>
                        <h4>{tamanho}</h4>
                        {(sabor)&& <div>
                            <span>- Sabor: </span>
                            {sabor?.map((item, index) => (
                                <p key={index}>- {item}</p>
                            ))}
                        </div>}
                        {(borda)&&<div>
                            <span>- Ingredientes: </span>
                            {extra?.map(({name}, index) => (
                                <p key={index}>- {name}</p>
                            ))}
                        </div>}
                        {(borda)&& <p> <span>Borda:</span> {borda}</p>}
                        <h6>Valor: R${total}</h6>
                    </div>
                ))}
                {order&& <button onClick={() => handleContact()} className="whats"><AiOutlineWhatsApp/>Contato</button>}
            </div>
        </div>
    )
}
