import React, { Component } from 'react';
import { connect } from 'react-redux';

import Moment from 'react-moment';
import NoData from '../../common/NoData'
import { axios, JwtPayload } from "../../../config/config";
import Swal from "sweetalert2";
import NuevaActividad from './NuevaActividadBrujula'

import EsElUsuarioLogueado from '../../../Functions/EsElUsuarioLogueado'

import EstadoActividad from './EstadoActividad'

class TablaActividadesBrujulaP extends Component {
    constructor(props) {
        super(props)

        this.state = {
            Actividades: this.props.Actividades,
            ActividadesLoaded: this.props.Actividades,
            ActividadComoLider: false,
            AsignarActividad: false
        }
        this.ObtenerActividades = this.ObtenerActividades.bind(this)
        this.ActividadesComoLiderHanlder = this.ActividadesComoLiderHanlder.bind(this)
        this.PuderAignarActividades = this.PuderAignarActividades.bind(this)

    }


    componentDidMount() {
        this.ObtenerActividades();
        this.PuderAignarActividades()
    }


    UNSAFE_componentWillReceiveProps(newProps) {
        this.PuderAignarActividades()
    }


    PuderAignarActividades() {
        var user = JwtPayload().usuario
        var EsLider = user.EsLider
        var EsElDueno = EsElUsuarioLogueado(this.props.colaboradorSelected.colaboradorId)

        var UserSelected = this.props.colaboradorSelected.colaboradorId

        if (EsLider && !EsElDueno && UserSelected > 0) {
            this.setState({ AsignarActividad: true })
        } else {
            this.setState({ AsignarActividad: false })
        }

    }



    ObtenerActividades() {

        var usuario = ""

        if (this.props.colaboradorSelected.colaboradorId) {
            usuario = this.props.colaboradorSelected.colaboradorId
        } else {
            var user = JwtPayload().usuario
            usuario = user.Empleado

            var colaborador = {
                nombreColaborador: user.EmpleadoNombre,
                colaboradorId: user.Empleado
            }

            this.props.dispatch({ type: 'ACTUALIZAR_COLABORADOR', data: colaborador })

        }

        axios.get("/BrujulaActividadesPorColaborador/" + usuario + "/1/NO")
            .then(res => {
 
                 this.setState({ cargando: false, Actividades: res.data, ActividadesLoaded: res.data })


            }).catch((error) => {
                this.setState({ cargando: false })
                console.log(error)
                Swal.fire({
                    title: 'Algo ha salido mal',
                    type: 'error',
                    text: "Atención",
                });
                return
            })
    }


    ActividadesComoLiderHanlder(event) {
        const filtroComoLider = event.target.checked
        var result = []


        if (filtroComoLider) {
            result = this.state.ActividadesLoaded.filter((actividad) => {
                if (actividad.ActividadComoLider)
                    return true
                else
                    return ""
            })

        } else {
            result = this.state.ActividadesLoaded
        }

        this.setState({ Actividades: result })
        this.setState({ ActividadComoLider: filtroComoLider });
    }

    render() {
        return ( 
            <div>

            <div className = "row" >
                <div className = "col text-center" >
                <NoData NoData = { this.props.Actividades.length === 0 && !this.state.cargando }/>   
                </div> 
            </div>

            <div className = { "row m-1 " + (this.state.AsignarActividad ? " " : "d-none") } >

            <div className = "col text-right " >

            <button className = "btn btn-primary text-right" type="button" data-toggle = "collapse" data-target = "#collapseExample"
            aria-expanded = "true"
            aria-controls = "collapseExample" >
            <span className = "m-1">
                Asignar Actividad 
            </span> 
            <  i className = "fa fa-plus-circle"aria-hidden = "true" > </i> 
            </button> </div>

            </div>

            <div className = { "row " } >
            <div className = "col" >

            <div className = "row m-2" >
            <div className = "col-12 col-md-6 offset-md-3 " >

            <div className = "collapse "          id = "collapseExample" >
            <div className = "card card-body" >
            <NuevaActividad User = { this.props.colaboradorSelected.colaboradorId } /> 
            </div> 
            </div> </div> 
            </div>

            <h3 className = "text-center font-weight-bold" > Actividades </h3>

            <div className = "list-group" >

            {
                this.props.Actividades.map((brujula, index) => {
                    return <div key={ index } className="list-group-item list-group-item-action flex-column align-items-start" >
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className = "mb-1" > { brujula.Actividad } </h5> 
                            <small className="text-muted"><Moment fromNow>{brujula.FechaCreada}</Moment></small>
                        </div> 
                        <div className = "row" >
                        < div className = "col-12 col-md-3 ">
                        < EstadoActividad
                            Descripcion = { brujula.Descripcion }
                            Brujula = { brujula.IdBrujula }
                            ResultadoId = { this.state.IdColaborador }
                            ActividadComoLider = { brujula.ActividadComoLider }
                            UsuarioId = { brujula.IdColaborador }
                            /> 
                        </div> 
                        <div className = { "col text-right " + (brujula.ActividadComoLider ? "" : "d-none") } >

                            <span className = "badge badge-warning" > Actividad como líder </span> 
                        </div> 
                        </div> 
                            <p className="mb-1" >
                                Desde: <Moment format="YYYY/MM/DD">{brujula.Desde}</Moment> - 
                                Hasta  <Moment format="YYYY/MM/DD">{brujula.Hasta}</Moment>
                            </p> 
                            <small className="text-muted">Modificada: <Moment format="YYYY/MM/DD">{brujula.Desde}</Moment></small>

                        </div>

                })
            }

            </div>

            </div> 
            </div>

            </div>
        );
    }
}


function mapStateToProps(state) {

    return {
        Actividades: state.BrujulaReducer.filter((actividad) => {
            if(EsElUsuarioLogueado(actividad.IdColaborador))
            {
                if (actividad.IdEstado === 1 && actividad.ActividadComoLider)
                return true
            else
                return ""
            }
            else {
                if (actividad.IdEstado === 1 )
                    return true
                else
                    return ""
            }
          
        }),
        colaboradorSelected: state.ColaboradorSelectedReducer,
    };

}

export default connect(
    mapStateToProps,
)(TablaActividadesBrujulaP);