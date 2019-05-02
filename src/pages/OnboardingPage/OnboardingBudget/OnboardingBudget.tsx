import React from 'react';

import { OnboardingStepsProps } from '../OnboardingSteps/OnboardingSteps';

import { ProjectBudgetOptions } from '../../../store/reducers/ProjectReducer';

interface BudgetQuestion {
  value: ProjectBudgetOptions;
  label: string;
}
const questions: BudgetQuestion[] = [
  {
    value: ProjectBudgetOptions.LOW,
    label: '$2k or less',
  },
  {
    value: ProjectBudgetOptions.MEDIUM,
    label: '$2k - $4k',
  },
  {
    value: ProjectBudgetOptions.HIGH,
    label: '$4k - $6k',
  },
  {
    value: ProjectBudgetOptions.UNLIMITED,
    label: '$6k or more',
  },
];

const OnboardingBudget = (props: OnboardingStepsProps) => {
  const handleBudgetClicked = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    props.handleBudgetClicked(value as ProjectBudgetOptions);
  };

  return (
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
              onClick={handleBudgetClicked}
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
};

export default React.memo(OnboardingBudget);
