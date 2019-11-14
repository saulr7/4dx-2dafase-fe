import React from 'react'

import Frecuencia from '../../../models/Frecuencia'


class TablaResultadoMP extends React.Component {


    
    constructor(props)
    {
        super(props)
//Agregar Log
//console.log(this.props.MedidaPredictiva)
        this.state = {
            MedidaPredictiva : this.props.MedidaPredictiva,
            ResultadosMP : (this.props.MedidaPredictiva.ResultadosMP ? this.props.MedidaPredictiva.ResultadosMP : [])
        }

    }


    render() {
        return (
                <div className="row">
                    <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
                        <div id="divTablaResultado">                        
                        <table className="table">                            
                            <thead className="thead-light">                               
                                <tr>
                                    <th>Meta</th>
                                    <th>Cumplió</th>
                                </tr>                                
                                <tr>Periodo</tr>
                            </thead>
                            <tbody>
                                {this.state.ResultadosMP.map((result, index) =>
                                    {
                                        return(
                                            <tr key={index}>                                                
                                                <td>{this.state.MedidaPredictiva.FrecuenciaId === Frecuencia.Semanal ? (
                                                    "Semana " +result.Semana
                                                    ):
                                                    (
                                                        "Día " +result.Dia
                                                    )}                                                  
                                                     </td>
                                                <td>
                                                    {result.LlegoAMeta ? (
                                                        <i className="fa fa-check-square text-success icon-meta" aria-hidden="true"></i>
                                                    ) : (
                                                        <i className="fa fa-window-close text-danger icon-meta" aria-hidden="true"></i>
                                                    ) }
                                                </td>                                             
                                            </tr>
                                        )
                                    })}            
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        )
    }

}

export default TablaResultadoMP