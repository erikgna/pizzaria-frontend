import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineHome, AiOutlineMenu } from 'react-icons/ai'
import { BiFoodMenu, BiLogIn } from 'react-icons/bi'
import { FiShoppingCart, FiTruck } from 'react-icons/fi'

import { Acompanhar } from '../../pages/Acompanhar/Acompanhar'
import { useGlobalContext } from '../../context'
import './styles.css'

export const Navbar = () => {
    const {user, logout} = useGlobalContext()
    const [navOpen, setNavOpen] = useState(false)
    const [show, setShow] = useState(false)

    const handleNav = () => {
        setNavOpen(navOpen? false : true)
    }

    const handleShow = () => {
        setShow(show? false : true)
    }

    return(
        <nav>
            <h1>Pizzaria</h1>
            <div id="column">
                <div className="desktop-menu">
                    <Link to='/'><AiOutlineHome className="icon" />Início</Link>
                    <Link to='/cardapio'><BiFoodMenu className="icon" />Cardápio</Link>
                    <Link to='/pedido'><FiShoppingCart className="icon" />Carrinho</Link>
                    {user? 
                    <p onClick={logout}><BiLogIn className="icon" />Sair</p> 
                    :
                    <Link to='/autenticação'><BiLogIn className="icon" />Entrar</Link>
                    }
                </div>
                <p id="goTrack" onClick={handleShow}><FiTruck className="icon"/>Pedido</p>
            </div>
            <AiOutlineMenu className="icon hamburger" style={{fontSize: '4rem'}} onClick={handleNav} />
            <div className={`mobile-menu ${navOpen? 'show' : 'unshow'}`}>
                <Link to='/' onClick={handleNav}><AiOutlineHome className="icon" />Início</Link>
                <Link to='/cardapio' onClick={handleNav}><BiFoodMenu className="icon" />Cardápio</Link>
                <Link to='/pedido' onClick={handleNav}><FiShoppingCart className="icon" />Carrinho</Link>
                {user? 
                <p onClick={logout}><BiLogIn className="icon" />Sair</p> 
                :
                <Link to='/autenticação'><BiLogIn className="icon" />Entrar</Link>
                }
                <p id="goTrack" onClick={handleShow}><FiTruck className="icon"/>Pedido</p>
            </div>
            {show&& <Acompanhar click={handleShow} />}
        </nav>
    )
}