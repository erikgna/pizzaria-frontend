import React, {useState} from 'react'

import { useGlobalContext } from '../../../context'
import './styles.css'

const initialValue = {admin: 2, name: "", email: "", password: ""}

export const NovoUser = ({click}) => {
    const {createUser} = useGlobalContext()
    const [text, setText] = useState(initialValue)

    const handleChange = (e) => {
        setText({...text, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        createUser(text)
    }

    return (
        <div className="modal show">
            <div className="modal-white newUser">
                <form onSubmit={handleSubmit}>
                    <label>Nivel de ADM:</label>
                    <select name="admin" onChange={(e) => handleChange(e)}>
                        <option value="2">Funcionário</option>
                        <option value="3">Administrador</option>
                    </select>
                    <label>Nome:</label>
                    <input type="text" name="name" placeholder="Nome do Usúario.." value={text.name} onChange={(e) => handleChange(e)} />
                    <label>Email:</label>
                    <input type="email" name="email" placeholder="Email do Usúario.." value={text.email} onChange={(e) => handleChange(e)} />
                    <label>Senha:</label>
                    <input type="password" name="password" placeholder="Senha do Usúario.." value={text.password} onChange={(e) => handleChange(e)} />
                </form>
                <div className="buttons">
                    <button onClick={click}>Fechar</button>
                    <button onClick={handleSubmit}>Confirmar</button>
                </div>
            </div>
        </div>
    )
}
