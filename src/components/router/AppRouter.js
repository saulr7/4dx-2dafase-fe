import React from 'react'

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


import { BrowserRouter as Router, Route, Link , Switch} from "react-router-dom";
import { JwtPayload } from "../../config/config";
import './AppRouter.css';

import {Estilos} from './estilos'


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
            codigoEmpleado : user.Empleado,
            estilos: null,
            temaBanpais : false
        }

        this.SetearTema = this.SetearTema.bind(this)

    }

    
    componentDidMount()
    {
        var tema = localStorage.getItem("tema")
        this.setState({temaBanpais : (tema === "4dx" ? false: true) })     
    }


    SetearTema(event)
    {
        const target = event.target;
        const value = target.checked 
        
        localStorage.setItem("tema", (value ? "banpais": "4dx"))

        var tema = localStorage.getItem("tema")
        this.setState({temaBanpais : (tema === "4dx" ? false: true) })      
    }
   

    render() {
        return (
            <Router>

                <div>
                    <nav className={"navbar navbar-expand-lg navbar-light "} style={Estilos().bgBanpais} >
                        <span className="navbar-brand font-weight-bold menuItem " style={Estilos().txtColor}>4DX <span className="font-italic">Tablero  </span>  </span>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active ">

                                    <div className={"dropdown" }  style={Estilos().bgBanpais}> 
                                        <button 
                                            className="btn dropdown-toggle" style={Estilos().txtColor}
                                            type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="fa fa-cog pt-1" aria-hidden="true" style={Estilos().iconoMenu}></i>
                                            <span className="font-weight-bold" style={Estilos().menuItem}>
                                                Configurar Tablero
                                            </span>
                                        </button>
                                        <div className="dropdown-menu " aria-labelledby="dropdownMenu1"  style={Estilos().bgBanpais}>
                                            
                                            <Link className="nav-link font-weight-bold  " to="/lineaDeMeta"  style={Estilos().bgBanpais}>
                                                <i className="fa fa-external-link-square  pt-1" aria-hidden="true" style={Estilos().iconoMenu}>    
                                                </i>
                                                <span style={Estilos().menuItem}>
                                                    Línea de meta
                                                </span>
                                                
                                            </Link>
                                            <Link className="nav-link font-weight-bold  " to="/resultados" style={Estilos().bgBanpais} >
                                                <i className="fa fa-list-ol  pt-1" aria-hidden="true" style={Estilos().iconoMenu}></i>
                                                <span style={Estilos().menuItem}>
                                                    Resultados
                                                </span>
                                            </Link>
                                            <Link className="nav-link font-weight-bold" to="/tablero" style={Estilos().menuItem}>
                                                <i className="fa fa-line-chart  pt-1" aria-hidden="true" style={Estilos().iconoMenu}></i>
                                                <span style={Estilos().menuItem}>
                                                    Tablero
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                              
                                </li>
                                
                                <li className="nav-item active">
                                <div className="dropdown " style={Estilos().bgBanpais}>
                                        <button className="btn dropdown-toggle " style={Estilos().txtColor}
                                            type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="fa fa-compass  pt-1" aria-hidden="true" style={Estilos().iconoMenu}></i>
                                            <span className="font-weight-bold" style={Estilos().menuItem}>
                                                Brújula
                                            </span>
                                        </button>
                                        <div className="dropdown-menu bg-banpais " aria-labelledby="dropdownMenu1" style={Estilos().bgBanpais}>
                                            
                                            <Link className="nav-link font-weight-bold menuItem bg-banpais" to="/nuevasActividades" style={Estilos().bgBanpais}>
                                                <i className="fa fa-plus-square  pt-1" aria-hidden="true" style={Estilos().iconoMenu}></i>
                                                <span style={Estilos().menuItem}>
                                                    Nuevos compromisos
                                                </span>
                                                
                                            </Link>
                                            <Link className="nav-link font-weight-bold menuItem bg-banpais" to="/brujula" style={Estilos().bgBanpais}>
                                                <i className="fa fa-list-ul pt-1" aria-hidden="true" style={Estilos().iconoMenu}></i>
                                                <span style={Estilos().menuItem}>
                                                    Ver compromisos
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                </li>
   
                                <li className="nav-item active">
                                    <Link className="nav-link font-weight-bold menuItem" to="/colaboradores">
                                        <i className="fa fa-users  pt-1" aria-hidden="true" style={Estilos().iconoMenu}></i>
                                        <span style={Estilos().menuItem}>
                                            Colaboradores
                                        </span> 
                                    </Link>
                                </li>
                                <li className="nav-item active">
                                    <Link className="nav-link font-weight-bold " to="/sesionMCI" style={Estilos().menuItem}>
                                        <i className="fa fa-flag  pt-1" aria-hidden="true" style={Estilos().iconoMenu}></i>
                                        <span style={Estilos().menuItem}>
                                            Sesión MCI
                                        </span> 
                                    </Link>
                                </li>
                            </ul>
                            <form className=" my-2 my-lg-0 " style={Estilos().txtColor}>

                                <button 
                                    type="button" 
                                    className="btn btn-link " data-toggle="modal" data-target="#exampleModal3"
                                    style={Estilos().iconoMenu}>
                                    <i className="fa fa-user-circle-o fa-lg" aria-hidden="true"></i>
                                </button>

                            </form>
                        </div>
                    </nav>

                    <div className="modal fade" id="exampleModal3" tabIndex="-1" role="dialog" aria-labelledby="exampleModal3Label" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModal3Label">Perfil</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <strong>{this.state.codigoEmpleado}</strong> -
                                <span className="p-2">
                                    {this.state.EmpleadoNombre}
                                </span>
                                <div className="custom-control custom-switch">
                                    <input type="checkbox" className="custom-control-input" id="customSwitch1" onClick={this.SetearTema} value={this.state.temaBanpais}/>
                                    <label className="custom-control-label" htmlFor="customSwitch1">Tema</label>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <BtnLogOut></BtnLogOut>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                {/* <button type="button" className="btn btn-primary">Save changes</button> */}
                            </div>
                            </div>
                        </div>
                    </div>


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