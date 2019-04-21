import React from 'react';
import './Input.scss';

interface FieldErrors {
  [propName: string]: string[] | undefined;
}

interface InputProps {
  type?: string;
  name: string;
  value: string;
  placeholder?: string;
  fieldErrors: FieldErrors;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

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
      <input
        className="u-placeholder-uppercase"
        type={type || 'text'}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      {fieldErrors[name] && fieldErrors[name]!.map((error) => (
        <p key={name} className="u-margin-hug--vert form__status form__status--error">{error}</p>
      ))}
    </div>
  );
};

export default React.memo(Input);
