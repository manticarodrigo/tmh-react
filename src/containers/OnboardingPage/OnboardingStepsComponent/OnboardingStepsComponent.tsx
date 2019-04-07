import React from 'react';
import './OnboardingStepsComponent.scss';

import leftArrow from '../../../assets/images/icons/left-arrow.png';

import { OnboardingForm } from '../OnboardingPage';

import OnboardingPackagesComponent from '../OnboardingPackagesComponent/OnboardingPackagesComponent';
import OnboardingQuizComponent from '../OnboardingQuizComponent/OnboardingQuizComponent';
import OnboardingRoomSelectComponent from '../OnboardingRoomSelectComponent/OnboardingRoomSelectComponent';

export interface OnboardingStepsComponentProps {
  step: number;
  form: OnboardingForm;
  handleBackClicked: () => void;
  handleTypeClicked: (e: React.SyntheticEvent<HTMLInputElement>) => void;
  handleQuizImageClicked: (e: React.SyntheticEvent<HTMLButtonElement>) => void;
  handlePackageClicked: (e: React.SyntheticEvent<HTMLButtonElement>) => void;
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
        <h2 className="p u-margin-hug--vert">{getStep(props).subtitle}</h2>
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

export default React.memo(OnboardingStepsComponent);
