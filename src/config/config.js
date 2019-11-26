import axios from 'axios';
import { Service } from 'axios-middleware';


/* PRUEBAS */
// const UrlBase = "http://10.100.203.46:8087"

//const UrlBase = "http://10.100.203.46:8087"



/* Desarrollo */


    const UrlBase = "http://10.1.133.2:8087"
    // const UrlBase = "http://localhost:8087"

//const UrlBase = "http://10.1.133.2:8087"
 //const UrlBase = "http://localhost:8087"




axios.defaults.baseURL = UrlBase
axios.defaults.headers.common['Authorization'] = `Bearer ${Token()}`
axios.defaults.headers.post['Content-Type'] = 'application/json';

const service = new Service(axios);

service.register({
    onRequest(config) {
        Token()
        return config;
    },
    onSync(promise) {
        return promise;
    },
    onResponse(response) {
        return response;
    }
});


function JwtPayload() {
    var token = localStorage.getItem("usr_token")

    if (!token) {
        window.location.href = "/";
        return;
    }

    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    if (!jsonPayload)
        return ""

    return JSON.parse(jsonPayload);
};



function Token() {
    var token = localStorage.getItem("usr_token")

    if (!token || token == null) {
        localStorage.removeItem("usr_token")
        return "";
    }


    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    var payload = JSON.parse(atob(base64));

    var jwt = payload;

    var horaActual = new Date().getTime() / 1000;

    if (horaActual > jwt.exp) {
        console.log("Expirado")
        localStorage.removeItem("usr_token")
        window.location.reload();
        return ""
    }


    return token

}

var EmailFormat = "<!doctype html> <html lang='en'> <head> <!-- Required meta tags --> <meta charset='utf-8'> <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no'> <title>Notificación</title> <style> body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'; font-size: 1rem; font-weight: 400; line-height: 1.5; color: #212529; text-align: left; } .btn-info { display: inline-block; font-weight: 400; color: #212529; text-align: center; vertical-align: middle; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; background-color: transparent; border: 1px solid transparent; padding: .375rem .75rem; font-size: 1rem; line-height: 1.5; border-radius: .25rem; transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out; color: #fff; background-color: #17a2b8; border-color: #17a2b8; } #divCol { box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); } #copyright { display: block; font-size: 80%; color: #6c757d; } .container { width: 90%; margin: 0 auto; } .navbar { position: relative; display: -ms-flexbox; display: flex; -ms-flex-wrap: wrap; flex-wrap: wrap; -ms-flex-align: center; align-items: center; -ms-flex-pack: justify; justify-content: space-between; padding: .5rem 1rem; } .h1, .h2, .h3, .h4, .h5, .h6, h1, h2, h3, h4, h5, h6 { margin-bottom: .5rem; font-family: inherit; font-weight: 500; line-height: 1.2; color: inherit; } h2 { font-size: 2rem; } .font-weight-bold { font-weight: 700!important; } .h4, h4 { font-size: 1.5rem; } .pt-5, .py-5 { padding-top: 3rem!important; } .m-1 { margin: .25rem!important; } .h3, h3 { font-size: 1.75rem; } .text-center { text-align: center!important; } .m-2 { margin: .5rem!important; } .justify-content-center { -ms-flex-pack: center!important; justify-content: center!important; } .d-flex { display: -ms-flexbox!important; display: flex!important; } .table { width: 100%; margin-bottom: 1rem; background-color: transparent; } table { border-collapse: collapse; } tbody { display: table-row-group; vertical-align: middle; border-color: inherit; } tr { display: table-row; vertical-align: inherit; border-color: inherit; } .table td, .table th { padding: .75rem; vertical-align: top; border-top: 1px solid #dee2e6; } @media (min-width: 600px) { .container { width: 65%; margin: 0 auto; } } </style> <!-- Bootstrap CSS --> <link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css' integrity='sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS' crossorigin='anonymous'> </head> <body style='background-color: #f4f4f4;'> <div class='container '> <div class='row m-1 pt-5'> <div id='divCol' class='col-md-10 offset-md-1 col-lg-8 offset-lg-2 bg-white'> <div class='row'> <div class='col' style='background-color: #FFEE11; padding: 0px;'> <nav class='navbar navbar-light '> <h2 class='text-center'> <strong> 4DX-<i>Tablero </i> </strong> </h2> </nav> </div> </div> <div class='row mt-2 pt-3'> <div class='col'> <h4 class='font-weight-bold'>Nueva solicitud de autorización para ingreso de resultados</h4> </div> </div> <div class='row mt-3'> <div class='col text-center'> <h3 class=''>Descripción:</h3> </div> </div> <div class='row mt-3'> <div class='col text-center'> <p> @descripcion </p> </div> </div> <div class='row mt-3'> <div class='col text-center'> <h3>Datos colaborador:</h3> </div> </div> <div class='row'> <div class='col '> <table class='table'> <tbody> @filasTblColaborador </tbody> </table> </div> </div> <div class='row mt-3'> <div class='col text-center'> <h3 class=''>Datos resultado:</h3> </div> </div> <div class='row '> <div class='col '> <table class='table'> <tbody> @filasTblResultado </tbody> </table> </div> </div> <div class='row mt-2 pt-3'> <div class='col '> <div class='d-flex justify-content-center m-2'><a href='http://10.1.133.49:3000/@Url' target='blank' class='btn btn-info'>Ver resultado</a></div> <h4 class='text-center pb-4'>¡Feliz Día!</h4> <h6 id='copyright' class='text-center'>&copy 4DX-Tablero 2019 </h6> </div> </div> </div> </div> </div> <!-- jQuery first, then Popper.js, then Bootstrap JS --> <script src='https://code.jquery.com/jquery-3.3.1.slim.min.js' integrity='sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo' crossorigin='anonymous'></script> <script src='https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js' integrity='sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut' crossorigin='anonymous'></script> <script src='https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js' integrity='sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k' crossorigin='anonymous'></script> </body> </html>"

export { UrlBase, axios, JwtPayload, EmailFormat }