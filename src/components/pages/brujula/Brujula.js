import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import 'moment-timezone';
import 'moment/locale/es';

import NuevaActividad from './NuevaActividadBrujula'

import TablaActividadesBrujula from './TablaActividadesBrujula'

import TituloPrincipal from '../../common/TituloPrincipal'
import Loading from '../../common/Loading'
import NoData from '../../common/NoData'
import EsElUsuarioLogueado from '../../../Functions/EsElUsuarioLogueado'
import { axios } from "../../../config/config";
import Swal from "sweetalert2";


class Brujula extends Component {

    
    constructor(props)
    {
        super(props)
        
        Moment.globalLocale = 'es';
        
        const { match: { params } } = this.props;
        var objBrujulaBase64 = params.IdMP
        
        var objBrujula  = {}

        if(objBrujulaBase64)
            objBrujula = JSON.parse(atob(objBrujulaBase64))

        this.state = {
            IdResultadoMP : objBrujula.IdResultado,
            IdColaboradorDueno: objBrujula.IdColaborador,
            EsElDueno : EsElUsuarioLogueado(objBrujula.IdColaborador),
            cargando : false,
            brujulas : []
        }

        this.ObtenerActividades = this.ObtenerActividades.bind(this)
        this.ObtenerEstadoBrujula = this.ObtenerEstadoBrujula.bind(this)
    }

    componentDidMount()
    {
        this.props.dispatch({type:'LOAD_BRUJULAS', data: []}) 
        this.ObtenerActividades()
        this.ObtenerEstadoBrujula();
    }

  
    ObtenerActividades()
    {

        axios.get("/BrujulasPorMP/"+ this.state.IdColaboradorDueno+"/"+ this.state.IdResultadoMP)
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

    ObtenerEstadoBrujula()
    {
        this.props.dispatch({type:'LOAD_ESTADOS_BRUJULA', data: []}) 

        axios.get("/BrujulaEstados" )
        .then(res => {
            
            this.props.dispatch({type:'LOAD_ESTADOS_BRUJULA', data: res.data}) 

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

    render() {
        return (
            <div>
                <div className="container mb-4">
                
                    <div className="row">
                        <div className="col">
                            <TituloPrincipal Titulo="Brújula" BackButton={true}/>
                        </div>
                    </div>

                    <div className={"row m-1 " +(this.state.EsElDueno ? "" : "d-none")}>

                        <div className="col text-right ">

                        <button className="btn btn-primary text-right" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="true" aria-controls="collapseExample">
                            <span className="m-1">
                                Nueva
                            </span>
                            <i className="fa fa-plus-circle" aria-hidden="true"></i>
                        </button>
                        </div>

                    </div>

                    <div className="row m-2">
                        <div className="col-12 col-md-6 offset-md-3 ">
                            
                            <div className="collapse " id="collapseExample" >
                                <div className="card card-body">
                                    <NuevaActividad IdMP={this.state.IdResultadoMP}/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col text-center">
                            <Loading Cargando={this.state.cargando}/>  
                        </div>    
                    </div> 


                    <div className="row">
                        <div className="col text-center">
                            <NoData NoData={this.props.actividades.length === 0 && !this.state.cargando} Mensaje="Presiona Nueva para empezar a agregar actividades"/>  
                        </div>
                    </div>

{/* 
                    <div className={"row " + (this.props.actividades.length === 0 ? "d-none" : "")}>
                        <div className="col">
                        <h3 className="text-center font-weight-bold">Actividades</h3>
                            <table className="table table-striped bg-white">
                                <thead>
                                    <tr>
                                    <th>Creada</th>
                                    <th>Descripción</th>
                                    <th>Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.actividades.map((brujula, index)=>
                                        {
                                        return <tr key={index}>
                                                <td>
                                                    <Moment fromNow>{brujula.FechaCreada}</Moment>
                                                </td>
                                                <td>{brujula.Actividad}</td>
                                                <td>
                                                    <EstadoActividad 
                                                        Descripcion={brujula.Descripcion} 
                                                        Brujula={brujula.IdBrujula}
                                                        ResultadoId={this.state.IdResultadoMP}
                                                        UsuarioId={this.state.IdColaboradorDueno}/>
                                                </td>
                                            </tr>
                                        })}
      
                                </tbody>
                            </table>


                        </div>
                    </div> */}


                    <div>
                        <TablaActividadesBrujula 
                            ResultadoId={this.state.IdResultadoMP}
                            UsuarioId={this.state.IdColaboradorDueno} 
                            Actividades={this.props.actividades}/>
                    </div>

                </div>
                    
            </div>
        );
    }
}


function mapStateToProps(state) {
    
    return {
        actividades : state.BrujulaReducer
    };
}

export default connect(
    mapStateToProps,
)(Brujula);