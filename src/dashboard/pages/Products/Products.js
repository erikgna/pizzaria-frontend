import React, {useState, useEffect} from 'react'
import { AiOutlinePlus } from 'react-icons/ai'

import { useGlobalContext } from '../../../context'
import { Produto } from '../../components/Produto/Produto'
import { Edit } from '../Edit/Edit'
import { EditCategory } from '../../components/EditCategory/EditCategory'
import './styles.css'

export const Products = () => {
    const {getProducts, products, getCategorys, categorys, deleteCategory} = useGlobalContext()
    const [showModal, setShowModal] = useState(false)
    const [showModalCategory, setShowModalCategory] = useState(false)
    const [category, setCategory] = useState("Todos")
    const [search, setSearch] = useState('')
    const [formData, setFormData] = useState({})

    const handleShow = () => {
        setShowModal(showModal? false : true)
    }

    const handleShowCategory = () => {
        setShowModalCategory(showModalCategory? false : true)
    }

    const handleClick = (data) => {
        setFormData(data)
        setShowModal(showModal? false:true)
    }

    useEffect(() => {
        getProducts()
        getCategorys() // eslint-disable-next-line
    }, [])

    return (
        <div id="produtos">
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
                    <button onClick={() => deleteCategory(category)}>
                            Excluir
                    </button>
                </div>
            </div>
            <div className="actions">
                <div className="buttons">
                    <button onClick={handleShow}><AiOutlinePlus />Novo</button>
                    <button onClick={handleShowCategory}><AiOutlinePlus />Nova Categoria</button>
                </div>
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
                <tbody>
                    <Produto food={products} selected={category} search={search} handleClick={handleClick}/>
                </tbody>
            </table>
            {showModal&& <Edit handleClick={handleShow} combo={false} form={formData} />}
            {showModalCategory&& <EditCategory handleClick={handleShowCategory} />}
        </div>
    )
}