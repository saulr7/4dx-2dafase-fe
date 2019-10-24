const intialState = 0


const CounterSesionReducer = (state = intialState, action) => {

    switch (action.type) {
        case 'START_COUNTING':
            return action.data;
        default:
            return state;
    }

}


export default CounterSesionReducer;