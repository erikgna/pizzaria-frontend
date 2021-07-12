import React, {useEffect, useState} from 'react'
import { Product } from '../../components/Product/Product'

import { Loading } from '../../components/Loading/Loading'
import { useGlobalContext } from '../../context'
import './styles.css'

export const Menu = () => {
    const {getProducts, products, loading, getCategorys, categorys} = useGlobalContext()
    const [search, setSearch] = useState('')
    const [userCategory, setUserCategory] = useState('Todas')

    useEffect(() => {
        getProducts()
        getCategorys() // eslint-disable-next-line
    }, [])
    if(loading === true) return <Loading />

    return (
        <div className="menu">
            <h1>Nosso Cardápio</h1>
            <div className="categorys">
                <div>
                    <label>Categorias</label>
                    <select onChange={(e) => setUserCategory(e.target.value)}>
                        <option value='Todas'>Todas</option>
                        {categorys?.map(({name}) => (
                            <option value={name} key={name}>{name}</option>
                        ))}
                    </select>
                </div>
                <input type="text" placeholder="Pesquisar produto.." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>

            <div className="products">
                {products.map(({_id, category, image, name, description, price, avaliable, combo}) => {
                    if(category === userCategory || userCategory === "Todas")
                    if(search === "" || name?.toLowerCase()?.includes(search?.toLowerCase()?.trim()))
                    return avaliable&& !combo&& <Product key={_id} id={_id} img={image} title={name} desc={description} price={price} />
                    return null
                })}
            </div>
        </div>
    )
}
