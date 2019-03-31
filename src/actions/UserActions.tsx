import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import axios from 'axios';

import { User, UserState } from '../reducers/UserReducer';

export enum UserActionTypes {
  LOGIN = 'LOGIN',
}

export interface UserLoginAction {
  type: UserActionTypes.LOGIN;
  currentUser: User;
}

/* 
Combine the action types with a union
example: export type UserActions = UserLoginAction | UserRegisterAction ... 
*/
export type UserActions = UserLoginAction;

/* Login Action
<Promise<Return Type>, State Interface, Type of Param, Type of Action> */

export const login: ActionCreator<
  ThunkAction<Promise<any>, UserState, { username: string, password: string }, UserLoginAction>
> = (username, password) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/rest-auth/login/`, { username, password });
      dispatch({
        currentUser: response.data,
        type: UserActionTypes.LOGIN,
      });
    } catch (err) {
      console.error(err);
    }
  };
};