import React from 'react'

import TituloPrincipal from '../../common/TituloPrincipal'
import Loading from '../../common/Loading'
import NoData from '../../common/NoData'
import TableroMCI from './TableroMCI'
import MesSelect from '../../common/MesSelect'

import SideBarColaboradores from '../colaboradores/SideBarColaboradores'

import './Tablero.css'

import {connect} from 'react-redux';
import { axios, JwtPayload } from "../../../config/config";
import Swal from "sweetalert2";
import CustomizeTablero from './CustomizeTablero'
import EsElUsuarioLogueado from '../../../services/EsElUsuarioLogueado'

class Tablero extends React.Component {

    constructor(props)
    {
        super(props)

        try {
        const { match: { params } } = this.props;
        var dataBase64 = params.data      
        } catch (error) {
            
        }      
        this.state = {
            cargando : false,
            data : [],
            mci : this.props.mci,
            idTipoGrafico : 2,
            dataLineal2 : {},
            btnRegresar : (dataBase64 ? true : false),
            IdColaborador : "",//(IdColaborador ? IdColaborador : ""),
            mesActual : this.props.mesSelected,
            mostrarCompaneros : false,
            OcultarHeader : (this.props.OcultarHeader ? this.props.OcultarHeader : false ),
            OcultarSideBar : (this.props.OcultarSideBar ? this.props.OcultarSideBar : false )

        }

        this.ObtenerResultadosMCI = this.ObtenerResultadosMCI.bind(this)
        this.toggleCompanerosPanel = this.toggleCompanerosPanel.bind(this)
    }
    

    componentDidMount()
    {     
        this.props.dispatch({type:'LOAD_BRUJULAS', data: []}) 
        this.ObtenerResultadosMCI()
    }

    componentWillUnmount()
    {
        var colaborador = {
            nombreColaborador : "",
            colaboradorId : 0
        }

        this.props.dispatch({type:'ACTUALIZAR_COLABORADOR', data: colaborador}) 
    }

    ObtenerResultadosMCI(mesId = 0) {
        
        this.setState({cargando : true})

        var usuario =""
        var mes = 0

        if(mesId === 0)
            mes = this.state.mesActual
        else
            mes = mesId

        if(this.props.colaboradorSelected.colaboradorId)
            usuario = this.props.colaboradorSelected.colaboradorId
        else 
        {
            var user = JwtPayload().usuario      
            usuario = user.Empleado

            var colaborador = {
                nombreColaborador : user.EmpleadoNombre,
                colaboradorId : user.Empleado
            }
    
            this.props.dispatch({type:'ACTUALIZAR_COLABORADOR', data: colaborador}) 

        }

        this.props.dispatch({type:'LOAD_TABLERO', data: []})

        axios.get('/TableroColaborador/'+usuario+"/"+mes)

        .then(res => {
            // console.log(res.data)
            if(res.data)
            {
                this.props.dispatch({type:'LOAD_TABLERO', data: res.data}) 
            }

            axios.get('/GetEstiloTablero/'+usuario)
            .then(res => {
                if(res.data)
                {
                    this.props.dispatch({type:'SET_STYLES', data: JSON.parse(res.data)})
                }
            })

            

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



    ObtenerColaboradores(idSubArea = 0)
    {
        var IdSubArea = 0

        if(idSubArea ===0 )
            IdSubArea = this.state.IdSubArea
        else 
            IdSubArea = idSubArea

        this.setState(state => ({ cargando: true }));
        this.setState(state => ({  IdSubArea : IdSubArea }));

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



    toggleCompanerosPanel(event)
    {
        this.setState({mostrarCompaneros:!this.state.mostrarCompaneros})
    }

     
    render() {
        return (
            <div>
                <div className="container">
                    
                    <div className={this.state.OcultarHeader ? "d-none" : ""}>

                        <div className="row">
                            <div className="col">
                                <TituloPrincipal Titulo="Tablero" BackButton={this.state.btnRegresar}/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-2">
                                
                                <button className="btn btn-link" onClick={(e) => this.props.dispatch({type:'MOSTRAR_PANEL_COMPANEROS', data: true}) }>
                                    <i className="fa fa-users" aria-hidden="true"></i>
                                    Equipo
                                </button>
                                
                            </div>
                            <div className="col-10">
                                <span>
                                    <h5 className="font-weight-bold text-right">
                                        {this.props.colaboradorSelected.nombreColaborador}
                                    </h5>
                                </span>
                            </div>
                        </div>

                    </div>

                    {this.state.OcultarSideBar ? null : (

                        <div className="row">
                            <div className="col">
                                <SideBarColaboradores/>
                            </div>
                        </div>

                    )}
                    
                    <div className="row m-1">
                        <div className="col-12 col-md-6 offset-md-3 text-center">
                            <div >
                                <MesSelect Leyenda="Mes Medida Predictiva:"/>
                            </div>
                        </div>
                    </div>   


                    <div className="row ">
                        <div className="col text-center">
                            <Loading Cargando={this.state.cargando}/>
                        </div>
                
                    </div>
                
                    <div className="row">
                        <div className="col col-md-4 offset-md-4 text-center">
                            <NoData NoData={this.props.mci.length === 0 && !this.state.cargando}/>    
                        </div>    
                    </div> 

                    <div className={"row "+ (EsElUsuarioLogueado(this.props.colaboradorSelected.colaboradorId) ? "" : "d-none") }>
                        <div className="col text-left">
                            <CustomizeTablero></CustomizeTablero>
                        </div>
                    </div>

                  
                    <div>
                        {this.props.mci.map((mci, index) =>{
                            return ( <TableroMCI MCI={mci} key={index}/>  )
                        })}
                       
                    </div>

                </div>

            </div>
        )
    }
}




const mapStateToProps = (state) => {

    return {
        mci : state.TableroReducer,
        mesSelected : state.MesSelectReducer,
        colaboradorSelected : state.ColaboradorSelectedReducer,
        mostrarPanelCompaneros : state.MostrarPanelCompaneros
        
    }
  }
  

export default connect(mapStateToProps)( Tablero);
