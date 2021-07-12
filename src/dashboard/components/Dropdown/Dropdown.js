import React, {useState} from 'react'

import { useGlobalContext } from '../../../context'
import { EditUser } from '../EditUser/EditUser'
import './styles.css'

export const Dropdowna = ({id, data}) => {
    const {deleteUser} = useGlobalContext()
    const [show, setShow] = useState(false)

    const handleShow = () => {
        setShow(show? false : true)
    }

    return (
        <section className='dropdown'>
            <div>
                <p onClick={handleShow}>Editar</p>
                <p onClick={() => deleteUser(id)}>Excluir</p>
            </div>
            {show&& <EditUser click={handleShow} id={id} form={data}/>}
        </section>
    )
}
