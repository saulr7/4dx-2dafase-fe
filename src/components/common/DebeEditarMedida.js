import React from 'react'
// import {Animated} from "react-animated-css";


class DebeEditarMedida extends React.Component {


    constructor(props)
    {
        super(props)
        
        this.state = {
            medida: this.props.Medida,
        }
    }


    render() {

        if(this.state.medida)
        {
            return this.NoDebeEditar()
        }
        else
        {   
            return this.DebeEditar()
        }
        
    }

    DebeEditar()
    {
        return (
            <div>
                <div>
                    <span className="badge badge-warning slide-top">Configurar</span>
                </div>
                {/* <Animated animationIn="bounce" isVisible={true} animateOnMount={true}>
                    <div>
                        <span className="badge badge-warning slide-top">Editar</span>
                    </div>
                </Animated> */}
            </div>
        )
    }

    NoDebeEditar()
    {
        return(
            this.state.medida
        )
    }

}


export default DebeEditarMedida