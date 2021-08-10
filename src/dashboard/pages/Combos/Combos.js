import React, {useEffect, useState} from 'react'
import { AiOutlinePlus } from 'react-icons/ai'

import { useGlobalContext } from '../../../context'
import { Combo } from '../../components/Produto/Combo'
import { Edit } from '../Edit/Edit'
import '../Products/styles.css'

export const Combos = () => {
    const {getProducts, products, getCategorys, categorys} = useGlobalContext()
    const [showModal, setShowModal] = useState(false)
    const [search, setSearch] = useState('')
    const [formData, setFormData] = useState({})
    const [category, setCategory] = useState("Todos")

    const handleClick = (data) => {
        setFormData(data)
        setShowModal(showModal? false:true)
    }

    const handleShow = () => {
        setShowModal(showModal? false : true)
    }

    useEffect(() => {
        getCategorys()
        getProducts() // eslint-disable-next-line
    },[])

    return (
        <div id="produtos">
            <div className="title">
                <h3>Combos</h3>
            </div>
            <div className="title">
                <h3>{category}</h3>
                <div id="categorys">
                    <form>
                        <label>Tipo</label>
                        <select onChange={(e) => setCategory(e.target.value)}>
                            <option value="Todos">Todos</option>
                            {categorys.map(({name}) => (
                                <option key={name} value={name}>{name}</option>
                            ))}
                        </select>
                    </form>
                </div>
            </div>
            <div className="actions">
                <button id="comboButton" onClick={handleShow}><AiOutlinePlus />Novo</button>
                <form>
                    <label>Pesquisar</label>
                    <input type="text" placeholder="Buscar" onChange={(e) => setSearch(e.target.value)} />
                </form>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Categoria</th>
                        <th>Preço</th>
                        <th>Status</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <Combo food={products} search={search} handleClick={handleClick} selected={category} />
            </table>
            {showModal&& <Edit handleClick={handleShow} combo={true} form={formData} categorys={categorys} /> }
        </div>
    )
}