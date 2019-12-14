import React, { Component } from 'react';


class BtnPDF extends Component {
    render() {
        return (
            <div>
                <button className="btn text-danger d-print-none"
                    onClick={()=> window.print()} >
                    <i className="fa fa-file-pdf-o" aria-hidden="true" style={{fontSize: '1.6rem'}}></i>
                </button> 
            </div>
        );
    }
}

export default (BtnPDF);