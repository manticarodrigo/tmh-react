import React from 'react';
import ReactDOM from 'react-dom';
import 'styles/main.scss';

import { AppStateProvider } from 'store/Store';
import App from 'pages/App/App';

const Root = () => (
  <AppStateProvider>
    <App />
  </AppStateProvider>
);

ReactDOM.render(<Root />, document.getElementById('root') as HTMLElement);
