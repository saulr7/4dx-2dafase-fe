import React from 'react'

import TituloPrincipal from '../../common/TituloPrincipal'
import ResultadoMci from './ResultadoMci'
import UserSelected from '../../common/UserSelected'
import Loading from '../../common/Loading'
import NoData from '../../common/NoData'
// import './Resultados.css'

import { axios } from "../../../config/config";
import Swal from "sweetalert2";  

class IngresarResultadosMP extends React.Component {


    constructor(props)
    {
        super(props)

        const { match: { params } } = this.props;

        var IdMCI = params.idMCI

        if(!IdMCI)
        {
            window.location.href = "/";
        }
        IdMCI = atob(IdMCI)
        
        this.state  = {
            medidaPredictiva : {},
            resultados : [],
            MCI : '',
            idMCI : IdMCI,
            cargando : false
        }

        this.ObtenerResultados= this.ObtenerResultados.bind(this)
        this.ShowHelp= this.ShowHelp.bind(this)
    }


    componentDidMount()
    {
        this.ObtenerResultados()
    }

    ObtenerResultados() {

        var IdMCI = this.state.idMCI
        this.setState({cargando : true})
        axios.get('/GetResultadosMCI/'+IdMCI )

        .then(res => {
            this.setState({cargando : false})
            this.setState({resultados : res.data})
            
            if(res.data && res.data.length >0)
            {
                this.setState({MCI : res.data[0].MCI})
            }

        }).catch((error) => {
            console.log(error)
            this.setState(state => ({ Cargando: false }));
            Swal.fire({
                title: "Error",
                type: 'error',
                text: "Error",
            });

        })
    }

    ShowHelp(event)
    {
        Swal.fire({
            title: "Para ingresar la meta debes ir a la pantalla de configuración",
            text: "Ayuda",
        });
    }
    


    render(){
        return (
            <div>
                <div className="container">

                    <div className="row">
                        <div className="col">
                            <TituloPrincipal Titulo="Resultados MCI" BackButton={true} />
                        </div>
                    </div>

                    <div className="row ">
                        <div className="col text-center">
                            <Loading Cargando={this.state.cargando}/>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col col-md-4 offset-md-4 text-center">
                            <NoData NoData={this.state.resultados.length === 0 && !this.state.cargando}/>    
                        </div>    
                    </div> 

                    <div className="row">
                        <div className="col-12 text-center">
                            <UserSelected/>
                        </div>    
                    </div> 

                    <div className="row">
                        <div className="col-12 col-md-8 offset-md-2">
                            <div className="card">
                                <h4 className="card-header">MCI:</h4>
                                <div className="card-body">
                                    <p className="card-text">
                                        {this.state.MCI}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-3 div-table-medidasp">
                        <div className="col">
                            <table className="table table-striped bg-white">
                                <thead>
                                    <tr>
                                        <th>Año</th>
                                        <th>Mes</th>
                                        {/* <th>Periodo</th> */}
                                        <th>
                                            <span className="m-1">
                                                Meta 
                                            </span>
                                            <i className="fa fa-info-circle text-primary" aria-hidden="true" onClick={this.ShowHelp}></i>
                                        </th>
                                        <th>Resultado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.resultados.map((resultado, index) => {
                                        return (<ResultadoMci DataKey={index} key={index} Resultado={resultado} />)
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

export default IngresarResultadosMP