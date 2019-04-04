import React from 'react';
import './OnboardingStepsComponent.scss';

import leftArrow from '../../../assets/images/icons/left-arrow.png';

interface OnboardingStepsComponentProps {
  step: number;
  handleBackClicked: () => void;
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

const OnboardingStepsComponent = (props: OnboardingStepsComponentProps) => {
  const { step, handleBackClicked } = props;

  return (
    <div className="onboarding__steps__container">
      <div className="onboarding__steps__header">
        <div className="onboarding__steps__header__title">
          <h1 className="u-margin-hug--vert u-text-bold">
            {steps[step].title}
          </h1>
        </div>
        <nav className="onboarding__steps__header__nav">
          <button onClick={handleBackClicked}><img src={leftArrow} />BACK</button>
          STEP {step}/5
        </nav>
      </div>
      <div className="onboarding__steps__subheader">
        {steps[step].subtitle}
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
      return <OnboardingQuizComponent {...props} />;
    default:
      return null;
  }
};

const OnboardingQuizComponent = (props: OnboardingStepsComponentProps) => (
  <div className="onboarding__steps__quiz">
    <div className="onboarding__steps__quiz__image">
      <img src={require(`../../../assets/images/onboarding/quiz_${props.step}_1.jpg`)} />
    </div>
    <div className="onboarding__steps__quiz__image">
      <img src={require(`../../../assets/images/onboarding/quiz_${props.step}_2.jpg`)} />
    </div>
  </div>
);

export default React.memo(OnboardingStepsComponent);
