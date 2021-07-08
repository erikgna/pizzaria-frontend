import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineLogout, AiOutlineHome, AiOutlineUsergroupAdd, AiOutlineBarChart, AiFillTags, AiOutlineShoppingCart } from 'react-icons/ai'
import { FaHamburger } from 'react-icons/fa'

import './styles.css'
import { useGlobalContext } from '../../../context'

export const Sidebar = () => {
    const {logout} = useGlobalContext()

    return (
        <div id="sidebar">
            <div className="mouse-over">
                <h4>Navegação</h4>
                <Link to='/dashboard'><AiOutlineHome className="icon" />Inicio</Link>
                <Link to='/dashboard/clientes'><AiOutlineUsergroupAdd className="icon" />Clientes</Link>
                <Link to='/dashboard/produtos'><FaHamburger className="icon" />Produtos</Link>
                <Link to='/dashboard/relatorios'><AiOutlineBarChart className="icon" />Relatórios</Link>
                <Link to='/dashboard/combos'><AiFillTags className="icon" />Combos/Promoções</Link>
                <Link to='/dashboard/pedidos'><AiOutlineShoppingCart className="icon" />Pedidos</Link>
                <p onClick={logout}><AiOutlineLogout className="icon" />Sair</p>
            </div>
            <div className="icons">
                <AiOutlineHome className="icon-only"/>
                <AiOutlineUsergroupAdd className="icon-only"/>
                <FaHamburger className="icon-only" />
                <AiOutlineBarChart className="icon-only"/>
                <AiFillTags className="icon" />
                <AiOutlineShoppingCart className="icon-only"/>
                <AiOutlineLogout className="icon-only"/>
            </div>
        </div>
    )
}
