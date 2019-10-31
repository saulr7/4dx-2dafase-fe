import React, { Component } from 'react';
import { connect } from 'react-redux';



class UserSelected extends Component {
    render() {
        return (
            <div>
                 <h5 className="font-weight-bold ">
                    {this.props.colaboradorSelected.nombreColaborador}
                </h5>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        colaboradorSelected : state.ColaboradorSelectedReducer,
    };
}

export default connect(
    mapStateToProps,
)(UserSelected);