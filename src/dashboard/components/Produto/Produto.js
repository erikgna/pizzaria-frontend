import React, {useState} from 'react'
import {BsTrash} from 'react-icons/bs'
import {BiEdit} from 'react-icons/bi'

import { useGlobalContext } from '../../../context'
import { Edit } from '../../pages/Edit/Edit'

export const Produto = ({food, selected, search}) => {
    const {editProduct, deleteProduct} = useGlobalContext()
    const [show, setShow] = useState(false)
    const [avalia, setAvalia] = useState(false)
    const [formData, setFormData] = useState({})
    
    const handleClick = (data) => {
        setFormData(data)
        setShow(show? false:true)
    }

    const handleClickStatus = (id, status) => {
        setAvalia(avalia? false : true)
        editProduct(id, {avaliable: status})
    }

    return(
        <>
            {food.map(({_id, image, name, category, price, avaliable, description, combo}) => {
                if(category === selected || selected === "Todos")
                if(search === "" || name?.toLowerCase()?.includes(search?.toLowerCase()?.trim()))
                if (combo === false)
                return(
                    <tr key={_id}>
                        <td className="TDimg">
                            <img src={image} alt="error" />
                            {name}
                        </td>
                        <td>{category}</td>
                        <td>R$ {price}</td>
                        <td>
                            <div className={`drag ${avaliable&& 'active'}`} onClick={() => handleClickStatus(_id, avaliable? false : true)}>
                                <div className="pointer" />
                            </div>
                        </td>
                        <td className="TDicon"><BiEdit onClick={() => handleClick({_id, name, category, price, avaliable, description})} /><BsTrash onClick={() => deleteProduct(_id)} /></td>
                    </tr>
                )
                return null
            })}
            <Edit show={show} handleClick={handleClick} combo={false} form={formData}/>
        </>
    )
}
