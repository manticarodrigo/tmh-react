import React from 'react';
import './DetailsCollabMenuComponent.scss';

import { Project } from '../../../reducers/ProjectReducer';

interface DetailsCollabMenuComponentProps {
  project: Project;
  view: string;
  handleViewChanged: (e: React.SyntheticEvent<HTMLButtonElement>) => void;
}

const tabs = [
  {
    title: 'Your Room',
    value: 'DRAWING',
    image: require('../../../assets/images/details/drawing.png'),
  },
  {
    title: 'Inspiration',
    value: 'INSPIRATION',
    image: require('../../../assets/images/details/inspiration.png'),
  },
  {
    title: 'Existing Furniture',
    value: 'FURNITURE',
    image: require('../../../assets/images/details/furniture.png'),
  },
];

const checkActiveView = (view: string, tab: string) => view === tab ? ' collab__details__menu__button--active' : '';

const DetailsCollabMenuComponent = (props: DetailsCollabMenuComponentProps) => (
  <div className="details__collab__menu">
    {tabs.map((tab) => (
      <button
        key={tab.value}
        className={`u-text-uppercase details__collab__menu__button${checkActiveView(props.view, tab.value)}`}
        data-view={tab.value}
        onClick={props.handleViewChanged}
      >
        <img src={tab.image} />
        {tab.title}
      </button>
    ))}
  </div>
);

export default React.memo(DetailsCollabMenuComponent);
