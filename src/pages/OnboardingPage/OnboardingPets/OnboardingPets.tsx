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

const OnboardingPets = (props: OnboardingStepsProps) => (
  <div className="onboarding__steps__questions">
    <p className="h2 u-margin-hug--top">Would you like your designer to select pet friendly options?</p>
    <form className="onboarding__steps__questions__form">
      {questions.map((option, index) => (
        <div key={index} className="onboarding__steps__questions__form__item">
          <input
            id={option.label.toLowerCase()}
            type="radio"
            value={option.value}
            checked={props.form.pet_friendly === Boolean(option.value)}
            onClick={props.handlePetsClicked}
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

export default OnboardingPets;
