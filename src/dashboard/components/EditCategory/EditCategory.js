import React, {useState} from 'react'

import { useGlobalContext } from '../../../context'
import './styles.css'

export const EditCategory = ({show, handleClick}) => {
    const {createCategory} = useGlobalContext()
    const [text, setText] = useState('')

    return (
        <div className={`modal-user ${show? 'show' : 'unshow'}`}>
            <div className="modal-white">
                <form className="user-edit">
                    <label>Nome da Categoria</label>
                    <input type="text" placeholder="Pizzas.." onChange={(e) => setText(e.target.value)} />
                </form>
                <div className="buttons">
                    <button onClick={handleClick}>Fechar</button>
                    <button onClick={() => createCategory(text)}>Enviar</button>
                </div>
            </div>
        </div>
    )
}
