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
        title: 'Room Selection',
        subtitle: 'Select your space',
        component: <OnboardingRoomSelectComponent {...props} />,
      };
    case 2:
    case 3:
    case 4:
      return {
        title: 'Style Preference',
        subtitle: 'Select which style best fits you',
        component: <OnboardingQuizComponent {...props} />,
      };
    case 5:
      return {
        title: 'Packages',
        subtitle: 'How many spaces are you working on?',
        component: <OnboardingPackagesComponent {...props} />,
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
  return require(`../../../assets/images/onboarding/styles/quiz_${step - 1}_${index + 1}.jpg`);
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

interface PackageType {
  type: string;
  title: string;
  subtitle: string;
  price: number;
}

const packages: PackageType[] = [
  {
    type: 'single',
    title: 'Single Room',
    subtitle: 'Keep it simple. Start with a single room.',
    price: 399,
  },
  {
    type: 'double',
    title: 'Double Room',
    subtitle: 'Cover more of your floorplan.',
    price: 699,
  },
  {
    type: 'triple',
    title: 'Triple Room',
    subtitle: 'Impress throughout your home.',
    price: 999,
  },
];

const OnboardingPackagesComponent = (props: OnboardingStepsComponentProps) => (
  <div className="onboarding__steps__packages">
    {packages.map((pckg, index) => (
      <div key={index} className="onboarding__steps__packages__item">
        <img src={require(`../../../assets/images/onboarding/packages/${pckg.type}.png`)} />
        <h3>{pckg.title}</h3>
        <p>{pckg.subtitle}</p>
        <h4>${pckg.price}</h4>
      </div>
    ))}
  </div>
);

export default React.memo(OnboardingStepsComponent);
