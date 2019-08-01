import React, { useState } from 'react';
import './LoginPage.scss';

import useAppState from 'hooks/useAppState';
import { login, register } from 'store/actions/AuthActions';
import { RegisterFields } from 'store/reducers/AuthReducer';

import Input from 'components/Input/Input';

import logo from 'assets/logo.png';

type LoginPageState = {
  isRegistration: boolean;
  fieldErrors: LoginFieldErrors;
  nonFieldErrors: string[];
};

type RegisterFieldKey = keyof RegisterFields;

const LoginPage = () => {
  const [_, dispatch] = useAppState();
  const [{ isRegistration, fieldErrors, nonFieldErrors }, setState] = useState<LoginPageState>({
    isRegistration: false,
    fieldErrors: {},
    nonFieldErrors: [],
  });

  const [form, setForm] = useState<RegisterFields>({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password1: '',
    password2: '',
  });

  const handleInputChange = ({ target: { name, value }}: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prevState) => ({ ...prevState, [name]: value }));

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { username = '', password1 = '' } = form;

    if (!isRegistration) {
      const error = await dispatch(login(username, password1));
      handleError(error);
    } else {
      const error = await dispatch(register(form));
      handleError(error);
    }
  };

  const handleError = (error: any) => {
    if (error) {
      const { response = {} } = error;

      setState((prevState) => ({
        ...prevState,
        fieldErrors: response.data || {},
        nonFieldErrors: (response.data || {}).non_field_errors || {},
      }));
    }
  };

  const toggleAuthType = () => setState((prevState) => ({ ...prevState, isRegistration: !prevState.isRegistration }));

  const getBtnText = (isLogin: boolean) => isLogin ? 'LOG IN' : 'SIGN UP';

  return (
    <main className="login">
      <div className="login__container">
        <img className="login__logo" src={logo} />
        <form className="login__form" onSubmit={handleSubmit}>
          {Object.entries(form).map(([key, value]) => (
            <LoginInput
              isRegistration={isRegistration}
              key={key}
              name={key as RegisterFieldKey}
              value={value}
              fieldErrors={fieldErrors}
              onChange={handleInputChange}
            />
          ))}
          <button>{getBtnText(!isRegistration)}</button>
          <p className="login__form__divider">or</p>
          <button
            type="button"
            className="login__form__toggle"
            onClick={toggleAuthType}
          >
            {getBtnText(isRegistration)}
          </button>
          {nonFieldErrors.map((error, index) => <p key={index}>{error}</p>)}
        </form>
      </div>
    </main>
  );
};

type LoginFieldErrors = {
  username?: string[];
  first_name?: string[];
  last_name?: string[];
  email?: string[];
  password?: string[];
  password1?: string[];
  password2?: string[];
};

type LoginInputProps = {
  isRegistration: boolean;
  name: RegisterFieldKey;
  value: string;
  fieldErrors: LoginFieldErrors;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const LoginInput = ({ isRegistration, name, value, fieldErrors, onChange }: LoginInputProps) => {
  Object.keys(fieldErrors).forEach((field) => {
    if (field === 'password') {
      fieldErrors.password1 = fieldErrors[field];
    }
  });

  const inputMap = {
    username: {
      type: 'text',
      placeholder: 'Username',
      isVisible: true,
    },
    first_name: {
      type: 'text',
      placeholder: 'First name',
      isVisible: isRegistration,
    },
    last_name: {
      type: 'text',
      placeholder: 'Last name',
      isVisible: isRegistration,
    },
    email: {
      type: 'email',
      placeholder: 'Email',
      isVisible: isRegistration,
    },
    password1: {
      type: 'password',
      placeholder: 'Password',
      isVisible: true,
    },
    password2: {
      type: 'password',
      placeholder: 'Confirm password',
      isVisible: isRegistration,
    },
  };

  const { isVisible, type, placeholder } = inputMap[name];

  return isVisible ? (
    <Input
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      fieldErrors={fieldErrors}
      onChange={onChange}
    />
  ) : null;
};

export default LoginPage;
