import React, {useEffect, useState} from 'react'
import {AiOutlineCheck} from 'react-icons/ai'
import {BiBlock} from 'react-icons/bi'
import { useGlobalContext } from '../../../context'

import './styles.css'

export const PedidoModal = ({info, newIs, close}) => {
    const {editOrder, deleteOrder} = useGlobalContext() 
    const [total, setTotal] = useState(0)
    useEffect(() => {
        async function waitFetch() {
            let prices = 0
            info.cart?.forEach(({total}) => {
                prices = prices+total
            })
            setTotal(prices + info.frete)
        }
        waitFetch() // eslint-disable-next-line
    },[])

    return (
        <div className='modal show'>
            <div className="modal-white">
                <h4>Pedido - Aprovar ou Reprovar</h4>
                <div>
                    <p><span>Forma de entrega: </span>{info?.entrega}</p>
                    <p><span>Cliente: </span>{info.client}</p>
                    <p><span>Telefones: </span>{info.phone}</p>
                    {(info?.address !== "( ) --  - ")&& <p><span>Endereço: </span>{info?.address}</p>}
                    <p><span>E-mail: </span>{info.email}</p>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>ITEM</th>
                            <th>TOTAL</th>
                        </tr>
                            {info?.cart?.map(({sabor, tamanho, total, borda, extra}, index) => (
                                <tr key={index}>
                                    <td className="item1">
                                        <h5>{tamanho}</h5>
                                        {(borda)&& <p><span>Borda:</span> {borda}</p>}
                                        {(sabor)&& <p><span>- Sabores:</span></p>}
                                        {sabor?.map((item, index) => (
                                            <p key={index}>- {item}</p>
                                        ))}
                                        {(extra)&& <p><span>- Ingredientes:</span></p>}
                                        {extra?.map(({name}, index) => (
                                            <p key={index}>- {name}</p>
                                        ))}
                                    </td>
                                    <td>R$ {total}</td>
                                </tr>
                                ))}
                    </thead>
                </table>
                <div className="item1">
                    {(info.obs)&& <p><span>OBS:</span>{info.obs}</p>}
                </div>
                <div className="info-money">
                    {(info?.frete !== 0)&& <h6>Taxa de Entrega <span>R$ {info?.frete}</span></h6>}
                    <h6>Total do Pedido <span>R$ {total}</span></h6>
                </div>
                <div className="total">
                    {(info?.moto)&& <h6 id="moto-title">Motoboy: <span>{info?.moto}</span></h6>}
                    {(info?.metodo === "PIX")&& <h6>{info?.metodo}: <span>R$ {total}</span></h6>}
                    {(info?.metodo === "Cartão")&& <h6>{info?.metodo} - {info?.cartao.tipo} - {info?.cartao.bandeira}: <span>R$ {total}</span></h6>}
                    {(info?.metodo === "Dinheiro")&& <h6>{info?.metodo} -- Troco R$ {info?.dinheiro}: <span>R$ {total}</span></h6>}
                </div>
                {newIs? 
                    <div className="buttons">
                        <button onClick={() => deleteOrder(info?._id)}><BiBlock/>Reprovar Pedido</button>
                        <button onClick={() => editOrder(info._id, {accept: true})}><AiOutlineCheck/>Aprovar Pedido</button>
                    </div> 
                :
                <div className="buttons">
                    <button onClick={() => close(false)}>Fechar</button>
                </div> 
                }
            </div>
        </div>
    )
}
