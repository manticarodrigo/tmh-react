import React from 'react';
import './OnboardingSteps.scss';

import leftArrow from '../../../assets/images/utility/left-arrow.png';

import { OnboardingForm } from '../OnboardingPage';

import OnboardingAccess from '../OnboardingAccess/OnboardingAccess';
import OnboardingBudget from '../OnboardingBudget/OnboardingBudget';
import OnboardingPackages from '../OnboardingPackages/OnboardingPackages';
import OnboardingPets from '../OnboardingPets/OnboardingPets';
import OnboardingQuiz from '../OnboardingQuiz/OnboardingQuiz';
import OnboardingRoomSelect from '../OnboardingRoomSelect/OnboardingRoomSelect';
import OnboardingSharedWith from '../OnboardingSharedWith/OnboardingSharedWith';
import OnboardingZip from '../OnboardingZip/OnboardingZip';

export interface OnboardingStepsProps {
  step: number;
  form: OnboardingForm;
  handleStepBack: () => void;
  handleStepForward: () => void;
  handleRoomClicked: (e: React.SyntheticEvent<HTMLInputElement>) => void;
  handleQuizImageClicked: (e: React.SyntheticEvent<HTMLButtonElement>) => void;
  handlePackageClicked: (e: React.SyntheticEvent<HTMLButtonElement>) => void;
  handleZipChanged: (e: React.SyntheticEvent<HTMLInputElement>) => void;
  handleSharedWithClicked: (e: React.SyntheticEvent<HTMLInputElement>) => void;
  handlePetsClicked: (e: React.SyntheticEvent<HTMLInputElement>) => void;
  handleAccessClicked: (e: React.SyntheticEvent<HTMLInputElement>) => void;
  handleBudgetClicked: (e: React.SyntheticEvent<HTMLInputElement>) => void;
}

const OnboardingSteps = (props: OnboardingStepsProps) => {
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
          <p className="u-margin-hug--vert">STEP {step}/10</p>
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

const getStep = (props: OnboardingStepsProps) => {
  switch (props.step) {
    case 1:
      return {
        title: 'Room Selection',
        subtitle: 'Select your space',
        component: <OnboardingRoomSelect {...props} />,
      };
    case 2:
    case 3:
    case 4:
      return {
        title: 'Style Preference',
        subtitle: 'Select which style best fits you',
        component: <OnboardingQuiz {...props} />,
      };
    case 5:
      return {
        title: 'Packages',
        subtitle: 'How many spaces are you working on?',
        component: <OnboardingPackages {...props} />,
      };
    case 6:
      return {
        title: 'Zip Code',
        subtitle: 'Please enter a valid postal code.',
        component: <OnboardingZip {...props} />,
      };
    case 7:
    case 8:
    case 9:
    case 10:
      return {
        title: 'Final Questions',
        subtitle: 'Just a few questions. We promise.',
        component: getFinalStep(props),
      };
    default:
      return {
        title: '',
        subtitle: '',
        component: <React.Fragment />,
      };
  }
};

const getFinalStep = (props: OnboardingStepsProps) => {
  switch (props.step) {
    case 7:
      return <OnboardingSharedWith {...props} />;
    case 8:
      return <OnboardingPets {...props} />;
    case 9:
      return <OnboardingAccess {...props} />;
    case 10:
      return <OnboardingBudget {...props} />;
    default:
      return <React.Fragment />;
  }
};

export default React.memo(OnboardingSteps);
