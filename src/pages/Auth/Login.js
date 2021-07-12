import React from 'react'

import { Input } from '../../components/Input/Input'
import { Button } from '../../components/Button/Button'

export const Login = ({handleChange, handleSubmit, text, isLogin, login}) => {
    return (
        <form onSubmit={handleSubmit}>
            <h3>Entrar em sua conta</h3>
            <Input 
                type="email"
                name="email"
                label="Email" 
                place="Digite o seu email" 
                handleChange={handleChange} 
                value={text.email}
                required={true}
            />
           <Input 
                type="password"
                name="password"
                label="Senha" 
                place="Digite a sua senha" 
                handleChange={handleChange} 
                value={text.password}
                required={true}
            />
            <div className="margin"/>
            <div className="buttons-auth">
                <Button onSubmit={handleSubmit} text="Entrar" />
                <button onClick={() => isLogin(login? false : true)}>Registrar-se</button>
            </div>
        </form>
    )
}
