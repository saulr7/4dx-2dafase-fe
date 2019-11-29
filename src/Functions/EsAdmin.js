import { JwtPayload } from '../config/config'

function EsAdmin() {

    var usuario = JwtPayload().usuario

    if (usuario.PerfilId === 2) {
        return true
    } else {
        return false;
    }


}


export default EsAdmin