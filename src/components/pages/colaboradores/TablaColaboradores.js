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
            sesionMCI : this.props.SesionMCI,
        }

        this.ObtenerColaboradores = this.ObtenerColaboradores.bind(this)
        this.ActualizarTablero = this.ActualizarTablero.bind(this)
        this.ObtenerActividades = this.ObtenerActividades.bind(this)
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

        // axios.get('/ColaboradoresPorArea/'+IdSubArea )
        axios.get('/GetColaboradoresSubArea/'+IdSubArea )
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

        this.props.dispatch({type:'LOAD_BRUJULAS', data: []}) 
        this.props.dispatch({type:'ACTUALIZAR_COLABORADOR', data: colaborador}) 
        this.ObtenerResultadosMCI( colaboradorId);
        this.ObtenerActividades( colaboradorId);
        this.props.dispatch({type:'MOSTRAR_PANEL_COMPANEROS', data: false})

        if(this.state.sesionMCI)
        {
            var counterControls ={
                start : true,
                startTimer : true,
                reset : true,
                startMeeting : true
            }
    
            this.props.dispatch({type:'STOP_SESION', data: counterControls}) 
            this.props.dispatch({type:'START_COUNTING_TIMER', data: 0}) 
        }
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

    ObtenerActividades(usuario)
    {
        

        axios.get("/BrujulaActividadesPorColaborador/"+ usuario+"/NO")
        .then(res => {
            this.props.dispatch({type:'LOAD_BRUJULAS', data: res.data}) 
            this.setState({cargando : false})

        }).catch((error) => {
            this.setState({cargando : false})
            
            return
        })
    }

    render() {
       
        return (
            <div>
                <table className="table table-striped table-sm">
                    <thead className="">
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
                                        Ver
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