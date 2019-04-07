import React from 'react';

import { OnboardingStepsComponentProps } from '../OnboardingStepsComponent/OnboardingStepsComponent';

const questions = [
  {
    value: 'MYSELF',
    label: 'Myself',
  },
  {
    value: 'PARTNER',
    label: 'Partner',
  },
  {
    value: 'ROOMMATE',
    label: 'Roomate(s)',
  },
  {
    value: 'FAMILY',
    label: 'Family',
  },
];

const OnboardingSharedWithComponent = (props: OnboardingStepsComponentProps) => (
  <div className="onboarding__steps__questions">
    <p className="h2 u-margin-hug--top">Who do you share your space with?</p>
    <form className="onboarding__steps__questions__form">
      {questions.map((option, index) => (
        <div key={index} className="onboarding__steps__questions__form__item">
          <input
            id={option.value}
            type="radio"
            value={option.value}
            checked={props.form.shared_with === option.value}
            onClick={props.handleSharedWithChanged}
            readOnly
          />
          <label className="u-text-uppercase u-text-bold" htmlFor={option.value}>
            {option.label}
          </label>
        </div>
      ))}
    </form>
  </div>
);

export default React.memo(OnboardingSharedWithComponent);
