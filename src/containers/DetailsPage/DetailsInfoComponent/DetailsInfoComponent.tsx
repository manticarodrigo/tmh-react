import React from 'react';
import './DetailsInfoComponent.scss';

import { Project } from '../../../reducers/ProjectReducer';

interface DetailsInfoComponentProps {
  project: Project;
}

const DetailsInfoComponent = (props: DetailsInfoComponentProps) => (
  <div className="details__info">
    <h3 className="h1">Project Details</h3>
    <div className="details__info__box">
      <div className="details__info__image">
        <img src={require(`../../../assets/images/onboarding/rooms/${props.project.room}.png`)} />
      </div>
      <div className="details__info__details">
        <p className="h2 u-margin-hug--vert"><b>{new Project(props.project).getReadableRoom()}</b></p>
        <p className="h2 u-margin-hug--vert"><b>{props.project.budget}</b></p>
        <p className="u-color--secondary-darker">Project Notes</p>
        <p className="u-margin-hug--vert">Style: {props.project.style}</p>
        <p className="u-margin-hug--vert">Zip code: {props.project.zipcode}</p>
        <p className="u-margin-hug--vert">Shared space with: {props.project.shared_with}</p>
        <p className="u-margin-hug--vert">Pet friendly options: {props.project.pet_friendly}</p>
        <p className="u-margin-hug--vert">Limited access: {props.project.limited_access}</p>
      </div>
    </div>
  </div>
);

export default React.memo(DetailsInfoComponent);
