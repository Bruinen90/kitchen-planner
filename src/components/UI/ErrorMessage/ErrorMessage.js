import React, {Component} from 'react';

import './ErrorMessage.css';

class ErrorMessage extends Component {
    render () {
        let message = null;
    switch(this.props.errorType) {
        case "tooHeight":
            message = "Wysokość frontu szuflady przekracza zalecaną maksymalną wysokość 400mm";
            break;
        case "tooLow":
            message = "Wysokość frontu szuflady jest mniejsza niż zalecana minimalna wysokość 120mm"
            break;
        default:
            message = "";
    }
    return (
        <div className="errorMessage">
            {message}
        </div>
    )
    }
}


export default ErrorMessage;
