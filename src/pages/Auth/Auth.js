import React, {useState} from 'react'

import './styles.css'
import { Register } from './Register'
import { Login } from './Login'
import { useGlobalContext } from '../../context'

const initialValue = {
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    number: "",
    complemento: "",
    bairro: ""
}

export const Auth = () => {
    const {createUser, enterUser} = useGlobalContext()
    const [login, setLogin] = useState(true)
    const [text, setText] = useState(initialValue)

    const handleChange = (name, e) => {
       if(name === 'phone') setText({...text, phone: e})
       else setText({...text, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        login? enterUser(text) : createUser(text, 0)
    }

    return (
        <div className="auth">
            {login?
                <Login 
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    text={text}
                    isLogin={setLogin}
                    login={login}
                />
                :
                <Register 
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    text={text}
                    isLogin={setLogin}
                    login={login}
                />
            }
        </div>
    )
}
