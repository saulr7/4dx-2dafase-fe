import { JwtPayload } from '../config/config'

function EsLider() {

    var usuario = JwtPayload().usuario

    if (usuario.EsLider === true) {
        return true
    } else {
        return false;
    }


}


export default EsLider