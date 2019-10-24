import { axios, JwtPayload } from "../config/config";

function RegistrarEventoDelSistema(evento) {

    var usuario = JwtPayload().usuario

    var nuevoEvento = {
        "IdColaborador": usuario.Empleado,
        "Evento": evento
    }

    axios.post("/RegistrarEventoDelSistema", nuevoEvento)
        .then(res => {

        }).catch((error) => {
            console.log(error)

        })

}



export default RegistrarEventoDelSistema