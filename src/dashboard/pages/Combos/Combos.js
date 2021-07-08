import React, {useEffect, useState} from 'react'
import { AiOutlinePlus } from 'react-icons/ai'

import { useGlobalContext } from '../../../context'
import { Combo } from '../../components/Produto/Combo'
import { Edit } from '../Edit/Edit'
import '../Products/styles.css'

export const Combos = () => {
    const {getProducts, products} = useGlobalContext()
    const [showModal, setShowModal] = useState(false)
    const [search, setSearch] = useState('')

    const handleShow = () => {
        setShowModal(showModal? false : true)
    }

    useEffect(() => {
        getProducts() // eslint-disable-next-line
    },[])

    return (
        <div id="produtos">
            <div className="title">
                <h3>Combos</h3>
            </div>
            <div className="actions">
                <button onClick={handleShow}><AiOutlinePlus />Novo</button>
                <form>
                    <label>Pesquisar</label>
                    <input type="text" placeholder="Buscar" onChange={(e) => setSearch(e.target.value)} />
                </form>
            </div>
            <table>
                <tr>
                    <th>Nome</th>
                    <th>Categoria</th>
                    <th>Preço</th>
                    <th>Status</th>
                    <th>Ação</th>
                </tr>
                <Combo food={products} search={search} />
            </table>
            <Edit show={showModal} handleClick={handleShow} combo={true} />
        </div>
    )
}