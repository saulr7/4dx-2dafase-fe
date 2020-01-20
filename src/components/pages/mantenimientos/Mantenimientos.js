import React, { Component } from 'react';
import { connect } from 'react-redux';
import TituloPrincipal from '../../common/TituloPrincipal';

import {Route} from 'react-router'
import MenuMantenimientos from './MenuMantenimientos';
import MantenimientoResultados from './MantenimientoResultados';
import MantenimientoLineaDeMeta from './MantenimientoLineaDeMeta';


class Mantenimientos extends Component {


    render() {
        return (
            <div>
                <div className="container">

                    <div className="row">
                        <div className="col">
                            <TituloPrincipal Titulo="Mantenimientos"></TituloPrincipal>
                        </div>
                    </div>

                    <Route exact path={`${this.props.match.path}`} component={MenuMantenimientos} />
                    <Route path={`${this.props.match.path}/resultados`} component={MantenimientoResultados} />
                    <Route path={`${this.props.match.path}/lineaDeMeta/:data?`} component={MantenimientoLineaDeMeta} />                    
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
)(Mantenimientos);