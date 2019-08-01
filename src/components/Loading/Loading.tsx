import React from 'react';
import './Loading.scss';

const Loading = () => (
  <main className="loading">
    <div className="loading__container">
      <div className="loading__content">
        <h1><img className="loading__image" src={require('assets/logo.png')}/></h1>
        <p className="loading__status">loading...</p>
      </div>
    </div>
  </main>
);

export default Loading;
