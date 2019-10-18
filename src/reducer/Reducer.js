import { combineReducers } from 'redux'
import PeriodicidadReducer from './PeriodicidadReducer'
import MesSelectReducer from './MesSelectReducer'
import AreaSelectReducer from './AreaSelectReducer'
import ColaboradoresReducer from './ColaboradoresReducer'
import TableroReducer from './TableroReducer'
import ColaboradorSelectedReducer from './ColaboradorSelectedReducer'
import MostrarPanelCompaneros from './MostrarPanelCompaneros'
import BrujulaReducer from './BrujulaReducer'
import EstadosBrujula from './EstadosBrujula'

export default combineReducers({
    PeriodicidadReducer,
    MesSelectReducer,
    AreaSelectReducer,
    ColaboradoresReducer,
    TableroReducer,
    ColaboradorSelectedReducer,
    MostrarPanelCompaneros,
    BrujulaReducer,
    EstadosBrujula
})