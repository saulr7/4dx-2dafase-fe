import { axios } from "../config/config";
import UsuarioLogueadoId from '../Functions/UsuarioLogueadoId'
import Swal from "sweetalert2";

export const NuevaActividadService = (nuevaActividad)=>
{
    axios.post("/BrujulaPorMPAdd", nuevaActividad )
    .then(res => {

        Swal.fire({  
            title: 'Información guardada exitosamente',  
            type: 'success',  
            text: "Éxito",  
        });

    }).catch((error) => {
        Swal.fire({  
            title: 'Algo ha salido mal',  
            type: 'error',  
            text: "Atención",  
        });
        return
    })
            
}

export const ObtenerActividadesPeriodoActualService = ()=> {

    var colaboradorId= UsuarioLogueadoId()
       return axios.get("/GetBrujulaCantidad/"+colaboradorId )
        .then(res => {
            console.log(res.data)
            if(!res.data)
                return

            var actividadesFaltantes = ( 3- res.data.Cantidad )
            var actividadesFaltantesComoLider= (3 - res.data.CantidadComoLider)

            actividadesFaltantes = (actividadesFaltantes >0 ? actividadesFaltantes : 0)
            actividadesFaltantesComoLider = (actividadesFaltantesComoLider >0 ? actividadesFaltantesComoLider : 0)

            var data ={
                actividadesFaltantes,
                actividadesFaltantesComoLider
            }

            return data

        }).catch((error) => {
            console.log(error)
            Swal.fire({  
                title: 'Algo ha salido mal',  
                type: 'error',  
                text: "Atención",  
            });
        })
}