import React, {useEffect, useState} from 'react'
import {AiFillDelete} from 'react-icons/ai'

import './styles.css'
import {useGlobalContext} from '../../../context'

export const Motoboy = () => {
    const {getMotoboy, createMotoboy, deleteMotoboy} = useGlobalContext()
    const [text, setText] = useState({name: "", phone: "", placa: ""})
    const [motoboys, setMotoboys] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        createMotoboy(text)
    }

    useEffect(() => {
        async function waitFetch() {
            const temp = await getMotoboy()
            setMotoboys(temp)
        }
        waitFetch() // eslint-disable-next-line
    },[])

    return (
        <div className="motoboys">
            <h2>Motoboys</h2>
            <div className="motoboys-sec">
                <div className="add-motoboy">
                    <form>
                        <h4>Cadastrar novo motoboy</h4>
                        <label>Nome do Motoboy</label>
                        <input type="text" placeholder="João Pedro" onChange={(e) => setText({...text, name: e.target.value})} />
                        <label>Telefone do Motoboy</label>
                        <input type="text" placeholder="(99) 99999-9999" onChange={(e) => setText({...text, phone: e.target.value})} />
                        <label>Placa do Motoboy</label>
                        <input type="text" placeholder="BRA2E19" onChange={(e) => setText({...text, placa: e.target.value})} />
                        <button onClick={handleSubmit}>Finalizar</button>
                    </form>
                </div>
                <div className="lista-motoboys">
                    <h4>Lista de Motoboys</h4>
                    {motoboys?.map(({_id, name, phone, placa, entregas, total, entregasTemp, totalTemp}) => (
                        <div className="single" key={_id}>
                            <p className="alignp"><span>Nome: </span>{name} <AiFillDelete onClick={() => deleteMotoboy(_id)}/></p>
                            <p><span>Telefone: </span>{phone}</p>
                            <p><span>Placa: </span>{placa}</p>
                            <p><span>Entregas: </span>{entregas}</p>
                            <p><span>Valor total: </span>R$ {total}</p>
                            <p><span>Entregas do Dia: </span>{entregasTemp}</p>
                            <p><span>Valor total do Dia: </span>R$ {totalTemp}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
