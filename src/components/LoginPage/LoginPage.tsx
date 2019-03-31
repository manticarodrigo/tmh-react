import React, { Component } from 'react';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import './LoginPage.scss';

import { AppState } from '../../store/Store';
import { User, UserState } from '../../reducers/UserReducer';
import { login } from '../../actions/UserActions';

import logo from '../../assets/logo.png';

interface LoginProps {
  currentUser?: User;
  login: (username: string, password: string) => Promise<User>
}

class LoginPage extends Component<LoginProps> {
  state = {
    username: '',
    password: '',
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  handleSubmit = () => {
    const { username, password } = this.state;
    this.props.login(username, password);
  }

  public render() {
    const { currentUser } = this.props;
    const { username, password } = this.state;

    console.log(currentUser);

    return (
      <div className="splash">
        <div className="splash__container">
          <div className="splash__container__inner">
            <img className="login__logo" src={logo} />
            <div className="login__form">
              <input
                type="text"
                name="username"
                value={username}
                placeholder="USERNAME"
                onChange={this.handleInputChange}
              />
              <input
                type="password"
                name="password"
                value={password}
                placeholder="PASSWORD"
                onChange={this.handleInputChange}
              />
              <button onClick={this.handleSubmit}>LOG IN</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store: AppState) => {
  return {
    currentUser: store.authState.currentUser,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<UserState, any, Action>) => {
  return {
    login: (username: string, password: string) => dispatch(login(username, password)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPage);