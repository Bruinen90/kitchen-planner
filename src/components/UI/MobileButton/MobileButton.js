import React from 'react';
import './MobileButton.css';
import {Component} from 'react';

class MobileButton extends Component {
    render() {
        const buttonStyle = {}
        this.props.position < 0 ?
            buttonStyle.right =  -this.props.position * 60 + "px" :
            buttonStyle.left = this.props.position * 60 +10 + "px";

        if(this.props.color) {
            buttonStyle.backgroundColor = "var(--" + this.props.color + "-color)";
            buttonStyle.color = "white";
        }

        this.props.hide ? buttonStyle.display = "none" : null;
        this.props.border ? buttonStyle.border = this.props.border : null;

        let customButtonStyle = Object.assign({}, buttonStyle, this.props.customCss)

        return(
            <div className="mobileButton" style={customButtonStyle} onClick={this.props.whenClicked}>
                {this.props.ionicIconName ? <ion-icon name={this.props.ionicIconName}></ion-icon>:null}
                {this.props.customText ? this.props.customText : null}
            </div>
        );
    }
}

export default MobileButton;
