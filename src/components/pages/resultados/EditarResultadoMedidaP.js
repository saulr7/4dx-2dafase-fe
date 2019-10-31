import React from 'react'

import './Resultados.css'
import {axios, JwtPayload, EmailFormat } from '../../../config/config'

import Medicion from '../../../models/Medicion'
import SolicitarAutorizacion from './SolicitarAutorizacion'
import SendEmailService from '../../../services/SendEmailService'
import RegistrarEventoDelSistema from '../../../services/RegistarEventoDelSistema'
import Swal from "sweetalert2";


class EditarResultadoMedidaP extends React.Component {

    constructor(props)
    {
        super(props)       

        var usuario = JwtPayload().usuario            

        this.state = {
            resultado : this.props.Resultado,
            valor : (this.props.Resultado.Valor ? this.props.Resultado.Valor : 0),
            LlegoAMeta : (this.props.Resultado.LlegoAMeta ? this.props.Resultado.LlegoAMeta : false),
            Autorizado : this.props.Resultado.Autorizado,
            EsElDueno : (usuario.Empleado === this.props.Resultado.IdColaborador? true : false),
            editar : false,
            usuarioPerfilId : (JwtPayload().usuario.PerfilId ),
            objBrujulaBase64 : ""
        }


        this.EditarHandler = this.EditarHandler.bind(this)
        this.ActualizarResultadoMedidaPredictiva = this.ActualizarResultadoMedidaPredictiva.bind(this)
        this.ValorChangeHandler = this.ValorChangeHandler.bind(this)
        this.onEnterPress = this.onEnterPress.bind(this)
        this.AutorizarResultadoMedidaPredictiva = this.AutorizarResultadoMedidaPredictiva.bind(this)
        this.SendEmail = this.SendEmail.bind(this)
    }


    componentDidMount()
    {        

        var objBrujula = {
            IdResultado : this.state.resultado.IdResultado,
            IdColaborador : this.props.Resultado.IdColaborador
        }

        this.setState({
            objBrujulaBase64:   btoa(JSON.stringify(objBrujula))
        })
    }

    EditarHandler()
    {
        this.setState(state => ({  editar: !state.editar }));
    }

    ValorChangeHandler(event) {
        
        var valor = event.target.type === 'checkbox' ? event.target.checked :  event.target.value;
        
        if(event.target.type === 'checkbox')
            this.setState(state => ({  LlegoAMeta : valor }));
        else
            this.setState(state => ({  valor : valor}));

      }

