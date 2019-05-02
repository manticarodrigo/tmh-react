import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { AppRoutes } from '../../App/App';

import {
  Detail,
  DetailStatus,
  Item,
  ItemForm,
  Project,
} from '../../../store/reducers/ProjectReducer';

import DesignClient from './DesignClient';
import DesignDesigner from './DesignDesigner';

export interface DesignCollabProps {
  project: Project;
  conceptboards?: Detail[];
  floorplan?: Detail;
  selectedIndex: number;
  items?: Item[];
  handleFileChanged: (e: React.SyntheticEvent<HTMLInputElement>) => void;
  handleThumbClicked: (e: React.SyntheticEvent<HTMLElement>) => void;
  handleDeleteClicked: (e: React.SyntheticEvent<HTMLElement>) => void;
  handleSubmitDetailClicked: (detail: Detail) => void;
  handleApproveDetailClicked: (detail: Detail) => void;
  handleGetItems: () => void;
  handleAddItem: (itemForm: ItemForm) => void;
}

export const hasFinishedDetails = (details: Detail[]) => hasSubmittedDetails(details) || hasApprovedDetails(details);

export const hasSubmittedDetails = (details: Detail[]) => (
  details.every((detail) => detail.status === DetailStatus.SUBMITTED)
);

export const hasApprovedDetails = (details: Detail[]) => (
  details.every((detail) => detail.status === DetailStatus.APPROVED)
);

const DesignCollab = (props: DesignCollabProps) => {

  const Client = () => <DesignClient {...props} />;
  const Designer = () => <DesignDesigner {...props} />;

  return (
    <Switch>
      <Route
        path={`${AppRoutes.DESIGN}/client/${props.project.id}`}
        component={Client}
      />
      <Route
        path={`${AppRoutes.DESIGN}/(public|designer)/${props.project.id}`}
        component={Designer}
      />
    </Switch>
  );
};

export default React.memo(DesignCollab);
