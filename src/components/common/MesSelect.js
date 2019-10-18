import React from 'react'
import {connect} from 'react-redux';

class MesSelect extends React.Component {

    constructor(props)
    {
        super(props)

        this.state = {
            mesActual :  this.props.mesSelected,
            Leyenda : this.props.Leyenda
        }

        this.MesChangedHandler = this.MesChangedHandler.bind(this)
    }


    
    MesChangedHandler(event)
    {
        var mesActual = parseInt( event.target.value)
        this.setState(state => ({  mesActual : mesActual }));
        this.props.dispatch({type:'CAMBIAR', data: mesActual}) 

    }

    render()
    {
        return (
                <div>
                    <h4 className="card-title d-inline m-2">{this.state.Leyenda}</h4>
                    <select value={this.state.mesActual}  className="custom-select col-12 col-md-4 form-inline" id="cmbSubAreas" onChange={this.MesChangedHandler} >
                        <option value="1" >Enero</option>
                        <option value="2" >Febrero</option>
                        <option value="3" >Marzo</option>
                        <option value="4" >Abril</option>
                        <option value="5" >Mayo</option>
                        <option value="6" >Junio</option>
                        <option value="7" >Julio</option>
                        <option value="8" >Agosto</option>
                        <option value="9" >Septiembre</option>
                        <option value="10" >Octubre</option>
                        <option value="11" >Noviembre</option>
                        <option value="12" >Diciembre</option>
                    </select>
                </div>

        )
    }

}

const mapStateToProps = (state) => {

    return {
        
        mesSelected : state.MesSelectReducer
    }
  }
  

export default connect(mapStateToProps)( MesSelect);
