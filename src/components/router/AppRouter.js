import React from 'react'

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


import { BrowserRouter as Router, Route, Link , Switch} from "react-router-dom";
import { JwtPayload } from "../../config/config";
import './AppRouter.css';

import {estilos} from './estilos'

import Metas from '../pages/medidasPredictivas/Metas'
import EditarMedidaPredictiva from '../pages/medidasPredictivas/EditarMedidaPredictiva'
import ResultadosMedidasPreventivas from '../pages/resultados/ResultadosMedidasPredictivas'
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
import LineaDeMeta from '../pages/configurarTablero/LineaDeMeta';
import Resultados from '../pages/configurarTablero/Resultados';
import NuevasActividades from '../pages/brujula/NuevasActividades';

class AppRouter extends React.Component {

    constructor(props)
    {
        super(props)

        var user = JwtPayload().usuario      

        this.state = {
            EmpleadoNombre: user.EmpleadoNombre,
            estilos: null
        }

        this.SetearTema = this.SetearTema.bind(this)

    }

    
    componentDidMount()
    {
        this.SetearTema();
    }


    SetearTema()
    {
        var temaBanpais = {
            "backgroundColor": "#FFEF11",
            "color" : "black",
            "bgBanpais" : {
                "backgroundColor": "#FFEF11",
            }

        }

        var tema4dx = {
            "backgroundColor": "#192A56" 

        }

        this.setState({estilos : temaBanpais})
    }
   

    render() {
        return (
            <Router>

                <div>
                    <nav className={"navbar navbar-expand-lg navbar-light bg-banpais"} >
                        <span className="navbar-brand font-weight-bold menuItem text-light">4DX <span className="font-italic">Tablero  </span>  </span>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active ">

                                    <div className={"dropdown bg-banpais " } >
                                        <button 
                                            className="btn dropdown-toggle text-white" 
                                            type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="fa fa-cog iconoMenu pt-1" aria-hidden="true"></i>
                                            <span className="menuItem font-weight-bold">
                                                Configurar Tablero
                                            </span>
                                        </button>
                                        <div className="dropdown-menu bg-banpais " aria-labelledby="dropdownMenu1">
                                            
                                            <Link className="nav-link font-weight-bold menuItem bg-banpais" to="/lineaDeMeta">
                                                <i className="fa fa-external-link-square iconoMenu pt-1" aria-hidden="true"></i>
                                                <span className="menuItem">
                                                    Línea de meta
                                                </span>
                                                
                                            </Link>
                                            <Link className="nav-link font-weight-bold menuItem bg-banpais" to="/resultados">
                                                <i className="fa fa-list-ol iconoMenu pt-1" aria-hidden="true"></i>
                                                <span className="menuItem">
                                                    Resultados
                                                </span>
                                            </Link>
                                            <Link className="nav-link font-weight-bold menuItem bp-banpais" to="/tablero">
                                                <i className="fa fa-line-chart iconoMenu pt-1" aria-hidden="true"></i>
                                                <span className="menuItem">
                                                    Tablero
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                              
                                </li>
                                
                                <li className="nav-item active">
                                <div className="dropdown bg-banpais">
                                        <button className="btn dropdown-toggle text-white" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="fa fa-compass iconoMenu pt-1" aria-hidden="true"></i>
                                            <span className="menuItem font-weight-bold">
                                                Brújula
                                            </span>
                                        </button>
                                        <div className="dropdown-menu bg-banpais " aria-labelledby="dropdownMenu1">
                                            
                                            <Link className="nav-link font-weight-bold menuItem bg-banpais" to="/nuevasActividades">
                                                <i className="fa fa-plus-square iconoMenu pt-1" aria-hidden="true"></i>
                                                <span className="menuItem">
                                                    Nuevos compromisos
                                                </span>
                                                
                                            </Link>
                                            <Link className="nav-link font-weight-bold menuItem bg-banpais" to="/brujula">
                                                <i className="fa fa-list-ul iconoMenu pt-1" aria-hidden="true"></i>
                                                <span className="menuItem">
                                                    Ver compromisos
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                </li>
                                {/* <li className="nav-item active">
                                    <Link className="nav-link font-weight-bold menuItem" to="/brujula">
                                        <i className="fa fa-compass iconoMenu pt-1" aria-hidden="true"></i>
                                        <span className="menuItem">
                                            Brújula
                                        </span>
                                    </Link>
                                </li> */}
                                {/* <li className="nav-item active">
                                    <Link className="nav-link font-weight-bold menuItem" to="/tablero">
                                        <i className="fa fa-list-alt iconoMenu pt-1" aria-hidden="true"></i>
                                        <span className="menuItem">
                                            Tablero
                                        </span> 
                                    </Link>
                                </li> */}
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
                            <form className=" my-2 my-lg-0 text-white">
                                    <span className="p-2">
                                        {this.state.EmpleadoNombre}
                                    </span>
                                <BtnLogOut></BtnLogOut>

                            </form>
                        </div>
                    </nav>
                </div>

                <Switch>
                    <Route path="/" exact component={Tablero} />
                    <Route path="/tablero/:data?" exact component={Tablero} />
                    <Route path="/metas" exact component={Metas} />
                    <Route path="/lineaDeMeta" exact component={LineaDeMeta} />
                    <Route path="/resultados" exact component={Resultados} />
                    <Route path="/chart/:data" exact component={DoughnutChartDemo} />
                    <Route path="/sesionMCI" exact  component={SesionMCI} /> 
                    <Route path="/brujula" exact component={Brujula} />
                    <Route path="/nuevasActividades" exact component={NuevasActividades} />
                    <Route path="/login/:token?" exact component={Welcome} />
                    <Route path="/sesionMCI" render={() => { alert('dd"');      return <SesionMCI  /> }} />
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