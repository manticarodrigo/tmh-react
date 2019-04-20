import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { AppRoutes } from '../../App/App';

import { Detail, DetailType, Project, ProjectStatus } from '../../../reducers/ProjectReducer';

import CollabAlert from '../../../components/CollabAlert/CollabAlert';
import CollabImage from '../../../components/CollabImage/CollabImage';

interface DetailsCollabProps {
  project: Project;
  drawings: Detail[];
  inspirations: Detail[];
  furnitures: Detail[];
  selectedIndex: number;
  view: string;
  handleFileChanged: (e: React.SyntheticEvent<HTMLInputElement>) => void;
  handleThumbClicked: (e: React.SyntheticEvent<HTMLElement>) => void;
  handleDeleteClicked: (e: React.SyntheticEvent<HTMLElement>) => void;
  handleSubmitClicked: (project: Project) => void;
}

const DetailsCollab = (props: DetailsCollabProps) => {
  const Client = () => <DetailsClientCollab {...props} />;
  const Designer = () => <DetailsDesignerCollab {...props} />;

  return (
    <Switch>
      <Route
        path={`${AppRoutes.DETAILS}/client/${props.project.id}`}
        component={Client}
      />
      <Route
        path={`${AppRoutes.DETAILS}/(public|designer)/${props.project.id}`}
        component={Designer}
      />
    </Switch>
  );
};

const DetailsClientCollab = (props: DetailsCollabProps) => {
  const isReady: boolean = (
    props.project.status === ProjectStatus.DETAILS &&
    !!props.drawings.length &&
    !!props.inspirations.length
  );

  const handleSubmit = () => props.handleSubmitClicked(props.project);

  switch (props.view) {
    case DetailType.DRAWING:
      return props.drawings.length ? (
        <CollabImage
          details={props.drawings}
          index={props.selectedIndex}
          handleFileChanged={props.handleFileChanged}
          handleThumbClicked={props.handleThumbClicked}
          handleDeleteClicked={props.handleDeleteClicked}
        >
          {isReady && (
            <button
              onClick={handleSubmit}
              className="u-text-uppercase"
            >
              Submit to Designer
            </button>
          )}
        </CollabImage>
      ) : (
        <CollabAlert handleFileChanged={props.handleFileChanged}>
          <p className="h1 u-text-uppercase u-margin-hug--top">Welcome to your Design Studio!</p>
          <p>Please upload pictures of your space and a hand drawn floor plan. The floor plan should be from a birds eye view and include height and width of each wall.</p>
          <p>Please also include dimensions for doors, windows, or any additional items that could affect the design.</p>
          <p className="u-color--secondary-darker">( 2 Picture Limit )</p>
        </CollabAlert>
      );
    case DetailType.INSPIRATION:
      return props.inspirations.length ? (
        <CollabImage
          details={props.inspirations}
          index={props.selectedIndex}
          handleFileChanged={props.handleFileChanged}
          handleThumbClicked={props.handleThumbClicked}
          handleDeleteClicked={props.handleDeleteClicked}
        >
          {isReady && (
            <button
              onClick={handleSubmit}
              className="u-text-uppercase"
            >
              Submit to Designer
            </button>
          )}
        </CollabImage>
      ) : (
        <CollabAlert handleFileChanged={props.handleFileChanged}>
          <p>Upload inspiration images that you would like your designer to reference for your space.</p>
        </CollabAlert>
      );
    case DetailType.FURNITURE:
      return props.furnitures.length ? (
        <CollabImage
          details={props.furnitures}
          index={props.selectedIndex}
          handleFileChanged={props.handleFileChanged}
          handleThumbClicked={props.handleThumbClicked}
          handleDeleteClicked={props.handleDeleteClicked}
        >
          {isReady && (
            <button
              onClick={handleSubmit}
              className="u-text-uppercase"
            >
              Submit to Designer
            </button>
          )}
        </CollabImage>
      ) : (
        <CollabAlert handleFileChanged={props.handleFileChanged}>
          <p>Upload pictures and note measurements of any existing furniture that you would like the designer to incorporate into their designs.</p>
        </CollabAlert>
      );
    default:
      return <React.Fragment />;
  }
};

const DetailsDesignerCollab = (props: DetailsCollabProps) => {
  switch (props.view) {
    case DetailType.DRAWING:
      return props.drawings.length ? (
        <CollabImage
          details={props.drawings}
          index={props.selectedIndex}
          handleThumbClicked={props.handleThumbClicked}
        />
      ) : (
        <CollabAlert>
          <p className="h1 u-text-uppercase u-margin-hug--top">Welcome to the Design Studio!</p>
          <p>Your client has not uploaded their room specifications.</p>
          <p>Feel free to chat with your client to prepare for the design phase and to help them prepare as well.</p>
        </CollabAlert>
      );
    case DetailType.INSPIRATION:
      return props.inspirations.length ? (
        <CollabImage
          details={props.inspirations}
          index={props.selectedIndex}
          handleThumbClicked={props.handleThumbClicked}
        />
      ) : (
        <CollabAlert>
          <p className="h2 u-text-uppercase u-margin-hug--top">Hang Tight!</p>
          <p>Your client has not uploaded inspiration images yet.</p>
        </CollabAlert>
      );
    case DetailType.FURNITURE:
      return props.furnitures.length ? (
        <CollabImage
          details={props.furnitures}
          index={props.selectedIndex}
          handleThumbClicked={props.handleThumbClicked}
        />
      ) : (
        <CollabAlert>
          <p className="h2 u-text-uppercase u-margin-hug--top">Hang Tight!</p>
          <p>Your client has not uploaded existing furniture images yet.</p>
        </CollabAlert>
      );
    default:
      return <React.Fragment />;
  }
};

export default React.memo(DetailsCollab);
