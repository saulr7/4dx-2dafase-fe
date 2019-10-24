import React, { Component } from 'react';
import { connect } from 'react-redux';

import { axios, JwtPayload } from "../../../config/config";
import {Calendar} from 'primereact/calendar';

import Swal from "sweetalert2";

class NuevaActividad extends Component {

    constructor(props)
    {
        super(props)

        
        this.state = {
            IdResultadoMP : this.props.IdMP,
            cargando : false,
            txtNuevaActividad : "",
            fechaDesde : "",
            fechaHasta : ""
        }

        this.GuardarNuevaActividad = this.GuardarNuevaActividad.bind(this)
        this.handleTextChange = this.handleTextChange.bind(this)
        this.ValidarData = this.ValidarData.bind(this)
        this.ObtenerActividades = this.ObtenerActividades.bind(this)
    }



    handleTextChange(event) {
        const value =  event.target.value
  
          this.setState({ txtNuevaActividad: value  });

      }



    GuardarNuevaActividad()
    {
        var usuario = JwtPayload().usuario     
        
        if(!this.ValidarData())
            return
        
        var nuevaActividad = {
            "IdResultadoMP": parseInt( this.state.IdResultadoMP),
            "IdColaborador":usuario.Empleado,
            "Actividad":this.state.txtNuevaActividad,
            "IdEstado" : 1,
            "Desde" : this.state.fechaDesde.toISOString(),
            "Hasta" : this.state.fechaHasta.toISOString()
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
        var usuario = JwtPayload().usuario      

        this.setState({cargando : true})

        axios.get("/BrujulaActividadesPorColaborador/"+ usuario.Empleado+"/NO")
        .then(res => {

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
        
        if(!this.state.fechaDesde || !this.state.fechaHasta )
        {
            Swal.fire({  
                    title: 'Debes ingresar una fecha válida',  
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
                        <div className="form-group">
                            <div className="row">

                            <div className="col">
                                <h4 className="card-title d-inline m-2">Fecha Desde:</h4>
                            </div>
                            <div className="col">
                                <Calendar value={this.state.fechaDesde} onChange={(e) => this.setState({fechaDesde: e.value})} dateFormat="yy/mm/dd" icon="pi-calendar"></Calendar>
                            </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">

                            <div className="col">
                                <h4 className="card-title d-inline m-2">Fecha Hasta:</h4>
                            </div>
                            <div className="col">
                                <Calendar value={this.state.fechaHasta} onChange={(e) => this.setState({fechaHasta: e.value})} ></Calendar>
                            </div>
                            </div>
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