import React from 'react';
import './Loading.scss';

import logo from '../../assets/logo.png';

const Loading = () => (
  <main className="loading">
    <div className="loading__container">
      <div className="loading__content">
        <h1><img className="loading__image" src={logo}/></h1>
        <p className="loading__status">loading...</p>
      </div>
    </div>
  </main>
);

export default React.memo(Loading);
