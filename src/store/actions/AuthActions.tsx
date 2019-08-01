import { Dispatch } from 'react';
import axios from 'axios';

import { CurrentAuth, RegisterFields, saveLocalUserState } from 'store/reducers/AuthReducer';

export type AuthAction =
  | { type: 'LOGIN', payload: CurrentAuth }
  | { type: 'REGISTER', payload: CurrentAuth }
  | { type: 'LOGOUT' };

export const login = (username: string, password: string) => (async (dispatch: Dispatch<AuthAction>) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/rest-auth/login/`,
      { username, password },
    );

    saveLocalUserState(data);
    dispatch({ type: 'LOGIN', payload: data });

  } catch (error) {
    return error;
  }
});

export const register = (registerForm: RegisterFields) => (async (dispatch: Dispatch<AuthAction>) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/rest-auth/registration/`,
      registerForm,
    );

    saveLocalUserState(data);
    dispatch({ type: 'REGISTER', payload: data });

  } catch (error) {
    return error;
  }
});

export const logout = () => ((dispatch: Dispatch<AuthAction>) => {
  saveLocalUserState(undefined);
  dispatch({ type: 'LOGOUT' });
});
