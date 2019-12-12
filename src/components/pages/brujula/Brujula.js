import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import 'moment-timezone';
import 'moment/locale/es';


import TablaActividadesBrujula from './TablaActividadesBrujula'

import TituloPrincipal from '../../common/TituloPrincipal'
import Loading from '../../common/Loading'
import EsElUsuarioLogueado from '../../../Functions/EsElUsuarioLogueado'
import { axios, JwtPayload } from "../../../config/config";
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
            brujulas : [],
            totalActividadesNuevas : this.props.totalActividadesNuevas,
            totalActividadesNuevasLider : this.props.totalActividadesNuevasLider
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
        var user = JwtPayload().usuario      
        var usuario = user.Empleado

        axios.get("/BrujulaActividadesPorColaborador/"+ usuario+"/NO")
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
                            <TituloPrincipal Titulo="Brújula"/>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col text-center">
                            <div>
                                <h4>Actividades <i>Nuevas</i>  <span className="badge badge-secondary">{this.props.ActividadesNuevas.totalActividadesNuevas}/3</span></h4>
                            </div>
                        </div>
                    </div>

                    <div className={"row "+(this.props.ActividadesNuevas.totalActividadesNuevas  >= 3  ? "" : "d-none" ) }>
                        <div className="col-12 col-md-10 offset-md-1">
                            <div className="alert alert-primary alert-dismissible fade show" role="alert">
                                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                                <strong>¡Atención!</strong> Ya tienes 3 actividades nuevas.
                            </div>
                        </div>
                    </div>

        

                    <div className="row">
                        <div className="col text-center">
                            <Loading Cargando={this.state.cargando}/>  
                        </div>    
                    </div> 

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
        actividades : state.BrujulaReducer,
        colaboradorSelected : state.ColaboradorSelectedReducer,
        ActividadesNuevas : state.TotalActividadesNuevasReducer,
    };
}

export default connect(
    mapStateToProps,
)(Brujula);