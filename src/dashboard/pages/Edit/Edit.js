import React, {useState} from 'react'
import { AiOutlinePlus, AiOutlineCheck } from 'react-icons/ai'
import FileBase from 'react-file-base64'

import { useGlobalContext } from '../../../context'
import img from '../../../assets/example.png'
import './styles.css'

const initialValue = {
    name: "",
    description: "",
    category: "",
    price: "",
    image: "",
    avaliable: false
}

export const Edit = ({handleClick, combo, form, categorys}) => {
    const {createProduct, editProduct} = useGlobalContext()
    const [text, setText] = useState((form === undefined)? initialValue : form)

    const textChange = (e) => {
        setText({...text, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(text.name === undefined) alert('Nome inválido')
        else if(text.price === undefined) alert('Preço inválido')
        else if(text.image === undefined) alert('Imagem inválida')
        else if(text.category === undefined) alert('Categoria inválida')
        else if(form === undefined || Object.keys(form).length === 0) createProduct({...text, avaliable: true, combo})
        else editProduct(form?._id, text)
    }

    return (
        <div id="editar" className='eshow'>
            <form>
                <div>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <label>Título</label>
                        <input
                            name="name"
                            type="text"
                            placeholder={form?.name}
                            onChange={(e) => textChange(e)}
                            required
                        />
                    </div>
                    <div className="margin"/>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <label>Descrição</label>
                        <input
                            name="description"
                            type="text"
                            placeholder={form?.description}
                            onChange={(e) => textChange(e)}
                            required
                        />
                    </div>
                </div>
                <div>                    
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <label>Categoria</label>
                        <select name="category" onChange={(e) => textChange(e)} required>
                            <option defaultValue hidden>Selecione uma categoria</option>
                            {categorys.map(({name}) => (
                                <option key={name} value={name}>{name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="margin"/>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <label>Preço</label>
                        <input
                            name="price"
                            type="number"
                            placeholder={`R$ ${(form?.price === undefined)? '' : form?.price}`}
                            onChange={(e) => textChange(e)}
                            required
                        />
                    </div>
                </div>
                <div>
                    <div className="img-div">
                        <img src={(form?.image === undefined)? img : form?.image} alt="error" />
                        <button><AiOutlinePlus />Editar<FileBase type="file" multiple={false} onDone={({base64}) => setText({...text, image: base64})} /></button>
                        {/* <div className="imgUrl">
                            <input type="text" placeholder="URL de uma imagem" onChange={(e) => setText({...text, image: e.target.value})} />
                        </div> */}
                    </div>
                </div>
                <div>
                    <div className="button close" onClick={handleClick}>Fechar</div>
                    <div className="button" onClick={handleSubmit}><AiOutlineCheck/>Salvar Alterações</div>
                </div>
            </form>
        </div>
    )
}