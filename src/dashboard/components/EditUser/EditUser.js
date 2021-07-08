import React, {useState} from 'react'

import { useGlobalContext } from '../../../context'
import './styles.css'

export const EditUser = ({showModal, click, id, form}) => {
    const {editUser} = useGlobalContext()
    const [text, setText] = useState(form)

    const handleText = (e) => {
        setText({...text, [e.target.name]: e.target.value})
    }
    
    return (
        <div className={`modal-user ${showModal? 'show' : 'unshow'}`}>
            <div className="modal-white">
                <form className="user-edit">
                    <label>Nome do Cliente</label>
                    <input type="text" placeholder="Fulano.." name="name" onChange={(e) => handleText(e)} />
                    <label>Email do Cliente</label>
                    <input type="text" placeholder="fulano@email.com.." name="email" onChange={(e) => handleText(e)} />
                    <label>Telefone do Cliente</label>
                    <input type="text" placeholder="(24) 99999-9999.." name="phone" onChange={(e) => handleText(e)} />
                </form>
                <div className="buttons">
                    <button onClick={click}>Fechar</button>
                    <button onClick={() => editUser(id, text)}>Enviar</button>
                </div>
            </div>
        </div>
    )
}
