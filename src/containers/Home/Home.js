import React, { Component } from 'react';

import './Home.css';

import kitchen_pic from '../../img/kitchen_pic.jpg';

class Home extends Component {
  render() {
    return (
      <div style={{backgroundImage: "url("+kitchen_pic+")"}} className="mainPic">
      </div>
    );
  }
}
export default Home;
