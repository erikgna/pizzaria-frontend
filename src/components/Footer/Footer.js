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
        window.location.href = e; 
    }

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
                    <div>
                        <h4><AiOutlineClockCircle className="icon" />Horário de Atendimento</h4>
                        <p>Os pedidos iniciam as 18:00hs . Nosso delivery Inicia as 18:30 ! Agradecemos a Preferencia!</p>
                    </div>
                </div>
                <div className="social">
                    <h4>Nossas redes sociais</h4>
                    <div>
                        <p onClick={() => redirect('https://www.facebook.com/milanopizzariaoficial')}><AiOutlineFacebook className="icon" />Facebook</p>
                        <p onClick={() => redirect('https://www.instagram.com/milanopizzariaoficial/')}><AiOutlineInstagram className="icon" />Instagram</p>
                        <p onClick={() => redirect('https://web.whatsapp.com/')}><AiOutlineWhatsApp className="icon" />WhatsApp</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
