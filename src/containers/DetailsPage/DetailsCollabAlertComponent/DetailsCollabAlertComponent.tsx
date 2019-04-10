import React from 'react';

import { Detail, DetailType, Project } from '../../../reducers/ProjectReducer';

import DetailsCollabImageComponent from '../DetailsCollabImageComponent/DetailsCollabImageComponent';

interface DetailsCollabAlertComponentProps {
  project: Project;
  drawings: Detail[];
  inspirations: Detail[];
  furnitures: Detail[];
  view: string;
  handleFileChanged: (e: React.SyntheticEvent<HTMLInputElement>) => void;
}

const DetailsCollabAlertComponent = (props: DetailsCollabAlertComponentProps) => {
  let fileInput: HTMLInputElement;
  const handleClickFileInput = () => fileInput.click();

  return (
    <React.Fragment>
      <CurrentAlertComponent {...props} handleClickFileInput={handleClickFileInput} />
      <input
        ref={(input: HTMLInputElement) => { fileInput = input; }}
        type="file"
        accept="image/*"
        className="u-spaceless"
        onChange={props.handleFileChanged}
      />
    </React.Fragment>
  );
};

interface CurrentAlertComponentProps extends DetailsCollabAlertComponentProps {
  handleClickFileInput: () => void;
}

const CurrentAlertComponent = (props: CurrentAlertComponentProps) => {
  switch (props.view) {
    case DetailType.DRAWING:
      return props.drawings.length ? (
        <DetailsCollabImageComponent details={props.drawings} />
      ) : (
        <div className="collab__alert">
          <p className="h1 u-text-uppercase">Welcome to your Design Studio!</p>
          <p>Please upload pictures of your space and a hand drawn floor plan. The floor plan should be from a birds eye view and include height and width of each wall.</p>
          <p>Please also include dimensions for doors, windows, or any additional items that could affect the design.</p>
          <p className="u-color--secondary-darker">( 2 Picture Limit )</p>
          <button onClick={props.handleClickFileInput}>Upload</button>
        </div>
      );
    case DetailType.INSPIRATION:
      return props.inspirations.length ? (
        <DetailsCollabImageComponent details={props.inspirations} />
      ) : (
        <div className="collab__alert">
          <p>Upload inspiration images that you would like your designer to reference for your space.</p>
          <button onClick={props.handleClickFileInput}>Upload</button>
        </div>
      );
    case DetailType.FURNITURE:
      return props.furnitures.length ? (
        <DetailsCollabImageComponent details={props.furnitures} />
      ) : (
        <div className="collab__alert">
          <p>Upload pictures and note measurements of any existing furniture that you would like the designer to incorporate into their designs.</p>
          <button onClick={props.handleClickFileInput}>Upload</button>
        </div>
      );
    default:
      return <React.Fragment />;
  }
};

export default React.memo(DetailsCollabAlertComponent);
