import React, { Component } from 'react';
import { connect } from 'react-redux';
import { axios } from "../../../config/config";
import Swal from "sweetalert2";


class EstadoActividad extends Component {

    constructor(props)
    {
        super(props)

        this.state = {
            cargando : false,
            editar : false,
            Descripcion : this.props.Descripcion,
            BrujulaId : this.props.Brujula,
            estadosBrujula : [],
            estadoSelected : 3,
            IdColaboradorDueno : this.props.UsuarioId,
            IdResultado : this.props.ResultadoId,
            SePuedeEditar : (this.props.ResultadoId && this.props.UsuarioId ? true : false)

        }

        this.toggleEditar = this.toggleEditar.bind(this)
        this.ActualizarEstado = this.ActualizarEstado.bind(this)
        this.EstadoChangedHandler= this.EstadoChangedHandler.bind(this)
    }


    toggleEditar()
    {
        this.setState({ editar : !this.state.editar})
    }

   

    ActualizarEstado()
    {
        this.setState(state => ({  editar : false }));
        
        var Brujula = {

            "IdBrujula":this.state.BrujulaId,
            "IdEstado": parseInt(this.state.estadoSelected)
        }
        
        axios.post("/BrujulaPorMPUpdate", Brujula )
        .then(res => {
            Swal.fire({  
                title: 'Información guardada exitosamente',  
                type: 'success',  
                text: "Éxito",  
            });
            this.setState(state => ({  editar : false }));
            this.ObtenerActividades();

        }).catch((error) => {
            console.log(error)
            Swal.fire({  
                title: 'Algo ha salido mal',  
                type: 'error',  
                text: "Atención",  
            });
            return
        })
    }

    ObtenerActividades()
    {

        this.props.dispatch({type:'LOAD_BRUJULAS', data: []}) 

        axios.get("/BrujulasPorMP/"+ this.state.IdColaboradorDueno+"/"+ this.state.IdResultado)
        .then(res => {
            this.props.dispatch({type:'LOAD_BRUJULAS', data: res.data}) 
            

        }).catch((error) => {
            this.setState({cargando : false})
            console.log(error)
            Swal.fire({  
                title: 'Algo ha salido mal',  
                type: 'error',  
                text: "Atención",  
            });
            return
        })
    }

    EstadoChangedHandler(event)
    {

        var estadoId = event.target.value

        this.setState({
            estadoSelected : estadoId
        })

    }



    render() {
        if(this.state.editar  )
        {
            return (
                <div>
                     <select value={this.state.estadoSelected} className="custom-select " id="cmbSubAreas" onChange={ this.EstadoChangedHandler }>
                        { this.props.estadosBrujula.map((estado, index) => <option key={index} name={estado.Descripcion} value={estado.IdEstado}>{estado.Descripcion}</option>) }
                    </select>
                    <br/>
                    <button 
                        type="button" 
                        className="btn btn-success m-1"
                        onClick={this.ActualizarEstado}>
                            Guardar
                        </button>
                    <button 
                        type="button" 
                        className="btn btn-secondary"
                        onClick={this.toggleEditar}>
                            Cancelar
                        </button>
                </div>
            );
        }
        else
        {
            return (
                <div>
                    <div className="form-inline">

                        {this.state.Descripcion}
                        <button 
                            className={" btn btn-info m-1 "+ (this.state.SePuedeEditar ? "" : "d-none")} 
                            data-toggle="tooltip" 
                            data-placement="top" 
                            title="Ingresar resultado" 
                            onClick={this.toggleEditar}>
                                <i className="fa fa-pencil" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            )

         
        }
    }
}

function mapStateToProps(state) {

    return {
        estadosBrujula : state.EstadosBrujula
    };
}
export default connect(
    mapStateToProps,
)(EstadoActividad);