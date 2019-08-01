import React from 'react';
import './OnboardingZip.scss';

import { OnboardingStepsProps } from '../OnboardingSteps/OnboardingSteps';

const OnboardingZip = (props: OnboardingStepsProps) => (
  <div className="onboarding__steps__zip">
    <div className="onboarding__steps__zip__form">
      <p className="h2 u-margin-hug--top">What&#39;s your zip code?</p>
      <input
        type="tel"
        placeholder="zip"
        value={props.form.zipcode}
        maxLength={5}
        pattern="[0-9]*"
        className="u-placeholder-uppercase"
        onChange={props.handleZipChanged}
      />
      <button
        type="button"
        className="u-text-uppercase"
        disabled={props.form.zipcode.length !== 5}
        onClick={props.handleStepForward}
      >
        Continue
      </button>
    </div>
  </div>
);

export default OnboardingZip;
