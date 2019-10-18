const intialState = false


const MostrarPanelCompaneros = (state = intialState, action) => {

    switch (action.type) {
        case 'MOSTRAR_PANEL_COMPANEROS':
            return action.data;
        default:
            return state;
    }

}


export default MostrarPanelCompaneros;