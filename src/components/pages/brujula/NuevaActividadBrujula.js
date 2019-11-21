import React, { Component } from 'react';
import { connect } from 'react-redux';

import { axios, JwtPayload } from "../../../config/config";
//import {Calendar} from 'primereact/calendar';

import Swal from "sweetalert2";

class NuevaActividad extends Component {

    constructor(props)
    {
        super(props)

        this.state = {
            UserId : this.props.User,
            cargando : false,
            txtNuevaActividad : "",
            fechaDesde : "",
            fechaHasta : "",
            ActividadComoLider : false,
            esLider : false
        }

        this.GuardarNuevaActividad = this.GuardarNuevaActividad.bind(this)
        this.handleTextChange = this.handleTextChange.bind(this)
        this.ValidarData = this.ValidarData.bind(this)
        this.ObtenerActividades = this.ObtenerActividades.bind(this)
        this.ActividadConPupiloHanlder = this.ActividadConPupiloHanlder.bind(this)
    }


    componentDidMount()
    {
        var user = JwtPayload().usuario
        this.setState({esLider : user.EsLider})
    }

    UNSAFE_componentWillReceiveProps(newProps)
    {
        this.setState({UserId :newProps.User })
    }


    handleTextChange(event) {
        const value =  event.target.value
  
          this.setState({ txtNuevaActividad: value  });

      }



    GuardarNuevaActividad()
    {
        var usuario = JwtPayload().usuario     
        var userId = 0
        if(this.state.UserId > 0)
        {
            userId = this.state.UserId
        }

        else {
            
            userId = usuario.Empleado

        }
        
        if(!this.ValidarData())
            return
        
        var nuevaActividad = {
            "IdColaborador": userId,
            "Actividad":this.state.txtNuevaActividad,
            "IdEstado" : 1,
            "ActividadComoLider": this.state.ActividadComoLider,
            "CreatedBy" : usuario.Empleado
        }

        axios.post("/BrujulaPorMPAdd", nuevaActividad )
        .then(res => {
            this.setState({
                txtNuevaActividad: "",
                fechaDesde : "",
                fechaHasta : "",
              });
              this.ObtenerActividades()
            Swal.fire({  
                title: 'Información guardada exitosamente',  
                type: 'success',  
                text: "Éxito",  
            });
            
    

        }).catch((error) => {
            console.log(error)
            Swal.fire({  
                title: 'Algo ha salido mal',  
                type: 'error',  
                text: "Atención",  
            });
            return
        })
    }


    
    ObtenerActividades()
    {
        var invitado = "NO"
        var userId = 0
        if(this.state.UserId > 0)
        {
            userId = this.state.UserId
            invitado = "SI"
        }

        else {
            var usuario = JwtPayload().usuario     
            userId = usuario.Empleado
            invitado = "NO"
        }


        this.setState({cargando : true})

        axios.get("/BrujulaActividadesPorColaborador/"+ userId+"/NO/"+invitado)
        .then(res => {

            if(res.data)
            {
                var contadorDeActividadesNuevas = 0
                var contadorDeActividadesNuevasLider = 0
                res.data.map((actividad, index) => {
                    if(actividad.IdEstado === 1 && !actividad.ActividadComoLider )
                    {
                        contadorDeActividadesNuevas++
                    }
                    if(actividad.IdEstado === 1 && actividad.ActividadComoLider )
                    {
                        contadorDeActividadesNuevasLider++
                    }
                    return actividad.IdEstado
                })
                var contador = {
                    totalActividadesNuevas : contadorDeActividadesNuevas,
                    totalActividadesNuevasLider : contadorDeActividadesNuevasLider
                }
                this.props.dispatch({type:'LOAD_ACTIVIDADES_NUEVAS', data: contador})
            }


            this.props.dispatch({type:'LOAD_BRUJULAS', data: res.data}) 
            this.setState({cargando : false})
            

        }).catch((error) => {
            this.setState({cargando : false})
            console.log(error)
            Swal.fire({  
                title: 'Algo ha salido mal',  
                type: 'error',  
                text: "Atención",  
            });
            return
        })
    }


    ActividadConPupiloHanlder(event) {

        const value =  event.target.checked

        this.setState({ActividadComoLider : value });
      }


    ValidarData()
    {
        if(!this.state.txtNuevaActividad)
        {
            Swal.fire({  
                    title: 'Los datos no son correctos',  
                    type: 'warning',  
                    text: "Atención",  
                });
                return false
        }    
          
        return true
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col">
                        <h3 className="text-center font-weight-bold">Nueva actividad</h3>
                        <div className="form-group">
                            <h4 className="card-title d-inline m-2">Descripción:</h4>
                            <textarea 
                                value ={this.state.txtNuevaActividad}
                                className="form-control rounded-0" 
                                id="exampleFormControlTextarea2" 
                                rows="3"
                                onChange={this.handleTextChange}>
                            </textarea>
                           
                        </div>
                        

                    </div>
                </div>


                <div className={"row mb-2 " +(this.state.esLider && this.state.UserId === 0 ? "" : "d-none") }>
                    <div className="col text-center">
                        <div className="alert alert-info" role="alert">
                            <strong>¡Líder!</strong> Notamos que eres un líder y sabemos que puedes tener actividades para con tus compañeros y para con tus pupilos por eso ponemos a tu disposición esta opción
                        </div>
                        <div className="custom-control custom-switch">
                            <input type="checkbox" className="custom-control-input" id="customSwitch1" onChange={this.ActividadConPupiloHanlder}/>
                            <label className="custom-control-label" htmlFor="customSwitch1">Actividad como líder</label>
                        </div>

                    </div>
                </div>

                <div className="row">
                    <div className="col text-center">
                        <button 
                            type="button" 
                            className="btn btn-success"
                            onClick={this.GuardarNuevaActividad}>
                            Guardar
                        </button>
                    </div>
                </div>

            </div>
        );
    }
}
function mapStateToProps(state) {
    return {

    };
}


export default connect(
    mapStateToProps,
)(NuevaActividad);