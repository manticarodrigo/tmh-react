import React from 'react';
import './OnboardingPackagesComponent.scss';

import { OnboardingStepsComponentProps } from '../OnboardingStepsComponent/OnboardingStepsComponent';

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

const OnboardingPackagesComponent = () => (
  <div className="onboarding__steps__packages">
    {packages.map((pckg, index) => (
      <div key={index} className="onboarding__steps__packages__item">
        <img src={require(`../../../assets/images/onboarding/packages/${pckg.type}.png`)} />
        <h3>{pckg.title}</h3>
        <p>{pckg.subtitle}</p>
        <h4>${pckg.price}</h4>
      </div>
    ))}
  </div>
);

export default React.memo(OnboardingPackagesComponent);
