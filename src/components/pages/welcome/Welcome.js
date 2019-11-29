import React from 'react'
import {Animated} from "react-animated-css";
import './Welcome.css'

import {Estilos} from '../../router/estilos'


import Login from '../../login/Login'

class Welcome extends React.Component {

    render() {
     
        return (

            <div>
                <nav className="navbar navbar-light " id="navBadNoLogged" style={Estilos().bgBanpais}>
                    { <span className="navbar-brand font-weight-bold" style={Estilos().txtColor}>4DX</span> }
                </nav>

                <div className="container" >
                                  
                    <div className="row" id="loginMargin">
                        <div className="col mt-n4 text-center slide-bottom">                  
                            
                            <div className="d-inline">
                                <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
                                    <div>
                                        <h1 className="d-inline display-2 font-weight-bold">4DX </h1>
                                    </div>
                                </Animated>
                                
                                <Animated animationIn="bounceInRight" animationOut="fadeOut" isVisible={true}>
                                    <div>
                                        <h1 className="d-inline font-weight-bold font-italic ">Tablero</h1>
                                    </div>
                                </Animated>
                            </div>

                        </div>
                    </div>

                    <div className="row justify-content-center mb-4 slide-bottom">
                        <Login className="slide-bottom" /> 
                    </div>
                </div>

            </div>
        )
        
    }

}


export default Welcome