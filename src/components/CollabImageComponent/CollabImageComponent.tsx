import React from 'react';
import './CollabImageComponent.scss';

import { Detail } from '../../reducers/ProjectReducer';

interface CollabImageComponentProps {
  details: Detail[];
  index: number;
}

const CollabImageComponent = (props: CollabImageComponentProps) => (
  <div className="collab__image">
    <img className="collab__image__selected" src={props.details[props.index].image as string} />
    <div className="collab__image__thumbs">
      {props.details.map((detail, index) => (
        <div
          key={detail.id}
          className={`collab__image__thumb${props.index === index ? ' collab__image__thumb--selected' : ''}`}
        >
          <img src={detail.image as string} />
        </div>
      ))}
    </div>
  </div>
);

export default React.memo(CollabImageComponent);
