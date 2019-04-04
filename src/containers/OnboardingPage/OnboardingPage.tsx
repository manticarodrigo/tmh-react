import React, { Component, Fragment } from 'react';
import './OnboardingPage.scss';

import OnboardingStepsComponent from './OnboardingStepsComponent/OnboardingStepsComponent';

class OnboardingPage extends Component {
  state = {
    step: 0,
  };

  handleStart = () => this.setState({ step: 1 });

  handleHandleBack = () => this.setState({ step: this.state.step - 1 });

  render() {
    const { step } = this.state;
    return (
      <Fragment>
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
              <OnboardingStepsComponent step={step} handleBackClicked={this.handleHandleBack} />
            )}
          </div>
        </main>
      </Fragment>
    );
  }
}

export default OnboardingPage;
