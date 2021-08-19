import React, {useEffect, useState} from 'react'
import {AiFillDelete, AiFillCheckCircle, AiFillEdit} from 'react-icons/ai'

import './styles.css'
import {useGlobalContext} from '../../../context'

export const Montar = () => {
    const {getCategorys, categorys, editMontar, getExtras, createExtra, deleteExtra, getSabor, createSabor, deleteSabor, getTamanho, createTamanho, deleteTamanho, getBordas, createBorda, deleteBorda, getSub, createSub, deleteSub} = useGlobalContext()
    const [sabores, setSabores] = useState()
    const [tamanhos, setTamanhos] = useState()
    const [bordas, setBordas] = useState()
    const [saborText, setSaborText] = useState({id:"", name: "", categoria: "", ingredientes: "", price: 0, especial: ''})
    const [tamanhoText, setTamanhoText] = useState({id:"", name: '', value: 0, price: 0, especial: ''})
    const [bordaText, setBordaText] = useState({id:"", name: '', value: 0, especial: ''})
    const [subBorda, setSubBorda] = useState({id:"", name: '', especial: ''})
    const [subs, setSubs] = useState([])
    const [extra, setExtra] = useState({id:"", name: "", value: 0, especial: ''})
    const [extras, setExtras] = useState([])
    const [especial, setEspecial] = useState('')

    const editText = (name, id, text, extra, price, unique) => {
        if(name === 'tamanho') setTamanhoText({id, name: text, value: extra, price})
        if(name === 'sabor') setSaborText({id, name: text, categoria: extra, ingredientes: price, price: unique})
        if(name === 'borda') setBordaText({id, name: text, value: price})
        if(name === 'categoria') setSubBorda({id, name: text})
        if(name === 'extra') setExtra({id, name: text, value: price})
    }

    const handleSpecial = (e) => {
        setEspecial(e)
        setTamanhoText({...tamanhoText, special: e})
        setSaborText({...saborText, special: e})
        setBordaText({...bordaText, special: e})
        setSubBorda({...subBorda, special: e})
        setExtra({...extra, special: e})
    }

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
            getCategorys()
        }
        waitFetch() // eslint-disable-next-line
    }, [])

    return (
        <div className="montarg">
            <h3>Configurar Montagem</h3>
            <div className="categoriaEspecial">
                <select onChange={(e) => handleSpecial(e.target.value)}>
                    <option defaultValue hidden>Escolha uma categoria especial</option>
                    {categorys.map(({name, isSpecial}) => {
                        if(isSpecial === true) return <option key={name} value={name}>{name}</option>
                        return null
                    })}
                </select>
            </div>
            <div className="montagem">
                <div className="tamanho">
                    <h4>Tamanhos de {especial}</h4>
                    {tamanhos?.map(({_id, name, value, price, special}) => {
                        if(special === especial) return <div key={_id} className="textIcon">
                            <p>{name} - {value} sabores (R$ {price})</p>
                            <div>
                                <AiFillEdit className="edit" onClick={() => editText('tamanho', _id, name, value, price)} />
                                <AiFillDelete onClick={() => deleteTamanho(_id)} />
                            </div>
                        </div>
                        return null
                    })}
                    <form>
                        <label>Adicionar Tamanho</label>
                        <input type="text" value={tamanhoText.name} onChange={(e) => setTamanhoText({...tamanhoText, name: e.target.value})} placeholder="Pizza Grande (6 fatias) 25cm" />
                        <label>Quantidade de Sabores</label>
                        <input type="text" value={tamanhoText.value} onChange={(e) => setTamanhoText({...tamanhoText, value: e.target.value})} placeholder="2" />
                        <label>Valor</label>
                        <input type="text" value={tamanhoText.price} onChange={(e) => setTamanhoText({...tamanhoText, price: e.target.value})} placeholder="R$ 50" />
                        <input type="button" value="Adicionar" onClick={() => createTamanho(tamanhoText)} />
                    </form>
                </div>
                <div className="sabores">
                    <h4>Sabores de {especial}</h4>
                    {sabores?.map(({_id, name, categoria, ingredientes, avaliable, price, special}) => {
                        if(special === especial) return <div key={_id} className="textIcon">
                            <p>{name} -- {categoria} -- ({ingredientes}) -- R$ {price}</p>
                            <div>
                                <AiFillEdit className="edit" onClick={() => editText('sabor', _id, name, categoria, ingredientes, price)} />
                                <AiFillCheckCircle onClick={() => editMontar('sabor', _id, avaliable)} id={avaliable? 'checked' : 'uncheck'} />
                                <AiFillDelete onClick={() => deleteSabor(_id)}/>
                            </div>
                        </div>
                        return null
                    })}
                    <form>
                        <label>Adicionar Sabor</label>
                        <input value={saborText.name} type="text" onChange={(e) => setSaborText({...saborText, name: e.target.value})} placeholder="Calabresa" />
                        <label>Categoria do Sabor</label>
                        <select onChange={(e) => setSaborText({...saborText, categoria: e.target.value})}>
                            <option defaultValue hidden>Escolha uma categoria</option>
                            {subs?.map(({_id, name}) => (
                                <option key={_id} value={name}>{name}</option>
                            ))}
                        </select>
                        <label>Adicionar Ingredientes</label>
                        <input value={saborText.ingredientes} type="text" onChange={(e) => setSaborText({...saborText, ingredientes: e.target.value})} placeholder="Calabresa, queijo, orégano.." />
                        <label>Valor extra</label>
                        <input value={saborText.price} type="number" onChange={(e) => setSaborText({...saborText, price: e.target.value})} placeholder="R$ 5" />
                        <input type="button" value="Adicionar" onClick={() => createSabor(saborText)} />
                    </form>
                </div>
                <div className="bordas">
                    <h4>Bordas de {especial}</h4>
                    {bordas?.map(({_id, name, value, avaliable, special}) => {
                        if(special === especial) return <div key={_id} className="textIcon">
                             <p>{name} -- R$ {value}</p>
                            <div>
                                <AiFillEdit className="edit" onClick={() => editText('borda', _id, name, '', value)} />
                                <AiFillCheckCircle onClick={() => editMontar('borda', _id, avaliable)} id={avaliable? 'checked' : 'uncheck'} />
                                <AiFillDelete onClick={() => deleteBorda(_id)}/>
                            </div>
                        </div>
                        return null
                    })}
                    <form>
                        <label>Adicionar Borda</label>
                        <input value={bordaText.name} type="text" onChange={(e) => setBordaText({...bordaText, name: e.target.value})} placeholder="Cheddar" />
                        <label>Valor da Borda</label>
                        <input value={bordaText.value} type="text" onChange={(e) => setBordaText({...bordaText, value: e.target.value})} placeholder="R$ 5" />
                        <input type="button" value="Adicionar" onClick={() => createBorda(bordaText)} />
                    </form>
                </div>
                <div className="sabores">
                    <h4>Categorias de Sabores</h4>
                    {subs?.map(({_id, name, special}) => {
                        if(special === especial) return <div key={_id} className="textIcon">
                            <p>{name}</p>
                            <div>
                                <AiFillEdit className="edit" onClick={() => editText('categoria', _id, name)} />
                                <AiFillDelete onClick={() => deleteSub(_id)}/>
                            </div>
                        </div>
                        return null
                    })}
                    <label>Adicionar categoria de sabor</label>
                    <input value={subBorda.name} type="text" placeholder="Tradicional doce.." onChange={(e) => setSubBorda({...subBorda, name: e.target.value})} />
                    <input type="button" value="Adicionar" onClick={() => createSub(subBorda)} />
                </div>
                <div className="bordas">
                    <h4>Ingredientes Extras</h4>
                    {extras?.map(({_id, name, value, avaliable, special}) => {
                        if(special === especial) return <div key={_id} className="textIcon">
                            <p>{name} -- R$ {value}</p>
                            <div>
                                <AiFillEdit className="edit" onClick={() => editText('extra', _id, name, '', value)} />
                                <AiFillCheckCircle onClick={() => editMontar('extra', _id, avaliable)} id={avaliable? 'checked' : 'uncheck'} />
                                <AiFillDelete onClick={() => deleteExtra(_id)}/>
                            </div>
                        </div>
                        return null
                    })}
                    <form>
                        <label>Adicionar Extra</label>
                        <input value={extra.name} type="text" onChange={(e) => setExtra({...extra, name: e.target.value})} placeholder="Tomate" />
                        <label>Valor do Extra</label>
                        <input value={extra.value} type="text" onChange={(e) => setExtra({...extra, value: e.target.value})} placeholder="R$ 5" />
                        <input type="button" value="Adicionar" onClick={() => createExtra(extra)} />
                    </form>
                </div>
            </div>
        </div>
    )
}
