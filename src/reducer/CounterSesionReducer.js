const intialState = {
    seconds: 0,
    minutes: 0,
    hours: 0,
    totalSeconds: 0
}


const CounterSesionReducer = (state = intialState, action) => {

    switch (action.type) {
        case 'START_COUNTING':
            var counter = action.data
            var minutes = Math.floor(counter / 60);
            var time = counter
            var seconds = time - minutes * 60;
            var hours = Math.floor(time / 3600);
            var counterObj = {
                totalSeconds: action.data,
                minutes: minutes,
                seconds: (seconds > 0 ? seconds : 0),
                hours: hours
            }
            return counterObj;
        default:
            return state;
    }

}


export default CounterSesionReducer;