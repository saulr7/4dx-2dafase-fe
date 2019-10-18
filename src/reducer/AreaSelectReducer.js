const intialState = 0

const AreaSelectReducer = (state = intialState, action) => {

    switch (action.type) {
        case 'CAMBIAR_SUBAREA':
            return action.data;
        default:
            return state;
    }

}


export default AreaSelectReducer;