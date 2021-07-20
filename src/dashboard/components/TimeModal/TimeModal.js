import React, {useState, useEffect} from 'react'
import { useGlobalContext } from '../../../context'

import './styles.css'

export const TimeModal = ({click}) => {
    const {editFrete, freteValue, editHorario, getHorarios} = useGlobalContext()
    const [text, setText] = useState({
        retirada: freteValue.retirada, 
        entrega: freteValue.entrega
    })
    const [horario, setHorario] = useState({
        openSeg: "",
        closeSeg: "",
        openTer: "",
        closeTer: "",
        openQua: "",
        closeQua: "",
        openQui: "",
        closeQui: "",
        openSex: "",
        closeSex: "",
        openSab: "",
        closeSab: "",
        openDom: "",
        closeDom: ""
    })

    const handleChange = (e) => {
        setText({...text, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        editFrete(text)
        editHorario(horario)
    }

    useEffect(() => {
        async function waitHorarios() {
            const temp = await getHorarios()
            setHorario(temp)
        }
        waitHorarios() // eslint-disable-next-line
    }, [])

    return (
        <div className='modal show'>
            <div className="modal-input">
                <form>
                    <label>Tempo de Retirada</label>
                    <input name="retirada" type="text" placeholder={freteValue?.retirada} onChange={(e) => handleChange(e)} />
                    <label>Tempo de Entrega</label>
                    <input name="entrega" type="text" placeholder={freteValue?.entrega} onChange={(e) => handleChange(e)} />
                </form>
                <div className="days">
                    <form>
                        <div className="form-day">
                            <label>Seg</label>
                            <input type="text" name="openSeg" placeholder={horario.openSeg} onChange={(e) => setHorario({...horario, [e.target.name]: e.target.value})}/>
                            <input type="text" name="closeSeg" placeholder={horario.closeSeg} onChange={(e) => setHorario({...horario, [e.target.name]: e.target.value})} />
                        </div>
                        <div className="form-day">
                            <label>Ter</label>
                            <input type="text" name="openTer" placeholder={horario.openTer} onChange={(e) => setHorario({...horario, [e.target.name]: e.target.value})} />
                            <input type="text" name="closeTer" placeholder={horario.closeTer} onChange={(e) => setHorario({...horario, [e.target.name]: e.target.value})} />
                        </div>
                        <div className="form-day">
                            <label>Qua</label>
                            <input type="text" name="openQua" placeholder={horario.openQua} onChange={(e) => setHorario({...horario, [e.target.name]: e.target.value})} />
                            <input type="text" name="closeQua" placeholder={horario.closeQua} onChange={(e) => setHorario({...horario, [e.target.name]: e.target.value})} />
                        </div>
                        <div className="form-day">
                            <label>Qui</label>
                            <input type="text" name="openQui" placeholder={horario.openQui} onChange={(e) => setHorario({...horario, [e.target.name]: e.target.value})} />
                            <input type="text" name="closeQui" placeholder={horario.closeQui} onChange={(e) => setHorario({...horario, [e.target.name]: e.target.value})} />
                        </div>
                        <div className="form-day">
                            <label>Sex</label>
                            <input type="text" name="openSex" placeholder={horario.openSex} onChange={(e) => setHorario({...horario, [e.target.name]: e.target.value})} />
                            <input type="text" name="closeSex" placeholder={horario.closeSex} onChange={(e) => setHorario({...horario, [e.target.name]: e.target.value})} />
                        </div>
                        <div className="form-day">
                            <label>Sáb</label>
                            <input type="text" name="openSab" placeholder={horario.openSab} onChange={(e) => setHorario({...horario, [e.target.name]: e.target.value})} />
                            <input type="text" name="closeSab" placeholder={horario.closeSab} onChange={(e) => setHorario({...horario, [e.target.name]: e.target.value})} />
                        </div>
                        <div className="form-day">
                            <label>Dom</label>
                            <input type="text" name="openDom" placeholder={horario.openDom} onChange={(e) => setHorario({...horario, [e.target.name]: e.target.value})} />
                            <input type="text" name="closeDom" placeholder={horario.closeDom} onChange={(e) => setHorario({...horario, [e.target.name]: e.target.value})} />
                        </div>
                    </form>
                    <div className="buttons">
                    <button onClick={click}>Fechar</button>
                    <button onClick={(e) => handleSubmit(e)}>Finalizar</button>
                </div>
                </div>
            </div>
        </div>
    )
}
