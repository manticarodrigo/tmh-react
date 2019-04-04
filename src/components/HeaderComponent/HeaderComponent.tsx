import React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import './HeaderComponent.scss';

import { CurrentUser } from '../../reducers/UserReducer';

import logo from '../../assets/logo.png';

interface HeaderComponentProps extends RouteComponentProps {
  currentUser: CurrentUser;
}

const HeaderComponent = (props: HeaderComponentProps) => {
  const { currentUser, location } = props;
  const { pathname } = location;
  return (
    <header className={`header__container${pathname === '/onboarding' ? ' header__container--transparent' : ''}`}>
      {true ? (
        <h1 className="u-margin-hug--top u-margin-hug--bottom">
          <img className="loading__image" src={logo} />
        </h1>
      ) : (
        <Link to="/"><img className="loading__image" src={logo} /></Link>
      )}
      <nav className="header__avatar">
        {currentUser.user.image && (<img src={currentUser.user.image as string} />)}
      </nav>
    </header>
  );
};

export default React.memo(withRouter(HeaderComponent));
