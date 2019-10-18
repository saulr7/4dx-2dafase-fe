const intialState = {
    nombreColaborador: "",
    colaboradorId: 0
}


const ColaboradorSelectedReducer = (state = intialState, action) => {

    switch (action.type) {
        case 'ACTUALIZAR_COLABORADOR':
            return action.data;
        default:
            return state;
    }

}


export default ColaboradorSelectedReducer;