import React from 'react'
import TituloPrincipal from '../../common/TituloPrincipal'
import UserSelected from '../../common/UserSelected'
import Loading from '../../common/Loading'
import { Link } from "react-router-dom";
import NoData from '../../common/NoData'
import { axios, JwtPayload } from "../../../config/config";

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
            usuarioPerfilId : (JwtPayload().usuario.PerfilId ),
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

            var distinct = [...new Set(res.data.map(x => x.IdMCI))]

            var data = []

            distinct.map((valor, indice) => {
                data.push( res.data.filter((meta)=> {
                    return meta.IdMCI === valor
                }))
                return "";
            })

            this.setState({metricas : data})
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
                   
                    <div className="row">
                        <div className="col-12 text-center">
                            <UserSelected/>
                        </div>    
                    </div> 
                    
                    <div className="row ">
                        <div className="col-12 col-lg-10 offset-lg-1">


                            <div className="list-group">
                            {this.state.metricas.map((metrica, index)=> {

                                return (
                                    <div key={index}>
                                        <div className="list-group-item list-group-item-action flex-column align-items-start">
                                            <div className="d-flex w-100 justify-content-between">
                                                <h5 className="mb-1"> {" #"+metrica[0].Orden} - {metrica[0].MCI}</h5>
                                            </div>
                                            <div className="text-center">
                                                {this.state.usuarioPerfilId === 2 ? (

                                                    <Link to={{
                                                            pathname: '/configuracion/'+btoa(JSON.stringify(metrica[0])),
                                                            }}>
                                                            <button 
                                                                className="btn btn-outline-primary m-2" 
                                                                data-toggle="tooltip" 
                                                                data-placement="top" 
                                                                title="Ver resultados" >
                                                                Metas MCI
                                                            </button>
                                                        </Link>
                                                ) : (
                                                    null
                                                )}
                                                <Link to={{
                                                    pathname: '/resultadosMCI/'+ btoa(metrica[0].IdMCI),
                                                    }}>
                                                    <button 
                                                        className="btn btn-outline-primary m-2" 
                                                        data-toggle="tooltip" 
                                                        data-placement="top" 
                                                        title="Ver resultados" >
                                                        Resultados MCI
                                                    </button>
                                                </Link>
                                            </div>
                                            {metrica.map((valor, index)=> {
                                                    return (
                                                        <div  key={index} className="text-center">
                                                            <p className="mb-1">{valor.MedidaPredictiva}</p>
                                                            <Link to={{
                                                                pathname: '/resultadosMedidasPredictiva/'+ btoa(metrica[0].IdMP),
                                                                }}>
                                                                <button 
                                                                    className="btn btn-outline-primary m-2 text-center" 
                                                                    data-toggle="tooltip" 
                                                                    data-placement="top" 
                                                                    title="Ver resultados" >
                                                                    Resultados MP
                                                                </button>
                                                            </Link>
                                                        </div>

                                                    )

                                                })}
                                        </div>
                                    </div>
                                )

                            })}
                                
                            </div>


                        </div>
                    </div>
                
                
                </div>
            </div>
        )
    }

}


export default MCIByColaborador