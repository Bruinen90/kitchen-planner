import React from 'react';
import './MobileButton.css';
import {Component} from 'react';

class MobileButton extends Component {
    render() {
        let buttonStyle = {}
        this.props.position < 0 ?
            buttonStyle.right =  -this.props.position * 60 + "px" :
            buttonStyle.left = this.props.position * 60 + "px";

        if(this.props.color) {
            buttonStyle.backgroundColor = "var(--" + this.props.color + "-color)";
            buttonStyle.color = "white";
        }

        return(
            <div className="mobileButton" style={buttonStyle}>
                {this.props.ionicIconName ? <ion-icon name={this.props.ionicIconName}></ion-icon>:null}
            </div>
        );
    }
}

export default MobileButton;
