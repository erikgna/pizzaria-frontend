import React, { useState } from 'react'

import { useGlobalContext } from '../../../context'
import './styles.css'

const initialValue = ({email: '', password: ''})

export const Login = () => {
    const {enterUser} = useGlobalContext()
    const [form, setForm] = useState(initialValue)

    const handleSubmit = async (e) => {
        e.preventDefault()
        await enterUser(form)
        setForm(initialValue)
        window.location.href = "/dashboard"
    }

    return (
        <div className="adminLogin">
            <form onSubmit={handleSubmit}>
                <h3>Entrar no Painel</h3>
                <label>E-mail</label>
                <input type="email" placeholder="Seu email.." onChange={(e) => setForm({...form, email: e.target.value})} />
                <label>Senha</label>
                <input type="password" placeholder="Sua senha.." onChange={(e) => setForm({...form, password: e.target.value})} />
                <input type="submit" value="Entrar" />
            </form>
        </div>
    )
}
