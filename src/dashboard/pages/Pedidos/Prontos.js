import React, {useState} from 'react'
import {BsTrash} from 'react-icons/bs'
import { MdMotorcycle} from 'react-icons/md'
import {AiFillCheckCircle, AiFillClockCircle} from 'react-icons/ai'

import { useGlobalContext } from '../../../context'
import { DeleteModal } from '../../components/DeleteModal/DeleteModal'

export const Prontos = ({info, handleClick}) => {
    const {deleteOrder, caixa, printNote} = useGlobalContext()
    const [showDelete, setShowDelete] = useState(false)

    const handleShowDelete = () => {
        setShowDelete(showDelete? false : true)
    }

    const handleFinished = () => {
        let all = 0
        info.cart?.forEach(({total}) => {
            all = all + total
        })
        const soma = all + info?.frete
        const count = caixa?.count + 1
        const data = {total: soma, count}
        printNote(info)

        deleteOrder(info?._id, data)
    }

    const data = info.date.substring(11, 16)

    return (
        <div className="preparo">
            <div id="novopedido">
                <div onClick={() => handleClick(info, false)}>
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
            {showDelete&& <DeleteModal click={handleShowDelete} info={info}/>}
        </div>
    )
}