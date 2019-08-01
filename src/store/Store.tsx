import React, { createContext, ReactNode, Dispatch } from 'react';

import { useAsyncReducer } from 'hooks/useAppState';
import { AuthAction } from 'store/actions/AuthActions';
import { ProjectAction } from 'store/actions/ProjectActions';
import { AuthState, authReducer, loadLocalUserState } from 'store/reducers/AuthReducer';
import { ProjectState, projectReducer } from 'store/reducers/ProjectReducer';

type AppState = {
  authState: AuthState,
  projectState: ProjectState,
};

type AppAction = AuthAction | ProjectAction;

type ProviderProps = {
  children: ReactNode;
};

type ProviderAsyncAction = (dispatch: Dispatch<AppAction>) => any;
type ProviderDispatch = (action: AppAction | ProviderAsyncAction) => any;

type ProviderValue = [AppState, ProviderDispatch];

const rootReducer = (state: AppState, action: AppAction) => ({
  authState: authReducer(state.authState, action as AuthAction),
  projectState: projectReducer(state.projectState, action as ProjectAction),
});

const initialState: AppState = {
  authState: loadLocalUserState(),
  projectState: {},
};

export const AppStateContext = createContext<ProviderValue>([initialState, () => undefined]);

export const AppStateProvider = ({ children }: ProviderProps) => (
  <AppStateContext.Provider value={useAsyncReducer(rootReducer, initialState)}>
    {children}
  </AppStateContext.Provider>
);
