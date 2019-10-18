const intialState = []


const ColaboradoresReducer = (state = intialState, action) => {

    switch (action.type) {
        case 'LOAD':
            return action.data;
        default:
            return state;
    }

}


export default ColaboradoresReducer;