import React, { Component } from 'react';
import { connect } from 'react-redux';



class NotFound extends Component {
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col text-center">
                            <h1 className="display-3 font-weight-bold pt-4 mt-4">Not Found</h1>
                            <h2 className="display-3 font-weight-bold">
                                <i className="fa fa-code " aria-hidden="true"></i>
                            </h2>
                        </div>
                    </div>
                </div>
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
)(NotFound);