import { Reducer } from 'redux';

import {
  UserActions,
  UserActionTypes,
} from '../actions/UserActions';

export interface CurrentUser {
  user: User;
  key: string;
}

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

  constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }

  getShortName = (): string => `${this.first_name} ${this.last_name[0]}`;
  getFullName = (): string => `${this.first_name} ${this.last_name}`;
}

export interface UserState {
  readonly currentUser?: CurrentUser;
}

const defaultUserState: UserState = {
  currentUser: undefined,
};

const loadUserState = () => {
  try {
    const serializedState = localStorage.getItem('initialUserState');
    if (serializedState === null) {
      return defaultUserState;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return defaultUserState;
  }
};

export const saveUserState = (currentUser?: CurrentUser) => {
  try {
    const state = { currentUser };
    const serializedState = JSON.stringify(state);
    localStorage.setItem('initialUserState', serializedState);
  } catch {
    // ignore write errors
  }
};

export const UserReducer: Reducer<UserState, UserActions> = (
  state = loadUserState(),
  action,
) => {
  switch (action.type) {
    case UserActionTypes.LOGIN: {
      return {
        ...state,
        currentUser: action.currentUser,
      };
    }
    case UserActionTypes.LOGOUT: {
      return {
        ...state,
        currentUser: undefined,
      };
    }
    default:
      return state;
  }
};
