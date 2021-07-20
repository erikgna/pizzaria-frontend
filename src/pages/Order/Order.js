import React, {useEffect, useState} from 'react'

import {Form} from '../../components/Form/Form'
import { Button } from '../../components/Button/Button'
import { useGlobalContext } from '../../context'
import { Item } from '../../components/Item/Item'
import './styles.css'

const initialValue = {
    name: "",
    cpf: "",
    phone: "",
    phone2: "",
    email: "",
    address: "",
    complemento: "",
    cidade: "",
    bairro: ""
}

export const Order = () => {
    const {cart, deleteCart, getFrete, freteValue, finishBuy} = useGlobalContext()
    const [entrega, setEntrega] = useState('Buscar no Local')
    const [comment, setComment] = useState('')
    const [metodo, setMetodo] = useState('PIX')
    const [total, setTotal] = useState(0)
    const [troco, setTroco] = useState(0)
    const [cartao, setCartao] = useState({tipo: "Débito", bandeira: "MasterCard"})
    const [showModal, setShowModal] = useState(false)
    const [frete, setFrete] = useState(0)
    const [full, setFull] = useState(false)
    const [dados, setDados] = useState(initialValue)

    const handleClick = () => {
        setShowModal(showModal? false : true)
    }

    const handleRedirect = () => {
        window.location.href = "/cardapio"
    }

    const submit = () => {
        if(cart?.length === 0) alert("O seu carrinho ainda está vazio!")
        else if(dados.name === "" || dados.phone === "" || dados.phone2 === "" || dados.email === "") alert("Por faovr, preencha os dados!")
        else {
            finishBuy(dados, cart, comment, entrega, metodo, frete, cartao, troco)
            localStorage.setItem('email', JSON.stringify(dados.email))
        }
    }

    useEffect(() => {
        function getAmount() {
            let all = 0
            cart?.forEach(({total}) => {
                all = all+total
            })
            setTotal(all)
        }
        getAmount()
        getFrete() // eslint-disable-next-line
    }, [])

    return (
        <div id="order">
            <h1>Seu Carrinho</h1>
            {
            (cart?.length === 0) ? 
             <h1>Carrinho ainda está vazio!</h1> :    
                cart?.map(({img, tamanho, total, borda, sabor, extra}, index) => {
                    return <Item key={index} extra={extra} img={img} title={tamanho} borda={borda} sabores={sabor} price={total} deleteCart={deleteCart} index={index} />
                })
            }
            <div className="margin"/>
            {(cart?.length !== 0)&& 
                <div className="extras">
                    <div>
                        <label>Entrega / Buscar no Local</label>
                        <select onChange={(e) => setEntrega(e.target.value)}>
                            <option value="Buscar no Local">Buscar no Local</option>
                            <option value="Entregar em Domicílio">Entregar em Domicílio</option>
                        </select>
                        <textarea value={comment} placeholder="Observações.." onChange={(e) => setComment(e.target.value)}></textarea>
                    </div>
                    <div>
                        <label>Método de Pagamento</label>
                        <select onChange={(e) => setMetodo(e.target.value)}>
                            <option value="PIX">PIX</option>
                            <option value="Cartão">Cartão</option>
                            <option value="Dinheiro">Dinheiro</option>
                        </select>
                        {(metodo === "Dinheiro")&&
                            <div className="metodo">
                                <label>Troco para (opcional)</label>
                                <input type="number" placeholder="R$ 50" onChange={(e) => setTroco(e.target.value)} />
                            </div>
                        }
                        {(metodo === "PIX")&&
                            <div className="metodo">
                                <label>Nosso PIX: 1234566734543</label>
                            </div>
                        }
                        {(metodo === "Cartão")&&
                            <div className="metodo">
                                <label>Débito / Crédito</label>
                                <select onChange={(e) => setCartao({...cartao, tipo: e.target.value})}>
                                    <option value="Débito">Débito</option>
                                    <option value="Crédito">Crédito</option>
                                </select>
                                <label>Bandeira</label>
                                <select onChange={(e) => setCartao({...cartao, bandeira: e.target.value})}>
                                    <option value="MasterCard">MasterCard</option>
                                    <option value="Visa">Visa</option>
                                    <option value="HiperCard">HiperCard</option>
                                    <option value="AmericanExpress">AmericanExpress</option>
                                    <option value="Diners Club">Diners Club</option>
                                    <option value="BanriCompras">BanriCompras</option>
                                </select>
                            </div>
                        }
                    </div>
                </div>
            }
            {(cart?.length !== 0)&&
                <div className="infos">
                    <div className="fretes">
                        {(entrega === "Entregar em Domicílio") && <div id="total">Taxa de Entrega: R$ {frete}</div>}
                        {(entrega === "Entregar em Domicílio") && <div id="total">Tempo de Entrega: {freteValue?.entrega}</div>}
                        {(entrega !== "Entregar em Domicílio") && <div id="total">Tempo para Retirada: {freteValue?.retirada}</div>}
                    </div>
                    <div id="total">Total: R$ {total + parseInt(frete)}</div>
                    {full? <Button text="Finalizar compra" handleClick={() => submit()} /> :
                    <Button text="Preencher Dados" handleClick={() => handleClick()} />}
                    <div className="space"/>
                    <Button text="Comprar mais" handleClick={handleRedirect} />
                </div>
            }
            {showModal&& <Form entrega={entrega} handleClick={handleClick} full={setFull} setFrete={setFrete} dados={dados} setDados={setDados} />}
        </div>
    )
}
