import React, {useState} from 'react'

import { useGlobalContext } from '../../../context'
import './styles.css'

export const Retirada = ({click}) => {
    const {editCaixa, caixa} = useGlobalContext()
    const [text, setText] = useState('')

    const submit = (e) => {
        e.preventDefault()
        const data = caixa?.retiradas + parseFloat(text)
        editCaixa({retiradas: data})
        setText('')
    }

    return (
        <div className='modal show'>
            <form className="modal-white retirada">
                <label>Valor da Retirada</label>
                <input type="number" placeholder="R$ 120" value={text} onChange={(e) => setText(e.target.value)} />
                <div className="buttons">
                    <button onClick={click}>Fechar</button>
                    <button onClick={submit}>Confirmar</button>
                </div>
            </form>
        </div>
    )
}