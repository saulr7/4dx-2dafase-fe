import React from 'react'

import TipoGrafico from '../graficas/TipoGrafico'
import TituloPrincipal from '../../common/TituloPrincipal'
class DoughnutChartDemo extends React.Component {

    constructor(props)
    {
        
        try {
            const { match: { params } } = props;
            var data64 = params.data
            var data = JSON.parse(atob(data64))   

            
        } catch (error) {
            window.location.href = "/";
        }
        

        super(props)

        this.state = {
            dataLineal2 : data,
            tipoGrafico : data.idTipoGrafico
        }

    }

    render() {

        return (
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-10 offset-1">
                            <TituloPrincipal Titulo="Gráfica" BackButton={true}/>
                        </div>
                    </div>

                    <div className="row my-4">
                        <div className="col-12 col-lg-10 offset-lg-1 bg-white bp-card">
                            <TipoGrafico type={this.state.tipoGrafico} data={this.state.dataLineal2}/>
                        </div>

                    </div>
                
                </div>

            </div>
        )
    }
}

export default DoughnutChartDemo