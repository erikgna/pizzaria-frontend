import React, {useState, useEffect} from 'react'

import './styles.css'
import {useGlobalContext} from '../../context'

export const Form = ({entrega, handleClick, setFrete, dados, setDados, full}) => {
    const {getCidades, getBairros} = useGlobalContext()
    const [citys, setCitys] = useState([])
    const [bairros, setBairros] = useState([])

    const handleBairro = (e) => {
        setDados({...dados, bairro: e.split(',')[0]})
        setFrete(e.split(',')[1])
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(dados.email === "" || dados.name === "" || dados.phone === "" || dados.phone2 === "") alert("Por faovr, preencha os dados!")
        else {
            handleClick()
            full(true)
        }
    }

    useEffect(() => {
        async function waitFetch() {
            const tempCitys = await getCidades()
            const tempBairros = await getBairros()
            setCitys(tempCitys)
            setBairros(tempBairros)
        }
        waitFetch() // eslint-disable-next-line
    },[])

    return (
        <div className="modal">
            <form className="modal-form">
                <label>Nome completo</label>
                <input value={dados.name} onChange={(e) => setDados({...dados, name: e.target.value})} type="text" placeholder="João Pedro" required />
                <label>CPF (opcional)</label>
                <input value={dados.cpf} onChange={(e) => setDados({...dados, cpf: e.target.value})} type="text" placeholder="111.111.111-11" />
                <label>Telefone</label>
                <input value={dados.phone} onChange={(e) => setDados({...dados, phone: e.target.value})} type="phone" placeholder="(99) 99999-9999" required />
                <label>Telefone 2</label>
                <input value={dados.phone2} onChange={(e) => setDados({...dados, phone2: e.target.value})} type="phone" placeholder="(99) 99999-9999" required/>
                <label>Email</label>
                <input value={dados.email} onChange={(e) => setDados({...dados, email: e.target.value})} type="email" placeholder="email@email.com" required />
                {(entrega === "Entregar em Domicílio")&& <div className="addressinfo">
                    <h4>Endereço</h4>
                    <label>Rua/Endereço</label>
                    <input value={dados.address} onChange={(e) => setDados({...dados, address: e.target.value})} type="text" placeholder="Rua José Bonifácio - 999" required />
                    <label>Complemento (Opcional)</label>
                    <input value={dados.complemento} onChange={(e) => setDados({...dados, complemento: e.target.value})} type="text" placeholder="Nenhum" required/>
                    <label>Cidade</label>
                    <select onChange={(e) => setDados({...dados, cidade: e.target.value})} required>
                        <option defaultValue hidden>Selecione uma cidade</option>
                        {citys.map(({_id, cidades}) => (
                            <option key={_id} value={cidades}>{cidades}</option>
                        ))}
                    </select>
                    <label>Bairro</label>
                    <select onChange={((e) => handleBairro(e.target.value))} required>
                        <option defaultValue hidden>Selecione um bairro</option>
                        {bairros.map(({_id, cidade, bairros, prices}) => {
                            if(dados.cidade === cidade) return <option key={_id} value={[bairros, prices]}>{bairros}</option>
                            return null
                        })}
                    </select>
                </div>}
                <div className="buttons">
                    <button onClick={() => handleClick()}>Fechar</button>
                    <button onClick={handleSubmit}>Enviar</button>
                </div>
            </form>
        </div>
    )
}
