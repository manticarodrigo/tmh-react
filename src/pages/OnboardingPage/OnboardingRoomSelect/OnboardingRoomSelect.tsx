import React from 'react';
import './OnboardingRoomSelect.scss';

import { OnboardingStepsProps } from '../OnboardingSteps/OnboardingSteps';

type RoomType = {
  type: string;
  title: string;
};

const rooms: RoomType[] = [
  {
    type: 'LIVING_ROOM',
    title: 'Living Room',
  },
  {
    type: 'BEDROOM',
    title: 'Bedroom',
  },
  {
    type: 'DINING_ROOM',
    title: 'Dining Room',
  },
  {
    type: 'HOME_OFFICE',
    title: 'Home Office',
  },
  {
    type: 'STUDIO',
    title: 'Studio',
  },
  {
    type: 'MULTIPURPOSE_ROOM',
    title: 'Multipurpose Room',
  },
];

const OnboardingRoomSelect = (props: OnboardingStepsProps) => (
  <div className="onboarding__steps__rooms">
    {rooms.map((room) => (
      <div className="onboarding__steps__rooms__container" key={room.type}>
        <input
          type="radio"
          id={room.type}
          name={room.type}
          checked={props.form.room === room.type}
          onClick={props.handleRoomClicked}
          readOnly
        />
        <label className="onboarding__steps__rooms__item" htmlFor={room.type}>
          <img src={require(`assets/images/rooms/${room.type}.png`)} />
          <p className="u-margin-hug--bottom">{room.title}</p>
        </label>
      </div>
    ))}
  </div>
);

export default OnboardingRoomSelect;
