const intialState = []


const PeriodicidadReducer = (state = intialState, action) => {

    switch (action.type) {
        case 'RECARGAR':
            return action.data;
            // return Object.assign({}, state, action.data);
        case 'RECARGO':
            return Object.assign({}, state, {
                recargar: false
            });
        default:
            return state;
    }

}


export default PeriodicidadReducer;