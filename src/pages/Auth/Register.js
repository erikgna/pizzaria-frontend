import React from 'react'

import { Input } from '../../components/Input/Input'
import { Button } from '../../components/Button/Button'

export const Register = ({handleChange, handleSubmit, text, isLogin, login}) => {
    return (
        <form onSubmit={handleSubmit}>
            <h3>Criação de novo usuário</h3>
            <Input 
                type="text"
                name="name"
                label="Nome Completo" 
                place="Digite o seu nome" 
                handleChange={handleChange} 
                value={text.name}
            />
            <div>
                <Input 
                    name="phone"
                    label="Telefone/Celular" 
                    handleChange={handleChange}
                    value={text.phone}
                />
                <div className="margin"/>
                <Input 
                    type="email"
                    name="email"
                    label="E-mail" 
                    place="Digite o seu email" 
                    handleChange={handleChange} 
                    value={text.email}
                />
            </div>
            <div>
                <Input 
                    type="password"
                    name="password"
                    place="Senha" 
                    label="Crie uma senha" 
                    handleChange={handleChange}
                    value={text.password}
                />
                <div className="margin"/>
                <Input 
                    type="password"
                    name="confirmPassword"
                    label="Confirme sua senha" 
                    place="Confirmar sua senha" 
                    handleChange={handleChange} 
                    value={text.confirmPassword}
                />
            </div>
            <h3>Endereço</h3>
            <div>
                <Input 
                    type="text"
                    name="address"
                    label="Endereço" 
                    place="Digite o endereço de entrega" 
                    handleChange={handleChange} 
                    value={text.address}
                />
                <div className="margin"/>
                <Input 
                    type="number"
                    name="number"
                    label="Número" 
                    place="Nº 000" 
                    handleChange={handleChange} 
                    value={text.number}
                />
            </div>
            <div>
                <Input 
                    type="text"
                    name="complemento"
                    place="Apto/Complemento/Ref" 
                    label="Apto/Quadra/Complemento" 
                    handleChange={handleChange}
                    value={text.complemento}
                />
                <div className="margin"/>
                <Input 
                    type="text"
                    name="bairro"
                    label="Bairro" 
                    place="Seu bairro" 
                    handleChange={handleChange} 
                    value={text.bairro}
                />
            </div>
            <div className="margin"/>
            <div className="buttons-auth">
                <Button onSubmit={handleSubmit} text="Registrar-se" />
                <button onClick={() => isLogin(login? false : true)}>Fazer login</button>
            </div>
        </form>
    )
}
