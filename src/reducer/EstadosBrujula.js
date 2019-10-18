const intialState = []

const EstadosBrujula = (state = intialState, action) => {

    switch (action.type) {
        case 'LOAD_ESTADOS_BRUJULA':
            return action.data;
        default:
            return state;
    }

}


export default EstadosBrujula;