import React, { Fragment } from 'react';

import { DesignCollabProps, hasApprovedDetails, hasSubmittedDetails } from './DesignCollab';

import CollabAlert from 'components/CollabAlert/CollabAlert';
import CollabImage from 'components/CollabImage/CollabImage';
import CollabMap from 'components/CollabMap/CollabMap';
import CollabWorkzone from 'components/CollabWorkzone/CollabWorkzone';
import Modal from 'components/Modal/Modal';

const DesignDesigner = (props: DesignCollabProps) => {
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
        <CollabWorkzone>
          <CollabAlert
            type={'CONCEPT'}
            handleFileChanged={props.handleFileChanged}
          >
            <p className="h1 u-text-uppercase u-margin-hug--top">Welcome to the Design Stage!</p>
            <p>Please upload 2 concept boards based on your client's information and style.</p>
            <p>Once all boards have been uploaded and confirmed, submit and the 15 business day timeline will begin.</p>
          </CollabAlert>
        </CollabWorkzone>
      );
    case props.conceptboards && !hasApprovedDetails(props.conceptboards):
      return (
        <CollabWorkzone>
          <CollabImage
            type={'CONCEPT'}
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
                <img src={require('assets/images/utility/confirm.png')} />
                <p>By selecting the confimation below, the concept boards will be submitted to your client.</p>
                <button onClick={handleSubmitConceptboards} className="u-text-uppercase">
                  Approve	&amp; Submit
                </button>
              </Modal>
            )}
          </CollabImage>
        </CollabWorkzone>
      );
    case !props.floorplan:
      return (
        <CollabWorkzone>
          <CollabAlert
            type={'FLOOR_PLAN'}
            handleFileChanged={props.handleFileChanged}
          >
            <p>
              Using the floor plan provided by the client,
              create and upload a floor plan to begin the design process.
            </p>
          </CollabAlert>
        </CollabWorkzone>
      );
    case props.floorplan && !hasApprovedDetails([props.floorplan]):
      return (
        <CollabWorkzone>
          <CollabImage
            type={'FLOOR_PLAN'}
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
                <img src={require('assets/images/utility/confirm.png')} />
                <p>By selecting the confimation below, the floorplan will be submitted to your client.</p>
                <button onClick={handleSubmitFloorplan} className="u-text-uppercase">
                  Approve	&amp; Submit
                </button>
              </Modal>
            )}
          </CollabImage>
        </CollabWorkzone>
      );
    case !!props.floorplan:
      return (
        <CollabWorkzone>
          <CollabMap
            floorplan={props.floorplan!}
            items={props.items}
            handleGetItems={props.handleGetItems}
            handleAddItem={props.handleAddItem}
          />
        </CollabWorkzone>
      );
    default:
      return <Fragment />;
  }
};

export default DesignDesigner;
