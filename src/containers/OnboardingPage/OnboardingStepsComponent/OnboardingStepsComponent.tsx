import React, { ChangeEvent } from 'react';
import './OnboardingStepsComponent.scss';

import leftArrow from '../../../assets/images/icons/left-arrow.png';

import { OnboardingForm } from '../OnboardingPage';

interface OnboardingStepsComponentProps {
  step: number;
  form: OnboardingForm;
  handleBackClicked: () => void;
  handleTypeClicked: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface StepType {
  title: string;
  subtitle: string;
}

const steps: StepType[] = [
  {
    title: 'ROOM SELECTION',
    subtitle: 'Select your space',
  },
  {
    title: 'STYLE PREFERENCE',
    subtitle: 'Select which style best fits you',
  },
];

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

const OnboardingStepsComponent = (props: OnboardingStepsComponentProps) => {
  const { step, handleBackClicked } = props;

  return (
    <div className="onboarding__steps__container">
      <div className="onboarding__steps__header">
        <div className="onboarding__steps__header__title">
          <h1 className="u-margin-hug--vert u-text-bold">
            {steps[step - 1].title}
          </h1>
        </div>
        <nav className="onboarding__steps__header__nav">
          <button onClick={handleBackClicked}><img src={leftArrow} />BACK</button>
          STEP {step}/5
        </nav>
      </div>
      <div className="onboarding__steps__subheader">
        {steps[step - 1].subtitle}
      </div>
      <div className="onboarding__steps__content">
        <OnboardingCurrentStepComponent {...props} />
      </div>
    </div>
  );
};

const OnboardingCurrentStepComponent = (props: OnboardingStepsComponentProps) => {
  switch (props.step) {
    case 1:
      return <OnboardingRoomSelectComponent {...props} />;
    case 2:
    case 3:
    case 4:
      return <OnboardingQuizComponent {...props} />;
    default:
      return null;
  }
};

const OnboardingRoomSelectComponent = (props: OnboardingStepsComponentProps) => (
  <div className="onboarding__steps__rooms">
    {rooms.map((room) => (
      <div className="onboarding__steps__rooms__container" key={room.type}>
        <input
          type="radio"
          id={room.type}
          name={room.type}
          checked={props.form.type === room.type}
          onChange={props.handleTypeClicked}
        />
        <label className="onboarding__steps__rooms__item" htmlFor={room.type}>
          <img src={require(`../../../assets/images/onboarding/rooms/${room.type}.png`)} />
          <p className="u-margin-hug--bottom">{room.title}</p>
        </label>
      </div>
    ))}
  </div>
);

const OnboardingQuizComponent = (props: OnboardingStepsComponentProps) => (
  <div className="onboarding__steps__quiz">
    <div className="onboarding__steps__quiz__image">
      <img src={require(`../../../assets/images/onboarding/styles/quiz_${props.step - 1}_1.jpg`)} />
    </div>
    <div className="onboarding__steps__quiz__image">
      <img src={require(`../../../assets/images/onboarding/styles/quiz_${props.step - 1}_2.jpg`)} />
    </div>
  </div>
);

export default React.memo(OnboardingStepsComponent);
