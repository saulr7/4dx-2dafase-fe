import React from 'react'

import EditarMeditaPredictiva from '../medidasPredictivas/EditarMedidaPredictiva'
import UserSelected from '../../common/UserSelected'
import TituloPrincipal from '../../common/TituloPrincipal'
import EditarMetaPeriodica from '../medidasPredictivas/EditarMetaPeriodica'

class Configuracion extends React.Component {


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
        return(
            <div>
                <div className="container">

                    <div className="row">
                        <div className="col">
                            <TituloPrincipal Titulo="Configuración" BackButton={true} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12 text-center">
                            <UserSelected/>
                        </div>    
                    </div> 

                    <div className="row mb-2">
                        <div className="col-12 col-md-8 offset-md-2">
                            <div className="card">
                                <h4 className="card-header">MCI:</h4>
                                <div className="card-body">
                                    <p className="card-text">
                                        {this.state.medidaPredictiva.MCI}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                   

                    <div className="row ">
                        <div className="col">
                            <EditarMeditaPredictiva  MedidaPredictiva={this.state.medidaPredictiva}/>
                        </div>
                    </div>
                    
                    <div className="row my-4">
                        <div className="col-12 ">
                            <EditarMetaPeriodica Meta={this.state.medidaPredictiva}/>
                        </div>
                    </div>

       

                </div>
            </div>
        )
    }
}


export default Configuracion