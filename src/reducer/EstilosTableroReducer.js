const intialState = {
    bgTablero : {
        backgroundColor : 'white'
    },
    Titulo : {
        color : ''
    },
    Texto : {
        color : ''
    }
}


const EstilosTableroReducer = (state = intialState, action) => {

    switch (action.type) {
        case 'SET_STYLES':
            return action.data;
        default:
            return state;
    }

}


export default EstilosTableroReducer;