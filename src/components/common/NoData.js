import React from 'react'
import './NoData.css'


class NoData extends React.Component {

    constructor(props)
    {
        super(props)

        this.state = {
            NoData : this.props.NoData,
            Mensaje : this.props.Mensaje
        }

    }
  
    UNSAFE_componentWillReceiveProps(newProps) {
        this.setState({NoData: newProps.NoData});
    }

    render() {

        if (this.state.NoData) {
            return (
                <div className="" >
                    <i className="fa fa-exclamation-triangle text-secondary" aria-hidden="true" id="icon"></i>
                    <br/>
                    <span className="font-weight-bold text-secondary">No se han encontrado datos para mostrar</span>
                    <br/>
                    <h4 className="card-title font-weight-bolder text-secondary">{this.state.Mensaje}</h4>
                </div>
            )
        } else {
            return (null )
        }

    }

}

export default NoData