import React from 'react';
import './DetailsCollabAlertComponent.scss';

import { Project } from '../../../reducers/ProjectReducer';

interface DetailsCollabAlertComponentProps {
  project: Project;
  view: string;
  handleFileChanged: (e: React.SyntheticEvent<HTMLInputElement>) => void;
}

const DetailsCollabAlertComponent = (props: DetailsCollabAlertComponentProps) => {
  let fileInput: HTMLInputElement;
  const handleClickFileInput = () => fileInput.click();

  return (
    <div className="collab__alert">
      <CurrentAlertComponent {...props} />
      <input
        ref={(input: HTMLInputElement) => { fileInput = input; }}
        type="file"
        accept="image/*"
        className="u-spaceless"
        onChange={props.handleFileChanged}
      />
      <button onClick={handleClickFileInput}>Upload</button>
    </div>
  );
};

const CurrentAlertComponent = (props: DetailsCollabAlertComponentProps) => {
  switch (props.view) {
    case 'DRAWING':
      return (
        <React.Fragment>
          <p className="h1 u-text-uppercase">Welcome to your Design Studio!</p>
          <p>Please upload pictures of your space and a hand drawn floor plan. The floor plan should be from a birds eye view and include height and width of each wall.</p>
          <p>Please also include dimensions for doors, windows, or any additional items that could affect the design.</p>
          <p className="u-color--secondary-darker">( 2 Picture Limit )</p>
        </React.Fragment>
      );
    case 'INSPIRATION':
      return (
        <React.Fragment>
          <p>Upload inspiration images that you would like your designer to reference for your space.</p>
        </React.Fragment>
      );
    case 'FURNITURE':
      return (
        <React.Fragment>
          <p>Upload pictures and note measurements of any existing furniture that you would like the designer to incorporate into their designs.</p>
        </React.Fragment>
      );
    default:
      return <React.Fragment />;
  }
};

export default React.memo(DetailsCollabAlertComponent);
