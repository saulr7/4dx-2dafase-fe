import React from 'react'

import {axios, JwtPayload, EmailFormat } from '../../../config/config'

import PeriodoEnBaseAFrecuencia from '../../common/PeriodoEnBaseAFrecuencia'

import Swal from "sweetalert2";
import SolicitarAutorizacion from './SolicitarAutorizacion'
// import SendEmailService from '../../../services/SendEmailService'
import SendEmailService from '../../../services/SendEmailService'
import RegistrarEventoDelSistema from '../../../services/RegistarEventoDelSistema'
import Periodicidad from '../../common/FNPeriodoEnBaseAFrecuencia'

class Resultado extends React.Component {

    constructor(props)
    {
        super(props)

        var usuario = JwtPayload().usuario         
        //console.log(this.props.Resultado)
        this.state = {
            resultado : this.props.Resultado,
            valor : (this.props.Resultado.Valor ? this.props.Resultado.Valor : 0),
            editar : false,
            Autorizado : this.props.Resultado.Autorizado,
            EsElDueno : (usuario.Empleado === this.props.Resultado.IdColaborador? true : false),
            usuarioPerfilId : (JwtPayload().usuario.PerfilId ),
        }

        this.EditarHandler = this.EditarHandler.bind(this)
        this.ActualizarResultadoMedidaPredictiva = this.ActualizarResultadoMedidaPredictiva.bind(this)
        this.ValorChangeHandler = this.ValorChangeHandler.bind(this)
        this.ValidarDatosNuevaMedidaPredictiva = this.ValidarDatosNuevaMedidaPredictiva.bind(this)
        this.onEnterPress = this.onEnterPress.bind(this)
        this.AutorizarMCI = this.AutorizarMCI.bind(this)
        this.SendEmail = this.SendEmail.bind(this)
    }


    EditarHandler()
    {
        this.setState(state => ({  editar: !state.editar }));
    }


