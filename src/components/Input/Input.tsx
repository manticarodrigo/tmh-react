import React from 'react';
import './Input.scss';

type FieldErrors = {
  [propName: string]: string[] | undefined;
};

type InputProps = {
  type?: string;
  name: string;
  value: string;
  placeholder?: string;
  fieldErrors: FieldErrors;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = (props: InputProps) => {
  const {
    type,
    name,
    value,
    placeholder,
    onChange,
    fieldErrors,
  } = props;

  return (
    <div className="form__item">
      {value && (<label className="u-text-uppercase">{placeholder}</label>)}
      <div className="form__item__inner">
        <input
          className="u-placeholder-uppercase"
          type={type || 'text'}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
        {fieldErrors[name] && (
          <p key={name} className="u-margin-hug--vert form__status form__status--error">
            {fieldErrors[name]!.map((error) => `${error} `)}
          </p>
        )}
      </div>
    </div>
  );
};

export default Input;
