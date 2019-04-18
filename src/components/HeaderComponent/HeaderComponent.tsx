import React, { Component } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import './HeaderComponent.scss';

import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';
import { logout } from '../../actions/AuthActions';
import { CurrentAuth, User } from '../../reducers/AuthReducer';

import { AppRoutes } from '../../containers/App/App';

import userPlaceholder from '../../assets/images/utility/user.png';
import logo from '../../assets/logo.png';

interface HeaderComponentProps extends RouteComponentProps {
  auth?: CurrentAuth;
  title?: string;
  logout: () => void;
}

class HeaderComponent extends Component<HeaderComponentProps, any> {
  state = {
    menuOpen: false,
  };

  handleMenuOpen = () => this.setState({ menuOpen: true });

  handleMenuClose = () => this.setState({ menuOpen: false });

  handleLogout = () => this.props.logout();

  render() {
    const { auth, location, title } = this.props;
    const { menuOpen } = this.state;

    const styleModifiers = location.pathname === AppRoutes.ONBOARDING ? ' header--transparent' : '';

    return (
      <header className={`header${styleModifiers}`}>
        <div className="header__title">
          {location.pathname === AppRoutes.DASHBOARD ? (
            <h1 className="u-margin-hug--vert"><img className="header__logo" src={logo} /></h1>
          ) : (
            <Link to="/"><img className="header__logo" src={logo} /></Link>
          )}
          {title && (<h2 className="u-margin-hug--vert">{title}</h2>)}
        </div>
        {auth && (
          <React.Fragment>
            <button className="header__avatar" onClick={this.handleMenuOpen}>
              <img src={auth.user.image ? auth.user.image as string : userPlaceholder} />
            </button>
            <span
              className={`header__overlay${menuOpen ? ' header__overlay--open' : ''}`}
              onClick={this.handleMenuClose}
            />
            <nav className={`header__menu${menuOpen ? ' header__menu--open' : ''}`}>
              <div className="header__menu__inner">
                <div className="header__menu__profile">
                  <img src={auth.user.image ? auth.user.image as string : userPlaceholder} />
                  <p>
                    <span className="u-text-bold h3">{new User(auth.user).getFullName()}</span>
                    <br />
                    {new User(auth.user).email}
                  </p>
                  <button className="u-text-uppercase">View Profile</button>
                </div>
                <hr />
                <ul className="u-list-unstyled u-text-uppercase">
                  <li><Link to={AppRoutes.ONBOARDING} onClick={this.handleMenuClose}>New Project</Link></li>
                  <li><Link to={AppRoutes.DASHBOARD} onClick={this.handleMenuClose}>All Projects</Link></li>
                  <li><Link to={AppRoutes.LOGIN} onClick={this.handleLogout}>Logout</Link></li>
                </ul>
              </div>
            </nav>
          </React.Fragment>
        )}
      </header>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  logout: () => dispatch(logout()),
});

export default withRouter(connect(null, mapDispatchToProps)(HeaderComponent));
