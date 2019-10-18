import React, { Component } from 'react';
import { connect } from 'react-redux';
import { axios, JwtPayload } from "../../../config/config";

class TablaColaboradores extends Component {

    constructor(props)
    {
        super(props)

        this.state = {
            cargando : false,
            IdSubArea : this.props.areaSelected,
            colaboradorSelected : this.props.colaboradorSelected,
            mesActual : this.props.mesSelected,
        }

        this.ObtenerColaboradores = this.ObtenerColaboradores.bind(this)
        this.ActualizarTablero = this.ActualizarTablero.bind(this)
    }


    componentDidMount()
    {
        var subAreaId = JwtPayload().usuario.SubAreaId
        this.setState(state => ({ IdSubArea: subAreaId }));
        this.props.dispatch({type:'CAMBIAR_SUBAREA', data: subAreaId}) 
        this.ObtenerColaboradores(subAreaId)
    }
    
    ObtenerColaboradores(idSubArea = 0)
    {
        var IdSubArea = 0

        if(idSubArea ===0 )
            IdSubArea = this.props.areaSelected
        else 
            IdSubArea = idSubArea

        this.setState(state => ({ cargando: true }));
        this.setState(state => ({  IdSubArea : IdSubArea }));

        axios.get('/ColaboradoresPorArea/'+IdSubArea )
        .then(res => {
            
            this.props.dispatch({type:'LOAD', data: res.data}) 
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

    ActualizarTablero(colaboradorId, colaboradorNombre)
    {
        var colaborador = {
            nombreColaborador : colaboradorNombre,
            colaboradorId : colaboradorId
        }

        this.props.dispatch({type:'ACTUALIZAR_COLABORADOR', data: colaborador}) 
        this.ObtenerResultadosMCI( colaboradorId);
        this.props.dispatch({type:'MOSTRAR_PANEL_COMPANEROS', data: false})
    }

    
    ObtenerResultadosMCI( usuario) {
        
        this.setState({cargando : true})
      
        this.props.dispatch({type:'LOAD_TABLERO', data: []}) 
        axios.get('/TableroColaborador/'+usuario+"/"+this.props.mesSelected)
        .then(res => {

            if(res.data)
            {
                this.props.dispatch({type:'LOAD_TABLERO', data: res.data}) 
            }
            this.setState({cargando : false})
        }).catch((error) => {
            console.log(error)
            this.setState(state => ({ cargando: false }));
           
        })
    }

    render() {
       
        return (
            <div>
                <table className="table bg-white table-sm">
                    <thead className="thead-dark">
                        <tr>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>

                    {this.props.colaboradores.map((colaborador, index) => {
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
         
                                </td>
                            </tr>)
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

function mapStateToProps(state) {
    
    return {
        colaboradorSelected : state.ColaboradorSelectedReducer,
        colaboradores : state.ColaboradoresReducer,
        areaSelected : state.AreaSelectReducer,
        mesSelected : state.MesSelectReducer
    };
}

export default connect(
    mapStateToProps,
)(TablaColaboradores);