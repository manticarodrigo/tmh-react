import axios from 'axios';
import { AuthAction } from 'store/actions/AuthActions';

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

export type CurrentAuth = {
  user: User;
  key: string;
};

export type RegisterFields = {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password1: string;
  password2: string;
};

const LOCAL_USER_STATE = 'LOCAL_USER_STATE';

export const loadLocalUserState = () => {
  try {
    const serializedState = localStorage.getItem(LOCAL_USER_STATE);
    if (serializedState === null) {
      return {};
    }

    const { auth } = JSON.parse(serializedState);
    setAuthHeaders(auth);

    return { auth };
  } catch (error) {
    throw error;
  }
};

export const saveLocalUserState = (auth?: CurrentAuth) => {
  try {
    const state = { auth };
    const serializedState = JSON.stringify(state);
    localStorage.setItem(LOCAL_USER_STATE, serializedState);

    setAuthHeaders(auth);
  } catch (error) {
    throw error;
  }
};

const setAuthHeaders = (auth?: CurrentAuth) => {
  protectedApi.defaults.headers.common.Authorization = auth ? `Token ${auth.key}` : undefined;
};

export const protectedApi = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api/v1/`,
});

export type AuthState = {
  readonly auth?: CurrentAuth;
};

export const authReducer = (
  state: AuthState = {},
  action: AuthAction,
) => {
  switch (action.type) {
    case 'LOGIN': {
      return {
        ...state,
        auth: action.payload,
      };
    }
    case 'REGISTER': {
      return {
        ...state,
        auth: action.payload,
      };
    }
    case 'LOGOUT': {
      return {
        ...state,
        auth: undefined,
      };
    }
    default:
      return state;
  }
};
