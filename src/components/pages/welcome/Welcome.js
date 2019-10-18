import React from 'react'
import {Animated} from "react-animated-css";
import './Welcome.css'

import Login from '../../login/Login'

class Welcome extends React.Component {

    constructor(props)
    {
        super(props)

        // console.log( "Entro")

        // const { match: { params } } = this.props;
        // var token = params.token

        // console.log(token)
        console.log("Here we go")
    }

    render() {
     
        return (

            <div>
                <nav className="navbar navbar-light bg-banpais" id="navBadNoLogged">
                    { <span className="navbar-brand font-weight-bold">4DX</span> }
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