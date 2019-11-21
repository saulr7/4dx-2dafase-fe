import { JwtPayload } from '../config/config'

function UsuarioLogueadoId() {

    var usuario = JwtPayload().usuario
    return usuario.Empleado

}


export default UsuarioLogueadoId