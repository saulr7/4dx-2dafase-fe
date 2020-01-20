import React from 'react'

import PeriodoEnBaseAFrecuencia from '../../common/PeriodoEnBaseAFrecuencia'
import Periodicidad from '../../common/FNPeriodoEnBaseAFrecuencia'
import SendEmailService from '../../../services/SendEmailService'
import { axios, JwtPayload, EmailFormat  } from "../../../config/config";
import RegistrarEventoDelSistema from '../../../services/RegistarEventoDelSistema'
import Swal from 'sweetalert2'

class MetaPeriodica extends React.Component {

    constructor(props)
    {
        super(props)      

        var usuario = JwtPayload().usuario        

        this.state = {
            periodo : this.props.Periodo,
            meta : this.props.Meta,
            valor: this.props.Periodo.Meta,
            editar : false,
            EsElDueno : (usuario.Empleado === this.props.Periodo.IdColaborador? true : false),
            usuarioPerfilId : (JwtPayload().usuario.PerfilId ),
            Autorizado : this.props.Periodo.Autorizado,
        }

        this.EditarHandler = this.EditarHandler.bind(this)
        this.ValorChangeHandler = this.ValorChangeHandler.bind(this)
        this.ActualizarMetaHanlder = this.ActualizarMetaHanlder.bind(this)
        this.onEnterPress = this.onEnterPress.bind(this)
        this.SendEmail = this.SendEmail.bind(this)
    }


    ActualizarMetaHanlder()
    {
        
        var medidaPredictiva = {
            "IdResultadoMCI" : parseInt(this.state.periodo.IdResultadoMCI),
            "Meta" : parseFloat( this.state.valor)
        }

        this.setState({cargando : true})

        axios.post("/MetaMCIAdd", medidaPredictiva )
        .then(res => {
            Swal.fire({  
                title: 'Información guardada exitosamente',  
                type: 'success',  
                text: "Éxito",  
            });
            this.setState({cargando : false,  editar : false, Autorizado: false})
        }).catch((error) => {
            console.log(error)
            Swal.fire({  
                title: 'Algo ha salido mal',  
                type: 'error',  
                text: "Atención",  
            });
            this.setState({cargando : false, editar : false})
        })
        
    
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
        correoFormato = correoFormato.replace("@Url", "configuracion/"+(btoa(JSON.stringify(this.state.meta)))) 
        correoFormato = correoFormato.replace("@descripcion", "<h2><strong> Se ha autorizado el ingreso de datos </strong></h2>") 

        SendEmailService("", "Solicitud de autorización para ingreso de resultados" , correoFormato, this.state.periodo.IdColaborador.toString())

        RegistrarEventoDelSistema("Solicitó autorización para ingresar resultado")

    }

   

    CrearFilaTblResultadoFormatoCorreo()
    {
        var filaTipo = " <tr> <th>Tipo</th> <td>Meta MCI</td> </tr>"
        var filaPeriodo = " <tr> <th>Período</th> <td>"+Periodicidad(this.state.periodo.IdPeriocidad, this.state.periodo.Mes)+"</td> </tr>"
        return filaTipo + filaPeriodo
    }


    EditarHandler()
    {
        this.setState(state => ({  editar: !state.editar }));
    }

    onEnterPress = (e) => {
        if(e.keyCode === 13 && e.shiftKey === false) {
          e.preventDefault();
          this.ActualizarMetaHanlder()
        }
      }
  

    ValorChangeHandler(event)
    {
        var valor = event.target.value
        this.setState({ valor : valor})
    }

    render() {
        return(
                <tr>
                    <td>
                        <PeriodoEnBaseAFrecuencia Periodicidad={this.state.periodo.IdPeriocidad} Periodo={this.state.periodo.Mes} />
                    </td>
                    <td>
                        {this.state.editar ?
                            (
                                
                                <div className="form-inline">
                                
                                    <input 
                                    type="text" 
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
                                        onClick={this.ActualizarMetaHanlder}>
                                        Guardar
                                    </button>
                                </div>
                            )   :
                                this.state.valor + " " + this.state.periodo.Unidad
                        }
                    </td>
                    <td>
                        {this.state.Autorizado  ? (
                            <div>
                                {this.state.EsElDueno ? (
                                    <button className=" btn btn-info m-1" data-toggle="tooltip" data-placement="top" title="Actualizar meta" onClick={this.EditarHandler} >
                                        <i className="fa fa-pencil" aria-hidden="true"></i>
                                        <span className="m-1 d-none d-md-inline">
                                            Actualizar Meta
                                        </span>
                                    </button>
                                ): (
                                    <button className=" btn btn-secondary m-1" data-toggle="tooltip" data-placement="top" title="Actualizar meta">
                                        <i className="fa fa-pencil" aria-hidden="true"></i>
                                        <span className="m-1 d-none d-md-inline">
                                            Actualizar Meta
                                        </span>
                                    </button>
                                )}
                            </div>

                        ): (
                            <div>

                                <button className=" btn btn-secondary m-1" data-toggle="tooltip" data-placement="top" title="Actualizar meta">
                                    <i className="fa fa-pencil" aria-hidden="true"></i>
                                    <span className="m-1 d-none d-md-inline">
                                        Actualizar Meta
                                    </span>
                                </button>

                                {/* {this.state.EsElDueno ? (

                                    <SolicitarAutorizacion
                                        Tipo="Meta MCI"
                                        Periodo={Periodicidad(this.state.periodo.IdPeriocidad, this.state.periodo.Mes)}
                                        Url={"configuracion/"+(btoa(JSON.stringify(this.state.meta)))}
                                        ColaboradorId={this.state.periodo.IdColaborador}/>
                                ): (
                                    null
                                )} */}
 
                                    {(this.state.usuarioPerfilId === 2 && !this.state.EsElDueno)?(
                                        <button 
                                            className=" btn btn-success m-1" 
                                            data-toggle="tooltip" data-placement="top" 
                                            title="Autorizar" 
                                            name ="btnAutorizar"
                                            onClick={() => this.AutorizarMCI(this.state.periodo.IdResultadoMCI)}
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


export default MetaPeriodica