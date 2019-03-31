import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { Store } from 'redux';

import configureStore, { AppState } from './store/Store';

interface Props {
  store: Store<AppState>;
}

import './styles/main.scss';
import App from './components/App';

const Root: React.FunctionComponent<Props> = props => {
  return (
    <Provider store={props.store}>
      <App />
    </Provider>
  );
};

// Generate the store
const store = configureStore();

ReactDOM.render(<Root store={store} />, document.getElementById('root') as HTMLElement);
