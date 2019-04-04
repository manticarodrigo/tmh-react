import React from 'react';
import './OnboardingStepsComponent.scss';

interface OnboardingStepsComponentProps {
  step: number;
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
  const { step } = props;

  return (
    <div className="onboarding__steps__container">
      <div className="onboarding__steps__header">
        <div className="onboarding__steps__title">
          {steps[step].title}
        </div>
        <div className="onboarding__steps__subtitle">
          {steps[step].subtitle}
        </div>
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
