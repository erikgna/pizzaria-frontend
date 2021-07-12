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
                required={true}
            />
            <div>
                <Input 
                    name="phone"
                    label="Telefone/Celular" 
                    handleChange={handleChange}
                    value={text.phone}
                    required={true}
                />
                <div className="margin"/>
                <Input 
                    type="email"
                    name="email"
                    label="E-mail" 
                    place="Digite o seu email" 
                    handleChange={handleChange} 
                    value={text.email}
                    required={true}
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
                    required={true}
                />
                <div className="margin"/>
                <Input 
                    type="password"
                    name="confirmPassword"
                    label="Confirme sua senha" 
                    place="Confirmar sua senha" 
                    handleChange={handleChange} 
                    value={text.confirmPassword}
                    required={true}
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
                    required={true}
                />
                <div className="margin"/>
                <Input 
                    type="number"
                    name="number"
                    label="Número" 
                    place="Nº 000" 
                    handleChange={handleChange} 
                    value={text.number}
                    required={true}
                />
            </div>
            <div>
                <Input 
                    type="text"
                    name="complemento"
                    place="Apto/Complemento/Ref" 
                    label="Complemento" 
                    handleChange={handleChange}
                    value={text.complemento}
                    required={false}
                />
                <div className="margin"/>
                <Input 
                    type="text"
                    name="bairro"
                    label="Bairro" 
                    place="Seu bairro" 
                    handleChange={handleChange} 
                    value={text.bairro}
                    required={true}
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
