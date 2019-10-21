import React from 'react'
import TipoGrafico from '../graficas/TipoGrafico'
import Loading from '../../common/Loading'

import { Link } from "react-router-dom";

import FNPeriodoEnBaseAFrecuencia from '../../common/FNPeriodoEnBaseAFrecuencia'


import TableroMP from './TableroMP'

class TableroMCI extends React.Component {
    
    
    constructor(props)
    {
        super(props)

        this.state = {
            cargando : false,
            mci : this.props.MCI,
            data : [],
            idTipoGrafico : 3,
            dataLineal2 : {},
            dataB64 : ""

        }

        this.FormatearDataAGraficar = this.FormatearDataAGraficar.bind(this)
        this.handleTextChange = this.handleTextChange.bind(this)

    }
    

    componentDidMount()
    {
        this.FormatearDataAGraficar()
    }


    UNSAFE_componentWillReceiveProps(newProps) {

        this.setState({mci : newProps.MCI});
        this.FormatearDataAGraficar(2);
    }


    handleTextChange(event) {
        const value = parseInt( event.target.value)
  
          this.setState({
            idTipoGrafico: parseInt(value)
          });

          this.FormatearDataAGraficar(value)
      }

    FormatearDataAGraficar(tipoGrafico = 0)
    {
        var dataLineal2 = {
            idTipoGrafico : tipoGrafico > 0 ? tipoGrafico :parseInt(this.state.idTipoGrafico),
            labels: [],
            datasets : [
                {
                    label: "Resultado",
                    data: [],
                    fill : false,
                    backgroundColor: '#9CCC65',
                    borderColor: '#9CCC65'
                },
                {
                    label: "Meta",
                    type:"line",
                    data: [],
                    fill : false,
                    backgroundColor: '#42A5F5',
                    borderColor: '#42A5F5'
                },
            ]
            
        };     
        
        if(!this.state.mci.ResultadosMCI)
        {
            this.setState({dataLineal2 : dataLineal2, dataB64 : JSON.stringify(dataLineal2)})
            return
        }

        this.state.mci.ResultadosMCI.map((resultado, index) => {
            var periodo =FNPeriodoEnBaseAFrecuencia(this.state.mci.Periodicidad,resultado.Mes )
            dataLineal2.labels.push(periodo)
            dataLineal2.datasets[0].data.push(resultado.ResultadoMCI)
            dataLineal2.datasets.label = "Resultado"

            dataLineal2.datasets[1].data.push(resultado.Meta)
            dataLineal2.datasets.label = "Meta"
            return ""
        })
        
        this.setState({dataLineal2 : dataLineal2, dataB64 : JSON.stringify(dataLineal2)})

    }


 
    render(){
        return (

            <div>
                    <div className="row bp-card mb-4 bg-white">
                        <div className="col">
               

                        <div className="row">
                            <div className="col text-center">
                                <Loading Cargando={this.state.cargando}/>
                            </div>
                        </div>

                        <div className="row ">
                            <div className="col-12 col-md-10 offset-md-1">
                                {!this.state.mci.ResultadosMCI ? (
                                    <div>
                                        <div className="alert alert-warning alert-dismissible fade show" role="alert">
                                            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                                <span aria-hidden="true">×</span>
                                            </button>
                                            <strong>¡Al parecer no tienes configuradas las metas de tu MCI!</strong>
                                            <br/>
                                             Ve a la opción <i> Metas </i> , haz click en el botón de <i> Configuración </i>  que se encuentra en cada MCI
                                        </div>
                                    </div>

                                ): (
                                    null
                                )} 
                            </div>
                        </div>


                        <div className="row">
                            <div className="col-12 col-md-4">
                                <h5 className="font-weight-bold">MCI { "#"+this.state.mci.Orden}</h5>
                                <p className="card-text">
                                    {this.state.mci.MCI}
                                </p>
                            </div>
                            <div className="col-12 col-md-8 text-right">

                            

                                <Link to={{
                                    pathname: '/chart/'+ btoa(this.state.dataB64)
                                    }}>
                                        <i className="fa fa-arrows-alt" aria-hidden="true"></i>
                                </Link>

                                
                                <TipoGrafico type={parseInt(this.state.idTipoGrafico)  } data={this.state.dataLineal2}/>

                                <div className={"row "+(!this.state.mci.ResultadosMCI ? "d-none" : "")}>
                                    <div className="col">
                                        <p>
                                            <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                                <i className="fa fa-table" aria-hidden="true"></i>
                                                <span className="m-1">
                                                    Tabla Data MCI
                                                </span>
                                            </button>
                                        </p>
                                        <div className="collapse" id="collapseExample">
                                        <div className="">

                                            <div style={{overflowX: "auto"}}>

                                                <table className="table table-bordered table-sm">

                                                    <thead>
                                                        <tr>
                                                            <th>Valor</th>
                                                            {!this.state.dataLineal2.labels ? null : (

                                                            
                                                            this.state.dataLineal2.labels.map((label, index) =>{
                                                                return (
                                                                    <th key={index}>{label}</th>        
                                                                )
                                                            })
                                                            )}

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                        <th scope="row">Resultado</th>
                                                            {!this.state.dataLineal2.labels ? null : (
  
                                                                this.state.dataLineal2.datasets[0].data.map((valor, index) =>{
                                                                    return (
                                                                        // <td key={index}>{valor +this.state.mci.Unidad}</td>        
                                                                        <td key={index}>{valor }</td>        
                                                                    )
                                                                })
                                                            )}
                                                        </tr>
                                                        <tr>
                                                        <th scope="row">Meta</th>
                                                        {!this.state.dataLineal2.labels ? null : (
  
                                                            this.state.dataLineal2.datasets[1].data.map((valor, index) =>{
                                                                return (
                                                                    // <td key={index}>{valor  +this.state.mci.Unidad}</td>        
                                                                    <td key={index}>{valor  }</td>        
                                                                )
                                                            })
                                                            )}
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        </div>

                                    </div>
                                </div>

                               
                                
                                <h4 className="card-title d-inline m-2">Tipo de gráfica:</h4>

                                <select value={this.state.idTipoGrafico}  className="custom-select col-12 col-md-4 form-inline" id="cmbSubAreas" onChange={this.handleTextChange} >
                                    <option value={2} >Línea</option>
                                    <option value={3} >Barra</option>
                                </select>
                                    


                            </div>
                        </div>                      

                        <div className="">
                            
                            {
                                this.state.mci.MedidaPredictiva.map((medidaP, index)=> {
                                    return (
                                        <TableroMP MedidaPredictiva={medidaP} key={index}/>
                                    )
                                })
                            }
                        </div>                        

                    </div>
            </div>
        </div>


        )
    }

}

export default TableroMCI