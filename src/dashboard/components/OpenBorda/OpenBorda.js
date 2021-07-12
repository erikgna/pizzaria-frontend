import React, {useEffect, useState} from 'react'
import {AiFillDelete} from 'react-icons/ai'

import {useGlobalContext} from '../../../context'
import "./styles.css"

export const OpenBorda = ({click}) => {
    const { getBordas, createBorda, deleteBorda, bordas } = useGlobalContext()
    const [text, setText] = useState({name: '', value: 0})

    const handleSubmit = (e) => {
        e.preventDefault()
        createBorda(text)
    }

    useEffect(() => {
        getBordas() // eslint-disable-next-line
    }, [])

    return (
        <div className="modal">
            <div className="modal-white">
                <div className="bordas">
                    {bordas?.map(({name, value, _id}) => (
                        <div key={_id}>
                            <p>{name} (R$ {value})</p>
                            <AiFillDelete onClick={() => deleteBorda(_id)} />
                        </div>
                ))}
                </div>
                <form onSubmit={handleSubmit} className="borda">
                    <input type="text" placeholder="Nome da borda.." onChange={(e) => setText({...text, name: e.target.value})} />
                    <input type="number" placeholder="Valor R$" onChange={(e) => setText({...text, value: e.target.value})} />
                </form>
                <div className="buttons">
                    <button onClick={() => click()}>Fechar</button>
                    <button onClick={handleSubmit}>Criar</button>
                </div>
            </div>
        </div>
    )
}
