import React, {useEffect, useState} from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import { Navbar } from "./components/Navbar/Navbar";
import { Home } from "./pages/Home/Home";
import { Menu } from "./pages/Menu/Menu";
import { Order } from "./pages/Order/Order";
import { Footer } from "./components/Footer/Footer";
import Dashboard from "./dashboard/Dashboard"
import { useGlobalContext } from "./context";
import {Login} from './dashboard/pages/Login/Login'
import {Pedidos} from './dashboard/pages/Pedidos/Pedidos'
import { Acompanhar } from './pages/Acompanhar/Acompanhar';

function App() {
  const {getProducts} = useGlobalContext()
  const [admin, setAdmin] = useState(false)
  const [funcio, setFuncio] = useState(false)
  const [isWhite, setIsWhite] = useState(false)
  const token = useState(JSON.parse(localStorage.getItem('token')))

  useEffect(() => {
    getProducts()

    const path = window.location.pathname.substring(0,10)

    if(token) {
      setAdmin(true)
      if(path === '/dashboard') setIsWhite(true)
    }
    if(token){
      setFuncio(true)
      if(path === '/dashboard') setIsWhite(true)
    } // eslint-disable-next-line
  },[])

  return (
    <Router>
      <section className={!isWhite? 'body' : null}>
      {!isWhite&& <Navbar />}
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/cardapio' component={Menu} />
            <Route path='/pedido' component={Order} />
            <Route path='/acompanhar' component={Acompanhar} />
            {admin&& <Route path='/dashboard' component={Dashboard} />}
            {funcio&& <Route path='/dashboard' component={Pedidos} /> }
            <Route path='/login' component={() => isWhite? <Redirect to="/dashboard" /> : <Login /> } />
            {!isWhite&& <Route path='/dashboard' component={Login} />}
        </Switch>
        {!isWhite&& <Footer />}
        </section>
    </Router>
  );
}

export default App;
