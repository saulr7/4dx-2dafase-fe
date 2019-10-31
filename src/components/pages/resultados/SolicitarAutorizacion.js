import React, { Component } from 'react';
import { connect } from 'react-redux';
import { JwtPayload , EmailFormat } from "../../../config/config";
import Swal from "sweetalert2";  

import RegistrarEventoDelSistema from '../../../services/RegistarEventoDelSistema'

import SendEmailService from '../../../services/SendEmailService'


class SolicitarAutorizacion extends Component {

    constructor(props)
    {
        super(props)

        this.state = {
            tipo : this.props.Tipo,
            periodo : this.props.Periodo,
            url : this.props.Url,
            colaboradorId : this.props.ColaboradorId,
            descripcion : ""
        }


        this.SendEmail = this.SendEmail.bind(this);
        this.CrearFilaTblFormatoCorreo = this.CrearFilaTblFormatoCorreo.bind(this);
        this.CrearFilaTblResultadoFormatoCorreo = this.CrearFilaTblResultadoFormatoCorreo.bind(this);
        this.ShowModal = this.ShowModal.bind(this);

    }

    SendEmail()
    {
        var correoFormato = EmailFormat 
        var filasTblColaborador = this.CrearFilaTblFormatoCorreo()
        var filasTblResultado = this.CrearFilaTblResultadoFormatoCorreo()

        correoFormato = correoFormato.replace("@filasTblColaborador", filasTblColaborador) 
        correoFormato = correoFormato.replace("@filasTblResultado", filasTblResultado) 
        correoFormato = correoFormato.replace("@Url", this.state.url) 
        correoFormato = correoFormato.replace("@descripcion", this.state.descripcion) 

        SendEmailService("", "Solicitud de autorización para ingreso de resultados" , correoFormato, this.state.colaboradorId.toString())

        RegistrarEventoDelSistema("Solicitó autorización para ingresar resultado")


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

function mapStateToProps(state) {
    return {

    };
}


export default connect(
    mapStateToProps,
)(SolicitarAutorizacion);