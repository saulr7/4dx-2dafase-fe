import React, { Component } from 'react';
import { connect } from 'react-redux';

import {TabMenu} from 'primereact/tabmenu';
import { axios, JwtPayload } from "../../../config/config";
import Swal from "sweetalert2";

import EsLider from '../../../Functions/EsLider'
import UsuarioLogueadoId from '../../../Functions/UsuarioLogueadoId'

import TituloPrincipal from '../../common/TituloPrincipal';
import NuevaActividad from './NuevaActividad';
import NuevaActividadComoLider from './NuevaActividadComoLider';

class NuevasActividades extends Component {


    
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
        if(EsLider() )
        {
            var items = this.state.items
            var opcionLider = {label: 'Nueva actividad como líder', icon: 'pi pi-fw pi-plus', command:()=> this.ToggleActividaComoLider(true)}
            items.push(opcionLider)
            this.setState({items})
        }

        this.ObtenerActividadesPeridoActual();
        
    }


    ObtenerActividadesPeridoActual()
    {
        var colaboradorId= UsuarioLogueadoId()
        axios.get("/GetBrujulaCantidad/"+colaboradorId )
        .then(res => {
            console.log(res.data)
            if(!res.data)
                return

            var actividadesFaltantes = ( 3- res.data.Cantidad )
            var actividadesFaltantesComoLider= (3 - res.data.CantidadComoLider)

            actividadesFaltantes = (actividadesFaltantes >0 ? actividadesFaltantes : 0)
            actividadesFaltantesComoLider = (actividadesFaltantesComoLider >0 ? actividadesFaltantesComoLider : 0)

            this.setState({actividadesFaltantesComoLider, actividadesFaltantes})

        }).catch((error) => {
            console.log(error)
            Swal.fire({  
                title: 'Algo ha salido mal',  
                type: 'error',  
                text: "Atención",  
            });
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
            "CreatedBy" : usuario.Empleado
        }

        axios.post("/BrujulaPorMPAdd", nuevaActividad )
        .then(res => {

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




    render() {
        return (
            <div>
                <div className="container mb-4">

                    <div className="row">
                        <div className="col">
                            <TituloPrincipal Titulo="Nuevas actividades" />
                        </div>
                    </div>

                    <div className="row m-2">
                        <div className="col-12 text-center">
                            <TabMenu model={this.state.items} activeItem={this.state.activeItem} onTabChange={(e) => this.setState({activeItem: e.value})}/>
                        </div>
                    </div>

                    {this.state.ActividadComoLider ? (
                            <div className="row m-3">
                                <div className="col">
                                    <NuevaActividadComoLider></NuevaActividadComoLider>
                                </div>
                            </div>

                        ):
                        
                        (
                            <div className="row">
                                <div className="col">
                                    <NuevaActividad></NuevaActividad>
                                </div>
                            </div>

                        )
                        
                    }


                    
        
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
)(NuevasActividades);