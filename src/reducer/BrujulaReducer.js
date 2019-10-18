const intialState = []

const BrujulaReducer = (state = intialState, action) => {

    switch (action.type) {
        case 'LOAD_BRUJULAS':
            return action.data;
        default:
            return state;
    }

}


export default BrujulaReducer;