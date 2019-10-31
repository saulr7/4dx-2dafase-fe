import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Counter.css'

class Counter extends Component {


    constructor(props)
    {
        super(props)

        this.state = {
            counter : 0
        }

        this.counter = this.counter.bind(this)
    }

    

    componentDidMount()
    {
        this.counter();
        
        setInterval(this.counter, 1000);
    }


    counter() {

        if(!this.props.sesionControls.start)
            return;

        var counter = this.state.counter
        this.setState({counter : counter+1})
        this.props.dispatch({type:'START_COUNTING', data: counter+1}) 
        this.props.dispatch({type:'START_COUNTING_TIMER', data: this.props.counterTimer+1}) 
    }

    componentWillUnmount()
    {
        this.setState({counter : 0})
        this.props.dispatch({type:'START_COUNTING', data: 0}) 
        this.props.dispatch({type:'START_COUNTING_TIMER', data: 0}) 
    }

    render() {

      
        return (
            <div className="shadow-lg p-3 mb-2 bg-white rounded">
            <h4 className="font-weight-bold">
                {this.props.counterSesion.hours}:{this.props.counterSesion.minutes}:{this.props.counterSesion.seconds} 
            </h4>
        </div>
        );
        
    }
}


function mapStateToProps(state) {
    return {
        sesionControls : state.SesionReducer,
        counterSesion : state.CounterSesionReducer,
        counterTimer : state.TimerReducer
    };
}

export default connect(
    mapStateToProps,
)(Counter);