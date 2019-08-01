import React from 'react';

import { OnboardingStepsProps } from '../OnboardingSteps/OnboardingSteps';

const questions = [
  {
    value: 1,
    label: 'Yes',
  },
  {
    value: 0,
    label: 'No',
  },
];

const OnboardingAccess = (props: OnboardingStepsProps) => (
  <div className="onboarding__steps__questions">
    <p className="h2 u-margin-hug--top">
      Is it difficult moving furniture in and out of your home? (i.e. narrow hallways)
    </p>
    <form className="onboarding__steps__questions__form">
      {questions.map((option, index) => (
        <div key={index} className="onboarding__steps__questions__form__item">
          <input
            id={option.label.toLowerCase()}
            type="radio"
            value={option.value}
            checked={props.form.limited_access === Boolean(option.value)}
            onClick={props.handleAccessClicked}
            readOnly
          />
          <label className="u-text-uppercase u-text-bold" htmlFor={option.label.toLowerCase()}>
            {option.label}
          </label>
        </div>
      ))}
    </form>
  </div>
);

export default OnboardingAccess;
