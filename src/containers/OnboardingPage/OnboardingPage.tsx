import React, { ChangeEvent, Component } from 'react';
import './OnboardingPage.scss';

import OnboardingStepsComponent from './OnboardingStepsComponent/OnboardingStepsComponent';

interface OnboardingPageState {
  step: number;
  form: OnboardingForm;
}

export interface OnboardingForm {
  type: string;
}

class OnboardingPage extends Component<any, OnboardingPageState> {
  state = {
    step: 0,
    form: {
      type: '',
    },
  };

  handleStart = () => this.setState({ step: 1 });

  handleBackClicked = () => this.setState({ step: this.state.step - 1 });

  handleTypeClicked = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ form: { ...this.state.form, type: e.target.name }, step: 2 });
  }

  render() {
    const { step } = this.state;
    return (
      <main className="onboarding__container">
        <div className="onboarding__container__inner">
          {step === 0 && (
            <div className="onboarding__welcome">
              <h1 className="onboarding__welcome__headline">WELCOME TO<br />THE MAN HOME</h1>
              <p className="onboarding__welcome__subheadline">Time to like where you wake up</p>
              <button
                className="onboarding__welcome__button"
                onClick={this.handleStart}
              >
                START YOUR PROJECT
              </button>
            </div>
          )}
          {step > 0 && (
            <OnboardingStepsComponent
              {...this.state}
              handleBackClicked={this.handleBackClicked}
              handleTypeClicked={this.handleTypeClicked} />
          )}
        </div>
      </main>
    );
  }
}

export default OnboardingPage;
