import axios from 'axios';
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { AuthState, CurrentAuth, saveUserState } from '../reducers/AuthReducer';

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
> = (username, password) => (async (dispatch: Dispatch) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/rest-auth/login/`, { username, password });

    saveUserState(response.data);

    dispatch({
      auth: response.data,
      type: AuthActionTypes.LOGIN,
    });
  } catch (err) {
    return err;
  }
});

export interface UserRegisterAction {
  type: AuthActionTypes.REGISTER;
  auth: CurrentAuth;
}

export const register: ActionCreator<
  ThunkAction<Promise<any>, AuthState, void, UserRegisterAction>
> = ({
  username,
  first_name,
  last_name,
  email,
  password1,
  password2,
}) => (async (dispatch: Dispatch) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/rest-auth/registration/`, {
      username,
      email,
      first_name,
      last_name,
      password1,
      password2,
    });

    saveUserState(response.data);

    dispatch({
      auth: response.data,
      type: AuthActionTypes.LOGIN,
    });
  } catch (err) {
    return err;
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
