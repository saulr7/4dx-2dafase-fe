

const intialState = {
    BgTablero : {
        backgroundColor : 'white'
    },
    Titulo : {
        color : ''
    },
    Texto : {
        color : ''
    },
    textoALaDerecha : false
}


const EstilosTableroReducer = (state = intialState, action) => {

    switch (action.type) {
        case 'SET_STYLES':
            return action.data;
        case 'RESET_STYLES':
            return state;
        default:
            return state;
    }

}


export default EstilosTableroReducer;