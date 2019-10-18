import React from 'react'
import {Chart} from 'primereact/chart';

import Grafica from '../../../models/Grafica'

class TipoGrafico extends React.Component {


    constructor(props)
    {
        super(props)

        this.state = {
            type : (this.props.type ? parseInt(this.props.type) : 0),
            data : this.props.data
        }

    }


    UNSAFE_componentWillReceiveProps(newProps) {
        this.setState({type: newProps.type, data : newProps.data});
    }

    

    render() {

        if(this.state.type === Grafica.Dona )
            return <Chart type="doughnut" data={data} />

        if(this.state.type === Grafica.Linea)
            return <Chart type="line" data={this.state.data ? this.state.data : ""} options={options}/>

        if(this.state.type === Grafica.Barra )
            return <Chart type="bar" data={this.state.data ? this.state.data : ""} options={options}/>
    
        if(this.state.type === Grafica.Pastel )
            return <Chart type="pie" data={dataPie} />

        

        return (
            <div>
                <div className="">
                    <span className="badge badge-secondary p-2">
                        Selecciona un gráfico
                    </span>
                </div>
            </div>
        )
    }


}

const options = {
  
    scaleOptions: {
        ticks: {
          beginAtZero: true
        }
      },
      scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    }
};


const data = {
    labels: ['A','B','C'],
    datasets: [
        {
            data: [300, 50, 100],
            backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
            ],
            hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
            ]
        }]    
    };



    const dataPie = {
        labels: ['A','B','C'],
        datasets: [
            {
                data: [300, 50, 100],
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56"
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56"
                ]
            }]    
        };



export default TipoGrafico