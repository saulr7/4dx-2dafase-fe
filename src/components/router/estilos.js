
export function Estilos()
{
    
    var estilo = null
    var backgroundColor = "#FFEF11"
    var colortxtTitle = "#DEDEDE"
    var coloriconoMenu = "#004080"
    var fontSize= "20px"
    var margin= "2px"
    var color= "black"
    
    var tema = localStorage.getItem("tema")


    switch (tema) {
        case "banpais":
            backgroundColor = "#FFEF11"
            colortxtTitle = "#DEDEDE"
            coloriconoMenu = "#004080"
            fontSize= "20px"
            margin= "2px"
            color= "black"   
        break;
    case "4dx":
            backgroundColor = "#192A56"
            colortxtTitle = "#004080"
            coloriconoMenu = "#1ABC9C"
            fontSize= "20px"
            margin= "2px"
            color= "white"
        break
    default:
            backgroundColor = "#192A56"
            colortxtTitle = "#004080"
            coloriconoMenu = "#1ABC9C"
            fontSize= "20px"
            margin= "2px"
            color= "white"
        break;
    }

        estilo = {
            bgBanpais : {
                backgroundColor
            },
            txtTitle : {
                color: colortxtTitle
            },
            iconoMenu : {
                color: coloriconoMenu,
                fontSize,
                margin
            },
            menuItem :{
                color,
            },
            txtColor : {
                color
            }
        }
    
    return estilo
}
