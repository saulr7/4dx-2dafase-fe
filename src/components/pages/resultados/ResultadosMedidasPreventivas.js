import React from 'react'

import TituloPrincipal from '../../common/TituloPrincipal'
import Resultado from './ResultadoMedidaPreventiva'
import Frecuencia from '../../../models/Frecuencia'
import MesSelect from '../../common/MesSelect'
import NoData from '../../common/NoData'
import './Resultados.css'

import UserSelected from '../../common/UserSelected'
import Loading from '../../common/Loading'

import {connect} from 'react-redux';

import { axios } from "../../../config/config";
import Swal from "sweetalert2";  
import Medicion from '../../../models/Medicion'

class IngresarResultadosMP extends React.Component {


    constructor(props)
    {
        super(props)

        const { match: { params } } = this.props;

        var medidaPredictivaBase64 = params.medidaPredictivaId

        var medidaPredictivaId  = ""

        if(medidaPredictivaBase64)
            medidaPredictivaId = atob(medidaPredictivaBase64)

        if(!medidaPredictivaId)
        {
            window.location.href = "/";
        }

        this.state  = {
            medidaPredictivaId : medidaPredictivaId,
            medidaPredictiva : '',
            resultados : [],
            idFrecuencia : 0
        }

        this.ObtenerResultados= this.ObtenerResultados.bind(this)

    }


    componentDidMount()
    {
        this.ObtenerResultados()
    }


    UNSAFE_componentWillReceiveProps(newProps) {
        var mes = newProps.mesSelected
        if(mes> 0)
            this.ObtenerResultados(mes)
    }

    ObtenerResultados(mes=0) {

        this.setState ({ Cargando: true });  

        var medidaId = this.state.medidaPredictivaId

        var mesSelect = 0
        if(mes===0)
            mesSelect = this.props.mesSelected
        else 
            mesSelect = mes


        axios.get('/GetResultados/'+medidaId+"/"+mesSelect )

        .then(res => {

            this.setState({resultados : res.data})

            if(res.data.length > 0)
            {
                this.setState(
                    {
                        medidaPredictiva : res.data[0].MedidaPredictiva, 
                        idFrecuencia : res.data[0].IdFrecuencia,
                        IdMedicion : res.data[0].IdMedicion
                    })
            }   
            
            this.setState ({ Cargando: false });            

        }).catch((error) => {
            console.log(error)
            this.setState ({ Cargando: false });
            Swal.fire({
                title: "Error",
                type: 'error',
                text: "Error",
            });

        })
    }
    


    render(){
        return (
            <div>
                <div className="container">

                    <div className="row">
                        <div className="col">
                            <TituloPrincipal Titulo="Resultados Medida Predictiva" BackButton={true} />
                        </div>
                    </div>

                    <div className="row ">
                        <div className="col text-center">
                            <Loading Cargando={this.state.cargando}/>
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
                                <h4 className="card-header">Medida Predictiva:</h4>
                                <div className="card-body">
                                    <p className="card-text">
                                        {this.state.medidaPredictiva}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row m-1">
                        <div className="col-12 col-md-6 offset-md-3 text-center">
                            <div className="">
                                <MesSelect Leyenda="Mes Medida Predictiva:" />
                            </div>
                        </div>
                    </div> 

                    <div className="row mt-4">
                        <div className="col text-center">
                            <NoData NoData={this.state.resultados.length === 0 && !this.state.cargando}/>
                        </div>
                    </div>

                    <div className="row mt-3 div-table-medidasp ">
                        <div className="col">
                            {this.state.resultados.length === 0 ? null : (

                                <table className="table table-striped bg-white ">
                                    <thead className="">
                                        <tr>
                                            <th>Año</th>
                                            <th>Mes</th>                                            
                                            {this.state.idFrecuencia === Frecuencia.Semanal ?
                                            (
                                                <th>Semana</th>

                                            ):
                                            (
                                                <th>Día</th>
                                            )}   
                                             <th>Periodo</th>                                         
                                            {this.state.IdMedicion === Medicion.Resultado ?
                                            (
                                                <th>Meta</th>

                                            ):null}
                                            <th>Resultado</th>
                                            <th>Acciones</th>
                                           
                                        </tr>
                                    </thead>
                                    
                                        {this.state.resultados.map((resultado, index) => {
                                            return (<Resultado DataKey={index} key={index} Resultado={resultado} />)
                                        })}
                                        
                                </table>
                            )}


                        </div>
                    </div>

                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => {

    return {

        mesSelected : state.MesSelectReducer
    }
  }
  

export default connect(mapStateToProps)( IngresarResultadosMP);
