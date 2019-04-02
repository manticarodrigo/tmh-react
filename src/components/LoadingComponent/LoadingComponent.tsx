import React from 'react';
import './LoadingComponent.scss';

import logo from '../../assets/logo.png';

const LoadingComponent = () => (
  <main className="splash">
    <div className="splash__container">
      <div className="loading__content">
        <h1><img className="loading__image" src={logo}/></h1>
        <p className="loading__status">loading...</p>
      </div>
    </div>
  </main>
);

export default React.memo(LoadingComponent);