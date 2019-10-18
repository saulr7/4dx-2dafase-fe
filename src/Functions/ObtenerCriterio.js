function ObtenerCriterio(Valor, CriterioVerde, CriterioRojo) {

    var operadorV = Operador(CriterioVerde)
    var operadorR = Operador(CriterioRojo)

    var valorCriterioV = CriterioVerde.replace(/[^0-9.,]/g, '')
    var valorCriterioR = CriterioRojo.replace(/[^0-9.,]/g, '')

    var color = "#FFCA28"

    // Verde 39CCC65
    // Amarillo #FFCA28
    // Rojo #DC3545

    if (EsEsteColor(Valor, parseFloat(valorCriterioV), operadorV)) {
        color = "#9CCC65"
    }

    if (EsEsteColor(Valor, valorCriterioR, operadorR))
        color = "#DC3545"

    return color
}

function EsEsteColor(Valor, ValorCriterio, Operador) {

    var esEstecolor = false
    var valor = Valor
    var operador = Operador
    var valorCriterio = ValorCriterio

    switch (operador) {
        case Operadores.MayorQue:
            if (valor > valorCriterio)
                esEstecolor = true
            break
        case Operadores.MayorIgualQue:
            if (valor >= valorCriterio)
                esEstecolor = true
            break
        case Operadores.MenorIgualQue:
            if (valor <= valorCriterio)
                esEstecolor = true
            break
        case Operadores.MenorQue:
            if (valor < valorCriterio)
                esEstecolor = true
            break
        case Operadores.IgualQue:
            if (valor === valorCriterio)
                esEstecolor = true
            break
        default:
            esEstecolor = false
            break
    }

    return esEstecolor
}


function Operador(criterio) {

    if (!criterio)
        return ""

    var operador = ""

    if (criterio.indexOf(">=") > -1)
        return operador = Operadores.MayorIgualQue

    if (criterio.indexOf("<=") > -1)
        return operador = Operadores.MayorIgualQue

    if (criterio.indexOf(">") > -1)
        return operador = Operadores.MayorQue

    if (criterio.indexOf("<") > -1)
        return operador = Operadores.MenorQue

    if (criterio.indexOf("=") > -1)
        return operador = Operadores.IgualQue

    if (criterio.indexOf("!=") > -1)
        return operador = Operadores.DiferenteQue

    return operador


}



const Operadores = {
    MayorQue: "MayorQue",
    MayorIgualQue: "MayorIgualQue",
    IgualQue: "IgualQue",
    MenorQue: "MenorQue",
    MenorIgualQue: "MenorIgualQue",
    DiferenteQue: "DiferenteQue",
}

export default ObtenerCriterio