import React, {useState, useEffect} from 'react'
import { jsPDF } from "jspdf";
import { AiFillPrinter, AiOutlineMenu, AiOutlineLogout } from 'react-icons/ai'
import { CgScreen } from 'react-icons/cg'
import { RiMoneyDollarCircleFill } from 'react-icons/ri'
import { FaPizzaSlice } from 'react-icons/fa'

import { CaixaModal } from '../../components/CaixaModal/CaixaModal'
import { OpenCaixa } from '../../components/OpenCaixa/OpenCaixa'
import { OpenBorda } from '../../components/OpenBorda/OpenBorda'
import { useGlobalContext } from '../../../context'

export const NavPedidos = ({orderLength}) => {
    const {getCaixa, caixa, editCaixa, logout } = useGlobalContext()
    const [showCaixa, setShowCaixa] = useState(false)
    const [showButtons, setShowButtons] = useState(false)
    const [showOpen, setShowOpen] = useState(false)
    const [showBorda, setShowBorda] = useState(false)

    const handleShowCaixa = () => {
        if(caixa !== undefined) setShowCaixa(showCaixa? false : true)
    }

    const handleShowButtons = () => {
        setShowButtons(showButtons? false : true)
    }

    const handleShowOpen = () => {
        setShowOpen(showOpen? false : true)
    }

    const handleShowBorda = () => {
        setShowBorda(showBorda? false : true)
    }

    const pdf = () => {
        if(caixa !== undefined){
            const doc = new jsPDF({
                orientation: "portrait",
                unit: "in",
                format: [5, 7]
            });
        
            function dataAtualFormatada(){
                var data = new Date(),
                    dia  = data.getDate().toString(),
                    diaF = (dia.length === 1) ? '0'+dia : dia,
                    mes  = (data.getMonth()+1).toString(),
                    mesF = (mes.length === 1) ? '0'+mes : mes,
                    anoF = data.getFullYear();
                return diaF+"/"+mesF+"/"+anoF;
            }

            const receita = () => {
                const temp = caixa?.total-caixa?.retiradas
                return temp
            }

            const media = () => {
                const temp = caixa?.total / caixa?.count
                return temp
            }

            doc.text("Pizzaria", 2, 1)
            doc.text("CNPJ - 12345678910123", 0.5, 2)
            doc.text("Endereço - Rua João Vericio 1320", 0.5, 2.5)
            doc.text("Data - " + dataAtualFormatada(), 0.5, 3)
            doc.text("  Receita do Dia", 0, 4)
            doc.text("- R$ " + receita(), 3.5, 4)
            doc.text("  Total de Entradas", 0, 4.5)
            doc.text("- R$ " + caixa?.total, 3.5, 4.5)
            doc.text("  Pedidos Finalizados", 0, 5)
            doc.text("- " + caixa?.count, 3.5, 5)
            doc.text("  Ticket Médio", 0, 5.5)
            doc.text("- R$ " + media(), 3.5, 5.5)
            doc.text("  Total em Retiradas", 0, 6)
            doc.text("- R$ " + caixa?.retiradas, 3.5, 6)
            doc.save(dataAtualFormatada() + ".pdf")
        }
    }

    useEffect(() => {
        getCaixa() // eslint-disable-next-line
    }, [])

    return (
        <div id="navpedidos">
            <AiOutlineMenu className="menu-hamb" onClick={handleShowButtons} />
            <div className={`nav-row ${showButtons? 'showbtns' : 'unshowbtns'}`}>
                <div className="green" onClick={() => handleShowOpen()}>
                    <CgScreen />
                    {(caixa === undefined)? 
                    <div>
                        <p>Fechado (0 online)</p>
                        <span>delivery online</span>
                    </div>
                    : 
                    <div>
                        <p>Aberto ({orderLength} online)</p>
                        <span>delivery online</span>
                    </div>
                    }
                </div>
                <div className="caixa" onClick={handleShowCaixa}>
                    <RiMoneyDollarCircleFill />
                    <div>
                        <p>Caixa</p>
                        <span>{(caixa === undefined)? 'fechado' : 'aberto'}</span>
                    </div>
                </div>
                <div className="green" onClick={pdf}>
                    <AiFillPrinter />
                    <div>
                        <p>Impressão</p>
                        <span>ativa</span>
                    </div>
                </div>
                <div className="green" onClick={handleShowBorda}>
                    <FaPizzaSlice />
                    <div>
                        <p>Bordas</p>
                    </div>
                </div>
                <div className="cart" onClick={logout}>
                    <AiOutlineLogout />
                    <div>
                        <p>Sair</p>
                    </div>
                </div>
            </div>
            {showCaixa&& <CaixaModal orderLength={orderLength} click={handleShowCaixa} /> }
            {showOpen&& <OpenCaixa click={handleShowOpen} open={caixa} edit={editCaixa} /> }
            {showBorda&& <OpenBorda click={handleShowBorda} /> }
        </div>
    )
}
