import { Reducer } from 'redux';

import { store } from '../store/Store';

import {
  AuthActions,
  AuthActionTypes,
  logout,
} from '../actions/AuthActions';

import axios from 'axios';

export interface CurrentAuth {
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

export interface AuthState {
  readonly auth?: CurrentAuth;
}

const defaultUserState: AuthState = {
  auth: undefined,
};

const loadUserState = () => {
  try {
    const serializedState = localStorage.getItem('initialUserState');
    if (serializedState === null) {
      return defaultUserState;
    }

    const deserializedState = JSON.parse(serializedState);
    setAuthHeaders(deserializedState.auth);

    return deserializedState;
  } catch (err) {
    return defaultUserState;
  }
};

export const saveUserState = (auth?: CurrentAuth) => {
  try {
    const state = { auth };
    const serializedState = JSON.stringify(state);
    localStorage.setItem('initialUserState', serializedState);

    setAuthHeaders(auth);
  } catch {
    // ignore write errors
  }
};

const setAuthHeaders = (auth?: CurrentAuth) => {
  protectedApi.defaults.headers.common.Authorization = auth ? `Token ${auth.key}` : undefined;
};

export const protectedApi = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api/v1/`,
});

protectedApi.interceptors.response.use(undefined, (err) => {
  const error = err.response;
  // if response is unauthorized
  if (error.status === 403) {
    return store.dispatch(logout());
  }

  throw error;
});

export const AuthReducer: Reducer<AuthState, AuthActions> = (
  state = loadUserState(),
  action,
) => {
  switch (action.type) {
    case AuthActionTypes.LOGIN: {
      return {
        ...state,
        auth: action.auth,
      };
    }
    case AuthActionTypes.REGISTER: {
      return {
        ...state,
        auth: action.auth,
      };
    }
    case AuthActionTypes.LOGOUT: {
      return {
        ...state,
        auth: undefined,
      };
    }
    default:
      return state;
  }
};
