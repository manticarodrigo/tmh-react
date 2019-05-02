import { applyMiddleware, combineReducers, compose, createStore, Store } from 'redux';
import thunk from 'redux-thunk';

// Import reducers and state type
import {
  AuthReducer,
  AuthState,
} from './reducers/AuthReducer';

import {
  ProjectReducer,
  ProjectState,
} from './reducers/ProjectReducer';

// Create an interface for the application state
export interface AppState {
  authState: AuthState;
  projectState: ProjectState;
}

// Create the root reducer
const rootReducer = combineReducers<AppState>({
  authState: AuthReducer,
  projectState: ProjectReducer,
});

// Create a configure store function of type `AppState`
function configureStore(initialState?: {}): Store<AppState, any> {
  const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(thunk)));
}

// Generate the store
export const store = configureStore();
