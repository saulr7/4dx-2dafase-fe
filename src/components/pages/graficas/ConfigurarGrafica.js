import React from 'react'

import TipoGrafico from './TipoGrafico'

import { axios } from "../../../config/config";

class ConfigurarGrafica extends React.Component {


    constructor(props)
    {
        super(props)

        this.state = {
            tipoGraficoId : 0,
            tipoGraficas : []
        }

        this.TipoGraficoHandlerChange = this.TipoGraficoHandlerChange.bind(this)
        this.ObtenerTipoGraficas = this.ObtenerTipoGraficas.bind(this)

    }


    componentDidMount()
    {
        this.ObtenerTipoGraficas()
    }


    TipoGraficoHandlerChange(event) 
    {       
        var tipoGraficoId = parseInt( event.target.value)
        this.setState(state => ({  tipoGraficoId: tipoGraficoId }));
    
    }


    ObtenerTipoGraficas()
    {
        axios.get('/TipoGraficos' )
        .then(res => {
            this.setState({tipoGraficas : res.data})
        }).catch((error) => {
            console.log(error)
        })
    }


    render() {
        return (
            <div>
                <div className="card">
                    <h3 className="card-header">Gráfica</h3>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12 col-md-6 offset-md-3 text-center">
                                <h4 className="card-title">Tipo de gráfico</h4>
                                <p className="card-text">
                                    Selecciona el gráfico que representará tus resultados
                                </p>
                                <select value={this.state.tipoGraficoId} className="custom-select col-12 col-md-6" onChange={ this.TipoGraficoHandlerChange }>
                                    <option value="0" >Seleccionar</option>
                                    { this.state.tipoGraficas.map((grafica, index) => <option key={index} value={grafica.Id}>{grafica.Nombre}</option>) }
                                </select>
                            </div>
                        </div>

                        <div className="row p-2">
                            <div className="col-12 col-md-8 offset-md-2 text-center ">
                                <TipoGrafico type={this.state.tipoGraficoId}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col text-center">
                                <button type="button" className="btn btn-primary" onClick={this.GuardarDatosMedidaPredictiva} >Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}


export default ConfigurarGrafica