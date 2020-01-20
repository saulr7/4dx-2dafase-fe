import React from 'react'

import Mes from '../../common/Mes'
import EditarResultadoMedidaP from './EditarResultadoMedidaP'
import { axios } from '../../../config/config'

import Frecuencia from '../../../models/Frecuencia'


import Swal from "sweetalert2";
import Medicion from '../../../models/Medicion'

class Resultado extends React.Component {

    constructor(props) {
        super(props)
        //console.log(this.props.Resultado)
        this.state = {
            resultado: this.props.Resultado,
            valor: (this.props.Resultado.Valor ? this.props.Resultado.Valor : 0),
            LlegoAMeta: (this.props.Resultado.LlegoAMeta ? this.props.Resultado.LlegoAMeta : false),
            editar: false
        }

        this.ActualizarResultadoMedidaPredictiva = this.ActualizarResultadoMedidaPredictiva.bind(this)
        this.onEnterPress = this.onEnterPress.bind(this)
    }



    ActualizarResultadoMedidaPredictiva() {

        var ResultadoMedidaPredictiva = {

            "IdResultado": this.state.resultado.IdResultado,
            "IdMP": this.state.resultado.IdMP,
            "Anio": this.state.resultado.Anio,
            "Mes": this.state.resultado.mes,
            "Semana": this.state.resultado.Semana,            
            "Dia": this.state.resultado.Dia,
            "Valor": parseInt(this.state.valor),
            "LlegoAMeta": this.state.LlegoAMeta,
            "FechaModificacion": null
        }

        axios.post("/ResultadosUpdate", ResultadoMedidaPredictiva)
            .then(res => {
                Swal.fire({
                    title: 'Información guardada exitosamente',
                    type: 'success',
                    text: "Éxito",
                });
                this.setState(state => ({ editar: false }));

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

    UNSAFE_componentWillReceiveProps(newProps) {
       this.setState({resultado: newProps.Resultado})
    }


    onEnterPress = (e) => {
        if(e.keyCode === 13 && e.shiftKey === false) {
          e.preventDefault();
          this.ActualizarResultadoMedidaPredictiva()
        }
      }



    render() {
        return ( 
        <tbody>
            {/* <tr className = { this.state.resultado.Autorizado ? "bg-white" : "" }> */}
            <tr className = { this.state.resultado.Autorizado ? "bg-white" : "" }>
                <td> { this.state.resultado.Anio } </td> 
                <td>
                <Mes Mes={ this.state.resultado.Mes }/> 
                </td> 
                <td> {
                    this.state.resultado.IdFrecuencia === Frecuencia.Semanal ?
                    (
                        this.state.resultado.Semana 

                    ) :
                        (
                            this.state.resultado.Dia 

                        )
                }
                </td> 
                <td> { this.state.resultado.Periodo } </td> 
                
                {this.state.resultado.IdMedicion === Medicion.Resultado ?
                    (
                    <td>
                        {this.state.resultado.Meta + " " +this.state.resultado.Unidad  }

                    </td>
                        

                    ):null}

                <td colSpan = { 2 }>
                    <EditarResultadoMedidaP Resultado = { this.state.resultado }/> 
                </td> 
                
            </tr> 
        </tbody>
        )
    }
}



export default Resultado