import React from 'react'

import Mes from '../../common/Mes'
import {axios} from '../../../config/config'

import Swal from "sweetalert2";

class Resultado extends React.Component {

    constructor(props)
    {
        super(props)

        

        this.state = {
            resultado : this.props.Resultado,
            valor : (this.props.Resultado.Valor ? this.props.Resultado.Valor : 0),
            editar : false
        }

        this.EditarHandler = this.EditarHandler.bind(this)
        this.ActualizarResultadoMedidaPredictiva = this.ActualizarResultadoMedidaPredictiva.bind(this)
        this.ValorChangeHandler = this.ValorChangeHandler.bind(this)
        this.ValidarDatosNuevaMedidaPredictiva = this.ValidarDatosNuevaMedidaPredictiva.bind(this)
        this.onEnterPress = this.onEnterPress.bind(this)
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

    render() {
        return (
            <tbody>
                <tr className= { this.state.valor < this.state.resultado.Meta ? "alert-warning" :""}>
                    <td>
                        {this.state.resultado.Anio}
                    </td>
                    <td>
                       <Mes Mes={this.state.resultado.Mes}/>
                    </td>
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
                        <button className=" btn btn-info m-1" data-toggle="tooltip" data-placement="top" title="Editar" onClick={this.EditarHandler} >
                            <i className="fa fa-pencil" aria-hidden="true"></i>
                            <span className="m-1">
                                Ingresar resultado
                            </span>
                        </button>
                    </td>
                
                </tr>
            </tbody>
        )
    }
}


export default Resultado