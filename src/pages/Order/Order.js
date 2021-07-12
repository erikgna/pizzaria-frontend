import React, {useEffect, useState} from 'react'
import { Button } from '../../components/Button/Button'

import { useGlobalContext } from '../../context'
import { Item } from '../../components/Item/Item'
import './styles.css'

export const Order = () => {
    const {cart, user, getProducts, deleteCart, products, finishBuy, getFrete, freteValue, getBordas, bordas} = useGlobalContext()
    const [toShow, setToShow] = useState([])
    const [total, setTotal] = useState(0)
    const [extra, setExtra] = useState('0,')
    const [entrega, setEntrega] = useState('Buscar no Local')
    const [comment, setComment] = useState('')
    const [metodo, setMetodo] = useState('Cartão / PIX')

    const submit = () => {
        if(!user) window.location.href = "/autenticação"
        if(toShow.length === 0) alert("O seu carrinho ainda está vazio!")
        else finishBuy(user, toShow, extra, comment, entrega, metodo)
        setComment('')
    }

    useEffect(() => {
        const fetch = async () => {
            let tempProducts = await getProducts()
            if(tempProducts === undefined) tempProducts = products
            let temp = []
            let total = 0
            cart?.forEach((id) => {
                tempProducts?.forEach((item) => {
                    if(item._id === id){
                        temp = [...temp, item]
                        total = total + item.price
                    }
                })
            })
            setToShow(temp)
            setTotal(total)
        }
        fetch()
        getFrete()
        getBordas() // eslint-disable-next-line
    }, [])

    return (
        <div id="order">
            <h1>Seu Carrinho</h1>
            {
            (toShow.length === 0) ? 
             <h1>Carrinho ainda está vazio!</h1> :    
                toShow.map(({image, name, price}, index) => {
                    return <Item key={index} img={image} title={name} price={price} deleteCart={deleteCart} index={index} />
                })
            }
            <div className="margin"/>
            {(toShow.length !== 0)&& 
                <div className="extras">
                    <div>
                        <label>Borda</label>
                        <select onChange={(e) => setExtra(e.target.value)}>
                            <option value="0, Sem Recheio">Sem Recheio</option>
                            {bordas.map(({_id, name, value}) => (
                                <option key={_id} value={[value, name]}>{name} (R$ {value})</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Entrega / Buscar no Local</label>
                        <select onChange={(e) => setEntrega(e.target.value)}>
                            <option value="Buscar no Local">Buscar no Local</option>
                            <option value="Entregar em Domicílio">Entregar em Domicílio</option>
                        </select>
                    </div>
                    <div>
                        <label>Método de Pagamento</label>
                        <select onChange={(e) => setMetodo(e.target.value)}>
                            <option value="Cartão / PIX">Cartão / PIX</option>
                            <option value="Dinheiro">Dinheiro</option>
                        </select>
                    </div>
                    <textarea value={comment} placeholder="Observações.." onChange={(e) => setComment(e.target.value)}></textarea>
                </div>
            }
            <div className="infos">
                <div className="fretes">
                    <div id="total">Taxa de Entrega: R$ {freteValue?.price}</div>
                    <div id="total">Tempo de Entrega: {freteValue?.entrega}</div>
                    <div id="total">Tempo para Retirada: {freteValue?.retirada}</div>
                </div>
                <div id="total">Total: R$ {total + freteValue?.price + parseFloat(extra.split(',')[0])}</div>
                <Button text="Finalizar compra" handleClick={() => submit()} />
            </div>
        </div>
    )
}
