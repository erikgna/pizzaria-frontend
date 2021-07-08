import React, { useState } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'

import { useGlobalContext } from '../../../context'
import './styles.css'
import { Retirada } from '../Retirada/Retirada'

export const CaixaModal = ({click, orderLength}) => {
    const { caixa, editCaixa } = useGlobalContext()
    const [show, setShow] = useState(false)

    const handleRetirada = () => {
        setShow(show? false : true)
    }

    return (
        <div className='modal show'>
            <div className="modal-white caixaModal">
                <div className="two-columns">
                    <div className="unique-columns">
                        <div className="side-icon">
                            <AiOutlineShoppingCart className="icon-left" />
                            <div>
                                <h4>Pedidos em Andamento</h4>
                                <p>{orderLength}</p>
                            </div>
                        </div>
                        <div className="side-icon">
                            <AiOutlineShoppingCart className="icon-left" />
                            <div>
                                <h4>Receita do Dia</h4>
                                <p>R$ {caixa?.total - caixa?.retiradas}</p>
                            </div>
                        </div>
                        <div className="side-icon">
                            <AiOutlineShoppingCart className="icon-left" />
                            <div>
                                <h4>Total de Entradas</h4>
                                <p>R$ {caixa?.total}</p>
                            </div>
                        </div>
                    </div>
                    <div className="unique-columns">
                        <div className="side-icon">
                            <AiOutlineShoppingCart className="icon-left" />
                            <div>
                                <h4>Pedidos Finalizados</h4>
                                <p>{caixa?.count}</p>
                            </div>
                        </div>
                        <div className="side-icon">
                            <AiOutlineShoppingCart className="icon-left" />
                            <div>
                                <h4>Ticket Médio</h4>
                                <p>R$ {caixa?.total / caixa?.count}</p>
                            </div>
                        </div>
                        <div className="side-icon">
                            <AiOutlineShoppingCart className="icon-left" />
                            <div>
                                <h4>Total de Retiradas</h4>
                                <p>R$ {caixa?.retiradas}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="buttons-t">
                    <button onClick={click}>Fechar</button>
                    <button onClick={handleRetirada}>Registrar Movimentação</button>
                    <button onClick={() => editCaixa({isOpen: false})}>Fechar Caixa</button>
                </div>
            </div>
            {show&& <Retirada click={handleRetirada} /> }
        </div>
    )
}
