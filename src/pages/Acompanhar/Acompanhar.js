import React, {useEffect, useState} from 'react'

import { useGlobalContext } from '../../context'
import './styles.css'

export const Acompanhar = ({click}) => {
    const {trackOrder, user} = useGlobalContext()
    const [order, setOrder] = useState(null)

    const getOrder = async () => {
        setOrder(await trackOrder(user?.email))
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
                {!order&& <h4>Você ainda não fez um pedido!</h4>}
                {(order?.accept === false)&& <h4>Seu pedido ainda está em análise!</h4>}
                {order?.accept&& !order?.ready&& <h5>Seu pedido já foi aceito e está sendo preparado!</h5>}
                {order?.ready&& <h6>Seu pedido está pronto!</h6>}
                <button onClick={click}>Fechar</button>
            </div>
        </div>
    )
}
