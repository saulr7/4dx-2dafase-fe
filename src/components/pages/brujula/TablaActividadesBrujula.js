import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import NoData from '../../common/NoData'

import EstadoActividad from './EstadoActividad'



class TablaActividadesBrujula extends Component {

    constructor(props)
    {
        super(props)

        this.state = {
            ResultadoId : this.props.ResultadoId,
            UsuarioId : this.props.UsuarioId,
            Actividades : (this.props.Actividades ? this.props.Actividades : (this.props.actividadesReducer ? this.props.actividadesReducer : [] ))

        }

    }

    UNSAFE_componentWillReceiveProps(newProps) {
        this.setState({Actividades : (newProps.Actividades ? newProps.Actividades : [])});

    }

    render() {
        return (
            <div>
                
                {/* <div className={"row " + (this.props.actividades.length === 0 ? "d-none" : "")}> */}
                <div className="row">
                    <div className="col text-center">
                        <NoData NoData={this.props.Actividades.length === 0 && !this.state.cargando}/>  
                    </div>
                </div>
                <div className={"row " }>
                        <div className="col">
                        <h3 className="text-center font-weight-bold">Actividades</h3>
                            <table className="table table-striped bg-white table-bordered ">
                                <thead>
                                    <tr>
                                    <th>Creada</th>
                                    <th>Descripción</th>
                                    <th>Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.Actividades.map((brujula, index)=>
                                        {
                                        return <tr key={index}>
                                                <td>
                                                    <Moment fromNow>{brujula.FechaCreada}</Moment>
                                                </td>
                                                <td>{brujula.Actividad}</td>
                                                <td>
                                                    <EstadoActividad 
                                                        Descripcion={brujula.Descripcion} 
                                                        Brujula={brujula.IdBrujula}
                                                        ResultadoId={this.state.ResultadoId}
                                                        UsuarioId={this.state.UsuarioId} />
                                                </td>
                                            </tr>
                                        })}
      
                                </tbody>
                            </table>


                        </div>
                    </div>

            </div>
        );
    }
}


function mapStateToProps(state) {

    return {
         actividadesReducer : state.BrujulaReducer
    };

}

export default connect(
    mapStateToProps,
)(TablaActividadesBrujula);