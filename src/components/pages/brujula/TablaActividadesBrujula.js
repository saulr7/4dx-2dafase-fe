import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import NoData from '../../common/NoData'
import { axios, JwtPayload } from "../../../config/config";
import Swal from "sweetalert2";
import Loading from '../../common/Loading'

import EstadoActividad from './EstadoActividad'



class TablaActividadesBrujula extends Component {

    constructor(props)
    {
        super(props)

        this.state = {
            ResultadoId : this.props.ResultadoId,
            cargando : false,
            UsuarioId : this.props.UsuarioId,
            Actividades :  this.props.Actividades,
            ActividadesLoaded :  this.props.Actividades,
            FiltrarEstado : this.props.IdEstado
        }
        this.ObtenerActividades = this.ObtenerActividades.bind(this)
        this.EstadoChangedHandler = this.EstadoChangedHandler.bind(this)

    }


    componentDidMount()
    {
        this.ObtenerActividades();
        
    }



    ObtenerActividades()
    {
        var usuario =""
        var user = JwtPayload().usuario
        usuario = user.Empleado

        this.setState({cargando : true})

        axios.get("/BrujulaActividadesPorColaborador/"+ usuario + "/NO" )
        .then(res => {
            this.props.dispatch({type:'LOAD_BRUJULAS', data: res.data})
            this.setState({cargando : false, Actividades : res.data, ActividadesLoaded : res.data})

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


    EstadoChangedHandler(event)
    {
        var estadoId = event.target.value

        var result = this.state.ActividadesLoaded.filter((actividad) =>{
            if (actividad.IdEstado === parseInt(estadoId))
                return true
            else
                return ""
        })

        this.setState({Actividades : result})
        this.props.dispatch({type:'LOAD_BRUJULAS', data: result})

    }

    render() {
        return (
            <div>

                <div className="row">
                    <div className="col-12 col-lg-4 offset-lg-4 text-center">
                    <h4 className="card-title">Estado:</h4>
                        <select value={this.state.estadoSelected} className="custom-select " id="cmbSubAreas" onChange={ this.EstadoChangedHandler }>
                            { this.props.estadosBrujula.map((estado, index) => <option key={index} name={estado.Descripcion} value={estado.IdEstado}>{estado.Descripcion}</option>) }
                        </select>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col text-center">
                        <Loading Cargando={this.state.cargando}/>
                    </div>
                </div>

                <div className="row">
                    <div className="col text-center">
                        <NoData NoData={this.props.Actividades.length === 0 && !this.state.cargando}/>
                    </div>
                </div>


                <div className="row" >
                        <div className="col">
                        <h3 className="text-center font-weight-bold">Actividades</h3>

                            <div className="list-group">
                                                           
                                    {this.props.Actividades.map((brujula, index)=>
                                        {
                                            return <div key={index} className="list-group-item list-group-item-action flex-column align-items-start">
                                                <div className="d-flex w-100 justify-content-between">
                                                    <h5 className="mb-1">{brujula.Actividad}</h5>
                                                    <small className="text-muted"><Moment fromNow>{brujula.FechaCreada}</Moment></small>
                                                </div>
                                                <div className="col-12 col-md-3 ">
                                                    <h5><span className="badge badge-secondary">
                                                        <EstadoActividad
                                                                Descripcion={brujula.Descripcion}
                                                                Brujula={brujula.IdBrujula}
                                                                ResultadoId={this.state.IdColaborador}
                                                                UsuarioId={brujula.IdColaborador} />
                                                    </span></h5>
                                                </div>
                                                <p className="mb-1">
                                                    Desde: <Moment format="YYYY/MM/DD">{brujula.Desde}</Moment> - 
                                                    Hasta  <Moment format="YYYY/MM/DD">{brujula.Hasta}</Moment>
                                                </p>
                                                <small className="text-muted">Modificada: <Moment format="YYYY/MM/DD">{brujula.FechaModificada}</Moment></small>
                                            
                                            </div>
                                        
                                    })}
                            
                            </div>

                        </div>
                    </div>

            </div>
        );
    }
}


function mapStateToProps(state) {

    return {
        
         Actividades : state.BrujulaReducer,
         colaboradorSelected : state.ColaboradorSelectedReducer,
         estadosBrujula : state.EstadosBrujula
    };

}

export default connect(
    mapStateToProps,
)(TablaActividadesBrujula);