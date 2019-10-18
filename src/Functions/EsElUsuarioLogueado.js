import { JwtPayload } from '../config/config'

function EsElUsuarioLogueado(idColaborador) {

    var usuario = JwtPayload().usuario

    if (usuario.Empleado === idColaborador) {
        return true
    } else {
        return false;
    }


}


export default EsElUsuarioLogueado