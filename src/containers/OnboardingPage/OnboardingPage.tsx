import React, { Component } from 'react';
import './OnboardingPage.scss';

import OnboardingStepsComponent from './OnboardingStepsComponent/OnboardingStepsComponent';

interface OnboardingPageState {
  step: number;
  form: OnboardingForm;
}

export interface OnboardingForm {
  type: string;
  styles: object;
}

class OnboardingPage extends Component<any, OnboardingPageState> {
  state = {
    step: 0,
    form: {
      type: '',
      styles: {},
      package: '',
    },
  };

  handleStart = () => this.setState({ step: 1 });

  handleBackClicked = () => this.setState({ step: this.state.step - 1 });

  handleTypeClicked = (e: React.SyntheticEvent<HTMLInputElement>) => {
    this.setState({
      step: 2,
      form: {
        ...this.state.form,
        type: e.currentTarget.name,
      },
    });
  }

  handleQuizImageClicked = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    const { step, choice } = e.currentTarget.dataset;
    this.setState({
      step: this.state.step + 1,
      form: {
        ...this.state.form,
        styles: {
          ...this.state.form.styles,
          [step as string]: choice,
        },
      },
    });
  }

  handlePackageClicked = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    const { type } = e.currentTarget.dataset;
    this.setState({
      step: this.state.step + 1,
      form: {
        ...this.state.form,
        package: type,
      },
    });
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
              handleTypeClicked={this.handleTypeClicked}
              handleQuizImageClicked={this.handleQuizImageClicked}
              handlePackageClicked={this.handlePackageClicked}
            />
          )}
        </div>
      </main>
    );
  }
}

export default OnboardingPage;
