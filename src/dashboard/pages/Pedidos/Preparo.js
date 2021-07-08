import React from 'react'
import { MdMotorcycle, MdModeEdit, MdZoomIn} from 'react-icons/md'
import {AiFillCheckCircle, AiFillClockCircle} from 'react-icons/ai'

import { useGlobalContext } from '../../../context'

export const Preparo = ({info, handleClick}) => {
    const {editOrder} = useGlobalContext()
    const data = info.date.substring(11, 16)

    return (
        <div className="preparo">
            <div id="novopedido">
                <div>
                    <MdMotorcycle />
                    <p>{data}</p>
                    <h6>{info.client}</h6>
                </div>
                <div>
                    <AiFillCheckCircle id="check" onClick={() => editOrder(info._id, {ready: true})} />
                    <MdZoomIn />
                    <MdModeEdit />
                </div>
            </div>
            <div className="down">
                <AiFillClockCircle />
                <p>{info.address}</p>
            </div>
        </div>
    )
}
