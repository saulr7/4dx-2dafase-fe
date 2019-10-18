

import React from 'react'   

import './TituloPrincipal.css'


class TituloPrincipal extends React.Component {

    constructor(props){
        super(props);

        this.state = {irAtras : this.props.BackButton}

        this.GoBack = this.GoBack.bind(this); // i think you are missing this
     }
     

     GoBack()
     {
         window.history.back();
     }
    

    render() {
        return (
            <div> 
                <div className="row">
                        
                        {this.state.irAtras ? (
                        <div className="col-12 col-md-1 align-content-end">
                        <button className="btn align-self-end pt-2 mt-1" onClick={this.GoBack}>
                            <i id="btn-back" className="fa fa-arrow-left " aria-hidden="true"></i>
                        </button> 
                        </div>
                        ) :
                        (null)
                        
                        }
                    <div className="col">
                        <h1 className=" font-weight-bold txtTitle2 text-left  pt-2 ml-n-3" id="txtTitulo">{this.props.Titulo}</h1> 
                    </div>
                 <hr id="hrTitulo"/> 
                </div>
               
            </div>
        )
    }


}


export default TituloPrincipal