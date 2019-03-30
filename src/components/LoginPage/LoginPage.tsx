import React, { Component } from 'react';
import './LoginPage.scss';
import logo from '../../assets/logo.png';

class App extends Component {
  render() {
    return (
      <div className="login">
        <div className="login__container">
          <div className="login__container__inner">
            <img src={logo} />
            <div className="login__form">
              <input type="text" placeholder="USERNAME" />
              <input type="password" placeholder="PASSWORD" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
