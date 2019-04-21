import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { AppRoutes } from '../../App/App';

import {
  Detail,
  DetailStatus,
  DetailType,
  Item,
  ItemForm,
  Project,
} from '../../../reducers/ProjectReducer';

import CollabAlert from '../../../components/CollabAlert/CollabAlert';
import CollabImage from '../../../components/CollabImage/CollabImage';
import CollabMap from '../../../components/CollabMap/CollabMap';

import Modal from '../../../components/Modal/Modal';

interface DesignCollabProps {
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

const hasFinishedDetails = (details: Detail[]) => hasSubmittedDetails(details) || hasApprovedDetails(details);

const hasSubmittedDetails = (details: Detail[]) => (
  details.every((detail) => detail.status === DetailStatus.SUBMITTED)
);

const hasApprovedDetails = (details: Detail[]) => (
  details.every((detail) => detail.status === DetailStatus.APPROVED)
);

const DesignCollab = (props: DesignCollabProps) => {

  const Client = () => <DesignClientCollab {...props} />;
  const Designer = () => <DesignDesignerCollab {...props} />;

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

const DesignClientCollab = (props: DesignCollabProps) => {
  const handleApproveConceptboards = () => (
    props.conceptboards!.forEach((concept) => (
      props.handleApproveDetailClicked(concept)
    ))
  );

  const handleApproveFloorplan = () => (props.handleApproveDetailClicked(props.floorplan!));

  switch (true) {
    case (!props.conceptboards || props.conceptboards.length < 2 || !hasFinishedDetails(props.conceptboards)):
      return (
        <CollabAlert>
          <p className="h1 u-text-uppercase u-margin-hug--top">Welcome to the Design Studio!</p>
          <p>Your designer is hard at work designing your two custom concept boards!</p>
          <p>We will send you an email when it's time for you to make a selection.</p>
        </CollabAlert>
      );
    case props.conceptboards && !hasApprovedDetails(props.conceptboards):
      return (
        <CollabImage
          details={props.conceptboards!}
          index={props.selectedIndex}
          handleThumbClicked={props.handleThumbClicked}
        >
          <Modal
            triggerText="Approve Concepts"
            ariaLabel="Approve Concepts Confirmation"
            centered
          >
            <img src={require('../../../assets/images/utility/confirm.png')} />
            <p>By selecting the confimation below, you are approving the conceptboards.</p>
            <button onClick={handleApproveConceptboards} className="u-text-uppercase">
              Approve &amp; Submit
            </button>
          </Modal>
        </CollabImage>
      );
    case !props.floorplan || !hasFinishedDetails([props.floorplan]):
      return (
        <CollabAlert>
          <p className="h1 u-text-uppercase u-margin-hug--top">Hang Tight!</p>
          <p>Your designer is hard at work putting together the Floor Plan of your room!</p>
        </CollabAlert>
      );
    case props.floorplan && !hasApprovedDetails([props.floorplan]):
      return (
        <CollabImage
          details={[props.floorplan!]}
          index={props.selectedIndex}
          handleThumbClicked={props.handleThumbClicked}
        >
          <Modal
            triggerText="Approve Floorplan"
            ariaLabel="Approve Floorplan Confirmation"
            centered
          >
            <img src={require('../../../assets/images/utility/confirm.png')} />
            <p>By selecting the confimation below, you are approving the floorplan.</p>
            <button onClick={handleApproveFloorplan} className="u-text-uppercase">
              Approve &amp; Submit
            </button>
          </Modal>
        </CollabImage>
      );
    case !!props.floorplan:
        return (
          <CollabMap
            floorplan={props.floorplan!}
            items={props.items}
            handleGetItems={props.handleGetItems}
            handleAddItem={props.handleAddItem}
          />
        );
    default:
      return <React.Fragment />;
  }
};

const DesignDesignerCollab = (props: DesignCollabProps) => {
  const handleSubmitConceptboards = () => (
    props.conceptboards!.forEach((concept) => (
      props.handleSubmitDetailClicked(concept)
    ))
  );

  const handleSubmitFloorplan = () => (
    props.handleSubmitDetailClicked(props.floorplan!)
  );

  switch (true) {
    case !props.conceptboards || !props.conceptboards.length:
      return (
        <CollabAlert
          type={DetailType.CONCEPT}
          handleFileChanged={props.handleFileChanged}
        >
          <p className="h1 u-text-uppercase u-margin-hug--top">Welcome to the Design Stage!</p>
          <p>Please upload 2 concept boards based on your client's information and style.</p>
          <p>Once all boards have been uploaded and confirmed, submit and the 15 business day timeline will begin.</p>
        </CollabAlert>
      );
    case props.conceptboards && !hasApprovedDetails(props.conceptboards):
      return (
        <CollabImage
          type={DetailType.CONCEPT}
          details={props.conceptboards!}
          index={props.selectedIndex}
          handleFileChanged={props.conceptboards!.length < 2 ? props.handleFileChanged : undefined}
          handleThumbClicked={props.handleThumbClicked}
          handleDeleteClicked={props.handleDeleteClicked}
        >
          {(!(props.conceptboards!.length < 2) && !hasSubmittedDetails(props.conceptboards!)) && (
            <Modal
              triggerText="Submit Concepts"
              ariaLabel="Submit Concepts Confirmation"
              centered
            >
              <img src={require('../../../assets/images/utility/confirm.png')} />
              <p>By selecting the confimation below, the concept boards will be submitted to your client.</p>
              <button onClick={handleSubmitConceptboards} className="u-text-uppercase">
                Approve	&amp; Submit
              </button>
            </Modal>
          )}
        </CollabImage>
      );
    case !props.floorplan:
      return (
        <CollabAlert
          type={DetailType.FLOOR_PLAN}
          handleFileChanged={props.handleFileChanged}
        >
          <p>
            Using the floor plan provided by the client,
            create and upload a floor plan to begin the design process.
          </p>
        </CollabAlert>
      );
    case props.floorplan && !hasApprovedDetails([props.floorplan]):
      return (
        <CollabImage
          type={DetailType.FLOOR_PLAN}
          details={[props.floorplan!]}
          index={props.selectedIndex}
          handleThumbClicked={props.handleThumbClicked}
          handleDeleteClicked={props.handleDeleteClicked}
        >
          {!hasSubmittedDetails([props.floorplan!]) && (
            <Modal
              triggerText="Submit Floorplan"
              ariaLabel="Submit Floorplan Confirmation"
              centered
            >
              <img src={require('../../../assets/images/utility/confirm.png')} />
              <p>By selecting the confimation below, the floorplan will be submitted to your client.</p>
              <button onClick={handleSubmitFloorplan} className="u-text-uppercase">
                Approve	&amp; Submit
              </button>
            </Modal>
          )}
        </CollabImage>
      );
    case !!props.floorplan:
      return (
        <CollabMap
          floorplan={props.floorplan!}
          items={props.items}
          handleGetItems={props.handleGetItems}
          handleAddItem={props.handleAddItem}
        />
      );
    default:
      return <React.Fragment />;
  }
};

export default React.memo(DesignCollab);
