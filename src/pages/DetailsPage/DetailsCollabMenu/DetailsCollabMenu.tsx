import React from 'react';
import './DetailsCollabMenu.scss';

import { Project } from '../../../store/reducers/ProjectReducer';

type DetailsCollabMenuProps = {
  project: Project;
  view: string;
  handleViewChanged: (e: React.SyntheticEvent<HTMLButtonElement>) => void;
};

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

const checkActiveView = (view: string, tab: string) => {
  return view === tab ?
    ' details__collab__menu__button details__collab__menu__button--active'
    : ' details__collab__menu__button';
};

const DetailsCollabMenu = (props: DetailsCollabMenuProps) => (
  <div className="details__collab__menu">
    {tabs.map((tab) => (
      <button
        key={tab.value}
        className={`u-text-uppercase${checkActiveView(props.view, tab.value)}`}
        data-view={tab.value}
        onClick={props.handleViewChanged}
      >
        <img src={tab.image} />
        <p className="u-margin-hug--vert">{tab.title}</p>
      </button>
    ))}
  </div>
);

export default DetailsCollabMenu;
