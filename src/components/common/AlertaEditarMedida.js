import React from 'react'


class AlertaEditarMedida extends React.Component {

    constructor(props)
    {
        super(props)

        this.state = { mostrar :true}

        this.MostarAlerta = this.MostarAlerta.bind(this)
        
    }

    MostarAlerta()
    {
        
        this.setState(state => ({
            mostrar: false
          }));
  
    }


    render() {

        if(this.state.mostrar){
            return this.Alerta()
        }

        else {
            return ( null)
        }

    }

    Alerta()
    {
        return (
            
            <div className="alert alert-primary alert-dismissible fade show" role="alert">
                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.MostarAlerta}>
                    <span aria-hidden="true">×</span>
                </button>
                <h4 className="alert-heading">¡Configura tus MCIs!</h4>
                <strong>1)</strong> Haz click en el botón <strong> <i>Configuración.</i> </strong>El cual te llevará a la pantalla con el mismo nombre
                <br/>
                <strong>2)</strong> En la pantalla de configuración primero debes seleccionar de que forma mediras tus resultados. Eje.: <i>mensualmente, </i>
                <i>semestral...</i>
                <br/>
                <strong>3)</strong> Una vez configurada la periodicidad de tu MCI se mostrará un listado con los períodos a los cuales debes ingresar la meta propuesta
            </div>               
        )
    }
}


export default AlertaEditarMedida