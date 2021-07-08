import React, { useContext, useState } from 'react'
import * as api from './api/index'

const AppContext = React.createContext()

const AppProvider = ({children}) => {
    const [products, setProducts] = useState([])
    const [categorys, setCategorys] = useState([])
    const [loading, setLoading] = useState(false)
    const [freteValue, setFreteValue] = useState(0)
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')))
    const [users, setUsers] = useState([])
    const [caixa, setCaixa] = useState(null)

    const createUser = async (formData, level) => {
        try {
            if(level === undefined){
                await api.signup(formData)
            } else {
                const dataSend = {...formData, admin: level}
                const {data} = await api.signup(dataSend)
                await localStorage.setItem('profile', JSON.stringify(data.result))
                await localStorage.setItem('token', JSON.stringify(data.token))
            }
            document.location.reload()   
        } catch (error) {
            alert("Há campos incorretos!")
        }
    }

    const enterUser = async (formData) => {
        try {
            const {data} = await api.signin(formData)
            await localStorage.setItem('profile', JSON.stringify(data.result))
            await localStorage.setItem('token', JSON.stringify(data.token))
            document.location.reload()
        } catch (error) {
            alert("Email/Senha incorretos!")
        }
    }

    const logout = () => {
        localStorage.removeItem('profile')
        localStorage.removeItem('token')
        localStorage.removeItem('cart')
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
        document.location.reload()
    }

    const getCategorys = async () => {
        let data
        console.log(products.length)
        if(products.length === 0){
            data = await api.getCategorys()
            setCategorys(data?.data)
        }
        return data?.data
    }

    const createCategory = async (name) => {
        await api.newCategory({name})
        document.location.reload()
    }

    const editProduct = async (id, formData) => {
        try {
            setLoading(true)
            await api.editProduct(id, formData)
            setLoading(false)
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

    const addToCart = async (id, cart) => {
        if(cart === null) cart = []
        try {
            cart.push(id)
            await localStorage.setItem('cart', JSON.stringify(cart))
            setCart(cart)
            alert("Produto adicionado com sucesso!") 
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

    const finishBuy = async (user, cart, extra, comment, entrega, metodo) => {
        try {
            const handle = {user, cart, extra, comment, entrega, metodo}
            const {data} = await api.createOrder(handle)
            console.log(data)
            localStorage.removeItem('cart')
            //window.location.href = "/";
        } catch (error) {
            console.log(error)
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
        if(value !== undefined) await editCaixa(value)
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

    const editCaixa = async (data) => {
        await api.updateCaixa(caixa?._id, data)
        window.location.reload()
    }

    const getCharts = async (month) => {
        const {data} = await api.getCharts(month)
        return data
    }

    return (
            <AppContext.Provider value={{
                loading,
                createUser, enterUser, logout, user, setUser, editUser, getUsers, users, deleteUser,
                getProducts, createProduct, editProduct, products,
                addToCart, deleteCart, createCategory, categorys, getCategorys, cart,
                deleteProduct, deleteCategory,
                finishBuy, getOrders, getFrete, freteValue, editFrete, editOrder, deleteOrder, trackOrder,
                createCaixa, getCaixa, caixa, editCaixa, getCharts
            }}>
                {children}
            </AppContext.Provider>
        )
    }

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export {AppContext, AppProvider}