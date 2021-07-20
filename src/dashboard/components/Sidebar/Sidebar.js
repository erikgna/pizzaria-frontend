import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineLogout, AiOutlineHome, AiOutlineUsergroupAdd, AiOutlineBarChart, AiFillTags, AiOutlineShoppingCart } from 'react-icons/ai'
import { FaHamburger, FaPizzaSlice, FaMotorcycle} from 'react-icons/fa'
import { FiTruck} from 'react-icons/fi'

import './styles.css'
import { useGlobalContext } from '../../../context'

export const Sidebar = () => {
    const {logout} = useGlobalContext()
    const [show, setShow] = useState(false)

    return (
        <div id="sidebar" onClick={() => setShow(show? false : true)}>
            <div className={show? 'mouse-show' : 'mouse-over'}>
                <h4>Navegação</h4>
                <Link to='/dashboard'><AiOutlineHome className="icon" />Inicio</Link>
                <Link to='/dashboard/contas'><AiOutlineUsergroupAdd className="icon" />Contas</Link>
                <Link to='/dashboard/produtos'><FaHamburger className="icon" />Produtos</Link>
                <Link to='/dashboard/relatorios'><AiOutlineBarChart className="icon" />Relatórios</Link>
                <Link to='/dashboard/combos'><AiFillTags className="icon" />Combos/Promoções</Link>
                <Link to='/dashboard/montar'><FaPizzaSlice className="icon" />Montagem</Link>
                <Link to='/dashboard/bairros'><FiTruck className="icon" />Bairros</Link>
                <Link to='/dashboard/pedidos'><AiOutlineShoppingCart className="icon" />Pedidos</Link>
                <Link to='/dashboard/motoboy'><FaMotorcycle className="icon" />Motoboys</Link>
                <p onClick={logout}><AiOutlineLogout className="icon" />Sair</p>
            </div>
            <div className={show? 'mouse-over' : 'icons'}>
                <AiOutlineHome className="icon-only"/>
                <AiOutlineUsergroupAdd className="icon-only"/>
                <FaHamburger className="icon-only" />
                <AiOutlineBarChart className="icon-only"/>
                <AiFillTags className="icon" />
                <FaPizzaSlice className="icon" style={{margin: "1rem 0"}}/>
                <FiTruck className="icon" style={{margin: "1rem 0"}}/>
                <AiOutlineShoppingCart className="icon-only"/>
                <FaMotorcycle className="icon-only"/>
                <AiOutlineLogout className="icon-only"/>
            </div>
        </div>
    )
}
