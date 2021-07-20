import React, {useState} from 'react'
import { MdMotorcycle, MdModeEdit, MdZoomIn} from 'react-icons/md'
import {AiFillCheckCircle, AiFillClockCircle} from 'react-icons/ai'

import { useGlobalContext } from '../../../context'
import {MotoChoose} from '../../components/MotoChoose/MotoChoose'

export const Preparo = ({info, handleClick}) => {
    const {editOrder, editMotoboy} = useGlobalContext()
    const [moto, setMoto] = useState('')
    const [show, setShow] = useState(false)
    const data = info.date.substring(11, 16)

    const handleReady = (id) => {
        const motoId = moto.split(',')[0]
        const motoName = moto.split(',')[1]
        if(moto !== '') {
            editMotoboy(motoId, {price: info.frete})
            editOrder(id, {ready: true, moto: motoName})
        }
        else if(info?.frete === 0) editOrder(id, {ready: true})
        else setShow(true)
    }

    return (
        <div className="preparo">
            <div id="novopedido">
                <div onClick={() => handleClick(info, false)}>
                    <MdMotorcycle />
                    <p>{data}</p>
                    <h6>{info.client}</h6>
                </div>
                <div>
                    <AiFillCheckCircle id="check" onClick={() => handleReady(info._id)} />
                    <MdZoomIn />
                    <MdModeEdit />
                </div>
            </div>
            <div className="down">
                <AiFillClockCircle />
                <p>{info.address}</p>
            </div>
            {show&& <MotoChoose selected={setMoto} handleShow={setShow} />}
        </div>
    )
}
