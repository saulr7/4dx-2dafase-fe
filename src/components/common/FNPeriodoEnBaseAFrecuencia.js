function Periodicidad(Frecuencia, Periodo) {
    var PeriodoNombre = ""

    switch (Frecuencia) {
        case 1:
            PeriodoNombre = PeriodoMensual(Periodo)
            break
        case 2:
            PeriodoNombre = PeriodoBimensual(Periodo)
            break
        case 3:
            PeriodoNombre = PeriodoTrimestral(Periodo)
            break
        case 4:
            PeriodoNombre = PeriodoCuatimestral(Periodo)
            break
        case 5:
            PeriodoNombre = PeriodoSemestral(Periodo)
            break
        case 6:
            PeriodoNombre = PeriodoAnual(Periodo)
            break
        default:
            PeriodoNombre = "N/A"
            break
    }

    return PeriodoNombre

}

var Mes = {
    Enero: "Enero",
    Febrero: "Febrero",
    Marzo: "Marzo",
    Abril: "Abril",
    Mayo: "Mayo",
    Junio: "Junio",
    Julio: "Julio",
    Agosto: "Agosto",
    Septiembre: "Septiembre",
    Octubre: "Octubre",
    Noviembre: "Noviembre",
    Diciembre: "Diciembre",
}

function PeriodoAnual() {
    return "Anual"
}

function PeriodoSemestral(Periodo) {
    var periodo = ""

    switch (Periodo) {
        case 1:
            periodo = "Semestre 1"
            break
        case 2:
            periodo = "Semestre 2"
            break
        default:
            periodo = "Semestre"
            break
    }

    return periodo
}

function PeriodoCuatimestral(Periodo) {
    var periodo = ""

    switch (Periodo) {
        case 1:
            periodo = "Cuatrimestre 1"
            break
        case 2:
            periodo = "Cuatrimestre 2"
            break
        case 3:
            periodo = "Cuatrimestre 3"
            break
        default:
            periodo = "Cuatrimestre"
            break
    }

    return periodo
}


function PeriodoTrimestral(Periodo) {
    var periodo = ""

    switch (Periodo) {
        case 1:
            periodo = "Trimestre 1"
            break
        case 2:
            periodo = "Trimestre 2"
            break
        case 3:
            periodo = "Trimestre 3"
            break
        case 4:
            periodo = "Trimestre 4"
            break
        default:
            periodo = "Trimestre"
            break
    }

    return periodo
}


function PeriodoBimensual(Periodo) {
    var periodo = ""

    switch (Periodo) {
        case 1:
            periodo = Mes.Enero + "-" + Mes.Febrero
            break
        case 2:
            periodo = Mes.Marzo + "-" + Mes.Abril
            break
        case 3:
            periodo = Mes.Mayo + "-" + Mes.Junio
            break
        case 4:
            periodo = Mes.Julio + "-" + Mes.Agosto
            break
        case 5:
            periodo = Mes.Septiembre + "-" + Mes.Octubre
            break
        case 6:
            periodo = Mes.Noviembre + "-" + Mes.Diciembre
            break
        default:
            periodo = "Bimestre"
            break
    }

    return periodo
}

function PeriodoMensual(Periodo) {
    var periodo = ""

    switch (Periodo) {
        case 1:
            periodo = Mes.Enero
            break
        case 2:
            periodo = Mes.Febrero
            break
        case 3:
            periodo = Mes.Marzo
            break
        case 4:
            periodo = Mes.Abril
            break
        case 5:
            periodo = Mes.Mayo
            break
        case 6:
            periodo = Mes.Junio
            break
        case 7:
            periodo = Mes.Julio
            break
        case 8:
            periodo = Mes.Agosto
            break
        case 9:
            periodo = Mes.Septiembre
            break
        case 10:
            periodo = Mes.Octubre
            break
        case 11:
            periodo = Mes.Noviembre
            break
        case 12:
            periodo = Mes.Diciembre
            break
        default:
            periodo = "Mes"
            break
    }

    return periodo
}


export default Periodicidad