import { axios, JwtPayload, Token } from "../config/config";

function RegistrarEventoDelSistema(evento) {

    var usuario = JwtPayload().usuario

    var nuevoEvento = {
        "IdColaborador": usuario.Empleado,
        "Evento": evento
    }
    axios.defaults.headers.common['Authorization'] = `Bearer ${Token()}`


    axios.post("/RegistrarEventoDelSistema", nuevoEvento)
        .then(res => {
        }).catch((error) => {
            console.log(error)
        })

}



export default RegistrarEventoDelSistema