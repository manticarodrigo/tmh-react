import React from 'react';
import './OnboardingPackages.scss';

import { OnboardingStepsProps } from '../OnboardingSteps/OnboardingSteps';

interface PackageType {
  type: string;
  title: string;
  subtitle: string;
  price: number;
}

const packages: PackageType[] = [
  {
    type: 'single',
    title: 'Single Room',
    subtitle: 'Keep it simple. Start with a single room.',
    price: 399,
  },
  {
    type: 'double',
    title: 'Double Room',
    subtitle: 'Cover more of your floorplan.',
    price: 699,
  },
  {
    type: 'triple',
    title: 'Triple Room',
    subtitle: 'Impress throughout your home.',
    price: 999,
  },
];

const OnboardingPackages = (props: OnboardingStepsProps) => (
  <div className="onboarding__steps__packages">
    <div className="onboarding__steps__packages__options">
      {packages.map((pckg, index) => (
        <div key={index} className="onboarding__steps__packages__options__item">
          <div>
            <img src={require(`../../../assets/images/onboarding/packages/${pckg.type}.png`)} />
          </div>
          <p className="h2 u-text-bold u-text-uppercase">{pckg.title}</p>
          <p>{pckg.subtitle}</p>
          <p className="h1 u-text-bold">${pckg.price}</p>
          <button
            type="button"
            data-type={pckg.type}
            onClick={props.handlePackageClicked}
          >
            Select
          </button>
        </div>
      ))}
    </div>
    <div className="onboarding__steps__packages__info">
      <h4 className="u-text-uppercase">Included In Each Package</h4>
      <div className="onboarding__steps__packages__info__columns">
        <div className="onboarding__steps__packages__info__columns__item">
          <p className="h3">Full Service Design:</p>
          <ul className="u-list-unstyled">
            <li>15 day design process per room</li>
            <li>2 conceptboard options</li>
            <li>Unlimited design revisions within window</li>
            <li>Chat service with personal designer</li>
          </ul>
        </div>
        <div className="onboarding__steps__packages__info__columns__item">
          <p className="h3">Final revisions:</p>
          <ul className="u-list-unstyled">
            <li>3D Virtual Tour of design</li>
            <li>Conceptboard and Floorplan</li>
            <li>Shopping List &amp; Cart</li>
            <li>Detailed set-up instructions</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default React.memo(OnboardingPackages);
