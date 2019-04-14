import React, { ReactNode } from 'react';
import './CollabAlertComponent.scss';

interface CollabAlertComponentProps {
  children: ReactNode;
  type?: string;
  handleFileChanged?: (e: React.SyntheticEvent<HTMLInputElement>) => void;
}
const CollabAlertComponent = (props: CollabAlertComponentProps) => {
  let fileInput: HTMLInputElement;
  const handleClickFileInput = () => fileInput.click();

  return (
    <div className="collab__alert">
      <input
        ref={(input: HTMLInputElement) => { fileInput = input; }}
        data-type={props.type}
        type="file"
        accept="image/*"
        className="u-spaceless"
        onChange={props.handleFileChanged}
      />
      {props.children}
      {props.handleFileChanged && (
        <button onClick={handleClickFileInput} className="u-text-uppercase">
          Upload
        </button>
      )}
    </div>
  );
};

export default React.memo(CollabAlertComponent);
