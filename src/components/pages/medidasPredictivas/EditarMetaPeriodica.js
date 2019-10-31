import React from 'react'

import MetaPeriodica from './MetaPeriodica'
import Loading from '../../common/Loading'
import NoData from '../../common/NoData'
import {connect} from 'react-redux';

import { axios } from "../../../config/config";
import Swal from 'sweetalert2'

class EditarMetaPeriodica extends React.Component {

    constructor(props)
    {
        super(props)

        this.state = {
            meta : this.props.Meta,
            editar : false,
            periodos : []
        }

        

        this.ObtenerPeriodosPorMeta = this.ObtenerPeriodosPorMeta.bind(this)    
        this.RefreshHandler = this.RefreshHandler.bind(this)    
        
    }


    componentDidMount(){
        this.props.dispatch({type:'RECARGAR', data: []}) 
        this.ObtenerPeriodosPorMeta();
    }
 

    ObtenerPeriodosPorMeta()
    {
        this.setState({cargando : true})
        axios.get('/ResultadosMCICreate/'+this.state.meta.IdMCI)

        .then(res => {
            this.props.dispatch({type:'RECARGAR', data: res.data}) 
            this.setState({cargando : false})
        }).catch((error) => {
            console.log(error)
            this.setState(state => ({ cargando: false }));
            Swal.fire({
                title: "Error",
                type: 'error',
                text: "Error",
            });

        })
    }


    RefreshHandler()
    {
        this.ObtenerPeriodosPorMeta()
    }


    render() {
        return (
            <div>

                <div className="card">
                    <h3 className="card-header">Establecer línea de meta</h3>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12 col-md-6 offset-md-3 text-center">
                                <h4 className="card-title">Metas por MCI</h4>
                                <p className="card-text">
                                    Las metas que irás midiendo a través de la periocidad que configuraste.
                                </p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col text-center">
                                <Loading Cargando={this.state.cargando}/>
                            </div>
                        </div>
   
                        
                        <div className="row">
                            <div className="col text-center">
                                <NoData NoData={this.props.periodos.length === 0 && !this.state.cargando} Mensaje="Debes configurar la periodicidad"/>
                            </div>
                        </div>


                        {this.props.periodos.length > 0 ?
                        (
                            <div className="row p-2">
                            <div className="col-12 col-md-8 offset-md-2 text-center div-table-medidasp">

                                <table className="table ">
                                    <thead className="thead-light">
                                        <tr>
                                            <th>Período</th>
                                            <th>Meta</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.props.periodos.map((periodo, index) => {
                                                return (
                                                    <MetaPeriodica key={index} Periodo={periodo} Meta={this.state.meta}/>
                                                )
                                            })
                                        }
                                    </tbody>
                            </table>

                            </div>
                        </div>

                        ) : 
                        (
                            null
                        )}

                       
                       
                    </div>
                </div>


            </div>
        )
    }


}

const mapStateToProps = (state) => {

    return {
        periodos : state.PeriodicidadReducer
    }
  }
  

export default connect(mapStateToProps)( EditarMetaPeriodica);