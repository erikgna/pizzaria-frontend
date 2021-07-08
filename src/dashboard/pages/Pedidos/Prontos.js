import React, {useState} from 'react'
import {BsTrash} from 'react-icons/bs'
import { MdMotorcycle} from 'react-icons/md'
import {AiFillCheckCircle, AiFillClockCircle} from 'react-icons/ai'

import { useGlobalContext } from '../../../context'
import { DeleteModal } from '../../components/DeleteModal/DeleteModal'

export const Prontos = ({info}) => {
    const {deleteOrder, freteValue, caixa} = useGlobalContext()
    const [showDelete, setShowDelete] = useState(false)

    const handleShowDelete = () => {
        setShowDelete(showDelete? false : true)
    }

    const handleFinished = () => {
        const soma = info?.price + freteValue?.price + caixa?.total
        const count = caixa?.count + 1
        const data = {total: soma, count}
        deleteOrder(info?._id, data)
    }

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
                    <AiFillCheckCircle id="check" onClick={() => handleFinished()}/>
                    <BsTrash onClick={handleShowDelete} />
                </div>
            </div>
            <div className="down">
                <AiFillClockCircle />
                <p>{info.address}</p>
            </div>
            <DeleteModal show={showDelete} click={handleShowDelete} info={info}/>
        </div>
    )
}