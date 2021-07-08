import React from 'react'
import {AiOutlineCheck} from 'react-icons/ai'
import {BiBlock} from 'react-icons/bi'
import { useGlobalContext } from '../../../context'

import './styles.css'

export const PedidoModal = ({show, click, info}) => {
    const {freteValue, editOrder, deleteOrder} = useGlobalContext() 

    return (
        <div className={show? 'modal show' : 'modal unshow'}>
            <div className="modal-white">
                <h4>Pedido - Aprovar ou Reprovar</h4>
                <div>
                    <p><span>Forma de entrega: </span>{info?.entrega}</p>
                    <p><span>Cliente: </span>{info.client}</p>
                    <p><span>Telefones: </span>{info.phone}</p>
                    <p><span>Endereço: </span>{info.address}</p>
                    <p><span>E-mail: </span>{info.email}</p>
                </div>
                <table>
                    <tr>
                        <th>ITEM</th>
                        <th>TOTAL</th>
                    </tr>
                        {info?.titles?.map((name, index) => (
                            <tr key={index}>
                                <td className="item1">
                                    <h5>{name}</h5>
                                    <p>{info?.description[index]}</p>
                                </td>
                                <td>R$ {info?.prices[index]}</td>
                            </tr>
                            ))}
                </table>
                <div className="item1">
                    <p><span>Borda:</span>{info.recheio}</p>
                    <p><span>OBS:</span>{info.obs}</p>
                </div>
                <div className="info-money">
                    <h6>Taxa de Entrega <span>R$ {freteValue.price}</span></h6>
                    <h6>Total do Pedido <span>R$ {freteValue.price + info.price}</span></h6>
                </div>
                <div className="total">
                    <h6>{info?.metodo}: <span>R$ {freteValue.price + info.price}</span></h6>
                </div>
                <div className="buttons">
                    <button onClick={() => deleteOrder(info?._id)}><BiBlock/>Reprovar Pedido</button>
                    <button onClick={() => editOrder(info._id, {accept: true})}><AiOutlineCheck/>Aprovar Pedido</button>
                </div>
            </div>
        </div>
    )
}