      UNSAFE_componentWillReceiveProps(newProps) {
          this.setState(
              {
                  resultado: newProps.Resultado,
                  valor : (newProps.Resultado.Valor ? newProps.Resultado.Valor : 0),
                  LlegoAMeta : (newProps.Resultado.LlegoAMeta ? newProps.Resultado.LlegoAMeta : false),
                  Autorizado : newProps.Resultado.Autorizado,
                
                })
          
     }
 

    
    ActualizarResultadoMedidaPredictiva()
    {
        this.setState(state => ({  editar : false }));
        
        var ResultadoMedidaPredictiva = {

            "IdResultado":this.state.resultado.IdResultado,
            "IdMP": this.state.resultado.IdMP,
            "Anio":this.state.resultado.Anio,
            "Mes":this.state.resultado.mes,
            "Semana":this.state.resultado.Semana,
            "Dia":this.state.resultado.Dia,
            "Valor": parseFloat(this.state.valor),
            "LlegoAMeta" : this.state.LlegoAMeta,
            "FechaModificacion": null, 
            
        }

        
        axios.post("/ResultadosUpdate", ResultadoMedidaPredictiva )
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
            return
        })
    }

    AutorizarResultadoMedidaPredictiva()
    {
        this.setState(state => ({  editar : false }));
        
        var ResultadoMedidaPredictiva = {

            "IdResultado":this.state.resultado.IdResultado,
            "IdMP": this.state.resultado.IdMP,
            "Anio":this.state.resultado.Anio,
            "Mes":this.state.resultado.mes,
            "Semana":this.state.resultado.Semana,
            "Dia":this.state.resultado.Dia,
            "Valor": parseFloat(this.state.valor),
            "LlegoAMeta" : this.state.LlegoAMeta,
            "FechaModificacion": null, 
            
        }

        
        axios.post("/AutorizarResultado", ResultadoMedidaPredictiva )
        .then(res => {
            Swal.fire({  
                title: 'Información guardada exitosamente',  
                type: 'success',  
                text: "Éxito",  
            });
            this.setState(state => ({  editar : false, Autorizado : true }));
            RegistrarEventoDelSistema("Aurtorizó el resultado: "+this.state.resultado.IdResultado)
            this.SendEmail()            


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

    SendEmail()
    {
        var correoFormato = EmailFormat 
        var filasTblResultado = this.CrearFilaTblResultadoFormatoCorreo()

        correoFormato = correoFormato.replace("@filasTblColaborador", "") 
        correoFormato = correoFormato.replace("@filasTblResultado", filasTblResultado) 
        correoFormato = correoFormato.replace("@Url", "resultadosMedidasPredictiva/"+ btoa(this.state.resultado.IdMP)) 
        correoFormato = correoFormato.replace("@descripcion", "<h2><strong> Se ha autorizado el ingreso de datos </strong></h2>") 

        SendEmailService("", "Solicitud de autorización para ingreso de resultados" , correoFormato, this.state.resultado.IdColaborador.toString())

        RegistrarEventoDelSistema("Solicitó autorización para ingresar resultado")

    }

   

    CrearFilaTblResultadoFormatoCorreo()
    {
        
        var filaTipo = " <tr> <th>Tipo</th> <td>MP</td> </tr>"
        var filaPeriodo = " <tr> <th>Período</th> <td>"+this.state.resultado.IdFrecuencia === 2 ? ("Semana "+ this.state.resultado.Semana) : "Día " + this.state.resultado.Dia+"</td> </tr>"

        return filaTipo + filaPeriodo
    }



    
    onEnterPress = (e) => {
        if(e.keyCode === 13 && e.shiftKey === false) {
          e.preventDefault();
          this.ActualizarResultadoMedidaPredictiva()
        }
      }

    render() {

            let EditarTipoMeta = (

                    <div className="custom-control custom-switch">
                        <input 
                            type="checkbox" 
                            className="custom-control-input" 
                            id="customSwitch1"
                            checked={this.state.LlegoAMeta}
                            onChange={this.ValorChangeHandler} 
                            onKeyDown={this.onEnterPress}/>
                        <label className="custom-control-label" htmlFor="customSwitch1">Cumplió</label>
                    </div>
            
            )

            let EditarTipoResultado =( 
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
            )
            let BtnActualizar = (
                        <button 
                            className=" btn btn-success m-1" 
                            data-toggle="tooltip" 
                            data-placement="top" 
                            name ="btnActualizar"
                            title="Guardar" 
                            type="button"
                            onClick={this.ActualizarResultadoMedidaPredictiva}>
                            Guardar
                        </button>
            )

            let BtnAutorizar = (
                <button 
                    className=" btn btn-success m-1" 
                    data-toggle="tooltip" data-placement="top" 
                    title="Autorizar" 
                    name ="btnAutorizar"
                    onClick={this.AutorizarResultadoMedidaPredictiva} >
                        <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
                </button>
                  )
    
            
            let BtnEditar = (
                (this.state.Autorizado && this.state.EsElDueno) ? 
                (
                    <div>
                        <button className=" btn btn-info m-1" data-toggle="tooltip" data-placement="top" title="Ingresar resultado" onClick={this.EditarHandler} >
                            <i className="fa fa-pencil" aria-hidden="true"></i>
                        </button>
                    </div>
                ): (
                    <div >
                        <button className=" btn btn-dark m-1" data-toggle="tooltip" data-placement="top" title="Editar" disabled={true} >
                            <i className="fa fa-pencil" aria-hidden="true"></i>
                        </button>
                        
                        {(this.state.usuarioPerfilId === 2 && !this.state.EsElDueno) ? (
                            <span>
                                {this.state.Autorizado ? null : (
                                    BtnAutorizar

                                )}
                            </span>
                            ):(
                                <div>
                                    {this.state.EsElDueno ? (
                                        <SolicitarAutorizacion 
                                                Tipo="MP" 
                                                Periodo={this.state.resultado.IdFrecuencia === 2 ? ("Semana "+ this.state.resultado.Semana) : "Día " + this.state.resultado.Dia} 
                                                Url={ "resultadosMedidasPredictiva/"+ btoa(this.state.resultado.IdMP)}
                                                ColaboradorId={this.state.resultado.IdColaborador}/>
                                    ): (
                                        null
                                    )}

                                </div>
                            )}
                    </div>
                )
            )

            
            
            
            let ResultadoTipoMeta = (
                    <div>
                        <span className="m-2">
                            Cumplió
                        </span>
                         {this.state.LlegoAMeta ?
                        (<i className="fa fa-check text-success iconoMeta" aria-hidden="true"></i>) :
                        (<i className="fa fa-times text-danger iconoMeta" aria-hidden="true"></i>)
                         }
                    </div>
            )

            let Editar  
            if(this.state.resultado.IdMedicion === Medicion.Meta)
            {
                Editar = (
                    <div className="">
                        <div className="row">
                            <div className="col">
                                {EditarTipoMeta}
                                {BtnActualizar}
                                
                            </div>
                            <div className="col">
                                {BtnEditar}

                            </div>
                        </div>
                    </div>
                )

            }
            else
            {
                Editar = (
                    
                    <div className="">
                        <div className="row">
                            <div className="col">
                                {EditarTipoResultado}
                                {BtnActualizar}
                                
                            </div>
                            <div className="col">
                                {BtnEditar}

                            </div>
                        </div>
                    </div>
                )
                
            }

            let Resultado
            if(this.state.resultado.IdMedicion ===  Medicion.Meta)
            {
                Resultado =( 
                    <div className="row">
                        <div className="col">
                            {ResultadoTipoMeta}
                        </div>
                        <div className="col">
                            {BtnEditar}
                        </div>
                    </div>
                )

            }
            else {
                Resultado = (
                    <div className="row">
                        <div className="col">
                            {this.state.valor + " " +this.state.resultado.Unidad}
                        </div>
                        <div className="col">
                            {BtnEditar}
                        </div>
                    </div>
                )

            }
            
       

        if(this.state.Autorizado && this.state.editar ){
            return (  Editar )
        }
        else {
            return(Resultado )
        }
  
        
    }

}



export default EditarResultadoMedidaP