    ActualizarResultadoMedidaPredictiva = event =>
    {
        if(!this.ValidarDatosNuevaMedidaPredictiva())
            return

        var ResultadoMedidaPredictiva = {

            "IdResultadoMCI":this.state.resultado.IdResultadoMCI,
            "IdMCI":this.state.resultado.IdMCI,
            "Anio":this.state.resultado.Anio,
            "Mes":this.state.resultado.mes,
            "Valor":parseFloat(this.state.valor),
            "FechaModificacion": null
        }

        axios.post("/ValorMCIAdd", ResultadoMedidaPredictiva )
        .then(res => {
            Swal.fire({  
                title: 'Información guardada exitosamente',  
                type: 'success',  
                text: "Éxito",  
            });
            this.setState(state => ({  editar : false }));

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
        if(!this.state.valor )
        {
            Swal.fire({  
                title: 'Debes ingresar un valor válido',  
                type: 'warning',  
                text: "Atención",  
            });
            return false
        }

        return true
    }

    onEnterPress = (e) => {
        if(e.keyCode === 13 && e.shiftKey === false) {
          e.preventDefault();
          this.ActualizarResultadoMedidaPredictiva()
        }
      }
  


    ValorChangeHandler(event) {
        
        const valor = event.target.value;
        this.setState(state => ({  valor : valor }));
      }


    AutorizarMCI(idResultado)
    {
        axios.get("/ResultadoMCIAutorizar/"+ idResultado )
        .then(res => {
            Swal.fire({  
                title: 'Información guardada exitosamente',  
                type: 'success',  
                text: "Éxito",  
            });
            this.setState(state => ({  editar : false , Autorizado: true}));
            RegistrarEventoDelSistema("Aurtorizó el resultado: "+idResultado)
            this.SendEmail()

        }).catch((error) => {
            console.log(error)
            Swal.fire({  
                title: 'Algo ha salido mal',  
                type: 'error',  
                text: "Atención",  
            });
        })
    }


    SendEmail()
    {
        var correoFormato = EmailFormat 
        var filasTblResultado = this.CrearFilaTblResultadoFormatoCorreo()

        correoFormato = correoFormato.replace("@filasTblColaborador", "") 
        correoFormato = correoFormato.replace("@filasTblResultado", filasTblResultado) 
        correoFormato = correoFormato.replace("@Url", "resultadosMCI/"+ btoa(this.state.resultado.IdMCI)) 
        correoFormato = correoFormato.replace("@descripcion", "<h2><strong> Se ha autorizado el ingreso de datos </strong></h2>") 

        SendEmailService("", "Solicitud de autorización para ingreso de resultados" , correoFormato, this.state.resultado.IdColaborador.toString())

        RegistrarEventoDelSistema("Solicitó autorización para ingresar resultado")

    }

   

    CrearFilaTblResultadoFormatoCorreo()
    {
        var filaTipo = " <tr> <th>Tipo</th> <td>MCI</td> </tr>"
        var filaPeriodo = " <tr> <th>Período</th> <td>"+Periodicidad(1,this.state.resultado.Mes)+"</td> </tr>"
        return filaTipo + filaPeriodo
    }

    render() {
        return (
        
                <tr >
                    <td>
                        {this.state.resultado.Anio}
                    </td>
                    <td>
                       {/* <Mes Mes={this.state.resultado.Mes}/> */}
                       <PeriodoEnBaseAFrecuencia Periodicidad={this.state.resultado.IdPeriocidad} Periodo={this.state.resultado.Mes} />
                    </td>
                    {/* <td>
                       {this.state.resultado.Descripcion}
                    </td> */}
                    <td>
                       {this.state.resultado.Meta + " " + this.state.resultado.Unidad}
                    </td>
                    <td>
                        {this.state.editar ?
                        (
                            
                            <div className="form-inline">
                            
                                <input 
                                type="number" 
                                className="form-control mb-2 mr-sm-2" 
                                id="txtValor" 
                                autoComplete="off"
                                placeholder="Valor"
                                value={this.state.valor}
                                onChange={this.ValorChangeHandler} 
                                onKeyDown={this.onEnterPress}
                                ref={(input) => { this.txtValor = input; }}
                                />                          
                                
                                <button     
                                    className=" btn btn-primary m-1"  
                                    data-toggle="tooltip" 
                                    data-placement="top" 
                                    title="Guardar" 
                                    type="button"
                                    onClick={this.ActualizarResultadoMedidaPredictiva}>
                                    Guardar
                                </button>
                            </div>
                        )   :
                            this.state.valor + " " +this.state.resultado.Unidad

                        }
                    </td>
                    <td>
                        {(this.state.Autorizado) ? (

                            <div>
                                {this.state.EsElDueno ? (
                                    <button className=" btn btn-info m-1" data-toggle="tooltip" data-placement="top" title="Editar" onClick={this.EditarHandler} >
                                        <i className="fa fa-pencil" aria-hidden="true"></i>
                                        <span className="m-1">
                                            Ingresar resultado
                                        </span>
                                    </button>
                                ): (
                                    <button className=" btn btn-secondary m-1" data-toggle="tooltip" data-placement="top" title="Editar">
                                        <i className="fa fa-pencil" aria-hidden="true"></i>
                                        <span className="m-1">
                                            Ingresar resultado
                                        </span>
                                    </button>
                                )}
                            </div>
                            ):
                            (
                                <div>

                                    <button className=" btn btn-secondary m-1" data-toggle="tooltip" data-placement="top" title="Editar">
                                        <i className="fa fa-pencil" aria-hidden="true"></i>
                                        <span className="m-1">
                                            Ingresar resultado
                                        </span>
                                    </button>

                                    {this.state.EsElDueno ? (
                                    <SolicitarAutorizacion 
                                        Tipo="MCI" 
                                        Periodo={Periodicidad(1,this.state.resultado.Mes)} 
                                        Url={ "resultadosMCI/"+ btoa(this.state.resultado.IdMCI)}
                                        ColaboradorId={this.state.resultado.IdColaborador}/>
                                    ) : (
                                        null
                                    )}

                                    {(this.state.usuarioPerfilId === 2 && !this.state.EsElDueno)?(
                                        <button 
                                            className=" btn btn-success m-1" 
                                            data-toggle="tooltip" data-placement="top" 
                                            title="Autorizar" 
                                            name ="btnAutorizar"
                                            onClick={() => this.AutorizarMCI(this.state.resultado.IdResultadoMCI)}
                                            // onClick={this.AutorizarMCI(this.state.resultado.IdResultadoMCI)}
                                            >
                                                <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
                                        </button>

                                    ):(
                                        null
                                    )}
                                </div>
                            )}
                    </td>
                
                </tr>
        )
    }
}


export default Resultado