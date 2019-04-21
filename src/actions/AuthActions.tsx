import axios from 'axios';
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { AuthState, CurrentAuth, RegisterForm, saveUserState } from '../reducers/AuthReducer';

export enum AuthActionTypes {
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  LOGOUT = 'LOGOUT',
}

export interface AuthLoginAction {
  type: AuthActionTypes.LOGIN;
  auth: CurrentAuth;
}

export const login: ActionCreator<
  ThunkAction<Promise<any>, AuthState, void, AuthLoginAction>
> = (username: string, password: string) => (async (dispatch: Dispatch) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/rest-auth/login/`,
      { username, password },
    );

    saveUserState(response.data);

    dispatch({
      auth: response.data,
      type: AuthActionTypes.LOGIN,
    });

  } catch (error) {
    throw error;
  }
});

export interface UserRegisterAction {
  type: AuthActionTypes.REGISTER;
  auth: CurrentAuth;
}

export const register: ActionCreator<
  ThunkAction<Promise<any>, AuthState, void, UserRegisterAction>
> = (registerForm: RegisterForm) => (async (dispatch: Dispatch) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/rest-auth/registration/`,
      registerForm,
    );

    saveUserState(response.data);

    dispatch({
      auth: response.data,
      type: AuthActionTypes.LOGIN,
    });
  } catch (error) {
    return error;
  }
});

export interface UserLogoutAction {
  type: AuthActionTypes.LOGOUT;
}

export const logout: ActionCreator<any> = () => ((dispatch: Dispatch) => {
  saveUserState(undefined);
  dispatch({ type: AuthActionTypes.LOGOUT });
});

export type AuthActions = AuthLoginAction | UserRegisterAction | UserLogoutAction;
