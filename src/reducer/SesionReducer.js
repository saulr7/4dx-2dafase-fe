const intialState = {
    start: false,
    reset: false,
    startMeeting: false,
    startTimer: false
}


const SesionReducer = (state = intialState, action) => {

    switch (action.type) {
        case 'START_SESION':
            return action.data;
        case 'STOP_SESION':
            return action.data;
        default:
            return state;
    }

}


export default SesionReducer;