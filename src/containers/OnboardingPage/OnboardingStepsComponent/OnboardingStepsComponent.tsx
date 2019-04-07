import React from 'react';
import './OnboardingStepsComponent.scss';

import leftArrow from '../../../assets/images/icons/left-arrow.png';

import { OnboardingForm } from '../OnboardingPage';

interface OnboardingStepsComponentProps {
  step: number;
  form: OnboardingForm;
  handleBackClicked: () => void;
  handleTypeClicked: (e: React.SyntheticEvent<HTMLInputElement>) => void;
  handleQuizImageClicked: (e: React.SyntheticEvent<HTMLButtonElement>) => void;
}

const OnboardingStepsComponent = (props: OnboardingStepsComponentProps) => {
  const { step, handleBackClicked } = props;

  return (
    <div className="onboarding__steps__container">
      <div className="onboarding__steps__header">
        <div className="onboarding__steps__header__title">
          <h1 className="u-margin-hug--vert u-text-bold">
            {getStep(props).title}
          </h1>
        </div>
        <nav className="onboarding__steps__header__nav">
          <button onClick={handleBackClicked}><img src={leftArrow} />BACK</button>
          STEP {step}/5
        </nav>
      </div>
      <div className="onboarding__steps__subheader">
        {getStep(props).subtitle}
      </div>
      <div className="onboarding__steps__content">
        {getStep(props).component}
      </div>
    </div>
  );
};

const getStep = (props: OnboardingStepsComponentProps) => {
  switch (props.step) {
    case 1:
      return {
        title: 'ROOM SELECTION',
        subtitle: 'Select your space',
        component: <OnboardingRoomSelectComponent {...props} />,
      };
    case 2:
    case 3:
    case 4:
      return {
        title: 'STYLE PREFERENCE',
        subtitle: 'Select which style best fits you',
        component: <OnboardingQuizComponent {...props} />,
      };
    default:
      return {
        title: '',
        subtitle: '',
        component: <React.Fragment />,
      };
  }
};

interface RoomType {
  type: string;
  title: string;
}

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

const OnboardingRoomSelectComponent = (props: OnboardingStepsComponentProps) => (
  <div className="onboarding__steps__rooms">
    {rooms.map((room) => (
      <div className="onboarding__steps__rooms__container" key={room.type}>
        <input
          type="radio"
          id={room.type}
          name={room.type}
          checked={props.form.type === room.type}
          onClick={props.handleTypeClicked}
          readOnly
        />
        <label className="onboarding__steps__rooms__item" htmlFor={room.type}>
          <img src={require(`../../../assets/images/onboarding/rooms/${room.type}.png`)} />
          <p className="u-margin-hug--bottom">{room.title}</p>
        </label>
      </div>
    ))}
  </div>
);

const getQuizImage = (step: number, index: number) => {
  return require(`../../../assets/images/onboarding/styles/quiz_${step - 1}_${index + 1}.jpg`)
};

const OnboardingQuizComponent = (props: OnboardingStepsComponentProps) => (
  <div className="onboarding__steps__quiz">
    {[...Array(2)].map((_, index) => (
      <button
        key={index}
        className="onboarding__steps__quiz__button"
        style={{
          backgroundImage: `url(${getQuizImage(props.step, index)})`,
        }}
        data-step={props.step}
        data-choice={index}
        onClick={props.handleQuizImageClicked}
      />
    ))}
  </div>
);

export default React.memo(OnboardingStepsComponent);
