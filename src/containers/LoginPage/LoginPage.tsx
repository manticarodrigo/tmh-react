import React, { Component, Fragment } from 'react';
import { Action } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import './LoginPage.scss';

import { login, register } from '../../actions/UserActions';
import { User, UserState } from '../../reducers/UserReducer';

import logo from '../../assets/logo.png';

interface LoginPageProps {
  currentUser?: User;
  login: (username: string, password: string) => Promise<User>;
  register: (formData: RegisterForm) => Promise<User>;
}

interface LoginPageState {
  isRegistration: boolean;
  fieldErrors: FieldErrors;
  nonFieldErrors: string[];
  form: RegisterForm;

  [propName: string]: boolean | object | RegisterForm;
}

interface RegisterForm {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password1: string;
  password2: string;

  [propName: string]: string;
}

interface FieldErrors {
  username?: string[];
  first_name?: string[];
  last_name?: string[];
  email?: string[];
  password1?: string[];
  password2?: string[];

  [propName: string]: string[] | undefined;
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
      <main className="splash">
        <div className="splash__container">
          <div className="splash__container__inner">
            <img className="login__logo" src={logo} />
            <form className="login__form" onSubmit={this.handleSubmit}>
              <div className="login__form__fields">
                {Object.keys(form).map((key) => (
                  <TextInput
                    isRegistration={isRegistration}
                    key={key}
                    name={key}
                    value={form[key]}
                    fieldErrors={fieldErrors}
                    onChange={this.handleInputChange}
                  />
                ))}
              </div>
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
        </div>
      </main>
    );
  }
}

interface TextInputProps {
  isRegistration: boolean;
  name: string;
  value: string;
  fieldErrors: FieldErrors;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput = (props: TextInputProps) => {
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

  switch (name) {
    case 'username':
      type = 'text';
      placeholder = 'USERNAME';
      isVisible = true;
      break;
    case 'first_name':
      type = 'text';
      placeholder = 'FIRST NAME';
      isVisible = isRegistration;
      break;
    case 'last_name':
      type = 'text';
      placeholder = 'LAST NAME';
      isVisible = isRegistration;
      break;
    case 'email':
      type = 'email';
      placeholder = 'EMAIL';
      isVisible = isRegistration;
      break;
    case 'password1':
      type = 'password';
      placeholder = 'PASSWORD';
      isVisible = true;
      break;
    case 'password2':
      type = 'password';
      placeholder = 'CONFIRM PASSWORD';
      isVisible = isRegistration;
      break;
    default:
      type = 'text';
      break;
  }

  return isVisible ? (
    <Fragment>
      {value && (<label>{placeholder}</label>)}
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      {fieldErrors[name] && fieldErrors[name]!.map((err) => (<p key={name}>{err}</p>))}
    </Fragment>
  ) : <Fragment />;
};

const mapDispatchToProps = (dispatch: ThunkDispatch<UserState, void, Action>) => ({
  login: (username: string, password: string) => dispatch(login(username, password)),
  register: (formData: RegisterForm) => dispatch(register(formData)),
});

export default connect(null, mapDispatchToProps)(LoginPage);
