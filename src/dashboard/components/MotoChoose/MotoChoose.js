import React, {useEffect, useState} from 'react'

import {useGlobalContext} from '../../../context'
import './styles.css'

export const MotoChoose = ({selected, handleShow}) => {
    const {getMotoboy} = useGlobalContext()
    const [motoboys, setMotoboys] = useState([])

    useEffect(() => {
        async function waitFetch() {
            const temp = await getMotoboy()
            setMotoboys(temp)
        }
        waitFetch() // eslint-disable-next-line
    },[])

    return (
        <div className="modal">
            <div className="modal-white motoboy-modal">
                <h4>Primeiro selecione um motoboy</h4>
                <label>Motoboys</label>
                <select onChange={(e) => selected(e.target.value)}>
                    <option defaultValue hidden>Escolher motoboy</option>
                    {motoboys?.map(({_id, name}) => (
                        <option key={_id} value={[_id, name]}>{name}</option>
                    ))}
                </select>
                <button onClick={() => handleShow(false)}>Finalizar</button>
            </div>
        </div>
    )
}
