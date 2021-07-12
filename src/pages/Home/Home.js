import React, {useEffect} from "react";

import { useGlobalContext } from "../../context";
import { Button } from "../../components/Button/Button";
import { Loading } from "../../components/Loading/Loading";
import { Combos } from "../../components/Combos/Combos";
import './styles.css'

export const Home = () => {
    const {getProducts, products, loading} = useGlobalContext()

    const toMenu = () => {
        window.location.href = "/cardapio"
    }

    useEffect(() => {
        getProducts() // eslint-disable-next-line
    }, [])

    return (
        <section className="homebg">
            <div className="hero">
                <div id="bg" />
                <div>
                    <h2>Escolha sua pizza, temos diversos sabores incriveis para você!</h2>
                    <p>Os pedidos iniciam as 18:00hs . Nosso delivery Inicia as 18:30 ! Agradecemos a Preferencia!
                        Rua Euclides Rosa, 46 - Barra - Balneário Camboriú/SC
                    </p>
                    <Button text="Faça seu pedido" handleClick={() => toMenu()}>Clique em Mim</Button>
                </div>
            </div>
            <h2>Nossos combos</h2>
            <div className="combos">
            {products.map(({_id, image, name, description, price, avaliable, combo}) => (
                    loading? <Loading key={_id} /> : 
                    avaliable&& combo&& <Combos key={_id} id={_id} img={image} title={name} desc={description} price={price} />
                ))}
            </div>
        </section>
    )
}