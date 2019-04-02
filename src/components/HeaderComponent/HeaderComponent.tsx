import React from 'react';
import { Link } from 'react-router-dom';
import './HeaderComponent.scss';

import logo from '../../assets/logo.png';

interface HeaderProps {
  isRoot?: boolean,
  isOnboarding?: boolean,
  avatarUrl?: string,
}

const HeaderComponent = (props: HeaderProps) => (
  <header className={`header__container${props.isOnboarding ? ' header__container--transparent' : ''}`}>
    {props.isRoot ? (
      <h1><img className="loading__image" src={logo}/></h1>
    ) : (
      <Link to="/"><img className="loading__image" src={logo}/></Link>
    )}
    <nav className="header__avatar">
      {props.avatarUrl && (<img src={props.avatarUrl} />)}
    </nav>
  </header>
);

interface HeaderLogoProps {
  isRoot?: boolean,
}

export default React.memo(HeaderComponent);