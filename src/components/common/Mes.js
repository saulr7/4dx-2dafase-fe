import React from 'react'

class Mes extends React.Component {

    constructor(props)
    {
        super(props)

        this.state = {Mes :this.props.Mes}
    }

    UNSAFE_componentWillReceiveProps(newProps) {
      this.setState({Mes: newProps.Mes})
   }


    render() {
        
        if(this.state.Mes === 1)
            return ( <span> Enero </span> )
        if(this.state.Mes === 2)
            return ( <span> Febrero </span> )
        if(this.state.Mes === 3)
            return ( <span> Marzo </span> )
        if(this.state.Mes === 4)
            return ( <span> Abril </span> )
        if(this.state.Mes === 5)
            return ( <span> Mayo </span> )
        if(this.state.Mes === 6)
            return ( <span> Junio </span> )
        if(this.state.Mes === 7)
            return ( <span> Julio </span> )
        if(this.state.Mes === 8)
            return ( <span> Agosto </span> )
        if(this.state.Mes === 9)
            return ( <span> Septiembre </span> )
        if(this.state.Mes === 10)
            return ( <span> Octubre </span> )
        if(this.state.Mes === 11)
            return ( <span> Noviembre </span> )
        if(this.state.Mes === 12)
            return ( <span> Diciembre </span> )
        
        return (null)
    }
}

export default Mes