import React from 'react'
import {FaMapMarkerAlt} from 'react-icons/fa'
import {
    AiOutlinePhone, 
    AiOutlineClockCircle, 
    AiOutlineFacebook, 
    AiOutlineInstagram, 
    AiOutlineWhatsApp
} from 'react-icons/ai'
import './styles.css'

export const Footer = () => {

    const redirect = (e) => {
        console.log('oi')
        window.location.href = `https://${e}.com`; 
    }

    return (
        <footer>
            <div className="footer">
                <div className="leftSide">
                    <div>
                        <h4><FaMapMarkerAlt className="icon" />Localização</h4>
                        <p>Balneário Camboriú/SC, Camboriú/SC, Itapema/SC, Itajaí/SC</p>
                    </div>
                    <div>
                        <h4><AiOutlinePhone className="icon" />Telefone</h4>
                        <p>(47) 97264-7983</p>
                    </div>
                    <div>
                        <h4><AiOutlineClockCircle className="icon" />Horário de Atendimento</h4>
                        <p>Atendimento de Quarta à Segunda. De 18:00 às 00:00 horas</p>
                    </div>
                </div>
                <div className="social">
                    <h4>Nossas redes sociais</h4>
                    <div>
                        <p onClick={() => redirect('facebook')}><AiOutlineFacebook className="icon" />Facebook</p>
                        <p onClick={() => redirect('instagram')}><AiOutlineInstagram className="icon" />Instagram</p>
                        <p onClick={() => redirect('twitter')}><AiOutlineWhatsApp className="icon" />WhatsApp</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
