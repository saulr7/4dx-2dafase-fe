
import { axios } from "../config/config";

export const ActualizarEstiloTableroService = (estilos)=>
{
    return axios.post("/UpdateEstiloTablero", estilos )
            
}


export function EstilosTablero2()
{
    console.log("object")
    var estilos = JSON.parse(localStorage.getItem("estilos_tablero"))

    return estilos
}