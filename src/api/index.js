import axios from 'axios'

const API = axios.create({baseURL: "http://localhost:5000"})

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }

    return req
})

export const signup = (formData) => API.post('/users/signup', formData)
export const signin = (formData) => API.post('/users/signin', formData)
export const getUsers = () => API.get('/users/')
export const editUser = (id, formData) => API.patch(`/users/update/${id}`, formData)
export const deleteUser = (id) => API.delete(`/users/delete/${id}`)

export const getProducts = () => API.get('/menus/')
export const newProduct = (formData) => API.post('/menus/create', formData)
export const editProduct = (id, formData) => API.patch(`/menus/update/${id}`, formData)
export const deleteProduct = (id) => API.delete(`/menus/delete/${id}`)

export const getCategorys = () => API.get(`/menus/category`)
export const newCategory = (name) => API.post(`/menus/category`, name)
export const deleteCategory = (id) => API.post(`/menus/delete/category/`, id)

export const getOrders = () => API.get('/orders')
export const updateOrder = (id, formData) => API.patch(`/orders/update/${id}`, formData)
export const createOrder = (data) => API.post('/orders/create', data)
export const deleteOrder = (id) => API.delete(`/orders/delete/${id}`)

export const getFrete = () => API.get('/orders/frete')
export const editFrete = (formData) => API.patch('/orders/frete', formData)

export const getCaixa = () => API.get('/caixa')
export const createCaixa = (text) => API.post('/caixa/create', text)
export const updateCaixa = (id, data) => API.patch(`/caixa/update/${id}`, data)

export const trackOrder = (email) => API.get(`/orders/track/${email}`)

export const getCharts = (month) => API.get(`/caixa/charts/${month}`)