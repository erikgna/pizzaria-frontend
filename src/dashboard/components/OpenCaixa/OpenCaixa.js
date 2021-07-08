import React, {useState} from 'react'

import { useGlobalContext } from '../../../context'
import './styles.css'

export const OpenCaixa = ({click, open, edit}) => {
    const {createCaixa} = useGlobalContext()
    const [text, setText] = useState('')

    const submit = (e) => {
        e.preventDefault()
        createCaixa(text)
        setText('')
    }

    return (
        <div className='modal show'>
            {(open === undefined)?
                <form className="modal-white opencaixa">
                    <label>Valor Inicial</label>
                    <input type="number" placeholder="R$ 120" value={text} onChange={(e) => setText(e.target.value)} />
                    <div className="buttons">
                        <button onClick={click}>Fechar</button>
                        <button onClick={submit}>Abrir Caixa</button>
                    </div>
                </form>
                :
                <div className="modal-white closecaixa">
                    <div className="buttons">
                        <button onClick={click}>Fechar</button>
                        <button onClick={() => edit({isOpen: false})}>Fechar Caixa</button>
                    </div>
                </div>
            }
        </div>
    )
}
