import React, { Component } from 'react';
import { connect } from 'react-redux';

import { axios, JwtPayload } from "../../../config/config";


import Swal from "sweetalert2";

class NuevaActividad extends Component {

    constructor(props)
    {
        super(props)

        
        this.state = {
            IdResultadoMP : this.props.IdMP,
            cargando : false,
            txtNuevaActividad : ""
        }

        this.GuardarNuevaActividad = this.GuardarNuevaActividad.bind(this)
        this.handleTextChange = this.handleTextChange.bind(this)
        this.ValidarData = this.ValidarData.bind(this)
        this.ObtenerActividades = this.ObtenerActividades.bind(this)
    }



    handleTextChange(event) {
        const value =  event.target.value
  
          this.setState({ txtNuevaActividad: value  });

      }



    GuardarNuevaActividad()
    {
        var usuario = JwtPayload().usuario     
        
        if(!this.ValidarData())
            return
        
        var nuevaActividad = {
            "IdResultadoMP": parseInt( this.state.IdResultadoMP),
            "IdColaborador":usuario.Empleado,
            "Actividad":this.state.txtNuevaActividad,
            "IdEstado" : 3
        }

        axios.post("/BrujulaPorMPAdd", nuevaActividad )
        .then(res => {
            this.setState({
                txtNuevaActividad: ""
              });
              this.ObtenerActividades()
            Swal.fire({  
                title: 'Información guardada exitosamente',  
                type: 'success',  
                text: "Éxito",  
            });
            
    

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
        var usuario = JwtPayload().usuario      

        this.setState({cargando : true})

        axios.get("/BrujulasPorMP/"+ usuario.Empleado+"/"+ this.state.IdResultadoMP)
        .then(res => {

            this.props.dispatch({type:'LOAD_BRUJULAS', data: res.data}) 
            this.setState({cargando : false})
            

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

    ValidarData()
    {
        if(!this.state.txtNuevaActividad)
        {
            Swal.fire({  
                    title: 'Los datos no son correctos',  
                    type: 'warning',  
                    text: "Atención",  
                });
                return false
        }    
        return true
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col">
                        <h3 className="text-center font-weight-bold">Nueva actividad</h3>
                        <div className="form-group">
                            <h4 className="card-title d-inline m-2">Descripción:</h4>
                            <textarea 
                                value ={this.state.txtNuevaActividad}
                                className="form-control rounded-0" 
                                id="exampleFormControlTextarea2" 
                                rows="3"
                                onChange={this.handleTextChange}>
                            </textarea>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col text-center">
                        <button 
                            type="button" 
                            className="btn btn-success"
                            onClick={this.GuardarNuevaActividad}>
                            Guardar
                        </button>
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
)(NuevaActividad);