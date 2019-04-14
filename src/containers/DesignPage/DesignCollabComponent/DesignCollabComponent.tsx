import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { AppRoutes } from '../../App/App';

import { Detail, DetailType, Project, ProjectStatus } from '../../../reducers/ProjectReducer';

import CollabAlertComponent from '../../../components/CollabAlertComponent/CollabAlertComponent';
import CollabImageComponent from '../../../components/CollabImageComponent/CollabImageComponent';

interface DesignCollabComponentProps {
  project: Project;
  floorplan?: Detail;
  selectedIndex: number;
  handleFileChanged: (e: React.SyntheticEvent<HTMLInputElement>) => void;
  handleThumbClicked: (e: React.SyntheticEvent<HTMLElement>) => void;
  handleDeleteClicked: (e: React.SyntheticEvent<HTMLElement>) => void;
  handleSubmitClicked: (project: Project) => void;
}

const DesignCollabComponent = (props: DesignCollabComponentProps) => {
  const ClientComponent = () => <DesignClientCollabComponent {...props} />;
  const DesignerComponent = () => <DesignDesignerCollabComponent {...props} />;

  return (
    <Switch>
      <Route
        path={`${AppRoutes.DESIGN}/client/${props.project.id}`}
        component={ClientComponent}
      />
      <Route
        path={`${AppRoutes.DESIGN}/(public|designer)/${props.project.id}`}
        component={DesignerComponent}
      />
    </Switch>
  );
};

const DesignClientCollabComponent = (props: DesignCollabComponentProps) => {
  return props.floorplan ? (
    <CollabImageComponent
      details={[props.floorplan]}
      index={props.selectedIndex}
      handleThumbClicked={props.handleThumbClicked}
    />
  ) : (
    <CollabAlertComponent>
      <p className="h1 u-text-uppercase u-margin-hug--top">Welcome to the Design Studio!</p>
      <p>Your designer is hard at work designing your two custom concept boards!</p>
      <p>We will send you an email when it's time for you to make a selection.</p>
    </CollabAlertComponent>
  );
};

const DesignDesignerCollabComponent = (props: DesignCollabComponentProps) => {
  return props.floorplan ? (
    <CollabImageComponent
      details={[props.floorplan]}
      index={props.selectedIndex}
      handleThumbClicked={props.handleThumbClicked}
    />
  ) : (
    <CollabAlertComponent handleFileChanged={props.handleFileChanged}>
      <p className="h1 u-text-uppercase u-margin-hug--top">Welcome to the Design Stage!</p>
      <p>Please upload 2 concept boards based on your client's information and style.</p>
      <p>Once all boards have been uploaded and confirmed, submit and the 15 business day timeline will begin.</p>
    </CollabAlertComponent>
  );
};

export default React.memo(DesignCollabComponent);
