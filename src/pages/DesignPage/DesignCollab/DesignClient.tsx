import React from 'react';

import { DesignCollabProps, hasApprovedDetails, hasFinishedDetails } from './DesignCollab';

import CollabAlert from '../../../components/CollabAlert/CollabAlert';
import CollabImage from '../../../components/CollabImage/CollabImage';
import CollabMap from '../../../components/CollabMap/CollabMap';

import Modal from '../../../components/Modal/Modal';

const DesignClient = (props: DesignCollabProps) => {
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

export default React.memo(DesignClient);
