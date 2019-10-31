const intialState = 0

const TimerReducer = (state = intialState, action) => {

    switch (action.type) {
        case 'START_COUNTING_TIMER':
            return action.data;
        default:
            return state;
    }

}


export default TimerReducer;