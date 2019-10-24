import React from 'react'

import PeriodoEnBaseAFrecuencia from '../../common/PeriodoEnBaseAFrecuencia'
import { axios } from "../../../config/config";
import Swal from 'sweetalert2'

class MetaPeriodica extends React.Component {

    constructor(props)
    {
        super(props)      

        console.log(this.props.Periodo)

        this.state = {
            periodo : this.props.Periodo,
            valor: this.props.Periodo.Meta,
            editar : false
        }

        this.EditarHandler = this.EditarHandler.bind(this)
        this.ValorChangeHandler = this.ValorChangeHandler.bind(this)
        this.ActualizarMetaHanlder = this.ActualizarMetaHanlder.bind(this)
        this.onEnterPress = this.onEnterPress.bind(this)
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
            this.setState({cargando : false,  editar : false})
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
                        {this.state.periodo.Autorizado ? (
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
                    </td>
                </tr>
                
        )
    }

}


export default MetaPeriodica