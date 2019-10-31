import React, { Component } from 'react';
import { connect } from 'react-redux';


class Timer extends Component {
   
    constructor(props)
    {
        super(props)

        this.state = {
            start : false,
            time : 180,
            seconds : 0,
            minutes : 0,
            hours : 0,
            isOver : false,
            counter : 0
        }

        this.Timer = this.Timer.bind(this)
    }

    

    componentDidMount()
    {
        this.Timer();
        
        setInterval(this.Timer, 1000);
    }


    Timer() {
        
        if(!this.props.sesionControls.startTimer)
        {
            this.setState({isOver : false, counter :0})
            return;
        }

        if(this.props.sesionControls.reset)
        {
            this.setState({time : 180})
            var counterControls ={
                start : true,
                startTimer : true,
                reset : false,
                startMeeting : true
            }
    
            this.props.dispatch({type:'START_SESION', data: counterControls}) 
            this.setState({isOver : false, counter :0})

        }

              
        
        if(this.state.time > 0)
        {
            var minutes = Math.floor(this.state.time / 60);
            var time = this.state.time
            var seconds = time - minutes * 60;
            var hours = Math.floor(time / 3600);
            this.setState({
                time : time -1,
                minutes : minutes,
                seconds : (seconds > 0 ? seconds : 0),
                hours : hours
            })
        }

        else {
            this.setState({isOver : true, seconds : 0})
        }

        var counter = this.state.counter
        this.setState({counter : counter+1})
    }


    componentWillUnmount()
    {
        
    }

    render() {

        if(this.state.isOver)
        {
            return (
                <div className="slide-top-counter shadow-lg p-3 mb-2 bg-white rounded">
                    <h4 className="font-weight-bold text-danger">
                        {this.state.hours}:{this.state.minutes}:{this.state.seconds} 
                    </h4>
                </div>
            )
        }

        else {
            return (
                <div className="shadow-lg p-3 mb-2 bg-white rounded">
                <h4 className="font-weight-bold">
                    {this.state.hours}:{this.state.minutes}:{this.state.seconds} 
                </h4>
            </div>
            );
        }
    }
}


function mapStateToProps(state) {
    return {
        sesionControls : state.SesionReducer,
    };
}



export default connect(
    mapStateToProps,
)(Timer);