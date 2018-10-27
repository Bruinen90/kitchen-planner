import React from 'react';
import './MobileButton.css';
import {Component} from 'react';

class MobileButton extends Component {
    render() {
        const buttonStyle = {}
        this.props.position < 0 ?
            buttonStyle.right =  -this.props.position * 55 +10 + "px" :
            buttonStyle.left = this.props.position * 55 +10 + "px";

        if(this.props.color) {
            buttonStyle.backgroundColor = "var(--" + this.props.color + "-color)";
            buttonStyle.color = "white";
        }

        this.props.hide ? buttonStyle.display = "none" : null;
        this.props.border ? buttonStyle.border = this.props.border : null;

        let customButtonStyle = Object.assign({}, buttonStyle, this.props.customCss)

        let content = ""

        if(this.props.ifAlternative) {
            content = <ion-icon name={this.props.alternativeIconName}></ion-icon>
            customButtonStyle = Object.assign(customButtonStyle, this.props.alternativeCss)
        } else if (this.props.ionicIconName) {
            content = <ion-icon name={this.props.ionicIconName}></ion-icon>
        } else if (this.props.customText) {
            content = this.props.customText
        }

        return(
            <div className="mobileButton" style={customButtonStyle} onClick={this.props.whenClicked}>
                {content}
            </div>
        );
    }
}

export default MobileButton;
