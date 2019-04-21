import React, { Component, Fragment } from 'react';
import './LoginPage.scss';

import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { login, register } from '../../actions/AuthActions';
import { AuthState, RegisterForm, User } from '../../reducers/AuthReducer';

import Input from '../../components/Input/Input';

import logo from '../../assets/logo.png';

interface LoginPageProps {
  auth?: User;
  login: (username: string, password: string) => Promise<User>;
  register: (formData: RegisterForm) => Promise<User>;
}

interface LoginPageState {
  isRegistration: boolean;
  fieldErrors: LoginFieldErrors;
  nonFieldErrors: string[];
  form: RegisterForm;

  [propName: string]: boolean | object | RegisterForm;
}

class LoginPage extends Component<LoginPageProps, LoginPageState> {
  state = {
    isRegistration: false,
    fieldErrors: {},
    nonFieldErrors: [],
    form: {
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      password1: '',
      password2: '',
    },
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.setState({ form: { ...this.state.form, [name]: value } });
  }

  handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { isRegistration, form } = this.state;
    const { username, password1 } = form;

    if (!isRegistration) {
      const error = await this.props.login(username, password1);
      this.handleError(error);
    } else {
      const error = await this.props.register(form);
      this.handleError(error);
    }
  }

  handleError = (error: any) => {
    if (error) {
      const fieldErrors = (error.response || {}).data;
      const nonFieldErrors = (fieldErrors || {}).non_field_errors;

      this.setState({ fieldErrors, nonFieldErrors });
    }
  }

  toggleAuthType = () => this.setState({ isRegistration: !this.state.isRegistration });

  render() {
    const { isRegistration, fieldErrors, nonFieldErrors, form } = this.state as LoginPageState;
    const getBtnText = (isLogin: boolean) => isLogin ? 'LOG IN' : 'SIGN UP';

    return (
      <main className="login">
        <div className="login__container">
          <img className="login__logo" src={logo} />
          <form className="login__form" onSubmit={this.handleSubmit}>
            {Object.keys(form).map((key) => (
              <LoginInput
                isRegistration={isRegistration}
                key={key}
                name={key}
                value={form[key]}
                fieldErrors={fieldErrors}
                onChange={this.handleInputChange}
              />
            ))}
            <button>{getBtnText(!isRegistration)}</button>
            <p className="login__form__divider">or</p>
            <button
              type="button"
              className="login__form__toggle"
              onClick={this.toggleAuthType}>
              {getBtnText(isRegistration)}
            </button>
            {nonFieldErrors && nonFieldErrors.map((err, index) => (
              <p key={index}>{err}</p>
            ))}
          </form>
        </div>
      </main>
    );
  }
}

interface LoginFieldErrors {
  username?: string[];
  first_name?: string[];
  last_name?: string[];
  email?: string[];
  password?: string[];
  password1?: string[];
  password2?: string[];

  [propName: string]: string[] | undefined;
}

interface LoginInputProps {
  isRegistration: boolean;
  name: string;
  value: string;
  fieldErrors: LoginFieldErrors;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LoginInput = (props: LoginInputProps) => {
  const {
    isRegistration,
    name,
    value,
    fieldErrors,
    onChange,
  } = props;

  let type;
  let placeholder;
  let isVisible;

  Object.keys(fieldErrors).forEach((field) => {
    if (field === 'password') {
      fieldErrors.password1 = fieldErrors[field];
    }
  });

  switch (name) {
    case 'username':
      type = 'text';
      placeholder = 'Username';
      isVisible = true;
      break;
    case 'first_name':
      type = 'text';
      placeholder = 'First name';
      isVisible = isRegistration;
      break;
    case 'last_name':
      type = 'text';
      placeholder = 'Last name';
      isVisible = isRegistration;
      break;
    case 'email':
      type = 'email';
      placeholder = 'EMAIL';
      isVisible = isRegistration;
      break;
    case 'password1':
      type = 'password';
      placeholder = 'Password';
      isVisible = true;
      break;
    case 'password2':
      type = 'password';
      placeholder = 'Confirm password';
      isVisible = isRegistration;
      break;
    default:
      type = 'text';
      break;
  }

  return isVisible ? (
    <Input
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      fieldErrors={fieldErrors}
      onChange={onChange}
    />
  ) : <Fragment />;
};

const mapDispatchToProps = (dispatch: ThunkDispatch<AuthState, void, Action>) => ({
  login: (username: string, password: string) => dispatch(login(username, password)),
  register: (formData: RegisterForm) => dispatch(register(formData)),
});

export default connect(null, mapDispatchToProps)(LoginPage);
