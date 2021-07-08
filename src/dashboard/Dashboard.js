import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './styles.css'
import { Inicio } from "./pages/Inicio/Inicio";
import { Sidebar } from "./components/Sidebar/Sidebar"
import { Products } from "./pages/Products/Products";
import { Clients } from "./pages/Clients/Clients";
import { Combos } from "./pages/Combos/Combos";
import { Relatorios } from "./pages/Relatorios/Relatorios";
import { Pedidos } from "./pages/Pedidos/Pedidos";
import { Edit } from "./pages/Edit/Edit";

function Dashboard() {
  return (
    <Router>
        <div id="dashboard">
            <Sidebar />
            <Switch>
                <Route path='/dashboard' exact component={Inicio} />
                <Route path='/dashboard/clientes' component={Clients} />
                <Route path='/dashboard/produtos' component={Products} />
                <Route path='/dashboard/editar/:id' component={Edit} />
                <Route path='/dashboard/relatorios' component={Relatorios} />
                <Route path='/dashboard/combos' component={Combos} />
                <Route path='/dashboard/pedidos' component={Pedidos} />
            </Switch> 
        </div>
    </Router>
  );
}

export default Dashboard