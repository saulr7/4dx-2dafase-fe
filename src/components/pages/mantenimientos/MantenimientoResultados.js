import React, { Component } from 'react';
import { connect } from 'react-redux';

import {Link} from 'react-router-dom'
import Loading from '../../common/Loading';

import { axios, JwtPayload } from "../../../config/config";
import Stepper from 'bs-stepper'
import NoData from '../../common/NoData';
import UserSelected from '../../common/UserSelected'
import Swal from "sweetalert2";
import EsElUsuarioLogueado from '../../../services/EsElUsuarioLogueado';



class MantenimientoResultados extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cargando : false,
            colaboradores : [],
            colaboradoresLoaded : [],
            evaluaciones : [],
            evaluacionId: 0,
            IdSubArea : 0,
            subAreas : [],
            areas : [],
            IdArea : 0,
            metricas : [],
            txtBuscar : "",
            IdColaborador : 0
        }  
        this.ObtenerSubAreas        = this.ObtenerSubAreas.bind(this)
        this.ObtenerColaboradores   = this.ObtenerColaboradores.bind(this)
        this.AreaChangedHandler     = this.AreaChangedHandler.bind(this)
        this.BuscarChangedHandler   = this.BuscarChangedHandler.bind(this)
        this.SeleccionarColaborador = this.SeleccionarColaborador.bind(this)
        this.getMedidasPredictivas  = this.getMedidasPredictivas.bind(this)
        this.EliminarPeriodicidad   = this.EliminarPeriodicidad.bind(this)
    }

    componentDidMount()
    {
        this.stepper = new Stepper(document.querySelector('#stepper1'), {
            linear: false,
            animation: true,
          })

        var subAreaId = JwtPayload().usuario.SubAreaId

        this.ObtenerSubAreas()

        if(this.props.areaSelected)
        {
            this.setState(state => ({ IdSubArea: this.props.areaSelected }));
            this.ObtenerColaboradores()

        }
        else 
        {
            this.setState(state => ({ IdSubArea: subAreaId }));
            this.ObtenerColaboradores(subAreaId)

        }
        
        
    }

    AreaChangedHandler(event)
    {

        var IdSubArea = event.target.value

        this.props.dispatch({type:'CAMBIAR_SUBAREA', data: IdSubArea}) 

        this.ObtenerColaboradores(IdSubArea)
    }


    ObtenerSubAreas()
    {
        this.setState(state => ({ cargando: true }));

        axios.get('/SubAreas' )
        .then(res => {
            this.setState(state => ({ cargando: false, subAreas : res.data }));
        }).catch((error) => {
            console.log(error)
            this.setState(state => ({ cargando: false }));
        })
    }


    ObtenerColaboradores(idSubArea = 0)
    {
        var IdSubArea = 0

        if(idSubArea ===0 )
            IdSubArea = this.state.IdSubArea
        else 
            IdSubArea = idSubArea

        this.setState(state => ({  IdSubArea : IdSubArea, cargando: true }));

        axios.get('/GetColaboradoresSubArea/'+IdSubArea )
        .then(res => {
            this.setState(
                {
                    colaboradores : res.data,
                    colaboradoresLoaded : res.data,
                    cargando: false ,
                })
        }).catch((error) => {
            console.log(error)
            this.setState(state => ({ cargando: false }));
        })
    }

    BuscarChangedHandler(event)
    {
        var txtBuscar = event.target.value
        this.setState( { txtBuscar : txtBuscar })

        if(txtBuscar)
            txtBuscar = txtBuscar.toLowerCase()

        var result = this.state.colaboradoresLoaded.filter((colaborador) =>{
            if (colaborador.Nombre.toString().toLowerCase().indexOf(txtBuscar) > -1)
                return true
            else
                return ""
        })

        this.setState({colaboradores : result})

    }

    SeleccionarColaborador(colaboradorId, colaboradorNombre)
    {
        var colaborador = {
            nombreColaborador : colaboradorNombre,
            colaboradorId : colaboradorId
        }

        this.setState({IdColaborador: colaboradorId},()=> {
            this.getMedidasPredictivas()
            }
            )
        this.props.dispatch({type:'ACTUALIZAR_COLABORADOR', data: colaborador}) 
        this.stepper.next()
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

            this.setState({metricas : data,cargando : false})
        }).catch((error) => {
            this.setState(state => ({ cargando: false }));
            Swal.fire({
                title: "Error",
                type: 'error',
                text: "Error",
            });

        })
    }


    EliminarPeriodicidad()
    {
        this.setState({cargando: true})

        Swal.fire({
            title: 'Eliminar periodicidad, al eliminarla se borraran todos los datos ingresados de esta MCI',
            text: "¿Eliminar periodicidad?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '##3085d6',
            confirmButtonText: 'Eliminar'
          }).then((result) => {
            if (result.value) {
                console.log("object")
            }
            else {
                this.setState({cargando: false})
            }
          })
    }

    render() {
        return (
            <div>

                <nav aria-label="breadcrumb bg-white d-print-none">
                    <ol className="breadcrumb bg-white">
                        <li className="breadcrumb-item">
                            <Link to={{ pathname: '/settings', }}>
                                Mantenimientos
                            </Link>
                        
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">Mantenimiento Resultados</li>
                    </ol>
                </nav>


                <h2 className="font-weight-bold">
                    Mantenimiento Resultados
                </h2>

                <div className="row">
                    <div className="col text-center">
                    {/* <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw text-warning"></i>
                    <i className="fa fa-spinner fa-pulse fa-3x fa-fw text-warning"></i>
                        <Loading Cargando={true}/>   */}
                        <Loading Cargando={this.state.cargando}/>  
                    </div>    
                </div> 


                    <div className="row">
                        <div className="col">

                            <div>
                                <div id="stepper1" className="bs-stepper">
                                    <div className="bs-stepper-header">
                                        <div className="step" data-target="#test-l-1">
                                            <button className="step-trigger">
                                                <span className="bs-stepper-circle">1</span>
                                                <span className="bs-stepper-label">Seleccionar colaborador</span>
                                            </button>
                                        </div>
                                        <div className="line"></div>
                                        <div className="step"  data-target="#test-l-2">
                                            <button 
                                                disabled
                                                className={"step-trigger" }>
                                                <span className="bs-stepper-circle">2</span>
                                                <span className="bs-stepper-label">MCI's</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="bs-stepper-content">
                                            <div id="test-l-1" className="content">
                                                <div className="row">
                                                    <div className="col">

                                                        <div className="row">
                                                                <div className="col-12 text-center">

                                                                        <div className="form-group">
                                                                            <h4 className="card-title">Area:</h4>
                                                                            <select value={this.state.IdSubArea} className="custom-select col-12 col-md-4 form-control" id="cmbSubAreas" onChange={ this.AreaChangedHandler }>
                                                                                <option value="0" >Seleccionar Area</option>
                                                                                { this.state.subAreas.map((subArea, index) => <option key={index} value={subArea.IdSubArea}>{subArea.SubArea}</option>) }
                                                                            </select>
                                                                        </div>
                                                                </div>
                                                            </div>      
                                                        
                                                            <div className="row my-2">
                                                                <div className="col-12 col-md-4 offset-md-4 text-center">
                                                                    
                                                                    {(this.state.colaboradores.length === 0 && this.state.colaboradoresLoaded.length === 0) ? null : (
                                                                        <input 
                                                                            className="form-control form-control-md" 
                                                                            type="text" 
                                                                            placeholder="Nombre..."
                                                                            value={ this.state.txtBuscar }
                                                                            onChange={this.BuscarChangedHandler}/>
                                                                    )}
                                                                </div>
                                                            </div>

                                                        <div style={{overflowX: 'auto'}}>
                                                            
                                                            <h3 className="font-weight-bold">Colaboradores:</h3>

                                                            {this.state.colaboradores.length === 0 ? null : (
                                                                <table className="table table-striped table-hover  bg-white">
                                                                    <thead className="">
                                                                        <tr>
                                                                        <th>Código</th>
                                                                        <th>Nombre</th>
                                                                        <th>Acciones</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>

                                                                    {this.state.colaboradores.map((colaborador, index) => {
                                                                            return (
                                                                                <tr key={index}>
                                                                                    <th >{colaborador.IdColaborador}</th>
                                                                                    <td>{colaborador.Nombre}</td>
                                                                                    <td>
                                                                                        {EsElUsuarioLogueado(colaborador.IdColaborador) ? null : 
                                                                                        (
                                                                                            <button 
                                                                                                className="btn btn-outline-primary " 
                                                                                                data-toggle="tooltip" 
                                                                                                data-placement="top" 
                                                                                                title="Ver tablero" 
                                                                                                    onClick={() => this.SeleccionarColaborador(colaborador.IdColaborador, colaborador.Nombre)}>
                                                                                                Seleccionar
                                                                                            </button>

                                                                                        )}
                                                                                    </td>
                                                                                </tr>)
                                                                        })}
                                                                    </tbody>
                                                                </table>
                                                            )}

                                                        </div>
                                                    </div>
                                                </div>
                                            
                                                
                                            </div>
                                            <div id="test-l-2" className="content">
                                            
                                                <div className="row">
                                                    <div className="col-12 col-md-10 offset-md-1">
                                                        
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
                                                                                         {/* pathname: '/configuracion/'+btoa(JSON.stringify(metrica[0])), */}
                                                                                            <Link to={{
                                                                                                pathname: '/settings/lineaDeMeta/'+btoa(JSON.stringify(metrica[0])),
                                                                                                }}>
                                                                                                <button 
                                                                                                    className="btn btn-outline-primary m-2" 
                                                                                                    data-toggle="tooltip" 
                                                                                                    data-placement="top" 
                                                                                                    title="Ver resultados" >
                                                                                                    Línea de meta
                                                                                                </button>
                                                                                            </Link>
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
                                                                                            <button 
                                                                                                type="button" 
                                                                                                className="btn btn-danger"
                                                                                                onClick={()=> this.EliminarPeriodicidad()}>
                                                                                                    Eliminar Periodicidad
                                                                                                </button>
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

                                                <div className="row">
                                                    <div className="col text-center">
                                                        <NoData NoData={this.state.colaboradores.length === 0 && !this.state.cargando}/>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                    </div>
                                </div>
                        </div> 

                    </div>
                </div>
                
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {

    };
}


export default connect(
    mapStateToProps,
)(MantenimientoResultados);