const intialState = {
    totalActividadesNuevas: 0,
    totalActividadesNuevasLider: 0
}

const TotalActividadesNuevasReducer = (state = intialState, action) => {

    switch (action.type) {
        case 'LOAD_ACTIVIDADES_NUEVAS':
            return action.data;
        default:
            return state;
    }

}


export default TotalActividadesNuevasReducer;