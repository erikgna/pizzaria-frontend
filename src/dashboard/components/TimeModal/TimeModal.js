import React, {useState} from 'react'
import { useGlobalContext } from '../../../context'

import './styles.css'

export const TimeModal = ({click}) => {
    const {editFrete, freteValue} = useGlobalContext()
    const [text, setText] = useState({
        retirada: freteValue.retirada, 
        entrega: freteValue.entrega, 
        price: freteValue.price
    })

    const handleChange = (e) => {
        setText({...text, [e.target.name]: e.target.value})
    }

    const handleSubmit = () => {
        editFrete(text)
    }

    return (
        <div className='modal show'>
            <div className="modal-input">
                <form>
                    <label>Tempo de Retirada</label>
                    <input name="retirada" type="text" placeholder={freteValue?.retirada} onChange={(e) => handleChange(e)} />
                    <label>Tempo de Entrega</label>
                    <input name="entrega" type="text" placeholder={freteValue?.entrega} onChange={(e) => handleChange(e)} />
                    <label>Valor da Entrega</label>
                    <input name="price" type="text" placeholder={`R$ ${freteValue?.price}`} onChange={(e) => handleChange(e)} />
                </form>
                <div className="buttons">
                    <button onClick={click}>Fechar</button>
                    <button onClick={handleSubmit}>Finalizar</button>
                </div>
            </div>
        </div>
    )
}
