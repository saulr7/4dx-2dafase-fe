function PeriodicidadNombre(Frecuencia) {
    var PeriodoNombre = ""

    switch (Frecuencia) {
        case 1:
            PeriodoNombre = "Mensual"
            break
        case 2:
            PeriodoNombre = "Bimensual"
            break
        case 3:
            PeriodoNombre = "Trimestral"
            break
        case 4:
            PeriodoNombre = "Cuatrimestre"
            break
        case 5:
            PeriodoNombre = "Semestral"
            break
        default:
            PeriodoNombre = "N/A"
            break
    }


    return PeriodoNombre;

}


export default PeriodicidadNombre