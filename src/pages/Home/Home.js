import React, {useEffect, useState} from "react";

import { useGlobalContext } from "../../context";
import { Button } from "../../components/Button/Button";
import { Combos } from "../../components/Combos/Combos";
import './styles.css'
import logo from '../../assets/pizza-hero.png'

export const Home = () => {
    const {getProducts, products, getCategorys, categorys} = useGlobalContext()
    const [userCategory, setUserCategory] = useState('Todas')

    const toMenu = () => {
        window.location.href = "/cardapio"
    }

    useEffect(() => {
        getCategorys()
        getProducts() // eslint-disable-next-line
    }, [])

    return (
        <section className="homebg">
            <div className="hero">
                <img id="bg" src={logo} alt='Pizza Logo' />
                <div>
                    <h2>Escolha sua pizza, temos diversos sabores incriveis para você!</h2>
                    <p>Os pedidos iniciam as 18:00hs . Nosso delivery Inicia as 18:30 ! Agradecemos a Preferencia!
                        Rua Euclides Rosa, 46 - Barra - Balneário Camboriú/SC
                    </p>
                    <Button text="Faça seu pedido" handleClick={() => toMenu()}>Clique em Mim</Button>
                </div>
            </div>
            <h2>Nossos combos</h2>
            <div className="homeCategorys">
                <label>Categorias</label>
                <select onChange={(e) => setUserCategory(e.target.value)}>
                    <option value='Todas'>Todas</option>
                    {categorys?.map(({name}) => (
                        <option value={name} key={name}>{name}</option>
                    ))}
                </select>
            </div>
            <div className="combos">
            {products.map(({_id, image, name, category, description, price, avaliable, combo}) => {
                if(category === userCategory || userCategory === "Todas") return avaliable&& combo&& <Combos key={_id} id={_id} img={image} category={category} title={name} desc={description} price={price} />
                return null
                })}
            </div>
        </section>
    )
}