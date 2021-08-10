import React, { useContext, useState } from 'react'
import { jsPDF } from "jspdf";

import * as api from './api/index'

const AppContext = React.createContext()

const AppProvider = ({children}) => {
    const [products, setProducts] = useState([])
    const [categorys, setCategorys] = useState([])
    const [loading, setLoading] = useState(false)
    const [freteValue, setFreteValue] = useState(0)
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')))
    const [users, setUsers] = useState([])
    const [open, setOpen] = useState(false)
    const [caixa, setCaixa] = useState(null)

    const createUser = async (formData) => {
        try {
            const {data} = await api.signup(formData)
            localStorage.setItem('token', JSON.stringify(data.token))
            document.location.reload()   
        } catch (error) {
            alert("Há campos incorretos!")
        }
    }

    const enterUser = async (formData) => {
        try {
            const {data} = await api.signin(formData)
            localStorage.setItem('token', JSON.stringify(data.token))
            document.location.reload()
        } catch (error) {
            alert("Email/Senha incorretos!")
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('cart')
        localStorage.removeItem('email')
        window.location.href = "/";
    }

    const getUsers = async () => {
        const {data} = await api.getUsers()
        setUsers(data)
    }

    const editUser = async (id, formData) => {
        try {
            await api.editUser(id, formData)
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }
    
    const getProducts = async () => {
        setLoading(true)
        let data
        if(products.length === 0){
            data = await api.getProducts()
            setProducts(data?.data)
            setLoading(false)
        }
        setLoading(false)
        return data?.data
    }

    const createProduct = async (formData) => {
        setLoading(true)
        await api.newProduct(formData)
        setLoading(false)
        alert('Produto criado com sucesso!')
        document.location.reload()
    }

    const getCategorys = async () => {
        let data
        if(categorys.length === 0){
            data = await api.getCategorys()
            setCategorys(data?.data)
        }
        return data?.data
    }

    const getBordas = async () => {
        const {data} = await api.getBorda()
        return data
    }

    const createCategory = async (name) => {
        await api.newCategory({name})
        document.location.reload()
    }

    const createBorda = async (data) => {
        await api.newBorda(data)
        document.location.reload()
    }

    const editProduct = async (id, formData) => {
        try {
            setLoading(true)
            await api.editProduct(id, formData)
            setLoading(false)
            alert('Produto editado com sucesso!')
            document.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    const deleteUser = async (id) => {
        await api.deleteUser(id)
        window.location.reload()
    }

    const deleteProduct = async (id) => {
        await api.deleteProduct(id)
        window.location.reload()
    }

    const deleteCategory = async (id) => {
        await api.deleteCategory({name: id})
        window.location.reload()
    }

    const deleteBorda = async (id) => {
        await api.deleteBorda(id)
        window.location.reload()
    }

    const addToCart = async (obj, cart) => {
        if(cart === null) cart = []
        try {
            if(obj.tamanho.length === 0 || obj.total === 0) alert("Preencha os campos!") 
            else{
                cart.push(obj)
                await localStorage.setItem('cart', JSON.stringify(cart))
                setCart(cart)
                alert("Produto adicionado com sucesso!") 
                window.location.href = "/pedido"
            }
        } catch (error) {
            console.log(error)
        }
    }

    const deleteCart = async (index) => {
        const tempCart = cart
        tempCart.splice(index, 1)
        await localStorage.setItem('cart', JSON.stringify(tempCart))
        setCart(tempCart)
        window.location.reload()
    }

    const finishBuy = async (user, cart, comment, entrega, metodo, frete, cartao, dinheiro) => {
        try {
            const handle = {user, cart, comment, entrega, metodo, frete, cartao, dinheiro}
            if(open === true){
                await api.createOrder(handle)
                localStorage.removeItem('cart')
                alert('Pedido feito com sucesso!')
            }
            else alert('Estamos fechados no momento, por favor, tente novamente mais tarde!')
            window.location.href = "/acompanhar";
        } catch (error) {
            alert('Ocorreu um erro, por favor, tente novamente!')
        }
    }

    const getOrders = async () => {
        const {data} = await api.getOrders()
        return data
    }

    const trackOrder = async (email) =>{
        const {data} = await api.trackOrder(email)
        return data
    }

    const getFrete = async () => {
        const {data} = await api.getFrete()
        setFreteValue(data[0])
    }

    const editFrete = async (formData) => {
        await api.editFrete(formData)
        console.log(formData)
        window.location.reload()
    }

    const editOrder = async (id, formData) => {
        await api.updateOrder(id, formData)
        window.location.reload()
    }

    const deleteOrder = async (id, value) => {
        if(value !== undefined) await editCaixa(value, true)
        await api.deleteOrder(id)
        window.location.reload()
    }

    const getCaixa = async () => {
        const {data} = await api.getCaixa()
        setCaixa(data[0])
    }

    const createCaixa = async (text) => {
        const handle = {initial: text, total: text}
        await api.createCaixa(handle)
        window.location.reload()
    }

    const editCaixa = async (data, isReload) => {
        await api.updateCaixa(caixa?._id, data)
        if(isReload !== true) window.location.reload()
    }

    const getCharts = async (month) => {
        const {data} = await api.getCharts(month)
        return data
    }

    const getHorarios = async () => {
        const {data} = await api.getHorarios()
        const temp = data[0]
        const today = new Date().getDay()
        let dayOpen
        let dayClose
        if(today === 0){
            dayOpen = temp.openDom
            dayClose = temp.closeDom
        }
        if(today === 1){
            dayOpen = temp.openSeg
            dayClose = temp.closeSeg
        }
        if(today === 2){
            dayOpen = temp.openTer
            dayClose = temp.closeTer
        }
        if(today === 3){
            dayOpen = temp.openQua
            dayClose = temp.closeQua
        }
        if(today === 4){
            dayOpen = temp.openQui
            dayClose = temp.closeQui
        }
        if(today === 5){
            dayOpen = temp.openSex
            dayClose = temp.closeSex
        }
        if(today === 6){
            dayOpen = temp.openSab
            dayClose = temp.closeSab
        }

        const padrao = "01-01-1970 "
        const check = parseInt(dayClose.substring(0,2))
        const tempAtual = new Date().getHours()
        let atual
        if(tempAtual === 1 || tempAtual === 2 || tempAtual === 3 || tempAtual === 4 || tempAtual === 5 || tempAtual === 6 || tempAtual === 7 || tempAtual === 8 || tempAtual === 9) atual = padrao+"0"+new Date().getHours()+":"+new Date().getMinutes()+":00"
        else atual = padrao+new Date().getHours()+":"+new Date().getMinutes()+":00"

        const aberto = padrao+dayOpen+":00"
        let fechado
        if(check === 0) fechado = padrao+"24:00:00"
        else if(check === 1) fechado = padrao+"25:00:00"
        else if(check === 2) fechado = padrao+"26:00:00"
        else if(check === 4) fechado = padrao+"27:00:00"
        else if(check === 5) fechado = padrao+"27:00:00"
        else if(check === 6) fechado = padrao+"27:00:00"
        else if(check === 7) fechado = padrao+"27:00:00"
        else if(check === 8) fechado = padrao+"27:00:00"
        else if(check === 9) fechado = padrao+"27:00:00"
        else fechado = padrao+dayClose+":00"

        if(atual > aberto && atual < fechado) setOpen(true)
        else setOpen(false)

        return data[0]
    }

    const editHorario = async (data) => {
        try {
            await api.editHorario(data)
        } catch (error) {
            console.log(error)
        }
    }

    const getCidades = async () => {
        const {data} = await api.getCidade()
        return data
    }

    const getBairros = async () => {
        const {data} = await api.getBairro()
        return data
    }

    const createCidade = async (data) => {
        data.preventDefault()
        try {
            await api.createCidade(data)
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    const createBairro = async (data) => {
        data.preventDefault()
        try {
            await api.createBairro(data)
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    const deleteBairro = async (id) => {
        await api.deleteBairro(id)
        window.location.reload()
    }

    const deleteCidade = async (id) => {
        await api.deleteCidade(id)
        window.location.reload()
    }

    const getSabor = async () => {
        const {data} = await api.getSabor()
        return data
    }

    const createSabor = async (data) => {
        data.preventDefault()
        try {
            await api.createSabor(data)
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    const deleteSabor = async (id) => {
        await api.deleteSabor(id)
        window.location.reload()
    }

    const getTamanho = async () => {
        const {data} = await api.getTamanho()
        return data
    }

    const createTamanho = async (data) => {
        try {
            await api.createTamanho(data)
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    const deleteTamanho = async (id) => {
        await api.deleteTamanho(id)
        window.location.reload()
    }

    const getMotoboy = async () => {
        const {data} = await api.getMotoboy()
        return data
    }

    const createMotoboy = async (data) => {
        try {
            await api.newMotoboy(data)
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    const editMotoboy = async (id, data) => {
        await api.editMotoboy(id, data)
        document.location.reload()
    }

    const deleteMotoboy = async (id) => {
        await api.deleteMotoboy(id)
        window.location.reload()
    }

    const remakeMotoboy = async () => {
        await api.remakeMotoboy()
    }

    const getSub = async () => {
        const {data} = await api.getSub()
        return data
    }

    const createSub = async (data) => {
        data.preventDefault()
        await api.createSub({name: data})
        document.location.reload()
    }

    const deleteSub = async (id) => {
        await api.deleteSub(id)
        document.location.reload()
    }

    const getExtras = async () => {
        const {data} = await api.getExtra()
        return data
    }

    const createExtra = async (data) => {
        await api.createExtra(data)
        window.location.reload()
    }

    const deleteExtra = async (id) => {
        await api.deleteExtra(id)
        window.location.reload()
    }

    const printNote = async (info) => {
        const doc = new jsPDF({
            orientation: "portrait",
            unit: "in",
            format: [6, info.cart.length+5]
        })
        doc.setFontSize(13)
        doc.text("Pizzaria Milano", 0.5,1)
        doc.text("CNPJ - 12345678910123", 0.5,1.5)
        doc.text("Telefone -  (99) 9 9999-9999", 0.5,2)
        doc.text("---------------------------------------------------------------------------------", 0.5,2.5)
        doc.text(info.client, 0.5,3)
        doc.text(info.phone, 0.5,3.5)
        doc.text(info.address, 0.5,4)
        let line = 4.5
        let total = 0
        info.cart.forEach((item) => {
            doc.text(item.tamanho, 0.5, line)
            line += .5
            total += item.total
            doc.text("R$ " + item.total.toString(), 0.5, line)
        })
        doc.text("Valor total R$ " + total, 0.5,line+0.5)
        doc.save(info.client + ".pdf")
    }

    return (
            <AppContext.Provider value={{
                loading, printNote,
                createUser, enterUser, logout, editUser, getUsers, users, deleteUser,
                getProducts, createProduct, editProduct, products,
                addToCart, deleteCart, createCategory, categorys, getCategorys, cart, getBordas, createBorda, deleteBorda,
                deleteProduct, deleteCategory,
                finishBuy, getOrders, getFrete, freteValue, editFrete, editOrder, deleteOrder, trackOrder,
                createCaixa, getCaixa, caixa, editCaixa, getCharts, editHorario, getHorarios, open,
                createCidade, createBairro, getBairros, getCidades, deleteBairro, deleteCidade,
                getSabor, createSabor, deleteSabor, getTamanho, createTamanho, deleteTamanho,
                getMotoboy, createMotoboy, deleteMotoboy, editMotoboy, remakeMotoboy, getSub,
                createSub, deleteSub, getExtras, createExtra, deleteExtra
            }}>
                {children}
            </AppContext.Provider>
        )
    }

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export {AppContext, AppProvider}