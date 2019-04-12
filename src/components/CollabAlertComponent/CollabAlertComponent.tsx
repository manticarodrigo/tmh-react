import React, { ReactNode } from 'react';
import './CollabAlertComponent.scss';

interface CollabAlertComponentProps {
  children: ReactNode;
  handleFileChanged?: (e: React.SyntheticEvent<HTMLInputElement>) => void;
}
const CollabAlertComponent = (props: CollabAlertComponentProps) => {
  let fileInput: HTMLInputElement;
  const handleClickFileInput = () => fileInput.click();

  return (
    <div className="collab__alert">
      <input
        ref={(input: HTMLInputElement) => { fileInput = input; }}
        type="file"
        accept="image/*"
        className="u-spaceless"
        onChange={props.handleFileChanged}
      />
      {props.children}
      {props.handleFileChanged && (<button onClick={handleClickFileInput}>Upload</button>)}
    </div>
  );
};

export default React.memo(CollabAlertComponent);
