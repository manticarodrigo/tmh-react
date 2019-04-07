import React from 'react';
import './OnboardingStepsComponent.scss';

import leftArrow from '../../../assets/images/icons/left-arrow.png';

import { OnboardingForm } from '../OnboardingPage';

import OnboardingPackagesComponent from '../OnboardingPackagesComponent/OnboardingPackagesComponent';
import OnboardingQuizComponent from '../OnboardingQuizComponent/OnboardingQuizComponent';
import OnboardingRoomSelectComponent from '../OnboardingRoomSelectComponent/OnboardingRoomSelectComponent';
import OnboardingZipComponent from '../OnboardingZipComponent/OnboardingZipComponent';

export interface OnboardingStepsComponentProps {
  step: number;
  form: OnboardingForm;
  handleStepBack: () => void;
  handleStepForward: () => void;
  handleRoomClicked: (e: React.SyntheticEvent<HTMLInputElement>) => void;
  handleQuizImageClicked: (e: React.SyntheticEvent<HTMLButtonElement>) => void;
  handlePackageClicked: (e: React.SyntheticEvent<HTMLButtonElement>) => void;
  handleZipChanged: (e: React.SyntheticEvent<HTMLInputElement>) => void;
}

const OnboardingStepsComponent = (props: OnboardingStepsComponentProps) => {
  const { step, handleStepBack } = props;

  return (
    <div className="onboarding__steps__container">
      <div className="onboarding__steps__header">
        <div className="onboarding__steps__header__title">
          <h1 className="u-margin-hug--vert u-text-bold">
            {getStep(props).title}
          </h1>
        </div>
        <nav className="onboarding__steps__header__nav">
          <button onClick={handleStepBack}><img src={leftArrow} />BACK</button>
          STEP {step}/8
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
    case 6:
      return {
        title: 'Final Questions',
        subtitle: 'Just a few questions. We promise.',
        component: <OnboardingZipComponent {...props} />,
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
