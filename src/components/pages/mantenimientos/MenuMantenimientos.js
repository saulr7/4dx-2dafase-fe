import React, { Component } from 'react';
import { connect } from 'react-redux';

import {Link} from 'react-router-dom'

class MenuMantenimientos extends Component {


    
    constructor(props) {
        super(props);
        
        this.state = {
            Reportes: []
        }

        this.LoadMenuReportes = this.LoadMenuReportes.bind(this)

    }


    componentDidMount()
    {
        this.LoadMenuReportes()
    }


    LoadMenuReportes()
    {
        var reportes  = [
            {Nombre: "Resultados", Descripcion: "Descripción...", Ruta: "/settings/resultados", Icono :"fa-id-card-o"},
        ]

        this.setState({Reportes : reportes})
    }




    render() {
        return (
            <div>

                
                <div className="row">
                    <div className="col-12 col-md-8 offset-md-2">
                        <div className="list-group">

                           {this.state.Reportes.map((reporte, index)=> {
                               return (
                                <Link key={index} to={{pathname: reporte.Ruta,}} className="list-group-item list-group-item-action flex-row align-items-start">
                                <div className="row">
                                        <div className="col-2 col-md-1 d-flex align-items-center">
                                            <i className={"fa  fa-2x " + reporte.Icono} aria-hidden="true"></i>
                                        </div>
                                        <div className="col">
                                            <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1 font-weight-bold">{reporte.Nombre}</h5>
                                            </div>
                                            <p className="mb-1">{reporte.Descripcion}</p>
                                        </div>
                                        <div className="col-2 col-md-1 d-flex align-items-center">
                                            <i className="fa fa-arrow-right fa-lg text-primary " aria-hidden="true"></i>
                                        </div>
                                    </div>
                            </Link>
                               )
                           })}

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
)(MenuMantenimientos);