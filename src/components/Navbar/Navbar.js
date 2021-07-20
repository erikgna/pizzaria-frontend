import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineHome, AiOutlineMenu } from 'react-icons/ai'
import { BiFoodMenu } from 'react-icons/bi'
import { FiShoppingCart, FiTruck } from 'react-icons/fi'

import { useGlobalContext } from '../../context'
import './styles.css'

export const Navbar = () => {
    const {getHorarios, open, cart} = useGlobalContext()
    const [navOpen, setNavOpen] = useState(false)

    const handleNav = () => {
        setNavOpen(navOpen? false : true)
    }

    useEffect(() => {
        const array = []
        if(!cart) localStorage.setItem('cart', JSON.stringify(array))
        getHorarios() // eslint-disable-next-line
    },[])

    return(
        <nav>
            <div className={`isopen ${open? 'opengreen' : 'openred'}`}>
                <p>{open? "Aberto Agora" : "Fechado Agora"}</p>
            </div>
            <h1>Milano</h1>
            <div id="column">
                <div className="desktop-menu">
                    <Link to='/'><AiOutlineHome className="icon" />Início</Link>
                    <Link to='/cardapio'><BiFoodMenu className="icon" />Cardápio</Link>
                    <Link to='/pedido'><FiShoppingCart className="icon" />Carrinho</Link>
                </div>
                <Link to="/acompanhar"><p id="goTrack"><FiTruck className="icon"/>Pedido</p></Link>
            </div>
            <AiOutlineMenu className="icon hamburger" style={{fontSize: '4rem'}} onClick={handleNav} />
            <div className={`mobile-menu ${navOpen? 'show' : 'unshow'}`}>
                <Link to='/' onClick={handleNav}><AiOutlineHome className="icon" />Início</Link>
                <Link to='/cardapio' onClick={handleNav}><BiFoodMenu className="icon" />Cardápio</Link>
                <Link to='/pedido' onClick={handleNav}><FiShoppingCart className="icon" />Carrinho</Link>
                <Link to='/acompanhar' onClick={handleNav}><FiTruck className="icon" />Pedido</Link>
            </div>
        </nav>
    )
}