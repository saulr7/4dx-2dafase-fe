import React from 'react'

import { axios } from "../../../config/config";
import Swal from "sweetalert2";  
import PeriodicidadNombre from '../../../Functions/PeriodicidadNombre'

import {connect} from 'react-redux';

class EditarMeditaPredictiva extends React.Component {

    constructor(props)
    {
        super(props)

        var medidaPredictiva = this.props.MedidaPredictiva

        this.state  = {
            medidaPredictiva : medidaPredictiva,
            mediciones : [],
            medicionId : 0,
            periodos : [],
            periodoId : 0,
            frecuencia : (medidaPredictiva.Frecuencia) ? (medidaPredictiva.Frecuencia) : "" ,
            medicion : (medidaPredictiva.Medicion) ? medidaPredictiva.Medicion : "",
            debeEditarMeta : true,
            periodicidades : [],
            AutorizadoMCI : (!medidaPredictiva.Autorizado),
            // EsElDueno : (usuario.Empleado === this.props.Periodo.IdColaborador? true : false),
        }

        this.ObtenerPeriodos = this.ObtenerPeriodos.bind(this)
        this.ObtenerMediciones = this.ObtenerMediciones.bind(this)
        this.FrecuenciaHandleChange = this.FrecuenciaHandleChange.bind(this)
        this.MedicionhandleChange = this.MedicionhandleChange.bind(this)
        this.GuardarDatosMedidaPredictiva = this.GuardarDatosMedidaPredictiva.bind(this)
        this.ValidarDatosNuevaMedidaPredictiva = this.ValidarDatosNuevaMedidaPredictiva.bind(this)
        this.ObtenerPeriodicidadMCI = this.ObtenerPeriodicidadMCI.bind(this)
        this.ObtenerPeriodosPorMeta = this.ObtenerPeriodosPorMeta.bind(this)

    }


    componentDidMount()
    {
        this.ObtenerPeriodos();
        this.ObtenerMediciones();
        this.ObtenerPeriodicidadMCI();
        // this.ObtenerPeriodosPorMeta();

        if(!this.state.frecuencia && !this.state.medicion)
        {
            this.setState({debeEditarMeta : false})
        }
    }


    ObtenerPeriodos()
    {
        axios.get('/GetFrecuencias' )
        .then(res => {
            this.setState({periodos : res.data})
        }).catch((error) => {
            console.log(error)
        })
    }
  
    ObtenerMediciones()
    {
        axios.get('/GetMediciones' )
        .then(res => {
            this.setState({mediciones : res.data})
        }).catch((error) => {
            console.log(error)
        })
    }


    ObtenerPeriodicidadMCI()
    {
        axios.get('/GetPeriodicidadMCI' )
        .then(res => {
            this.setState({periodicidades : res.data})
        }).catch((error) => {
            console.log(error)
        })
    }

    GuardarDatosMedidaPredictiva()
    {
        if(!this.ValidarDatosNuevaMedidaPredictiva())
            return

        var medidaPredictiva = {
            "IdPeriodo" : parseInt(this.state.medidaPredictiva.IdPeriodo),
            "IdMCI" : parseInt( this.state.medidaPredictiva.IdMCI),
            "IdFrecuencia" : parseInt(this.state.periodoId)
        }


        axios.post("/PeriodosPorMCIAdd", medidaPredictiva )
        .then(res => {
            Swal.fire({  
                title: 'Información guardada exitosamente',  
                type: 'success',  
                text: "Éxito",  
            });
            this.setState({AutorizadoMCI : false})
            this.ObtenerPeriodosPorMeta()
        }).catch((error) => {
            console.log(error)
            Swal.fire({  
                title: 'Algo ha salido mal',  
                type: 'error',  
                text: "Atención",  
            });
        })
    }


    ValidarDatosNuevaMedidaPredictiva()
    {
        if(this.state.periodoId === 0)
        {
            Swal.fire({  
                title: 'Debes seleccionar una frecuencia válida',  
                type: 'warning',  
                text: "Atención",  
            });
            return false
        }

        return true
    }


    ObtenerPeriodosPorMeta()
    {
        this.setState({cargando : true})
        axios.get('/ResultadosMCICreate/'+this.state.medidaPredictiva.IdMCI)

        .then(res => {
            this.setState({periodos : res.data})
            this.props.dispatch({type:'RECARGAR', data: res.data}) 
            this.setState({cargando : false})
        }).catch((error) => {
            console.log(error)
            this.setState(state => ({ cargando: false }));
            Swal.fire({
                title: "Error",
                type: 'error',
                text: "Error",
            });

        })
    }


    FrecuenciaHandleChange(event) {
        
        var periodoId = event.target.value
        this.setState(state => ({  periodoId: periodoId }));
      }
    
      MedicionhandleChange(event) {
        var medicionId = event.target.value
        this.setState(state => ({  medicionId : medicionId }));
      }

    render() {

        return (
            <div>
             
                <div className="card">
                    <h3 className="card-header">Periodicidad Resultados MCI</h3>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12 col-md-6 offset-md-3 text-center">
                                <h4 className="card-title">Periodicidad</h4>
                                <p className="card-text">
                                    Frecuencia con la que registraras tus resultados de MCI
                                </p>

                                {this.state.AutorizadoMCI ? 
                                (
                                    <select value={this.state.periodoId} className="custom-select col-12 col-md-6" onChange={ this.FrecuenciaHandleChange }>
                                    <option value="0" >Seleccionar</option>
                                    { this.state.periodicidades.map((periodo, index) => <option key={index} value={periodo.IdPeriodicidad}>{periodo.Descripcion}</option>) }
                                </select>
                                ):
                                (
                                    <div>
                                        <h4 
                                            className="card-title font-weight-bold">
                                            { PeriodicidadNombre(  this.props.periodos[0] ? this.props.periodos[0].IdPeriocidad : this.state.medidaPredictiva.Periodicidad )}
                                        </h4>
                                    </div>
                                )
                                }

                              
                                <br/>
                                <span className="badge badge-warning mt-2">Una vez configurada, no podrás modificarla</span>
                            </div>
                           
                        </div>
                        <div className="row my-4">
                            <div className="col text-center">
                                {this.state.AutorizadoMCI ? 
                                    (
                                    <button type="button" className="btn btn-primary" onClick={this.GuardarDatosMedidaPredictiva} >Guardar</button>
                                    ) :
                                    (
                                        null
                                    )
                                }
                            </div>
                        </div>
                    </div>
                  
                </div>

        </div>


        )
    }

}

const mapStateToProps = (state) => {
    return {
        periodos : state.PeriodicidadReducer
    }
  }

export default connect(mapStateToProps)( EditarMeditaPredictiva);