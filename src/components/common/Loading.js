import React from 'react'


class Loading extends React.Component {

    constructor(props)
    {
        super(props)

        this.state = {Cargando : this.props.Cargando}

    }
  
    UNSAFE_componentWillReceiveProps(newProps) {
        this.setState({Cargando: newProps.Cargando});
    }

    render() {

        if (this.state.Cargando) {
            return (
                <div className="spinner-grow text-warning" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            )
        } else {
            return (null )
        }

    }

}

export default Loading