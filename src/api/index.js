import axios from 'axios'

const API = axios.create({baseURL: "https://pizzariaback.herokuapp.com"})
// const API = axios.create({baseURL: "http://localhost:5000/"})

API.interceptors.request.use((req) => {
    if(localStorage.getItem('token')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('token'))}`
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

export const getBorda = () => API.get(`/menus/borda`)
export const newBorda = (data) => API.post(`/menus/borda`, data)
export const deleteBorda = (id) => API.delete(`/menus/borda/${id}`)

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

export const getHorarios = () => API.get(`/horarios`)
export const editHorario = (data) => API.patch(`/horarios`, data)

export const getCidade = () => API.get(`/local/cidade`)
export const createCidade = (data) => API.post(`/local/cidade`, data)
export const deleteCidade = (id) => API.delete(`/local/cidade/${id}`)

export const getBairro = () => API.get(`/local/bairro`)
export const createBairro = (data) => API.post(`/local/bairro`, data)
export const deleteBairro = (id) => API.delete(`/local/bairro/${id}`)

export const getTamanho = () => API.get(`/menus/tamanho`)
export const createTamanho = (data) => API.post(`/menus/tamanho`, data)
export const deleteTamanho = (id) => API.delete(`/menus/tamanho/${id}`)

export const getSabor = () => API.get(`/menus/sabor`)
export const createSabor = (data) => API.post(`/menus/sabor`, data)
export const deleteSabor = (id) => API.delete(`/menus/sabor/${id}`)

export const getMotoboy = () => API.get(`/motoboy`)
export const editMotoboy = (id, data) => API.patch(`/motoboy/${id}`, data)
export const newMotoboy = (data) => API.post(`/motoboy`, data)
export const deleteMotoboy = (id) => API.delete(`/motoboy/${id}`)
export const remakeMotoboy = () => API.get(`/motoboy/remake`)

export const getSub = () => API.get(`/menus/sub`)
export const createSub = (data) => API.post(`/menus/sub`, data)
export const deleteSub = (id) => API.delete(`/menus/sub/${id}`)

export const getExtra = () => API.get(`/menus/extra`)
export const createExtra = (data) => API.post(`/menus/extra`, data)
export const deleteExtra = (id) => API.delete(`/menus/extra/${id}`)