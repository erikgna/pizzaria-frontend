import React, {useState, useEffect} from 'react'
import {AiFillCheckCircle, AiFillDelete} from 'react-icons/ai'

import {useGlobalContext} from '../../context'
import './styles.css'

export const Monte = ({click, img}) => {
    const {addToCart, cart, getTamanho, getSabor, getBordas, getExtras, getSub} = useGlobalContext()
    const [tamanho, setTamanho] = useState('')
    const [quanty, setQuanty] = useState([1])
    const [sabor, setSabor] = useState({sabor1: '', sabor2: '', sabor3: '', sabor4: ''})
    const [borda, setBorda] = useState()
    const [max, setMax] = useState([1])
    const [sabores, setSabores] = useState([])
    const [tamanhos, setTamanhos] = useState([])
    const [bordas, setBordas] = useState([])
    const [extras, setExtras] = useState([])
    const [total, setTotal] = useState(0)
    const [extra, setExtra] = useState([])
    const [subs, setSubs] = useState([])
    const [sub, setSub] = useState('Todas')
    const [one, setOne] = useState(0)
    const [two, setTwo] = useState(0)
    const [three, setThree] = useState(0)
    const [four, setFour] = useState(0)

    const handleTamanho = (e) => {
        const splited = e.split(',')
        setTamanho(splited[1])
        setTotal(total+parseInt(splited[2]))
        const number = parseInt(splited[0])+1
        let list = []
        let count = 1
        do {
            list.push(count)
            count++
        } while (count < number)
        setMax(list)
    }

    const handleBorda = (e) => {
        const splited = e.split(',')
        setTotal(total+parseInt(splited[1]))
        setBorda(splited[0])
    }

    const handleQuanty = (e) => {
        const number = parseInt(e)+1
        let list = []
        let count = 1
        do {
            list.push(count)
            count++
        } while (count < number)
        setQuanty(list)
    }

    const handleExtra = (name, value) => {
        setTotal(total + value)
        setExtra([...extra, {name, value}])
    }

    const deleteExtra = (index, price) => {
        let temp = extra.splice(index, 1)
        if(extra.length === 0) temp = []
        setExtra(temp)
        setTotal(total - price)
    }

    const handleSabor = (value, index) => {
        const saborValue = value.split(',')[0]
        const saborPrice = value.split(',')[1]
        if(index === 0) {
            setTotal(total+parseFloat(saborPrice)-parseFloat(one))
            setSabor({...sabor, sabor1: saborValue})
            setOne(saborPrice)    
        }
        else if(index === 1) {
            setTotal(total+parseFloat(saborPrice)-parseFloat(two))
            setSabor({...sabor, sabor2: saborValue})
            setTwo(saborPrice)     
        }
        else if(index === 2) {
            setTotal(total+parseFloat(saborPrice)-parseFloat(three))
            setSabor({...sabor, sabor3: saborValue})
            setThree(saborPrice)     
        }
        else if(index === 3) {
            setTotal(total+parseFloat(saborPrice)-parseFloat(four))
            setSabor({...sabor, sabor4: saborValue})
            setFour(saborPrice)    
        }
    }

    const handleCart = () => {
        const sabores = [sabor.sabor1, sabor.sabor2, sabor.sabor3, sabor.sabor4]
        addToCart({img, tamanho, borda, sabores, total, extra}, cart)
    }

    useEffect(() => {
        async function waitFetch() {
            const tempSabor = await getSabor()
            const tempTamanho = await getTamanho()
            const tempBorda = await getBordas()
            const tempExtra = await getExtras()
            const tempSub = await getSub()
            setTamanhos(tempTamanho)
            setSabores(tempSabor)
            setBordas(tempBorda)
            setExtras(tempExtra)
            setSubs(tempSub)
        }
        waitFetch() // eslint-disable-next-line 
    },[])

    return (
        <div className="montar">
            <form>
                <div className="first">
                    <div>
                        <label>Tamanho da Pizza</label>
                        <select onChange={(e) => handleTamanho(e.target.value)}>
                            <option defaultValue hidden>Escolha um Tamanho</option>
                            {tamanhos?.map(({name, value, price}) => (
                                <option key={name} value={[value, name, price]}>{name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Quantos Sabores?</label>
                        <select onChange={(e) => handleQuanty(e.target.value)}>
                            {max.map((item) => (
                                <option key={item} value={item}>{item} Sabor</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="sub">
                    <label>Categorias dos sabores</label>
                    <select onChange={(e) => setSub(e.target.value)}>
                        <option defaultValue hidden>Todas</option>
                        {subs.map(({name}) => (
                            <option key={name} value={name}>{name}</option>
                        ))}
                    </select>
                </div>
                <div className="sabores">
                    {quanty?.map((item, index) => (
                        <div key={item}>
                            <label>Sabor {item}</label>
                            <select onChange={(e) => handleSabor(e.target.value, index)}>
                                <option defaultValue hidden>Sabor {item}</option>
                                    {sabores?.map(({name, ingredientes, categoria, avaliable, price}) => {
                                        if(sub === 'Todas' && avaliable === true) return <option key={name} value={[name, price]}>{name} -- ({ingredientes}) -- R$ {price}</option>
                                        else if(sub === categoria && avaliable === true) return <option key={name} value={[name, price]}>{name} -- ({ingredientes}) -- R$ {price}</option>
                                        return null
                                    })}
                            </select>
                        </div>
                    ))}
                </div>
                <div className="sabores bordas">
                    <div>
                        <label>Borda</label>
                        <select onChange={(e) => handleBorda(e.target.value)}>
                            <option defaultValue hidden>Escolha uma borda</option>
                            {bordas?.map(({name, value, avaliable}) => {
                                if(avaliable === true) return <option key={name} value={[name, value]}>{name}</option>
                                return null
                            })}
                        </select>
                    </div>
                </div>
                <div className="sabores bordas">
                    <div>
                        <h6>Ingredientes Extras</h6>
                        {extras.map(({_id, name, value, avaliable}) => {
                            if(avaliable === true) return <p className="ingredientes" key={_id} onClick={() => handleExtra(name, value)}><AiFillCheckCircle/> {name} (R$ {value})</p>
                            return null
                        })}
                    </div>
                    <div className="ingredientesDiv">
                        <h6>Ingredientes escolhidos</h6>
                        {extra?.map(({name, value}, index) => (
                            <p key={index}>{name} -- R$ {value} <AiFillDelete onClick={() => deleteExtra(index, value)}/></p>
                        ))}
                    </div>
                </div>
            </form>
            <div className="last">
                <div className="buttons">
                    <button onClick={click}>Fechar</button>
                    <button onClick={() => handleCart()}>Adicionar ao Carrinho</button>
                </div>
                <div className="price">
                    <h4>Valor: R$ {total}</h4>
                </div>
            </div>
        </div>
    )
}
