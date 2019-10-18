const intialState = []


const TableroReducer = (state = intialState, action) => {

    switch (action.type) {
        case 'LOAD_TABLERO':
            return action.data;
        default:
            return state;
    }

}


export default TableroReducer;