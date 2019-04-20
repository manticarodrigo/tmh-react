import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { Store } from 'redux';

import { AppState, store } from './store/Store';

import App from './pages/App/App';
import './styles/main.scss';

interface AppProps {
  store: Store<AppState>;
}

const Root = (props: AppProps) => {
  return (
    <Provider store={props.store}>
      <App />
    </Provider>
  );
};

ReactDOM.render(<Root store={store} />, document.getElementById('root') as HTMLElement);
