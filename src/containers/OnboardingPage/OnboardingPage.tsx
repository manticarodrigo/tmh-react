import React, { Component } from 'react';
import './OnboardingPage.scss';

import OnboardingStepsComponent from './OnboardingStepsComponent/OnboardingStepsComponent';

interface OnboardingPageState {
  step: number;
  form: OnboardingForm;
}

export interface OnboardingForm {
  room: string;
  styles: object;
  package: string;
  zip: string;
  shared_with: string;
  pet_friendly: boolean | undefined;
}

class OnboardingPage extends Component<any, OnboardingPageState> {
  state = {
    step: 7,
    form: {
      room: '',
      styles: {},
      package: '',
      zip: '',
      shared_with: '',
      pet_friendly: undefined,
    },
  };

  handleStart = () => this.setState({ step: 1 });

  handleStepBack = () => this.setState({ step: this.state.step - 1 });

  handleStepForward = () => this.setState({ step: this.state.step + 1 });

  handleRoomClicked = (e: React.SyntheticEvent<HTMLInputElement>) => (
    this.setState({
      step: this.state.step + 1,
      form: {
        ...this.state.form,
        room: e.currentTarget.name,
      },
    })
  )

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
        package: type as string,
      },
    });
  }

  handleZipChanged = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const re = /^[0-9\b]+$/;
    if (re.test(e.currentTarget.value)) {
      this.setState({
        form: {
          ...this.state.form,
          zip: e.currentTarget.value,
        },
      });
    }
  }

  handleSharedWithChanged = (e: React.SyntheticEvent<HTMLInputElement>) => (
    this.setState({
      step: this.state.step + 1,
      form: {
        ...this.state.form,
        shared_with: e.currentTarget.value,
      },
    })
  )

  handlePetsChanged = (e: React.SyntheticEvent<HTMLInputElement>) => {
    return this.setState({
      step: this.state.step + 1,
      form: {
        ...this.state.form,
        pet_friendly: Boolean(parseInt(e.currentTarget.value, 10)),
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
              handleStepBack={this.handleStepBack}
              handleStepForward={this.handleStepForward}
              handleRoomClicked={this.handleRoomClicked}
              handleQuizImageClicked={this.handleQuizImageClicked}
              handlePackageClicked={this.handlePackageClicked}
              handleZipChanged={this.handleZipChanged}
              handleSharedWithChanged={this.handleSharedWithChanged}
              handlePetsChanged={this.handlePetsChanged}
            />
          )}
        </div>
      </main>
    );
  }
}

export default OnboardingPage;
