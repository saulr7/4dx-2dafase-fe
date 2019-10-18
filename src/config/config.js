import axios from 'axios';
import { Service } from 'axios-middleware';


const UrlBase = "http://10.1.133.2:8087"
    // const UrlBase = "http://localhost:8087"
    // const UrlBase = "http://10.1.133.49:8087"


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



export { UrlBase, axios, JwtPayload }