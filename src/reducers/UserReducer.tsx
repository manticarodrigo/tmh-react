import { Reducer } from 'redux';

import {
  UserActions,
  UserActionTypes,
} from '../actions/UserActions';

export class User {
  readonly id?: string;
  readonly joined_date?: string;
  readonly is_staff?: boolean;
  readonly username!: string;
  email!: string;
  first_name!: string;
  last_name!: string;
  image?: string | File;
  city?: string;
  state?: string;
  key?: string;

  getShortName() {
    return `${this.first_name} ${this.last_name[0]}`;
  }

  getFullName() {
    return `${this.first_name} ${this.last_name}`;
  }
}

export interface UserState {
  readonly currentUser?: User;
}

const initialUserState: UserState = {
  currentUser: undefined,
};

export const UserReducer: Reducer<UserState, UserActions> = (
  state = initialUserState,
  action,
) => {
  switch (action.type) {
    case UserActionTypes.LOGIN: {
      return {
        ...state,
        currentUser: action.currentUser,
      };
    }
    default:
      return state;
  }
};