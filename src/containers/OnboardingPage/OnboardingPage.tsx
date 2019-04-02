import React, { Component, Fragment } from 'react';
import './OnboardingPage.scss';

import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';

class OnboardingPage extends Component {

  render() {
    return (
      <Fragment>
        <HeaderComponent isOnboarding />
        <main className="splash">
          <div className="splash__container">
            <div className="splash__container__inner">
              Onboarding Page
            </div>
          </div>
        </main>
      </Fragment>
    );
  }
}

export default OnboardingPage;
