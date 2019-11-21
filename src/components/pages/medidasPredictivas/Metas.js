import React from 'react'

import MedidaPredictiva from './MedidaPredictiva'
import TituloPrincipal from '../../common/TituloPrincipal'
import Loading from '../../common/Loading'
import NoData from '../../common/NoData'
import AlertaEditarMedida from '../../common/AlertaEditarMedida'


import './MedidasPredictivas.css'

import { axios, JwtPayload } from "../../../config/config";

import Swal from "sweetalert2";

class ListadoMedidasPredictivas extends React.Component {



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
                            <TituloPrincipal Titulo="Metas" />
                        </div>
                    </div>
                
                    <div className="row">
                        <div className="col text-center">
                            <Loading Cargando={this.state.cargando}/>
                        </div>
                    </div>

                    
                    <div className="row">
                        <div className="col-12 col-md-10 offset-md-1 text-center">
                            <AlertaEditarMedida />
                        </div>
                    </div>
                    
                    
                    <div className="row">
                        <div className="col text-center">
                            <NoData NoData={this.state.metas.length === 0 && !this.state.cargando}/>
                        </div>
                    </div>



                    {this.state.metas.map((meta, index) => {
                        return (<MedidaPredictiva DataKey={index} key={index} Metrica={meta} />)
                    })}

                    {/* {this.state.metricas.map((metrica, index) => {
                        return (<MedidaPredictiva DataKey={index} key={index} Metrica={metrica} />)
                    })} */}
                    
                </div>
            </div>
        )
        
    }


}

export default ListadoMedidasPredictivas