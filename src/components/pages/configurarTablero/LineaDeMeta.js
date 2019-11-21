import React, { Component } from 'react';
import { connect } from 'react-redux';

import TituloPrincipal from '../../common/TituloPrincipal'
import Loading from '../../common/Loading'
import NoData from '../../common/NoData'
import { Link } from "react-router-dom";

import { axios, JwtPayload } from "../../../config/config";

import Swal from "sweetalert2";

class LineaDeMeta extends Component {


    

    constructor(props) {
        super(props)
        
        this.state = {
            metricas : [],
            metas : [],
            periodos : [],
            cargando : false
        }
        
        this.getMedidasPredictivas = this.getMedidasPredictivas.bind(this)
    }

    componentDidMount() {
        this.getMedidasPredictivas()
    }


    getMedidasPredictivas() {

        var usuario = JwtPayload().usuario      

        this.setState({cargando : true})

        // axios.get('/GetMedidasPredictivas/'+usuario.Empleado)
        axios.get('/GetMetasColaborador/'+usuario.Empleado)

        .then(res => {
            console.log(res.data)
            this.setState({metas : res.data})
            this.setState({cargando : false})
 
        }).catch((error) => {
            this.setState(state => ({ cargando: false }));
            Swal.fire({
                title: "Error",
                type: 'error',
                text: "Error",
            });

        })
    }



    render() {
        
        return (
            <div>
                <div className="container mb-4">
                
                    <div className="row">
                        <div className="col">
                            <TituloPrincipal Titulo="Línea de meta" />
                        </div>
                    </div>
                
                    <div className="row">
                        <div className="col text-center">
                            <Loading Cargando={this.state.cargando}/>
                        </div>
                    </div>

                    
                    {/* <div className="row">
                        <div className="col-12 col-md-10 offset-md-1 text-center">
                            <AlertaEditarMedida />
                        </div>
                    </div> */}
                    
                    
                    <div className="row">
                        <div className="col text-center">
                            <NoData NoData={this.state.metas.length === 0 && !this.state.cargando}/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <table className="table table-striped table-hover table-bordered bg-white">
                                <thead className=" ">
                                    <tr>
                                    <th>#</th>
                                    <th>MCI</th>
                                    <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.metas.map((meta, index)=> {
                                        return (
                                            <tr key={index}>
                                                <th>
                                                    {meta.Orden}
                                                </th>
                                                <td>
                                                    {meta.MCI}
                                                </td>
                                                <td>
                                                <Link to={{
                                                    pathname: '/configuracion/'+btoa(JSON.stringify(meta))
                                                    }}>
                                                    <button className=" btn btn-info m-1 " data-toggle="tooltip" data-placement="top" title="Configurar medida" >
                                                        <i className="fa fa-wrench m-1 d-inline" aria-hidden="true"></i>
                                                        <span className="d-inline">
                                                            Configurarión
                                                        </span>
                                                    </button>
                                                </Link>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>

                        </div>
                    </div>

                </div>
            </div>
        )
        
    }


}

function mapStateToProps(state) {
    return {

    };
}


export default connect(
    mapStateToProps,
)(LineaDeMeta);