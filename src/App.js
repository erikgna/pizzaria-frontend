import React, {useEffect, useState} from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import { Navbar } from "./components/Navbar/Navbar";
import { Home } from "./pages/Home/Home";
import { Menu } from "./pages/Menu/Menu";
import { Order } from "./pages/Order/Order";
import { Footer } from "./components/Footer/Footer";
import Dashboard from "./dashboard/Dashboard"
import { useGlobalContext } from "./context";
import { Auth } from "./pages/Auth/Auth";
import {Login} from './dashboard/pages/Login/Login'
import {Pedidos} from './dashboard/pages/Pedidos/Pedidos'

function App() {
  const {user, getProducts} = useGlobalContext()
  const [admin, setAdmin] = useState(false)
  const [funcio, setFuncio] = useState(false)
  const [isWhite, setIsWhite] = useState(false)

  useEffect(() => {
    getProducts()

    const path = window.location.pathname

    if(user?.admin === 3) {
      setAdmin(true)
      if(path === '/dashboard') setIsWhite(true)
    }
    if(user?.admin === 2){
      setFuncio(true)
      if(path === '/dashboard') setIsWhite(true)
    } // eslint-disable-next-line
  },[])

  return (
    <Router>
        <Switch>
          <section className={!isWhite&& 'body'}>
            {!isWhite&& <Navbar />}
            <Route exact path='/' component={Home} />
            <Route path='/cardapio' component={Menu} />
            <Route path='/pedido' component={Order} />
            <Route path='/autenticação' component={() => user? <Redirect to="/" /> : <Auth /> } />
            {admin&& <Route path='/dashboard' component={Dashboard} />}
            {funcio&& <Route path='/dashboard' component={Pedidos} /> }
            <Route path='/login' component={() => isWhite? <Redirect to="/dashboard" /> : <Login /> } />
            {!isWhite&& <Route path='/dashboard' component={Login} />}
            {!isWhite&& <Footer />}
          </section>
        </Switch>
    </Router>
  );
}

export default App;
