import React from 'react'
import TituloPrincipal from '../../common/TituloPrincipal'
import Loading from '../../common/Loading'
import { Link } from "react-router-dom";
import NoData from '../../common/NoData'
import { axios } from "../../../config/config";

import Swal from "sweetalert2";

class MCIByColaborador extends React.Component {

    constructor(props)
    {
        super(props)

        const { match: { params } } = this.props;
        var IdColaboradorBase64 = params.IdColaborador
        
        var IdColaborador  = ""

        if(IdColaboradorBase64)
            IdColaborador = atob(IdColaboradorBase64)

        this.state = {
            IdColaborador : IdColaborador,
            metricas : []
        }
        this.getMedidasPredictivas = this.getMedidasPredictivas.bind(this)
    }

    componentDidMount() {
        this.getMedidasPredictivas()
    }


    getMedidasPredictivas() {


        this.setState({cargando : true})

        axios.get('/GetMedidasPredictivas/'+this.state.IdColaborador)

        .then(res => {
            this.setState({metricas : res.data})
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
    render()
    {
        return (
            <div>
                <div className="container">

                    <div className="row">
                        <div className="col">
                            <TituloPrincipal Titulo="MCIs" BackButton={true}/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col text-center">
                            <Loading Cargando={this.state.cargando}/>  
                        </div>    
                    </div> 

                    <div className="row">
                        <div className="col col-md-4 offset-md-4 text-center">
                            <NoData NoData={this.state.metricas.length === 0 && !this.state.cargando}/>    
                        </div>    
                    </div> 
                    
                    <div className="row ">
                        <div className="col-12 col-lg-10 offset-lg-1">
                            <table className="table table-striped bg-white">
                                <thead >
                                    <tr>
                                        <th>MCI</th>
                                        <th>Medida Predictiva</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.metricas.map((metrica, index)=>
                                        {
                                            return (
                                            <tr key={index}>
                                                <td>{metrica.MCI}</td>
                                                <td>{metrica.MedidaPredictiva}</td>
                                                <td>
                                                    <Link to={{
                                                        pathname: '/resultadosMedidasPredictiva/'+ btoa(metrica.IdMP),
                                                        }}>
                                                        <button 
                                                            className="btn btn-outline-primary m-2" 
                                                            data-toggle="tooltip" 
                                                            data-placement="top" 
                                                            title="Ver resultados" >
                                                            Resultados
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


export default MCIByColaborador