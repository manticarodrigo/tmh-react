import { compose, applyMiddleware, combineReducers, createStore, Store } from 'redux';
import thunk from 'redux-thunk';

// Import reducers and state type
import {
  UserReducer,
  UserState,
} from '../reducers/UserReducer';

// Create an interface for the application state
export interface AppState {
  authState: UserState;
}

// Create the root reducer
const rootReducer = combineReducers<AppState>({
  authState: UserReducer,
});

// Create a configure store function of type `AppState`
export default function configureStore(): Store<AppState, any> {
  const devTools = (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__();
  const store = createStore(rootReducer, undefined, applyMiddleware(thunk));
  return store;
}