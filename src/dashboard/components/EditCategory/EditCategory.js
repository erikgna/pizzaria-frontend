import React, {useState} from 'react'

import { useGlobalContext } from '../../../context'
import './styles.css'

export const EditCategory = ({handleClick}) => {
    const {createCategory} = useGlobalContext()
    const [text, setText] = useState({name: '', isSpecial: false})

    return (
        <div className='modal-user show'>
            <div className="modal-white">
                <form className="user-edit">
                    <label>Nome da Categoria</label>
                    <input type="text" placeholder="Pizzas.." onChange={(e) => setText({...text, name: e.target.value})} />
                    <label>É especial?</label>
                    <input type="checkbox" onClick={() => setText({...text, isSpecial: text.isSpecial? false : true})}/>
                </form>
                <div className="buttons">
                    <button onClick={handleClick}>Fechar</button>
                    <button onClick={() => createCategory(text)}>Enviar</button>
                </div>
            </div>
        </div>
    )
}
