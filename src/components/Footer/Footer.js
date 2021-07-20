import React, {useEffect, useState} from 'react'
import {FaMapMarkerAlt} from 'react-icons/fa'
import {
    AiOutlinePhone, 
    AiOutlineClockCircle, 
    AiOutlineFacebook, 
    AiOutlineInstagram, 
    AiOutlineWhatsApp
} from 'react-icons/ai'

import {useGlobalContext} from '../../context'
import './styles.css'

export const Footer = () => {
    const {getHorarios} = useGlobalContext()
    const [horarios, setHorarios] = useState({
        openSeg: "",
        closeSeg: "",
        openTer: "",
        closeTer: "",
        openQua: "",
        closeQua: "",
        openQui: "",
        closeQui: "",
        openSex: "",
        closeSex: "",
        openSab: "",
        closeSab: "",
        openDom: "",
        closeDom: ""
    })
    const redirect = (e) => {
        window.open(e, '_blank').focus(); 
    }

    useEffect(() => {
        async function waitHorarios() {
            const temp = await getHorarios()
            setHorarios(temp)
        }
        waitHorarios() // eslint-disable-next-line
    }, [])

    return (
        <footer>
            <div className="footer">
                <div className="leftSide">
                    <div>
                        <h4><FaMapMarkerAlt className="icon" />Localização</h4>
                        <p>Rua Euclides Rosa, 46 - Barra - Balneário Camboriú/SC</p>
                    </div>
                    <div>
                        <h4><AiOutlinePhone className="icon" />Telefone</h4>
                        <p>(47) 3269-4930</p>
                    </div>
                    <div className="horarios">
                        <h4><AiOutlineClockCircle className="icon" />Horário de Atendimento</h4>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Dom</td>
                                    <td>{horarios.openDom}</td>
                                    <td>{horarios.closeDom}</td>
                                </tr>
                                <tr>
                                    <td>Seg</td>
                                    <td>{horarios.openSeg}</td>
                                    <td>{horarios.closeSeg}</td>
                                </tr>
                                <tr>
                                    <td>Ter</td>
                                    <td>{horarios.openTer}</td>
                                    <td>{horarios.closeTer}</td>
                                </tr>
                                <tr>
                                    <td>Qua</td>
                                    <td>{horarios.openQua}</td>
                                    <td>{horarios.closeQua}</td>
                                </tr>
                                <tr>
                                    <td>Qui</td>
                                    <td>{horarios.openQui}</td>
                                    <td>{horarios.closeQui}</td>
                                </tr>
                                <tr>
                                    <td>Sex</td>
                                    <td>{horarios.openSex}</td>
                                    <td>{horarios.closeSex}</td>
                                </tr>
                                <tr>
                                    <td>Sáb</td>
                                    <td>{horarios.openSab}</td>
                                    <td>{horarios.closeSab}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="social">
                    <h4>Nossas redes sociais</h4>
                    <div>
                        <p onClick={() => redirect('https://www.facebook.com/milanopizzariaoficial')}><AiOutlineFacebook className="icon" />Facebook</p>
                        <p onClick={() => redirect('https://www.instagram.com/milanopizzariaoficial/')}><AiOutlineInstagram className="icon" />Instagram</p>
                        <p onClick={() => redirect('https://wa.me/5547932694930')}><AiOutlineWhatsApp className="icon" />WhatsApp</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
