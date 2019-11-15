import React, { Component } from 'react';
import { connect } from 'react-redux';

import Stepper from 'bs-stepper'

import TituloPrincipal from '../../common/TituloPrincipal'
import {axios, JwtPayload} from '../../../config/config'


import SideBarColaboradores from '../colaboradores/SideBarColaboradores'
import TablaActividadesBrujulaP from  '../brujula/TablaActividadesBrujulaP'
import TablaActividadesBrujulaN from  '../brujula/TablaActividadesBrujulaN'
import Tablero from '../tablero/Tablero';
import PanelCounters from './PanelCounters';

class SesionMCI extends Component {


    
    constructor() {
        
        var user = JwtPayload().usuario 

        super();
        console.log(this.state)
        this.state = {
          name: 'React',
          esLider : user.EsLider,
          idReunion : 0,
          TiempoTotal: ''
        };

        this.ObtenerEstadoBrujula = this.ObtenerEstadoBrujula.bind(this)
        this.ObtenerActividades = this.ObtenerActividades.bind(this)
        this.IniciarSesion = this.IniciarSesion.bind(this)
        this.DetenerSesion = this.DetenerSesion.bind(this)
        this.GuardarTiempoColaborador = this.GuardarTiempoColaborador.bind(this)
        this.ObtenerReunionDelDia = this.ObtenerReunionDelDia.bind(this)
        this.UpdateTiempoReunion = this.UpdateTiempoReunion.bind(this)
        this.FinalizarReunion = this.FinalizarReunion.bind(this)
      }
    
      componentDidMount() {

        this.stepper = new Stepper(document.querySelector('#stepper1'), {
          linear: false,
          animation: true
        })
        this.ObtenerActividades()
        this.ObtenerEstadoBrujula()
        
        if(this.state.esLider)
        {
            this.ObtenerReunionDelDia()
            this.ObtenerReunionesSemanales()
        }
      }

      componentWillUnmount()
      {
          window.location.reload()
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
  
          axios.get("/BrujulaActividadesPorColaborador/"+ usuario + "/NO/NO")
          .then(res => {
              this.props.dispatch({type:'LOAD_BRUJULAS', data: res.data}) 
              this.setState({cargando : false, Actividades : res.data})
  
          }).catch((error) => {
              this.setState({cargando : false})
              
              return
          })
      }

      ObtenerReunionDelDia()
      {

        var user = JwtPayload().usuario      
        var  usuario = user.Empleado

        axios.get("/GetReunionDelDia/"+usuario)
            .then(res => {
               this.setState({idReunion: res.data.IdReunion})
    
            }).catch((error) => {
                console.log(error)
    
            })
      }

      ObtenerReunionesSemanales()
      {
  
        var user = JwtPayload().usuario      
        var  usuario = user.Empleado
  
        axios.get("/GetReunionSemanal/"+usuario)
            .then(res => {
               this.setState({TiempoTotal: res.data.TiempoTotal})
    
            }).catch((error) => {
                console.log(error)
    
            })
      }

      IniciarSesion()
      {
        var user = JwtPayload().usuario      
        var  usuario = user.Empleado
        
        var reunionMCI = {
            "IdLider": usuario
        }
    
        axios.post("/ReunionMCINew", reunionMCI)
            .then(res => {
                
                this.setState({idReunion: res.data.IdReunion})
                
                var counterControls ={
                    start : false,
                    reset : false,
                    startMeeting : true
                }
                this.props.dispatch({type:'START_SESION', data: counterControls}) 
    
            }).catch((error) => {
                console.log(error)
    
            })
         
      }

      GuardarTiempoColaborador()
      {

        var reunionMCI = {
            "IdReunion": this.state.idReunion,
            "Colaborador": this.props.colaboradorSelected.colaboradorId,
            "TiempoSegundos" : this.props.counterTimer
        }

        axios.post("/DetalleReunionMCINew", reunionMCI)
            .then(res => {
               this.DetenerSesion()
               this.UpdateTiempoReunion()
    
            }).catch((error) => {
                console.log(error)
    
            })
      }


      UpdateTiempoReunion()
      {

        var reunionMCI = {
            "IdReunion": this.state.idReunion,
            "TiempoSegundos" : this.props.counterSesion.totalSeconds
        }


        axios.post("/UpdateTiempoReunion", reunionMCI)
            .then(res => {
                console.log(res.data)
    
            }).catch((error) => {
                console.log(error)
    
            })
      }
     
      FinalizarReunion()
      {
          this.UpdateTiempoReunion();
          var counterControls ={
            start : false,
            startTimer : false,
            reset : true,
            startMeeting : true
        }

        this.props.dispatch({type:'STOP_SESION', data: counterControls}) 
      }

      DetenerSesion()
      {
        var counterControls ={
            start : true,
            startTimer : false,
            reset : true,
            startMeeting : true
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

                    <div className="row">
                        <div className="col">
                            <PanelCounters/>
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
                                                    <div className="col">
                                                        <h3 className=" font-weight-bold">Actividades pendientes</h3>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col text-center">
                                                         <TablaActividadesBrujulaP Actividades={this.state.Actividades} IdEstado={4}/>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            <div id="test-l-2" className="content">
                                                    <div className="row">
                                                        <div className="col">
                                                            <Tablero OcultarHeader={true} OcultarSideBar={true}/>
                                                        </div>
                                                    </div>
                                            </div>
                                            <div id="test-l-3" className="content ">
                                                <div className="row">
                                                    <div className="col">
                                                        <h3 className=" font-weight-bold">Nuevas actividades</h3>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col text-center">
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
        counterTimer : state.TimerReducer,
    };
}
export default connect(
    mapStateToProps,
)(SesionMCI);