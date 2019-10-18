import React, { Component } from 'react';
import { connect } from 'react-redux';
import Swal from "sweetalert2";  

function mapStateToProps(state) {
    return {

    };
}





class SolicitarAutorizacion extends Component {

    constructor(props)
    {
        super(props)

        this.ShowModal = this.ShowModal.bind(this);

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
                      console.log("Amonos pues")
                    },
                    allowOutsideClick: () => !Swal.isLoading()
                  }).then((result) => {
                    if (result.value) {
                        Swal.fire('Solicitud enviada', 'Éxito', 'success')
                    }
                    else
                    {
                        console.log("Canceló")
                        // Swal.fire('Solicitud no enviada', 'Error', 'error')
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