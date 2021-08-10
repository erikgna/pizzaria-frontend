import React, {useState, useEffect} from 'react'
import {AiFillDelete} from 'react-icons/ai'

import {useGlobalContext} from '../../../context'

export const Bairros = () => {
    const {getCidades, getBairros, createCidade, createBairro, deleteBairro, deleteCidade} = useGlobalContext()
    const [textCidade, setTextCidade] = useState('')
    const [textBairro, setTextBairro] = useState({cidade: "", bairros: "", prices: 0})
    const [cidades, setCidades] = useState()
    const [bairros, setBairros] = useState()

    const handleSubmitCity = (e) => {
        e.preventDefault()
        createCidade({cidades: textCidade})
    }

    const handleSubmitBairro = (e) => {
        e.preventDefault()
        createBairro(textBairro)
    }

    useEffect(() => {
        async function waitFetch() {
            const tempCidades = await getCidades()
            const tempBairros = await getBairros()
            setCidades(tempCidades)
            tempBairros.sort((a, b) => a.cidade.localeCompare(b.cidade));
            setBairros(tempBairros)
        }
        waitFetch() // eslint-disable-next-line
    },[])

    return (
        <div className="montarg">
            <h3>Novos Bairros / Cidades</h3> 
            <div className="montagem">
                <div className="tamanho">
                    <h4>Cidades</h4>
                    {cidades?.map(({_id, cidades}) => (
                        <p key={_id}>{cidades}<AiFillDelete onClick={() => deleteCidade(_id)} /></p>
                    ))}
                    <form>
                        <label>Adicionar nova cidade</label>
                        <input type="text" placeholder="São Paulo / SP" onChange={(e) => setTextCidade(e.target.value)}/>
                        <button onClick={handleSubmitCity}>Adicionar</button>
                    </form>
                </div>
                <div className="sabores">
                    <h4>Bairros</h4>
                    {bairros?.map(({_id, cidade, bairros, prices}) => (
                        <p key={_id}>{cidade} -- {bairros} - R$ {prices}<AiFillDelete onClick={() => deleteBairro(_id)} /></p>
                    ))}
                    <form>
                        <label>Cidade</label>
                        <select onChange={(e) => setTextBairro({...textBairro, cidade: e.target.value})} style={{fontSize: '1.6rem', outline: "none"}}>
                            <option defaultValue hidden>Escolha uma cidade</option>
                            {cidades?.map(({_id, cidades}) => (
                                <option key={_id} value={cidades} style={{fontSize: '1.6rem'}}>{cidades}</option>
                            ))}
                        </select>
                        <label>Adicionar novo bairro</label>
                        <input type="text" placeholder="Centro" onChange={(e) => setTextBairro({...textBairro, bairros: e.target.value})}/>
                        <label>Valor de entrega</label>
                        <input type="number" placeholder="R$ 5" onChange={(e) => setTextBairro({...textBairro, prices: e.target.value})} />
                        <button onClick={handleSubmitBairro}>Adicionar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
