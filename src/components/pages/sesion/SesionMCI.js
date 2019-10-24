import React, { Component } from 'react';
import { connect } from 'react-redux';

import Stepper from 'bs-stepper'

import TituloPrincipal from '../../common/TituloPrincipal'
import {axios, JwtPayload} from '../../../config/config'


import SideBarColaboradores from '../colaboradores/SideBarColaboradores'
import TablaActividadesBrujulaP from  '../brujula/TablaActividadesBrujulaP'
import TablaActividadesBrujulaN from  '../brujula/TablaActividadesBrujulaN'
import Tablero from '../tablero/Tablero';
import Counter from '../../common/Counter'

class SesionMCI extends Component {


    constructor() {
        super();
        this.state = {
          name: 'React',
        };

        this.ObtenerEstadoBrujula = this.ObtenerEstadoBrujula.bind(this)
        this.ObtenerActividades = this.ObtenerActividades.bind(this)
        this.IniciarSesion = this.IniciarSesion.bind(this)
        this.DetenerSesion = this.DetenerSesion.bind(this)
      }
    
      componentDidMount() {

        this.stepper = new Stepper(document.querySelector('#stepper1'), {
          linear: false,
          animation: true
        })
        this.ObtenerActividades()
        this.ObtenerEstadoBrujula()
      }

    
      onSubmit(e) {
        e.preventDefault()
      }


      ObtenerEstadoBrujula()
      {
          this.props.dispatch({type:'LOAD_ESTADOS_BRUJULA', data: []}) 
  
          axios.get("/BrujulaEstados" )
          .then(res => {
              
              this.props.dispatch({type:'LOAD_ESTADOS_BRUJULA', data: res.data}) 
  
          }).catch((error) => {
              console.log(error)
              
              return
          })
      }


      ObtenerActividades()
      {
            var user = JwtPayload().usuario      
            var  usuario = user.Empleado
  
          axios.get("/BrujulaActividadesPorColaborador/"+ usuario + "/NO")
          .then(res => {
              this.props.dispatch({type:'LOAD_BRUJULAS', data: res.data}) 
              this.setState({cargando : false, Actividades : res.data})
  
          }).catch((error) => {
              this.setState({cargando : false})
              
              return
          })
      }

      IniciarSesion()
      {
          var counterControls ={
            start : false,
            reset : false,
            startMeeting : true
        }
        
        this.props.dispatch({type:'START_SESION', data: counterControls}) 

      }
     
      DetenerSesion()
      {
        var counterControls ={
            start : true,
            reset : true
        }

        this.props.dispatch({type:'STOP_SESION', data: counterControls}) 

      }

    render() {
        return (

            <div className="container">

                    <div className="row">
                        <div className="col">
                            <TituloPrincipal Titulo="Sesión MCI"/>
                        </div>
                    </div>
                    
                    <div className={"row "+(this.props.sesion.startMeeting ? "d-none" : "d-block") }>
                        <div className="col-12 col-lg-10 offset-lg-1">
                            <div className="alert alert-warning alert-dismissible fade show" role="alert">
                                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                                <strong>¡Iniciar sesión MCI!</strong> Presiona el botón <i>Iniciar Sesión MCI</i> el cual te permitirá ver tu equipo por ende podrás empezar la rendición.
                            </div>

                        </div>
                    </div>

                    <div className={"row "+(this.props.sesion.startMeeting ? "d-none" : "d-block") }>
                        <div className="col-12  text-center">
                            <button 
                                type="button" 
                                className="btn btn-success"
                                onClick={this.IniciarSesion}>
                                    Iniciar Sesión MCI
                            </button>
                            {/* <button 
                                type="button" 
                                className="btn btn-danger"
                                onClick={this.DetenerSesion}>
                                    Reset Sesión
                            </button> */}
                        </div>
                    </div>

                    <div className={"row "+(this.props.sesion.startMeeting ? "d-block" : "d-none") }>
                        <div className="col-12 col-md-2 offset-md-5 text-center">
                            <Counter/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-2">
                            <div className={(this.props.sesion.startMeeting ? "d-block" : "d-none") }>

                                <button className="btn btn-link" onClick={(e) => this.props.dispatch({type:'MOSTRAR_PANEL_COMPANEROS', data: true}) }>
                                    <i className="fa fa-users" aria-hidden="true"></i>
                                    Equipo
                                </button>
                            </div>
                            
                        </div>
                        <div className="col-10">
                            <span>
                                <h5 className="font-weight-bold text-right">
                                    {this.props.colaboradorSelected.nombreColaborador}
                                </h5>
                            </span>
                        </div>
                    </div>

                    <div className="row ">
                        <div className="col">
                            
                            <SideBarColaboradores SesionMCI={true}/>
                        </div>
                    </div>
                
                    <div className="row">
                        <div className="col">

                            <div>
                                <div id="stepper1" className="bs-stepper">
                                    <div className="bs-stepper-header">
                                        <div className="step" data-target="#test-l-1">
                                        <button className="step-trigger">
                                            <span className="bs-stepper-circle">1</span>
                                            <span className="bs-stepper-label">Brújula</span>
                                        </button>
                                        </div>
                                        <div className="line"></div>
                                        <div className="step" data-target="#test-l-2">
                                        <button className="step-trigger">
                                            <span className="bs-stepper-circle">2</span>
                                            <span className="bs-stepper-label">Tablero</span>
                                        </button>
                                        </div>
                                        <div className="line"></div>
                                        <div className="step" data-target="#test-l-3">
                                        <button className="step-trigger">
                                            <span className="bs-stepper-circle">3</span>
                                            <span className="bs-stepper-label">Nuevas actividades</span>
                                        </button>
                                        </div>
                                    </div>
                                    <div className="bs-stepper-content">
                                        <form onSubmit={this.onSubmit}>
                                            <div id="test-l-1" className="content">
                                                <div className="row">
                                                    <div className="col text-center">
                                                         <TablaActividadesBrujulaP Actividades={this.state.Actividades} IdEstado={4}/>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            <div id="test-l-2" className="content">
                                                    <div className="row">
                                                        <Tablero OcultarHeader={true} OcultarSideBar={true}/>
                                                    </div>
                                            </div>
                                            <div id="test-l-3" className="content text-center">
                                                <div className="row">
                                                    <div className="col">
                                                        <TablaActividadesBrujulaN Actividades={this.state.Actividades} IdEstado="1"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
        );
    }
}

function mapStateToProps(state) {
    
    return {
        mci : state.TableroReducer,
        mesSelected : state.MesSelectReducer,
        colaboradorSelected : state.ColaboradorSelectedReducer,
        mostrarPanelCompaneros : state.MostrarPanelCompaneros,
        actividades : state.BrujulaReducer,
        sesion : state.SesionReducer,
        counterSesion : state.CounterSesionReducer,
    };
}
export default connect(
    mapStateToProps,
)(SesionMCI);