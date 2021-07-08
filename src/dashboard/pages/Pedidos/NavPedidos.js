import React, {useState} from 'react'
import { AiFillPrinter, AiOutlineMenu, AiOutlineLogout } from 'react-icons/ai'
import { CgScreen } from 'react-icons/cg'
import { RiMoneyDollarCircleFill } from 'react-icons/ri'
// import { MdAddShoppingCart } from 'react-icons/md'

// import { NovoPedidoModal } from '../../components/NovoPedidoModal/NovoPedidoModal'
import { CaixaModal } from '../../components/CaixaModal/CaixaModal'
import { OpenCaixa } from '../../components/OpenCaixa/OpenCaixa'
import { useGlobalContext } from '../../../context'
import { useEffect } from 'react/cjs/react.development'

export const NavPedidos = ({orderLength}) => {
    const {getCaixa, caixa, editCaixa, logout} = useGlobalContext()
    // const [show, setShow] = useState(false)
    const [showCaixa, setShowCaixa] = useState(false)
    const [showButtons, setShowButtons] = useState(false)
    const [showOpen, setShowOpen] = useState(false)

    // const handleShow = () => {
    //     if(caixa !== undefined) setShow(show? false : true)
    // }

    const handleShowCaixa = () => {
        if(caixa !== undefined) setShowCaixa(showCaixa? false : true)
    }

    const handleShowButtons = () => {
        setShowButtons(showButtons? false : true)
    }

    const handleShowOpen = () => {
        setShowOpen(showOpen? false : true)
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
                <div className="green">
                    <AiFillPrinter />
                    <div>
                        <p>Impressão</p>
                        <span>ativa</span>
                    </div>
                </div>
                {/* <div className="cart" onClick={handleShow}>
                    <MdAddShoppingCart />
                    <div>
                        <p>Novo Pedido</p>
                        <span>registrar pedido</span>
                    </div>
                </div> */}
                <div className="cart" onClick={logout}>
                    <AiOutlineLogout />
                    <div>
                        <p>Sair</p>
                    </div>
                </div>
            </div>
            {/* {show&& <NovoPedidoModal click={handleShow} /> } */}
            {showCaixa&& <CaixaModal orderLength={orderLength} click={handleShowCaixa} /> }
            {showOpen&& <OpenCaixa click={handleShowOpen} open={caixa} edit={editCaixa} /> }
        </div>
    )
}
