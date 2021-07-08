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

export const Edit = ({show, handleClick, combo, form}) => {
    const {createProduct, editProduct} = useGlobalContext()
    const [text, setText] = useState((form === undefined)? initialValue : form)

    const textChange = (e) => {
        setText({...text, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(form === undefined) createProduct({...text, avaliable: true, combo})
        else editProduct(form?._id, text)
    }

    return (
        <div id="editar" className={show? 'eshow':'eunshow'}>
            <form>
                <div>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <label>Título</label>
                        <input
                            name="name"
                            type="text"
                            placeholder={form?.name}
                            onChange={(e) => textChange(e)}
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
                        />
                    </div>
                </div>
                <div>
                    {combo? null :
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <label>Categoria</label>
                            <input
                                name="category"
                                type="text"
                                placeholder={form?.category}
                                onChange={(e) => textChange(e)}
                            />
                        </div>
                    }
                    <div className="margin"/>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <label>Preço</label>
                        <input
                            name="price"
                            type="number"
                            placeholder={`R$ ${(form?.price === undefined)? '' : form?.price}`}
                            onChange={(e) => textChange(e)}
                        />
                    </div>
                </div>
                <div>
                    <div className="img-div">
                        <img src={img} alt="error" />
                        <button><AiOutlinePlus />Editar<FileBase type="file" multiple={false} onDone={({base64}) => setText({...text, image: base64})} /></button>
                        <div className="imgUrl">
                            <input type="text" placeholder="URL de uma imagem" onChange={(e) => setText({...text, image: e.target.value})} />
                        </div>
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