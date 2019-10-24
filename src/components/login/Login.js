import React from 'react'
import './Login.css'

import Loading from '../common/Loading'

import  {UrlBase} from "../../config/config";

import axios from 'axios';
import { JwtPayload } from "../../config/config";
import {connect} from 'react-redux';
import Swal from "sweetalert2";  

class Login extends React.Component {

    constructor(props)
    {
        super(props)
        
        this.state = {txtEmpleadoCodigo : "" , txtPassword: "", Cargando : false}

        this.SignIn = this.SignIn.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this)
        this.validate_credentials = this.validate_credentials.bind(this)
        this.validate_credentials = this.validate_credentials.bind(this)
        this.onEnterPress = this.onEnterPress.bind(this)
        this.next = this.next.bind(this)

    }

    componentDidMount() {
      this.txtUsuario.focus();
    }
  

    handleTextChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;

        this.setState({
          [name]: value
        });
    }

    onEnterPress = (e) => {
      console.log(e)
      if(e.keyCode === 13 && e.shiftKey === false) {
        e.preventDefault();
        this.SignIn()
      }
    }
   
    next = (e) => {
      if(e.keyCode === 13 && e.shiftKey === false) {
        e.preventDefault();
        this.txtPassword.focus();
      }
    }


    SignIn() {

      if(!this.validate_credentials())
        return

        this.setState(state => ({
          Cargando: true
        }));

        

        var credenciales = {
          codigoEmpleado : this.state.txtEmpleadoCodigo,
          password : this.state.txtPassword
        }

        var data = JSON.stringify(credenciales)

        axios.post( UrlBase +'/login' , data   )
        
        .then(res => {
          this.setState(state => ({Cargando: false }));
          if(res.data)
          {
            localStorage.setItem("usr_token", res.data)
            var user = JwtPayload().usuario   

            var colaborador = {
                nombreColaborador : user.EmpleadoNombre,
                colaboradorId : user.Empleado
            }
            
            this.props.dispatch({type:'ACTUALIZAR_COLABORADOR', data: colaborador}) 
            // window.location.href = "/tablero";
            window.location.reload();
          }
        }).catch((error) => 
        {
          console.log(error)
          this.setState(state => ({Cargando: false }));
          Swal.fire({  
            title: error.response ? error.response.data : "Error",  
            type: 'error',  
            text: "Error",  
        });
        })

           
      }

      validate_credentials()
      {
        if(!this.state.txtEmpleadoCodigo)
        {
          this.txtUsuario.focus();
          Swal.fire({  
              title: 'Ingresa el código de empleado',  
              type: 'warning',  
              text: "Atención",  
          });
          return false
        }

        if(!this.state.txtPassword)
        {
          this.txtPassword.focus();
          Swal.fire({  
              title: 'Ingresa la contraseña',  
              type: 'warning',  
              text: "Atención",  
          });
          return false
        }
          
          return true
      }


    render() {

        return (
            
              <div className="col-10 col-md-6 col-lg-4 mt-4 py-4 card-box bg-white" id="cardLogin" >
          
                  <h5 className="text-justify my-4">
                    Inicia sesión con tu código de empleado y contraseña de 4DX
                  </h5>
                  
                  <label className="sr-only" htmlFor="txtUsuario">Usuario</label>
                  <div className="input-group mb-2 mr-sm-2 pt-3 mt-3">
                      <div className="input-group-prepend">
                          <div className="input-group-text">
                              <i className="fa fa-user" aria-hidden="true"></i>
                          </div>
                      </div>
                      <input 
                        type="text" 
                        className="form-control" 
                        name="txtEmpleadoCodigo" 
                        id="txtUsuario" 
                        value = { this.state.txtEmpleadoCodigo } 
                        placeholder="Código" 
                        onChange={this.handleTextChange} 
                        onKeyDown={this.next}
                        ref={(input) => { this.txtUsuario = input; }}/>
                  </div>
          
                  <label className="sr-only" htmlFor="txtPassword">Password</label>
                  <div className="input-group mb-2 mr-sm-2 pt-3 mt-3">
                      <div className="input-group-prepend">
                          <div className="input-group-text">
                               <i className="fa fa-key" aria-hidden="true"></i>
                          </div>
                      </div>
                      <input 
                        type="password" 
                        className="form-control" 
                        name="txtPassword" 
                        id="txtPassword" 
                        value = { this.state.txtPassword } 
                        placeholder="Password"  
                        onChange={this.handleTextChange} 
                        onKeyDown={this.onEnterPress}
                        ref={(input) => { this.txtPassword = input; }}/>
                  </div>
          
                  <div className="row"> 
                      <div className="col text-center">
                            <Loading Cargando={this.state.Cargando} />
                      </div>
                  </div>

          
                  <div className="form-group">
                      <div className="row">
                          <div className="col col-sm-12 col-md-8 offset-md-2  justify-content-center d-flex pt-2 mt-2" >
                              <button type="submit" className="btn btn-primary" onClick={this.SignIn}>Iniciar Sesión</button>
                          </div>
                      </div>
                  </div>

          </div>
        )
    }
}


const mapStateToProps = (state) => {

  return {
      mci : state.TableroReducer,
      mesSelected : state.MesSelectReducer,
      colaboradorSelected : state.ColaboradorSelectedReducer,
      mostrarPanelCompaneros : state.MostrarPanelCompaneros
      
  }
}


export default connect(mapStateToProps)( Login);
