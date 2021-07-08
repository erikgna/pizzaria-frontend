import React, {useState} from 'react'
import { BsThreeDots } from 'react-icons/bs'

import { useGlobalContext } from '../../../context'
import { EditUser } from '../EditUser/EditUser'
import './styles.css'

export const Dropdown = ({id, data}) => {
    const {deleteUser} = useGlobalContext()
    const [show, setShow] = useState(false)

    const handleShow = () => {
        setShow(show? false : true)
    }

    return (
        <section className='dropdown'>
            <BsThreeDots />
            <section className='content'>
                <p onClick={handleShow}>Editar</p>
                <p onClick={() => deleteUser(id)}>Excluir</p>
            </section>
            <EditUser showModal={show} click={handleShow} id={id} form={data}/>
        </section>
    )
}
