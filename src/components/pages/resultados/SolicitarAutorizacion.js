import React, { Component } from 'react';
import { connect } from 'react-redux';
import { axios, JwtPayload } from "../../../config/config";
import Swal from "sweetalert2";  

import RegistrarEventoDelSistema from '../../../services/RegistarEventoDelSistema'

import SendEmailService from '../../../services/SendEmailService'
function mapStateToProps(state) {
    return {

    };
}





class SolicitarAutorizacion extends Component {

    constructor(props)
    {
        super(props)

        this.state = {
            tipo : this.props.Tipo,
            periodo : this.props.Periodo,
            url : this.props.Url,
            descripcion : ""


        }


        this.SendEmail = this.SendEmail.bind(this);
        this.CrearFilaTblFormatoCorreo = this.CrearFilaTblFormatoCorreo.bind(this);
        this.CrearFilaTblResultadoFormatoCorreo = this.CrearFilaTblResultadoFormatoCorreo.bind(this);
        this.ShowModal = this.ShowModal.bind(this);

    }

    SendEmail()
    {
        var colaboradoresEmail = ""

        axios.get("/GetColaboradoresAdmins")
        .then((resp)=>
        {
            if(resp.data && resp.data.length > 0)
            {
                resp.data.map((colaborador, index) => {
                    colaboradoresEmail = colaboradoresEmail +  colaborador.Correo+";"
                    console.log(colaboradoresEmail)
                    return colaboradoresEmail
                })
            }

        var correoFormato = "<!doctype html> <html lang='en'> <head> <!-- Required meta tags --> <meta charset='utf-8'> <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no'> <title>Notificación</title> <style> .btn-info { display: inline-block; font-weight: 400; color: #212529; text-align: center; vertical-align: middle; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; background-color: transparent; border: 1px solid transparent; padding: .375rem .75rem; font-size: 1rem; line-height: 1.5; border-radius: .25rem; transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out; color: #fff; background-color: #17a2b8; border-color: #17a2b8; } #divCol { box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); } #copyright { display: block; font-size: 80%; color: #6c757d; } </style> <!-- Bootstrap CSS --> <link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css' integrity='sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS' crossorigin='anonymous'> </head> <body style='background-color: #f4f4f4;'> <div class='container '> <div class='row m-1 pt-5'> <div id='divCol' class='col-md-10 offset-md-1 col-lg-8 offset-lg-2 bg-white'> <div class='row'> <div class='col' style='background-color: #FFEE11; padding: 0px;'> <nav class='navbar navbar-light '> <h2 class='text-center'> <strong> 4DX-<i>Tablero </i> </strong> </h2> </nav> </div> </div> <div class='row mt-2 pt-3'> <div class='col'> <h4 class='font-weight-bold'>Nueva solicitud de autorización para ingreso de resultados</h4> </div> </div> <div class='row mt-3'> <div class='col text-center'> <h6 class=''>Descripción:</h6> </div> </div> <div class='row mt-3'> <div class='col text-center'> <p> @descripcion </p> </div> </div> <div class='row mt-3'> <div class='col text-center'> <h6>Datos colaborador:</h6> </div> </div> <div class='row'> <div class='col '> <table class='table'> <tbody> @filasTblColaborador </tbody> </table> </div> </div> <div class='row mt-3'> <div class='col text-center'> <h6 class=''>Datos resultado:</h6> </div> </div> <div class='row '> <div class='col '> <table class='table'> <tbody> @filasTblResultado </tbody> </table> </div> </div> <div class='row mt-2 pt-3'> <div class='col '> <div class='d-flex justify-content-center m-2'><a href='http://10.1.133.2:3000/@Url' target='blank' class='btn btn-info'>Ver resultado</a></div> <h4 class='text-center pb-4'>¡Feliz Día!</h4> <h6 id='copyright' class='text-center'>&copy 4DX-Tablero 2019 </h6> </div> </div> </div> </div> </div> <!-- jQuery first, then Popper.js, then Bootstrap JS --> <script src='https://code.jquery.com/jquery-3.3.1.slim.min.js' integrity='sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo' crossorigin='anonymous'></script> <script src='https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js' integrity='sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut' crossorigin='anonymous'></script> <script src='https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js' integrity='sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k' crossorigin='anonymous'></script> </body> </html>"
        var filasTblColaborador = this.CrearFilaTblFormatoCorreo()
        var filasTblResultado = this.CrearFilaTblResultadoFormatoCorreo()

        correoFormato = correoFormato.replace("@filasTblColaborador", filasTblColaborador) 
        correoFormato = correoFormato.replace("@filasTblResultado", filasTblResultado) 
        correoFormato = correoFormato.replace("@Url", this.state.url) 
        correoFormato = correoFormato.replace("@descripcion", this.state.descripcion) 

        SendEmailService(colaboradoresEmail, "Solicitud de autorización para ingreso de resultados"+colaboradoresEmail , correoFormato)

        RegistrarEventoDelSistema("Solicitó autorización para ingresar resultado")
            
        })

    }

    CrearFilaTblFormatoCorreo()
    {
        var user = JwtPayload().usuario

        var filaNombre = " <tr> <th>Nombre</th> <td>"+user.EmpleadoNombre+"</td> </tr>"
        var filaCodigo = " <tr> <th>Código</th> <td>"+user.Empleado+"</td> </tr>"
        var filaCorreo = " <tr> <th>Correo</th> <td>"+user.Correo+"</td> </tr>"

        return filaNombre + filaCodigo + filaCorreo
    }

    CrearFilaTblResultadoFormatoCorreo()
    {
        var user = JwtPayload().usuario
        console.log(user)

        var filaTipo = " <tr> <th>Tipo</th> <td>"+this.state.tipo+"</td> </tr>"
        var filaPeriodo = " <tr> <th>Período</th> <td>"+this.state.periodo+"</td> </tr>"

        return filaTipo + filaPeriodo
    }


    ShowModal(event)
    {

        Swal.fire({
            title: '¿Solicitar autorización?',
            text: "¿Deseas enviar una notificación solicitando autorización para ingresar el resultado de este período?",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            // cancelButtonColor: '#d33',
            confirmButtonText: 'Solicitar'
          }).then((result) => {
            if (result.value) {
                Swal.fire({
                    title: 'Ingresa una descripción del por qué solicitas autorización',
                    input: 'textarea',
                    inputAttributes: {
                      autocapitalize: 'off'
                    },
                    showCancelButton: true,
                    confirmButtonText: 'Enviar',
                    showLoaderOnConfirm: true,
                    preConfirm: (login) => {
                      
                    },
                    allowOutsideClick: () => !Swal.isLoading()
                  }).then((result) => {
                    if (result.value) {
                        this.setState({
                            descripcion : result.value
                        })
                        this.SendEmail()
                        Swal.fire('Solicitud enviada', 'Éxito', 'success')

                    }
                    else
                    {
                        Swal.fire('No enviado', )
                    }
                  })
            }
          })
    }

    render() {
        return (
            <div className="d-inline">
                <button 
                    className="btn btn-primary m-1"  
                    data-toggle="tooltip" 
                    data-placement="top" 
                    title="Solicitar autorización" 
                    onClick={this.ShowModal}>
                    <i className="fa fa-envelope" aria-hidden="true"></i>
                </button>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(SolicitarAutorizacion);