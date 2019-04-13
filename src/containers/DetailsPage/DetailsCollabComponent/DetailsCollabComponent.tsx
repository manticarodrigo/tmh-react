import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { AppRoutes } from '../../App/App';

import { Detail, DetailType, Project } from '../../../reducers/ProjectReducer';

import CollabAlertComponent from '../../../components/CollabAlertComponent/CollabAlertComponent';
import CollabImageComponent from '../../../components/CollabImageComponent/CollabImageComponent';

interface DetailsCollabComponentProps {
  project: Project;
  drawings: Detail[];
  inspirations: Detail[];
  furnitures: Detail[];
  selectedIndex: number;
  view: string;
  handleFileChanged: (e: React.SyntheticEvent<HTMLInputElement>) => void;
  handleThumbClicked: (e: React.SyntheticEvent<HTMLElement>) => void;
  handleDeleteClicked: (e: React.SyntheticEvent<HTMLElement>) => void;
}

const DetailsCollabComponent = (props: DetailsCollabComponentProps) => {
  const ClientComponent = () => <DetailsClientCollabComponent {...props} />;
  const DesignerComponent = () => <DetailsDesignerCollabComponent {...props} />;

  return (
    <Switch>
      <Route
        path={`${AppRoutes.DETAILS}/client/${props.project.id}`}
        component={ClientComponent}
      />
      <Route
        path={`${AppRoutes.DETAILS}/(public|designer)/${props.project.id}`}
        component={DesignerComponent}
      />
    </Switch>
  );
};

const DetailsClientCollabComponent = (props: DetailsCollabComponentProps) => {
  switch (props.view) {
    case DetailType.DRAWING:
      return props.drawings.length ? (
        <CollabImageComponent
          details={props.drawings}
          index={props.selectedIndex}
          handleFileChanged={props.handleFileChanged}
          handleThumbClicked={props.handleThumbClicked}
          handleDeleteClicked={props.handleDeleteClicked}
        />
      ) : (
        <CollabAlertComponent handleFileChanged={props.handleFileChanged}>
          <p className="h1 u-text-uppercase u-margin-hug--top">Welcome to your Design Studio!</p>
          <p>Please upload pictures of your space and a hand drawn floor plan. The floor plan should be from a birds eye view and include height and width of each wall.</p>
          <p>Please also include dimensions for doors, windows, or any additional items that could affect the design.</p>
          <p className="u-color--secondary-darker">( 2 Picture Limit )</p>
        </CollabAlertComponent>
      );
    case DetailType.INSPIRATION:
      return props.inspirations.length ? (
        <CollabImageComponent
          details={props.inspirations}
          index={props.selectedIndex}
          handleFileChanged={props.handleFileChanged}
          handleThumbClicked={props.handleThumbClicked}
          handleDeleteClicked={props.handleDeleteClicked}
        />
      ) : (
        <CollabAlertComponent handleFileChanged={props.handleFileChanged}>
          <p>Upload inspiration images that you would like your designer to reference for your space.</p>
        </CollabAlertComponent>
      );
    case DetailType.FURNITURE:
      return props.furnitures.length ? (
        <CollabImageComponent
          details={props.furnitures}
          index={props.selectedIndex}
          handleFileChanged={props.handleFileChanged}
          handleThumbClicked={props.handleThumbClicked}
          handleDeleteClicked={props.handleDeleteClicked}
        />
      ) : (
        <CollabAlertComponent handleFileChanged={props.handleFileChanged}>
          <p>Upload pictures and note measurements of any existing furniture that you would like the designer to incorporate into their designs.</p>
        </CollabAlertComponent>
      );
    default:
      return <React.Fragment />;
  }
};

const DetailsDesignerCollabComponent = (props: DetailsCollabComponentProps) => {
  switch (props.view) {
    case DetailType.DRAWING:
      return props.drawings.length ? (
        <CollabImageComponent
          details={props.drawings}
          index={props.selectedIndex}
          handleThumbClicked={props.handleThumbClicked}
        />
      ) : (
        <CollabAlertComponent>
          <p className="h1 u-text-uppercase u-margin-hug--top">Welcome to the Design Studio!</p>
          <p>Your client has not uploaded their room specifications.</p>
          <p>Feel free to chat with your client to prepare for the design phase and to help them prepare as well.</p>
        </CollabAlertComponent>
      );
    case DetailType.INSPIRATION:
      return props.inspirations.length ? (
        <CollabImageComponent
          details={props.inspirations}
          index={props.selectedIndex}
          handleThumbClicked={props.handleThumbClicked}
        />
      ) : (
        <CollabAlertComponent>
          <p className="h2 u-text-uppercase u-margin-hug--top">Hang Tight!</p>
          <p>Your client has not uploaded inspiration images yet.</p>
        </CollabAlertComponent>
      );
    case DetailType.FURNITURE:
      return props.furnitures.length ? (
        <CollabImageComponent
          details={props.furnitures}
          index={props.selectedIndex}
          handleThumbClicked={props.handleThumbClicked}
        />
      ) : (
        <CollabAlertComponent>
          <p className="h2 u-text-uppercase u-margin-hug--top">Hang Tight!</p>
          <p>Your client has not uploaded existing furniture images yet.</p>
        </CollabAlertComponent>
      );
    default:
      return <React.Fragment />;
  }
};

export default React.memo(DetailsCollabComponent);
