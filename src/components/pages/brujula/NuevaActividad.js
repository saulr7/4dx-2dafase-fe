import React, { Component } from 'react';
import { connect } from 'react-redux';

import {  JwtPayload } from "../../../config/config";
import Swal from "sweetalert2";

import {NuevaActividadService, ObtenerActividadesPeriodoActualService} from '../../../services/BrujulaService'

class NuevaActividad extends Component {
   
    
    constructor(props) {
        super(props);

        this.state = {
            metricas : [],
            actividades : [],
            actividadesFaltantes : 3,
            actividadesFaltantesComoLider : 3,
            MostrarControles: true,
            txtMetricaDescripcion : "",
            ActividadComoLider : false,
            items: [
                {label: 'Nueva actividad', icon: 'pi pi-fw pi-plus', command:()=> this.ToggleActividaComoLider(false)},
                
            ]
        }

        this.TxtDescripcionMetricaChange = this.TxtDescripcionMetricaChange.bind(this)
        this.ValidatarNuevaMetrica = this.ValidatarNuevaMetrica.bind(this)
        this.ToggleActividaComoLider = this.ToggleActividaComoLider.bind(this)
        this.AddSection = this.AddSection.bind(this)
        this.RemoveSection = this.RemoveSection.bind(this)
        this.GuardarNuevaActividad = this.GuardarNuevaActividad.bind(this)
        this.ObtenerActividadesPeridoActual = this.ObtenerActividadesPeridoActual.bind(this)

    }

    

    componentDidMount()
    {
        this.ObtenerActividadesPeridoActual();
    }


    ObtenerActividadesPeridoActual()
    {
        ObtenerActividadesPeriodoActualService()
        .then(res => {
            console.log(res)
            this.setState({actividadesFaltantesComoLider : res.actividadesFaltantesComoLider, actividadesFaltantes: res.actividadesFaltantes})
        })
        .catch((err)=> {
            console.log(err)
        })

        
    }


    TxtDescripcionMetricaChange(event)
    {
        var txtMetricaDescripcion = event.target.value
        this.setState({txtMetricaDescripcion})
    }


    ToggleActividaComoLider(activar)
    {
        this.setState({ActividadComoLider: activar})
    }
  

    AddSection()
    {

        if(!this.ValidatarNuevaMetrica())
            return

        var txtDescripcionMetrica = this.state.txtMetricaDescripcion

        var actividades = this.state.actividades
        actividades.push(txtDescripcionMetrica)
        this.setState({actividades: actividades,txtMetricaDescripcion : ""})


    }


    ValidatarNuevaMetrica()
    {
        if(this.state.txtMetricaDescripcion === "")
        {
            Swal.fire({
                title: 'Debes ingresar la descripción de la métrica',
                type: 'warning',
                text: "Atención"
            });
            return false
        }
        return true
    }

    

    RemoveSection(index)
    {
        var actividades = this.state.actividades
         actividades.splice(index, 1)
        this.setState({actividades})
    }

    ValidarData()
    {
        if(this.state.actividades.length === 0)
        {
            Swal.fire({  
                    title: 'Debes ingresar al menos una actividad',  
                    type: 'warning',  
                    text: "Atención",  
                });
                return false
        }    
          
        return true
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
            "Actividades":this.state.actividades,
            "IdEstado" : 1,
            "ActividadComoLider": this.state.ActividadComoLider,
            "CreatedBy" : usuario.Empleado,
            "IdBrujula" : 0,
	        "Actividad": ""

        }

        this.setState({cargando: true})
        
        NuevaActividadService(nuevaActividad)
        .then(res => {
            this.ObtenerActividadesPeridoActual();
            Swal.fire({  
                title: 'Información guardada exitosamente',  
                type: 'success',  
                text: "Éxito",  
            });
            this.setState({actividades : [], cargando : false})
    
        }).catch((error) => {
            this.setState({ cargando : false})
            Swal.fire({  
                title: 'Algo ha salido mal',  
                type: 'error',  
                text: "Atención",  
            });
        })
       
    }




    render() {
        return (
            <div>                   

                  
                    <div className={"row " +  (this.state.actividadesFaltantes > 0 ? "d-none" : "")}>
                        <div className="col-12 col-md-8 offset-md-2 text-center">
                            <div>
                                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                    <strong>¡Vaya!</strong> Ya has creado todas tus actividades para este período.
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={"row mt-4 " + (this.state.actividadesFaltantes > 0 ? "" : "d-none") }>
                        <div className="col-12 col-md-10 offset-md-1">
                                
                            <div className="card">
                                <div className="d-flex card-header">
                                    <div className="flex-fill ">
                                        <h3 className="">Actividades:</h3>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <ul className="list-group">
                                        {this.state.actividades.map((actividad, index)=> {
                                            return (
                                                <div  key={index} >
                                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                                        <p>
                                                            {actividad}
                                                        </p>
                                                        <div>

                                                            <button 
                                                                type="button" 
                                                                className={"btn btn-danger m-1 "  } 
                                                                onClick={() => this.RemoveSection(index)}>
                                                                <i className="fa fa-trash" aria-hidden="true"></i>
                                                            </button>
                                                            </div>
                                                    </li>
                                                </div>
                                            )
                                        })}

                                    </ul>

                                    <form 
                                        className={"form-inline mt-2 " + ((parseInt(this.state.actividades.length) >=  parseInt(this.state.actividadesFaltantes) ? "d-none" : ""))}>


                                        <label className="sr-only" htmlFor="txtMetricaDescripcion">Métrica</label>
                                        <input 
                                            type="text" 
                                            className="form-control col-8 mb-2 mr-2 ml-4" 
                                            id="txtMetricaDescripcion" 
                                            placeholder="Descripción actividad"
                                            value={this.state.txtMetricaDescripcion}
                                            onChange={this.TxtDescripcionMetricaChange} />

                                                
                                        <button 
                                            type="button"
                                            className={"btn btn-primary mb-2 mr-2 ml-4 " }
                                            onClick={ this.AddSection}>
                                                <i className="fa fa-plus" aria-hidden="true"></i>
                                                <span className="m-1">
                                                    Agregar
                                                </span>
                                        </button>
                                    </form>

                                </div>
                                    <div className="card-footer text-right">
                                         {this.state.actividades.length} actividades de {this.state.actividadesFaltantes}
                                </div>
                            </div>

                        </div> 

                    </div>

                    <div className={"row mt-4 " + (this.state.actividadesFaltantes > 0 ? "" : "d-none") }>
                        <div className="col text-center">
                            <button 
                                type="button" 
                                onClick={this.GuardarNuevaActividad}
                                className="btn btn-success">
                                    <i className="fa fa-floppy-o" aria-hidden="true"></i>
                                    <span className="m-1">
                                        Guardar
                                    </span>
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