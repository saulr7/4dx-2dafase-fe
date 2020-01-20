import { JwtPayload } from '../config/config'

function EsElUsuarioLogueado(idColaborador) {


    var usuario = JwtPayload().usuario

    if (parseInt(usuario.Empleado) ===  parseInt(idColaborador)) {
        return true
    } else {
        return false;
    }


}


export default EsElUsuarioLogueado