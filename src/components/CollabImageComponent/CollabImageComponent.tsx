import React from 'react';
import './CollabImageComponent.scss';

import { Detail } from '../../reducers/ProjectReducer';

interface CollabImageComponentProps {
  details: Detail[];
}

const CollabImageComponent = (props: CollabImageComponentProps) => (
  <div className="collab__image">
    <img className="collab__image__selected" src={props.details[0].image as string} />
    <div className="collab__image__thumbs">
      {props.details.map((detail) => (
        <div key={detail.id} className="collab__image__thumb">
          <img src={detail.image as string} />
        </div>
      ))}
    </div>
  </div>
);

export default React.memo(CollabImageComponent);
