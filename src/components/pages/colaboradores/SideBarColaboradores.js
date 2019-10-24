import React, { Component } from 'react';
import { connect } from 'react-redux';

import TablaColaboradores from './TablaColaboradores'
import {Sidebar} from 'primereact/sidebar';



class SideBarColaboradores extends Component {

    constructor(props)
    {
        super(props)

        this.state = {
            sesionMCI : this.props.SesionMCI
        }
    }

    render() {
        return (
            <div>
                <Sidebar visible={this.props.mostrarPanelCompaneros} onHide={(e) => this.props.dispatch({type:'MOSTRAR_PANEL_COMPANEROS', data: false})} style={{width: "350px", overflow: "scroll", marginTop: "30px"}}>
                    <h4 className="font-weight-bold mt-2">
                        Equipo
                    </h4>
                    <TablaColaboradores SesionMCI={this.state.sesionMCI}/>
                </Sidebar>
            </div>
        );
    }
}



function mapStateToProps(state) {
    return {
        mci : state.TableroReducer,
        mesSelected : state.MesSelectReducer,
        colaboradorSelected : state.ColaboradorSelectedReducer,
        mostrarPanelCompaneros : state.MostrarPanelCompaneros
    };
}

export default connect(
    mapStateToProps,
)(SideBarColaboradores);