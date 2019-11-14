import React from 'react'

import TituloPrincipal from '../../common/TituloPrincipal'
import { axios, JwtPayload } from "../../../config/config";
import NoData from '../../common/NoData'
import Loading from '../../common/Loading'
import {connect} from 'react-redux';
import EsAdmin from '../../../Functions/EsAdmin';


class Colaboradores extends React.Component {

    constructor(props)
    {
        super(props)
        
        

        this.state  = {
            cargando : false,
            IdSubArea : this.props.areaSelected,
            subAreas : [],
            colaboradores : [],
            colaboradoresLoaded : [],
            txtBuscar: "",
            esAdmin : EsAdmin()
            }

        this.AreaChangedHandler = this.AreaChangedHandler.bind(this)
        this.ObtenerSubAreas = this.ObtenerSubAreas.bind(this)
        this.ObtenerColaboradores = this.ObtenerColaboradores.bind(this)
        this.BuscarChangedHandler = this.BuscarChangedHandler.bind(this)
        this.ActualizarTablero = this.ActualizarTablero.bind(this)
        this.VerResultados = this.VerResultados.bind(this)
    }

    componentDidMount()
    {
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


    ObtenerSubAreas()
    {
        this.setState(state => ({ cargando: true }));

        axios.get('/SubAreas' )
        .then(res => {
            this.setState({subAreas : res.data})
            this.setState(state => ({ cargando: false }));
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

    AreaChangedHandler(event)
    {

        var IdSubArea = event.target.value

        this.props.dispatch({type:'CAMBIAR_SUBAREA', data: IdSubArea}) 

        this.ObtenerColaboradores(IdSubArea)
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

    ActualizarTablero(colaboradorId, colaboradorNombre)
    {
        var colaborador = {
            nombreColaborador : colaboradorNombre,
            colaboradorId : colaboradorId
        }

        var nombreColaboradorB64 = btoa( colaboradorNombre)

        this.props.dispatch({type:'ACTUALIZAR_COLABORADOR', data: colaborador}) 
        this.props.history.push("/tablero/"+nombreColaboradorB64)
        
    }


    VerResultados(colaboradorId, colaboradorNombre)
    {
        var colaborador = {
            nombreColaborador : colaboradorNombre,
            colaboradorId : colaboradorId
        }

        var colaboradorString  = colaboradorId.toString()

        this.props.dispatch({type:'ACTUALIZAR_COLABORADOR', data: colaborador}) 
        this.props.history.push("/mciByColaborador/"+ btoa(colaboradorString))
    }


    render() {
        return (
            <div>
                <div className="container">

                    <div className="row">
                        <div className="col">
                            <TituloPrincipal Titulo="Colaboradores"/>
                        </div>
                    </div>

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

                    <div className="row">
                        <div className="col text-center">
                            <Loading Cargando={this.state.cargando}/>  
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
                                    onChange={this.BuscarChangedHandler}
                                    />

                            )}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col col-md-4 offset-md-4 text-center">
                            <NoData NoData={this.state.colaboradores.length === 0 && !this.state.cargando}/>    
                        </div>    
                    </div> 


                    <div className="row ">
                        <div className="col-12 col-md-10 offset-md-1 ">

                            {this.state.colaboradores.length === 0 ? null : (
                                <table className="table table-striped bg-white">
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
                                                        <button 
                                                            className="btn btn-outline-primary " 
                                                            data-toggle="tooltip" 
                                                            data-placement="top" 
                                                            title="Ver tablero" 
                                                            onClick={() => this.ActualizarTablero(colaborador.IdColaborador, colaborador.Nombre)}>
                                                            Tablero
                                                        </button>
                                                
                                                        {this.state.esAdmin ? (

                                                            <button 
                                                                    className="btn btn-outline-primary m-2" 
                                                                    data-toggle="tooltip" 
                                                                    data-placement="top" 
                                                                    title="Ver MCIs" 
                                                                    onClick={() => this.VerResultados(colaborador.IdColaborador, colaborador.Nombre)}>
                                                                    Resultados
                                                                </button>
                                                        ) : (
                                                            null
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
        )
    }


}



const mapStateToProps = (state) => {

    return {

        areaSelected : state.AreaSelectReducer
    }
  }
  

export default connect(mapStateToProps)( Colaboradores);