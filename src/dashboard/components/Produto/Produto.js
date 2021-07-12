import React, {useState} from 'react'
import {BsTrash} from 'react-icons/bs'
import {BiEdit} from 'react-icons/bi'

import { useGlobalContext } from '../../../context'

export const Produto = ({food, selected, search, handleClick}) => {
    const {editProduct, deleteProduct} = useGlobalContext()
    const [avalia, setAvalia] = useState(false)

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
                        <td className="TDicon"><BiEdit onClick={() => handleClick({_id, name, category, price, avaliable, description, image})} /><BsTrash onClick={() => deleteProduct(_id)} /></td>
                    </tr>
                )
                return null
            })}
        </>
    )
}
