import React, {useState} from 'react'

import { useGlobalContext } from '../../../context'
import './styles.css'

export const DeleteModal = ({click, info}) => {
    const { deleteOrder, caixa, freteValue} = useGlobalContext()
    const [text, setText] = useState('')

    const dealCancel = () => {
        if(text !== ''){
            const list = [...caixa?.motivos, text]
            const cancel = caixa?.cancelados + info?.price + freteValue?.price
            const data = {motivos: list, cancelados: cancel}
            deleteOrder(info?._id, data)   
        } else setText("Campo não pode ser nulo!")
    }

    return (
        <div className='modal show'>
            <div className="modal-input modal-delete">
                <form>
                    <label>Motivo do Cancelamento</label>
                    <textarea placeholder="O cliente cancelou por.." value={text} onChange={(e) => setText(e.target.value)} />
                </form>
                <div className="buttons">
                    <button onClick={click}>Fechar</button>
                    <button onClick={() => dealCancel()}>Finalizar</button>
                </div>
            </div>
        </div>
    )
}
