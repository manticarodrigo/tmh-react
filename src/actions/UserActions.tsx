import axios from 'axios';
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { saveUserState, UserState, CurrentUser } from '../reducers/UserReducer';

export enum UserActionTypes {
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
}

export interface UserLoginAction {
  type: UserActionTypes.LOGIN;
  currentUser: CurrentUser;
}

export interface UserRegisterAction {
  type: UserActionTypes.REGISTER;
  currentUser: CurrentUser;
}

export type UserActions = UserLoginAction | UserRegisterAction;

/* ThunkAction<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const login: ActionCreator<
  ThunkAction<Promise<any>, UserState, void, UserLoginAction>
> = (username, password) => (async (dispatch: Dispatch) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/rest-auth/login/`, { username, password });

    saveUserState(response.data);

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

    saveUserState(response.data);

    dispatch({
      currentUser: response.data,
      type: UserActionTypes.LOGIN,
    });
  } catch (err) {
    return err;
  }
});
