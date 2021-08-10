import React, {useState, useEffect} from 'react'
import {AiFillClockCircle} from 'react-icons/ai'

import { useGlobalContext } from '../../../context'
import { NavPedidos } from './NavPedidos'
import { NovoPedido } from './NovoPedido'
import { Preparo } from './Preparo'
import { Prontos } from './Prontos'
import './styles.css'
import { PedidoModal } from '../../components/PedidoModal/PedidoModal'
import { TimeModal } from '../../components/TimeModal/TimeModal'

import audio from '../../../assets/ring.wav'

export const Pedidos = () => {
    const {getOrders, freteValue, getFrete} = useGlobalContext()
    const [showInfo, setShowInfo] = useState(false)
    const [showTime, setShowTime] = useState(false)
    const [orders, setOrders] = useState([])
    const [orderInfo, setOrderInfo] = useState('')
    const [isNew, setIsNew] = useState(true)
    let oldOrders = []

    const handleShowInfo = (e, isNew) => {
        setOrderInfo(e)
        setIsNew(isNew)
        setShowInfo(showInfo? false : true)
    }

    const handleShowTime = () => {
        setShowTime(showTime? false : true)
    }

    const getAsync = async () => {
        const newOrders = await getOrders()
        if(newOrders.length > oldOrders.length) {
            var sound = new Audio(audio)
            const playPromise = sound.play();

            if (playPromise !== undefined) {
                playPromise
                .then(_ => {})
                .catch(_ => {});
            }
        }
        oldOrders = newOrders
        setOrders(newOrders)
    }

    useEffect(() => {
        getAsync()
        getFrete()
        const interval = setInterval(() => {
           getAsync()
        }, 300000)
        return () => clearInterval(interval) // eslint-disable-next-line
    }, [])

    return (
        <div id="pedidos">
            <NavPedidos orderLength={orders.length}/>
            <div className="columns">
                <div className="column">
                    <h3><span>01</span> Novos Pedidos</h3>
                    {orders?.map((item) => {
                        if(item.accept === false)
                        return <NovoPedido key={item._id} info={item} handleClick={handleShowInfo} />
                        return null
                    })}
                </div>
                <div className="column">
                    <h3><span>02</span> Pedidos em Preparo</h3>
                    {orders?.map((item) => {
                        if(item.accept === true && item.ready === false)
                        return <Preparo key={item._id} info={item} handleClick={handleShowInfo} />
                        return null
                    })}
                </div>
                <div className="column column50">
                    <h3><span>03</span> Pedidos em entrega / retirar</h3>
                    {orders?.map((item) => {
                        if(item.ready === true)
                        return <Prontos key={item._id} info={item} handleClick={handleShowInfo} />
                        return null
                    })}
                </div>
            </div>
            <div className="time" onClick={handleShowTime}>
                <AiFillClockCircle />
                <div>
                    <p><span>{freteValue?.retirada}</span>para retirada</p>
                    <p><span>{freteValue?.entrega}</span>para entrega</p>
                </div>
            </div>
            {showInfo&& <PedidoModal info={orderInfo} newIs={isNew} close={setShowInfo} />}
            {showTime&& <TimeModal click={handleShowTime}/>}
        </div>
    )
}
