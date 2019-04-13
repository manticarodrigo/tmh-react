import axios from 'axios';
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { CurrentAuth, saveUserState, UserState } from '../reducers/UserReducer';

export enum UserActionTypes {
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  LOGOUT = 'LOGOUT',
}

export interface UserLoginAction {
  type: UserActionTypes.LOGIN;
  auth: CurrentAuth;
}

export const login: ActionCreator<
  ThunkAction<Promise<any>, UserState, void, UserLoginAction>
> = (username, password) => (async (dispatch: Dispatch) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/rest-auth/login/`, { username, password });

    saveUserState(response.data);

    dispatch({
      auth: response.data,
      type: UserActionTypes.LOGIN,
    });
  } catch (err) {
    return err;
  }
});

export interface UserRegisterAction {
  type: UserActionTypes.REGISTER;
  auth: CurrentAuth;
}

export const register: ActionCreator<
  ThunkAction<Promise<any>, UserState, void, UserRegisterAction>
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
      type: UserActionTypes.LOGIN,
    });
  } catch (err) {
    return err;
  }
});

export interface UserLogoutAction {
  type: UserActionTypes.LOGOUT;
}

export const logout: ActionCreator<any> = () => ((dispatch: Dispatch) => {
  saveUserState(undefined);
  dispatch({ type: UserActionTypes.LOGOUT });
});

export type UserActions = UserLoginAction | UserRegisterAction | UserLogoutAction;
