import React from 'react';
import './OnboardingQuiz.scss';

import { OnboardingStepsProps } from '../OnboardingSteps/OnboardingSteps';

const getQuizImage = (step: number, index: number) => {
  return require(`../../../assets/images/onboarding/styles/quiz_${step - 1}_${index + 1}.jpg`);
};

const OnboardingQuiz = (props: OnboardingStepsProps) => (
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

export default React.memo(OnboardingQuiz);
