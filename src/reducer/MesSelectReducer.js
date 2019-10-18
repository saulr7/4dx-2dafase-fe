const intialState = (new Date().getMonth() + 1)


const MesSelectReducer = (state = intialState, action) => {

    switch (action.type) {
        case 'CAMBIAR':
            return action.data;
        default:
            return state;
    }

}


export default MesSelectReducer;