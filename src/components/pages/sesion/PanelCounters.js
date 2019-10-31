import React, { Component } from 'react';
import { connect } from 'react-redux';

import {axios, JwtPayload} from '../../../config/config'
import Counter from '../../common/Counter'
import Timer from '../../common/Timer'



class PanelCounters extends Component {

    constructor(props)
    {
        var user = JwtPayload().usuario 

        super(props);
        this.state = {
          name: 'React',
          esLider : user.EsLider,
          idReunion : 0
        };

        this.IniciarSesion = this.IniciarSesion.bind(this)
        this.DetenerSesion = this.DetenerSesion.bind(this)
        this.GuardarTiempoColaborador = this.GuardarTiempoColaborador.bind(this)
        this.ObtenerReunionDelDia = this.ObtenerReunionDelDia.bind(this)
        this.UpdateTiempoReunion = this.UpdateTiempoReunion.bind(this)
        this.FinalizarReunion = this.FinalizarReunion.bind(this)

    }

    componentDidMount() {

        if(this.state.esLider)
        {
            this.ObtenerReunionDelDia()
        }
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
            <div>
                    <div className="row">
                        <div className="col-2">
                            <div className={(this.state.idReunion > 0 && this.state.esLider? "d-block" : "d-none") }>

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

                    <div className={"row "+(this.state.idReunion === 0 && this.state.esLider ? "d-block" : "d-none") }>
                        <div className="col-12 col-lg-10 offset-lg-1">
                            <div className="alert alert-warning alert-dismissible fade show" role="alert">
                                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                                <strong>¡Iniciar sesión MCI!</strong> Presiona el botón <i>Iniciar Sesión MCI</i> el cual te permitirá ver tu equipo por ende podrás empezar la rendición.
                            </div>

                        </div>
                    </div>

                    <div className={"row "+(this.state.idReunion === 0 && this.state.esLider ? "d-block" : "d-none") }>
                        <div className="col-12  text-center">
                            <button 
                                type="button" 
                                className="btn btn-success"
                                onClick={this.IniciarSesion}>
                                    Iniciar Sesión MCI
                            </button>
                        </div>
                    </div>

                    <div className={"row "+( this.state.esLider ? "d-block" : "d-none") }>
                        
                        <div className="col text-center">
                            <div className="row text-center">
                                <div className="col-12 col-md-3 offset-md-3 text-center">
                                    <Timer/>
                                    <button 
                                        type="button" 
                                        // className={"btn btn-warning " + (this.props.counterTimer > 0 && this.props.sesion.startTimer ? "" : "d-none")}
                                        className={"btn btn-warning " + (this.props.sesion.startTimer ? "" : "d-none")}
                                        onClick={(e) => this.GuardarTiempoColaborador()}>
                                            Finalizar Colaborador
                                        </button>
                                </div>
                                <div className="col-12 col-md-3 text-center">
                                    <Counter/>
                                    <button 
                                        type="button" 
                                        className={"btn btn-danger " +(this.props.sesion.start ? "" : "d-none" ) }
                                        onClick={(e) => this.FinalizarReunion()}>
                                            Finalizar Sesión
                                        </button>
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
)(PanelCounters);