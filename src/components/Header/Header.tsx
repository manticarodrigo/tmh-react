import React, { useState } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import './Header.scss';

import useAppState from 'hooks/useAppState';
import { logout } from 'store/actions/AuthActions';
import { User, CurrentAuth } from 'store/reducers/AuthReducer';

import { AppRoutes } from 'pages/App/App';

import userPlaceholder from 'assets/images/utility/user.png';
import logo from 'assets/logo.png';

type HeaderProps = RouteComponentProps & {
  auth?: CurrentAuth;
  title?: string;
};

const Header = ({ location, title }: HeaderProps) => {
  const [{ authState: { auth } }, dispatch] = useAppState();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuOpen = () => setIsMenuOpen(true);

  const handleMenuClose = () => setIsMenuOpen(false);

  const handleLogout = () => dispatch(logout());

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
          <button className="header__avatar" onClick={handleMenuOpen}>
            <img src={auth.user.image ? auth.user.image as string : userPlaceholder} />
          </button>
          <span
            className={`header__overlay${isMenuOpen ? ' header__overlay--open' : ''}`}
            onClick={handleMenuClose}
          />
          <nav className={`header__menu${isMenuOpen ? ' header__menu--open' : ''}`}>
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
                <li><Link to={AppRoutes.ONBOARDING} onClick={handleMenuClose}>New Project</Link></li>
                <li><Link to={AppRoutes.DASHBOARD} onClick={handleMenuClose}>All Projects</Link></li>
                <li><Link to={AppRoutes.LOGIN} onClick={handleLogout}>Logout</Link></li>
              </ul>
            </div>
          </nav>
        </React.Fragment>
      )}
    </header>
  );
};

export default withRouter(Header);
