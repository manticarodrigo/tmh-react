import React from 'react';

import { Detail, DetailType, Project } from '../../../reducers/ProjectReducer';

import CollabAlertComponent from '../../../components/CollabAlertComponent/CollabAlertComponent';
import CollabImageComponent from '../../../components/CollabImageComponent/CollabImageComponent';

interface DetailsCollabComponentProps {
  project: Project;
  drawings: Detail[];
  inspirations: Detail[];
  furnitures: Detail[];
  view: string;
  handleFileChanged: (e: React.SyntheticEvent<HTMLInputElement>) => void;
}

const DetailsCollabComponent = (props: DetailsCollabComponentProps) => {
  switch (props.view) {
    case DetailType.DRAWING:
      return props.drawings.length ? (
        <CollabImageComponent details={props.drawings} />
      ) : (
        <CollabAlertComponent handleFileChanged={props.handleFileChanged}>
          <p className="h1 u-text-uppercase">Welcome to your Design Studio!</p>
          <p>Please upload pictures of your space and a hand drawn floor plan. The floor plan should be from a birds eye view and include height and width of each wall.</p>
          <p>Please also include dimensions for doors, windows, or any additional items that could affect the design.</p>
          <p className="u-color--secondary-darker">( 2 Picture Limit )</p>
        </CollabAlertComponent>
      );
    case DetailType.INSPIRATION:
      return props.inspirations.length ? (
        <CollabImageComponent details={props.inspirations} />
      ) : (
        <CollabAlertComponent handleFileChanged={props.handleFileChanged}>
          <p>Upload inspiration images that you would like your designer to reference for your space.</p>
        </CollabAlertComponent>
      );
    case DetailType.FURNITURE:
      return props.furnitures.length ? (
        <CollabImageComponent details={props.furnitures} />
      ) : (
        <CollabAlertComponent handleFileChanged={props.handleFileChanged}>
          <p>Upload pictures and note measurements of any existing furniture that you would like the designer to incorporate into their designs.</p>
        </CollabAlertComponent>
      );
    default:
      return <React.Fragment />;
  }
};

export default React.memo(DetailsCollabComponent);
