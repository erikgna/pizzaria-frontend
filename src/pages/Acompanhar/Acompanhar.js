import React, {useEffect, useState} from 'react'
import {AiOutlineWhatsApp} from 'react-icons/ai'

import { useGlobalContext } from '../../context'
import './styles.css'

export const Acompanhar = () => {
    const {trackOrder, getFrete, freteValue} = useGlobalContext()
    const [order, setOrder] = useState(null)

    const getOrder = async () => {
        setOrder(await trackOrder(localStorage.getItem('email')))
    }

    const handleContact = async () => {
        const hour = `${new Date(order?.date).getHours()}:${new Date(order?.date).getMinutes()}`
        const date = `${new Date(order?.date).getDate()}/${new Date(order?.date).getMonth()+1}/${new Date(order?.date).getFullYear()}`
        let parseTotal = 0
        await order?.cart?.forEach(({total}) => {
            parseTotal = total+parseTotal
        })
        const text = `
        ✅ NOVO PEDIDO
        -----------------------------
        ▶ RESUMO DO PEDIDO
        
        Realizado em: ${hour} - ${date}
        
        Link para acompanhar status do pedido:
        https://pizzaria.erikna.com/acompanhar
        
        ${order?.cart?.map(({tamanho, borda, sabor, extra, total}) => (
            `${tamanho} (R$ ${total})
            
            ${(borda)? `${borda}` : '- Sem Borda'}
            ${(sabor)? sabor?.map((item) => (
                `- ${item}`
            )): ''}
            ${(extra)? 'Ingredientes Extras: ' : ''}
            ${(extra)? extra?.map(({name}) => (
                `- ${name}`
            )): ''}
            `
        ))}
        ------------------------------------------
        ▶ DADOS
        
        Nome: ${order?.client}
        WhatsApp: ${order?.phone}
        ${(order?.entrega !== 'Buscar no Local')? `Endereço: ${order?.address}`: ''}
        ${(order?.entrega !== 'Buscar no Local')? `Taxa de Entrega: R$ ${order?.frete}`: ''}
        ${(order?.entrega !== 'Buscar no Local')? `🕙 Tempo de Entrega: aprox. ${freteValue.entrega} min`: ''}
        ${(order?.entrega === 'Buscar no Local')? `🕙 Tempo para Buscar: aprox. ${freteValue.retirada} min`: ''}
        
        -------------------------------
        ▶ TOTAL = R$ ${parseTotal+parseInt(order?.frete)}
        -------------------------------
        
        ▶ PAGAMENTO
        
        Pagamento no ${order?.metodo}
        ${(order?.metodo === "Cartão")? `${order?.cartao?.tipo}: ${order?.cartao?.bandeira}` : ''}
        ${(order?.metodo === "Dinheiro")? `Troco: ${order?.dinheiro}`: ''}`
        window.open(`https://api.whatsapp.com/send/?phone=5547932694930&text=${text}`, '_blank').focus()
    }

    useEffect(() => {
        getOrder()
        getFrete()
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
