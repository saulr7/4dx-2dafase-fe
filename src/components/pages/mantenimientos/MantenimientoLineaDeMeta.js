import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditarMetaPeriodica from '../medidasPredictivas/EditarMetaPeriodica';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';


class MantenimientoLineaDeMeta extends Component {


    
    constructor(props)
    {
        super(props)
        
        try {

            const { match: { params } } = this.props;
            var dataBase64 = params.data
            var medidaPredictiva = JSON.parse(atob(dataBase64))   
        } catch (error) {
            window.location.href = "/";
        }
   

        this.state  = {
            medidaPredictiva : medidaPredictiva,
        }

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
                        <li className="breadcrumb-item">
                            <Link to={{ pathname: '/settings/resultados', }}>
                                Resultados
                            </Link>
                        
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">Mantenimiento Línea de Meta</li>
                    </ol>
                </nav>


                <h2 className="font-weight-bold">
                    Mantenimiento Línea de Meta
                </h2>


                <div className="row my-4">
                        <div className="col-12 ">
                            <EditarMetaPeriodica Meta={this.state.medidaPredictiva}/>
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
)(MantenimientoLineaDeMeta);