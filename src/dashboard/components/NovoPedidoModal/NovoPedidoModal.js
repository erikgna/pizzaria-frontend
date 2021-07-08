import React from 'react'
import { AiFillPlusCircle } from 'react-icons/ai'

import './styles.css'

export const NovoPedidoModal = ({click}) => {
    return (
        <div className='modal show'>
            <div className="modal-white novoPedido">
                <form>
                    <div className="columns">
                        <label>Entrega</label>
                        <input type="text" placeholder="Motoboy" />
                        <label>Endereço</label>
                        <input type="text" placeholder="Rua José Bonifácio" />
                        <label>Cliente</label>
                        <input type="text" placeholder="João Pedro" />
                        <label>Telefone</label>
                        <input type="text" placeholder="(51) 9 9999 9999" />
                    </div>
                    <div className="columns">
                        <label>Produto</label>
                        <div className="row">
                            <select>
                                <option>Pizza lbal blas</option>
                                <option>Pizza lbal blas</option>
                                <option>Pizza lbal blas</option>
                                <option>Pizza lbal blas</option>
                                <option>Pizza lbal blas</option>
                            </select>
                            <AiFillPlusCircle className="icon" />
                        </div>
                        <label>Borda</label>
                        <select>
                            <option>Pizza lbal blas</option>
                            <option>Pizza lbal blas</option>
                            <option>Pizza lbal blas</option>
                            <option>Pizza lbal blas</option>
                            <option>Pizza lbal blas</option>
                        </select>
                        <label id="quanty-label">Quantidade</label>
                        <input id="quanty" type="number" placeholder="1" />
                    </div>
                    <div className="columns">
                        <label>Bebida</label>
                        <div className="row">
                            <select>
                                <option>Pizza lbal blas</option>
                                <option>Pizza lbal blas</option>
                                <option>Pizza lbal blas</option>
                                <option>Pizza lbal blas</option>
                                <option>Pizza lbal blas</option>
                            </select>
                            <AiFillPlusCircle className="icon" />
                        </div>
                    </div>
                </form>
                <div id="buttons">
                    <button onClick={click}>Fechar</button>
                    <button onClick={click}>Concluir</button>
                </div>
            </div>
        </div>
    )
}
