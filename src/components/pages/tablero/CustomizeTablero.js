import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SketchPicker } from 'react-color'

class CustomizeTablero extends Component {

    constructor(props) {
        super(props)
        this.state = {
            backgroundColor: 'white',
            textColor : 'black',
            tituloColor : 'black'
        }
      }

      BackgroundColorHandle = (color) => {
        this.setState({ backgroundColor: color.hex });
        this.GuardarEstilosTablero()
      };
    
     
      TextColorHandle = (color) => {
        this.setState({ textColor: color.hex });
        this.GuardarEstilosTablero()
      };
        
      TituloColorHandle = (color) => {
        this.setState({ tituloColor: color.hex });
        this.GuardarEstilosTablero()
      };


      GuardarEstilosTablero = () => {
        var estilo = {}

        estilo = {
            bgTablero : {
                backgroundColor : this.state.backgroundColor
            },
            Titulo : {
                color : this.state.tituloColor
            },
            Texto : {
                color : this.state.textColor
            }

        }
        
        this.props.dispatch({type:'SET_STYLES', data: estilo})
      }
      

    

    render() {
        return (
            <div>
                <button className="btn btn-link" data-toggle="modal" data-target="#ModalcustomizeTablero">
                    <i className="fa fa-sliders fa-lg" aria-hidden="true"></i>
                </button>


                <div className="modal fade" id="ModalcustomizeTablero" tabIndex="-1" role="dialog" aria-labelledby="ModalcustomizeTablero" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="ModalcustomizeTablero">Personalizar tablero</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">

                        <ul className="list-group">
                            <li className="list-group-item ">
                                <div>
                                    <div className="d-flex justify-content-between align-items-center">
                                        Color de fondo:
                                        <div className="" style={{
                                            background: this.state.backgroundColor,
                                            width: 120,
                                            height: 15,
                                            color: 'white'
                                        }}>
                                        </div>
                                        <button className="btn btn-link" data-toggle="collapse" href="#clpBackgroundColor" aria-expanded="true" aria-controls="clpBackgroundColor">
                                            <i className="fa fa-pencil" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                    <div className="collapse " id="clpBackgroundColor">
                                        <div className="card card-body">
                                            <SketchPicker color={this.state.backgroundColor} onChangeComplete={ this.BackgroundColorHandle } />
                                        </div>
                                    </div>

                                </div>
                            </li>
                            <li className="list-group-item ">
                                <div>
                                    <div className="d-flex justify-content-between align-items-center">
                                        Color de título:
                                        <div className="" style={{
                                            background: this.state.tituloColor,
                                            width: 120,
                                            height: 15,
                                            color: 'white'
                                        }}>
                                        </div>
                                        <button className="btn btn-link" data-toggle="collapse" href="#clpTituloColor" aria-expanded="true" aria-controls="clpTituloColor">
                                            <i className="fa fa-pencil" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                    <div className="collapse " id="clpTituloColor">
                                        <div className="card card-body">
                                            <SketchPicker color={this.state.tituloColor} onChangeComplete={ this.TituloColorHandle } />
                                        </div>
                                    </div>

                                </div>
                            </li>
                            <li className="list-group-item ">
                                <div>
                                    <div className="d-flex justify-content-between align-items-center">
                                        Color de texto:
                                        <div className="" style={{
                                            background: this.state.textColor,
                                            width: 120,
                                            height: 15,
                                            color: 'white'
                                        }}>
                                        </div>
                                        <button className="btn btn-link" data-toggle="collapse" href="#clpTextColor" aria-expanded="true" aria-controls="clpTextColor">
                                            <i className="fa fa-pencil" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                    <div className="collapse " id="clpTextColor">
                                        <div className="card card-body">
                                            <SketchPicker color={this.state.textColor} onChangeComplete={ this.TextColorHandle } />
                                        </div>
                                    </div>

                                </div>
                            </li>
                           
                        </ul>

                        
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button 
                            type="button" 
                            className="btn btn-primary"
                            onClick={this.GuardarEstilosTablero}>
                                Guardar
                        </button>
                    </div>
                    </div>
                </div>
                </div>


            </div>
        );
    }
}
export function EstilosTablero(estilos)
{
    //var estilos = JSON.parse(localStorage.getItem("estilos_tablero"))
    var estilo = {
        bgTablero : {
            backgroundColor : 'white'
        }
    }

    if(estilos)
        estilo = estilos

    return estilo
}

function mapStateToProps(state) {
    return {

    };
}


export default connect(
    mapStateToProps,
)(CustomizeTablero);