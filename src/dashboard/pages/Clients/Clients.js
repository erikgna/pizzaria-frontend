import React, {useEffect, useState} from 'react'

import { useGlobalContext } from '../../../context'
import { User } from '../../components/User/User'
import { NovoUser } from '../../components/NovoUser/NovoUser'
import './styles.css'

export const Clients = () => {
    const {getUsers, users} = useGlobalContext()
    const [show, setShow] = useState(false)
    const [search, setSearch] = useState('')

    const handleShow = () => {
        setShow(show? false : true)
    }

    useEffect(() => {
        getUsers() // eslint-disable-next-line
    },[])

    return (
        <div className="clients">
            <h1>Contas</h1>
            <div className="actions">
                <button onClick={handleShow}>Novo Administrador</button>
                <form>
                    <label>Pesquisar</label>
                    <input type="text" placeholder="Buscar" onChange={(e) => setSearch(e.target.value)} />
                </form>
            </div>
            <div className="titles">
                <p>Nome</p>
                <p>Email</p>
                <p className="gridcenter">Ações</p>
            </div>
            {users.map(({_id, name, email}) => {
                if(search === "" || name?.toLowerCase()?.includes(search?.toLowerCase()?.trim()))
                return <User key={_id} id={_id} name={name} email={email} />
                return null
            })}
            {show&& <NovoUser click={handleShow} />}
        </div>
    )
}
