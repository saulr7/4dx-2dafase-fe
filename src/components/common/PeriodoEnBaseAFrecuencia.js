import React from 'react'

class PeriodoEnBaseAFrecuencia extends React.Component {

    constructor(props) {

        super(props)

        this.state = {
            Periodicidad: parseInt(this.props.Periodicidad),
            Periodo: parseInt(this.props.Periodo)
        }

    }

    Mes = {
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


    render() {

        var PeriodoNombre = ""

        switch (this.state.Periodicidad) {
            case 1:
                PeriodoNombre = this.PeriodoMensual()
                break
            case 2:
                PeriodoNombre = this.PeriodoBimensual()
                break
            case 3:
                PeriodoNombre = this.PeriodoTrimestral()
                break
            case 4:
                PeriodoNombre = this.PeriodoCuatimestral()
                break
            case 5:
                PeriodoNombre = this.PeriodoSemestral()
                break
            case 6:
                PeriodoNombre = this.PeriodoAnual()
                break
            default:
                PeriodoNombre = "N/A"
                break
        }

        return (PeriodoNombre
            // <div>
            // </div>
        )
    }






    PeriodoAnual() {
        return "Anual"
    }

    PeriodoSemestral() {
        var periodo = ""

        switch (this.state.Periodo) {
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

    PeriodoCuatimestral() {
        var periodo = ""

        switch (this.state.Periodo) {
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


    PeriodoTrimestral() {
        var periodo = ""

        switch (this.state.Periodo) {
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


    PeriodoBimensual() {
        var periodo = ""

        switch (this.state.Periodo) {
            case 1:
                periodo = this.Mes.Enero + "-" + this.Mes.Febrero
                break
            case 2:
                periodo = this.Mes.Marzo + "-" + this.Mes.Abril
                break
            case 3:
                periodo = this.Mes.Mayo + "-" + this.Mes.Junio
                break
            case 4:
                periodo = this.Mes.Julio + "-" + this.Mes.Agosto
                break
            case 5:
                periodo = this.Mes.Septiembre + "-" + this.Mes.Octubre
                break
            case 6:
                periodo = this.Mes.Noviembre + "-" + this.Mes.Diciembre
                break
            default:
                periodo = "Bimestre"
                break
        }

        return periodo
    }

    PeriodoMensual() {
        var periodo = ""

        switch (this.state.Periodo) {
            case 1:
                periodo = this.Mes.Enero
                break
            case 2:
                periodo = this.Mes.Febrero
                break
            case 3:
                periodo = this.Mes.Marzo
                break
            case 4:
                periodo = this.Mes.Abril
                break
            case 5:
                periodo = this.Mes.Mayo
                break
            case 6:
                periodo = this.Mes.Junio
                break
            case 7:
                periodo = this.Mes.Julio
                break
            case 8:
                periodo = this.Mes.Agosto
                break
            case 9:
                periodo = this.Mes.Septiembre
                break
            case 10:
                periodo = this.Mes.Octubre
                break
            case 11:
                periodo = this.Mes.Noviembre
                break
            case 12:
                periodo = this.Mes.Diciembre
                break
            default:
                periodo = "Mes"
                break
        }

        return periodo
    }
}



export default PeriodoEnBaseAFrecuencia