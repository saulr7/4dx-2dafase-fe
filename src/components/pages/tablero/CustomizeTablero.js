import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SketchPicker } from 'react-color'

class CustomizeTablero extends Component {

    constructor(props) {
        super(props)
        this.state = {
            backgroundColor: 'white',
            textColor : 'black',
            tituloColor : 'black',
            fontSize : 'larger',
            fontSizes : ["medium","xx-small","x-small","small","large","x-large","xx-large","smaller","larger"],
            fontFamily : '',
            fontFamilies : ["-webkit-pictograph", "auto", "cursive", "fantasy", "initial","monospace", "sans-serif", "serif", ""]
            
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
     
      TextoTamanoHandle = (event) => {
        var size = event.target.value    
        this.setState({ fontSize: size});
        this.GuardarEstilosTablero()
      };
      
      TextoFamilyHandle = (event) => {
        var font = event.target.value    
        this.setState({ fontFamily: font});
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
                color : this.state.textColor,
                fontSize : this.state.fontSize,
                fontFamily : this.state.fontFamily
            }

        }
        
        this.props.dispatch({type:'SET_STYLES', data: estilo})
      }

      ResetearEstilos = () =>
      {
          var estilo = {
            bgTablero : {
                backgroundColor : 'white'
            },
            Titulo : {
                color : ''
            },
            Texto : {
                color : ''
            }
          }
          this.props.dispatch({type:'SET_STYLES', data: estilo})
      }
      

    

    render() {
        return (
            <div>
                <button className="btn btn-link" data-toggle="modal" data-target="#ModalcustomizeTablero">
                    <i className="fa fa-puzzle-piece fa-lg" aria-hidden="true"></i>
                </button>


                <div className="modal fade" id="ModalcustomizeTablero" tabIndex="-1" role="dialog" aria-labelledby="ModalcustomizeTablero" aria-hidden="true">
                <div className="modal-dialog modal-lg " role="document">
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
                                        Fondo:
                                        <div className="" style={{
                                            background: this.state.backgroundColor,
                                            width: 120,
                                            height: 15,
                                            border: '1px solid black',
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
                                        Título:
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
                                        Texto:
                                        <div className="" style={{
                                            background: this.state.textColor,
                                            width: 120,
                                            height: 15,
                                            color: 'white'
                                        }}>
                                        </div>
                                        <span>
                                            Tamaño: {this.state.fontSize}
                                        </span>
                                        <span>
                                            Fuente: {this.state.fontFamily ? this.state.fontFamily : "-"}
                                        </span>
                                        <button className="btn btn-link" data-toggle="collapse" href="#clpTextColor" aria-expanded="true" aria-controls="clpTextColor">
                                            <i className="fa fa-pencil" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                    <div className="collapse " id="clpTextColor">
                                        <div className="card card-body">
                                            <div className="row">
                                                <div className="col">
                                                    Color:
                                                    <SketchPicker color={this.state.textColor} onChangeComplete={ this.TextColorHandle } />
                                                </div>
                                                <div className="col">
                                                    <i className="fa fa-font fa-lg" aria-hidden="true"></i>
                                                    <div className="p-2">
                                                        Tamaño:
                                                        <select value={this.state.fontSize} className="custom-select " id="cmbSubAreas" onChange={ this.TextoTamanoHandle }>
                                                            { this.state.fontSizes.map((font, index) => <option key={index} name={font} value={font}>{font}</option>) }
                                                        </select>
                                                    </div>
                                                   
                                                    <div className="p-2">
                                                        Fuente:
                                                        <select value={this.state.fontFamily} className="custom-select " id="cmbSubAreas" onChange={ this.TextoFamilyHandle }>
                                                            { this.state.fontFamilies.map((font, index) => <option key={index} name={font} value={font}>{font}</option>) }
                                                        </select>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </li>
                           
                        </ul>

                        
                    </div>
                    <div className="modal-footer">
                        <button 
                            className="btn btn-danger"
                            onClick={this.ResetearEstilos}>
                            Reset
                        </button>
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


function mapStateToProps(state) {
    return {

    };
}


export default connect(
    mapStateToProps,
)(CustomizeTablero);