import { compose, applyMiddleware, combineReducers, createStore, Store } from 'redux';
import thunk from 'redux-thunk';

// Import reducers and state type
import {
  UserReducer,
  UserState,
} from '../reducers/UserReducer';

import {
  ProjectReducer,
  ProjectState,
} from '../reducers/ProjectReducer';

// Create an interface for the application state
export interface AppState {
  userState: UserState;
  projectState: ProjectState;
}

// Create the root reducer
const rootReducer = combineReducers<AppState>({
  userState: UserReducer,
  projectState: ProjectReducer,
});

// Create a configure store function of type `AppState`
export default function configureStore(initialState?: {}): Store<AppState, any> {
  const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(thunk)));
  return store;
}