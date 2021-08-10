import React, {useEffect, useState} from 'react'
import {AiFillDelete} from 'react-icons/ai'

import './styles.css'
import {useGlobalContext} from '../../../context'

export const Montar = () => {
    const {getExtras, createExtra, deleteExtra, getSabor, createSabor, deleteSabor, getTamanho, createTamanho, deleteTamanho, getBordas, createBorda, deleteBorda, getSub, createSub, deleteSub} = useGlobalContext()
    const [sabores, setSabores] = useState()
    const [tamanhos, setTamanhos] = useState()
    const [bordas, setBordas] = useState()
    const [saborText, setSaborText] = useState({name: "", categoria: "", ingredientes: ""})
    const [tamanhoText, setTamanhoText] = useState({name: '', value: 0, price: 0})
    const [bordaText, setBordaText] = useState({name: '', value: 0})
    const [subBorda, setSubBorda] = useState('')
    const [subs, setSubs] = useState([])
    const [extra, setExtra] = useState({name: "", value: 0})
    const [extras, setExtras] = useState([])

    useEffect(() => {
        async function waitFetch() {
            const tempSabores = await getSabor()
            const tempTamanhos = await getTamanho()
            const tempBordas = await getBordas()
            const tempSubs = await getSub()
            const tempExtras = await getExtras()
            setSabores(tempSabores)
            setTamanhos(tempTamanhos)
            setBordas(tempBordas)
            setSubs(tempSubs)
            setExtras(tempExtras)
        }
        waitFetch() // eslint-disable-next-line
    }, [])

    return (
        <div className="montarg">
            <h3>Configurar Montagem de Pizzas</h3>
            <div className="montagem">
                <div className="tamanho">
                    <h4>Tamanhos de Pizza</h4>
                    {tamanhos?.map(({_id, name, value}) => (
                        <p key={_id}>{name} - {value} sabores<AiFillDelete onClick={() => deleteTamanho(_id)}/></p>
                    ))}
                    <form>
                        <label>Adicionar Tamanho</label>
                        <input type="text" onChange={(e) => setTamanhoText({...tamanhoText, name: e.target.value})} placeholder="Pizza Grande (6 fatias) 25cm" />
                        <label>Quantidade de Sabores</label>
                        <input type="text" onChange={(e) => setTamanhoText({...tamanhoText, value: e.target.value})} placeholder="2" />
                        <label>Valor</label>
                        <input type="text" onChange={(e) => setTamanhoText({...tamanhoText, price: e.target.value})} placeholder="R$ 50" />
                        <input type="button" value="Adicionar" onClick={() => createTamanho(tamanhoText)} />
                    </form>
                </div>
                <div className="sabores">
                    <h4>Sabores de Pizzas</h4>
                    {sabores?.map(({_id, name, categoria, ingredientes}) => (
                        <p key={_id}>{name} -- {categoria} -- ({ingredientes})<AiFillDelete onClick={() => deleteSabor(_id)}/></p>
                    ))}
                    <form>
                        <label>Adicionar Sabor</label>
                        <input type="text" onChange={(e) => setSaborText({...saborText, name: e.target.value})} placeholder="Calabresa" />
                        <label>Categoria do Sabor</label>
                        <select onChange={(e) => setSaborText({...saborText, categoria: e.target.value})}>
                            <option defaultValue hidden>Escolha uma categoria</option>
                            {subs?.map(({_id, name}) => (
                                <option key={_id} value={name}>{name}</option>
                            ))}
                        </select>
                        <label>Adicionar Ingredientes</label>
                        <input type="text" onChange={(e) => setSaborText({...saborText, ingredientes: e.target.value})} placeholder="Calabresa, queijo, orégano.." />
                        <input type="button" value="Adicionar" onClick={() => createSabor(saborText)} />
                    </form>
                </div>
                <div className="bordas">
                    <h4>Bordas de Pizzas</h4>
                    {bordas?.map(({_id, name, value}) => (
                        <p key={_id}>{name} -- R$ {value} <AiFillDelete onClick={() => deleteBorda(_id)}/></p>
                    ))}
                    <form>
                        <label>Adicionar Borda</label>
                        <input type="text" onChange={(e) => setBordaText({...bordaText, name: e.target.value})} placeholder="Cheddar" />
                        <label>Valor da Borda</label>
                        <input type="text" onChange={(e) => setBordaText({...bordaText, value: e.target.value})} placeholder="R$ 5" />
                        <input type="button" value="Adicionar" onClick={() => createBorda(bordaText)} />
                    </form>
                </div>
                <div className="sabores">
                    <h4>Categorias de Sabores</h4>
                    {subs?.map(({_id, name}) => (
                        <p key={_id}>{name} <AiFillDelete onClick={() => deleteSub(_id)}/></p>
                    ))}
                    <label>Adicionar categoria de sabor</label>
                    <input type="text" placeholder="Tradicional doce.." onChange={(e) => setSubBorda(e.target.value)} />
                    <input type="button" value="Adicionar" onClick={() => createSub(subBorda)} />
                </div>
                <div className="bordas">
                    <h4>Ingredientes Extras</h4>
                    {extras?.map(({_id, name, value}) => (
                        <p key={_id}>{name} -- R$ {value} <AiFillDelete onClick={() => deleteExtra(_id)}/></p>
                    ))}
                    <form>
                        <label>Adicionar Extra</label>
                        <input type="text" onChange={(e) => setExtra({...extra, name: e.target.value})} placeholder="Tomate" />
                        <label>Valor do Extra</label>
                        <input type="text" onChange={(e) => setExtra({...extra, value: e.target.value})} placeholder="R$ 5" />
                        <input type="button" value="Adicionar" onClick={() => createExtra(extra)} />
                    </form>
                </div>
            </div>
        </div>
    )
}
