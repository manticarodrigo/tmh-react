import axios from 'axios';
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { User, UserState } from '../reducers/UserReducer';

export enum UserActionTypes {
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
}

export interface UserLoginAction {
  type: UserActionTypes.LOGIN;
  currentUser: User;
}

export interface UserRegisterAction {
  type: UserActionTypes.REGISTER;
  currentUser: User;
}

export type UserActions = UserLoginAction | UserRegisterAction;

/* ThunkAction<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const login: ActionCreator<
  ThunkAction<Promise<any>, UserState, void, UserLoginAction>
> = (username, password) => (async (dispatch: Dispatch) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/rest-auth/login/`, { username, password });
    dispatch({
      currentUser: response.data,
      type: UserActionTypes.LOGIN,
    });
  } catch (err) {
    return err;
  }
});

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
    dispatch({
      currentUser: response.data,
      type: UserActionTypes.LOGIN,
    });
  } catch (err) {
    return err;
  }
});
