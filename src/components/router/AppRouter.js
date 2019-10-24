import React from 'react'

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


import { BrowserRouter as Router, Route, Link , Switch} from "react-router-dom";
import { JwtPayload } from "../../config/config";
import './AppRouter.css';

import Metas from '../pages/medidasPredictivas/Metas'
import EditarMedidaPredictiva from '../pages/medidasPredictivas/EditarMedidaPredictiva'
import ResultadosMedidasPreventivas from '../pages/resultados/ResultadosMedidasPreventivas'
import Colaboradores from '../pages/colaboradores/Colaboradores'
import ResultadosMCI from '../pages/resultados/ResultadosMCI'
import Tablero from '../pages/tablero/Tablero'
import MCIByColaborador from '../pages/colaboradores/MCIByColaborador'
import DoughnutChartDemo from '../pages/graficas/Graficas'

import BtnLogOut from '../login/BtnLogOut'
import Configuracion from '../pages/configuracion/Configuracion';
import Welcome from '../pages/welcome/Welcome';
import Brujula from '../pages/brujula/Brujula';
import SesionMCI from '../pages/sesion/SesionMCI';
import NotFound from '../common/NotFound';

class AppRouter extends React.Component {

    constructor(props)
    {
        super(props)

        var user = JwtPayload().usuario      

        this.state = {
            EmpleadoNombre: user.EmpleadoNombre
        }
    }
   

    render() {
        return (
            <Router>

                <div>
                    <nav className="navbar navbar-expand-lg navbar-light bg-banpais">
                        <span className="navbar-brand font-weight-bold menuItem">4DX <span className="font-italic">Tablero  </span>  </span>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <Link className="nav-link font-weight-bold menuItem" to="/metas">
                                        <i className="fa fa-list-ul iconoMenu pt-1" aria-hidden="true"></i>
                                        <span className="menuItem">
                                            Metas
                                        </span>
                                    </Link>
                                </li>
                                <li className="nav-item active">
                                    <Link className="nav-link font-weight-bold menuItem" to="/brujula">
                                        <i className="fa fa-compass iconoMenu pt-1" aria-hidden="true"></i>
                                        <span className="menuItem">
                                            Brújula
                                        </span>
                                    </Link>
                                </li>
                                <li className="nav-item active">
                                    <Link className="nav-link font-weight-bold menuItem" to="/tablero">
                                        <i className="fa fa-list-alt iconoMenu pt-1" aria-hidden="true"></i>
                                        <span className="menuItem">
                                            Tablero
                                        </span> 
                                    </Link>
                                </li>
                                <li className="nav-item active">
                                    <Link className="nav-link font-weight-bold menuItem" to="/colaboradores">
                                        <i className="fa fa-users iconoMenu pt-1" aria-hidden="true"></i>
                                        <span className="menuItem">
                                            Colaboradores
                                        </span> 
                                    </Link>
                                </li>
                                <li className="nav-item active">
                                    <Link className="nav-link font-weight-bold menuItem" to="/sesionMCI">
                                        <i className="fa fa-flag iconoMenu pt-1" aria-hidden="true"></i>
                                        <span className="menuItem">
                                            Sesión MCI
                                        </span> 
                                    </Link>
                                </li>
                            </ul>
                            <form className=" my-2 my-lg-0">
                                    <span className="p-2">
                                        {this.state.EmpleadoNombre}
                                    </span>
                                <BtnLogOut />

                            </form>
                        </div>
                    </nav>
                </div>

                <Switch>
                    <Route path="/" exact component={Tablero} />
                    <Route path="/tablero" exact component={Tablero} />
                    <Route path="/metas" exact component={Metas} />
                    <Route path="/chart/:data" exact component={DoughnutChartDemo} />
                    {/* <Route path="/tablero/:IdColaborador?" exact component={Tablero} /> */}
                    <Route path="/brujula" exact component={Brujula} />
                    <Route path="/login/:token?" exact component={Welcome} />
                    <Route path="/sesionMCI" exact component={SesionMCI} />
                    <Route path="/colaboradores" exact component={Colaboradores} />
                    <Route path="/mciByColaborador/:IdColaborador" exact component={MCIByColaborador} />
                    <Route path="/configuracion/:data" exact component={Configuracion} />
                    <Route path="/editarMedidaPredictiva" render={(props) => <EditarMedidaPredictiva {...props} isAuthed={false} />}/>
                    <Route path="/resultadosMedidasPredictiva/:medidaPredictivaId" component={ResultadosMedidasPreventivas} />
                    <Route path="/resultadosMCI/:idMCI" component={ResultadosMCI} />
                    <Route  component={NotFound} />
                </Switch>
                
            </Router>
        )
    }
   

}






export default AppRouter