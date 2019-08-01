import React, { useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import './OnboardingPage.scss';

import useAppState from 'hooks/useAppState';
import { createProject } from 'store/actions/ProjectActions';
import { ProjectBudgetOptions, ProjectStatus, ProjectOnboardingForm } from 'store/reducers/ProjectReducer';

import Header from 'components/Header/Header';
import OnboardingSteps from './OnboardingSteps/OnboardingSteps';

type OnboardingPageState = {
  step: number;
  form: ProjectOnboardingForm;
};

const OnboardingPage = ({ history }: RouteComponentProps) => {
  const [{ authState: { auth } }, dispatch] = useAppState();
  const [state, setState] = useState<OnboardingPageState>({
    step: 0,
    form: {
      room: '',
      styles: {},
      package: '',
      zipcode: '',
      shared_with: '',
      pet_friendly: undefined,
      limited_access: undefined,
      budget: ProjectBudgetOptions.LOW,
    },
  });

  const handleStart = () => setState({ ...state, step: 1 });

  const handleStepBack = () => setState({ ...state, step: state.step - 1 });

  const handleStepForward = () => setState({ ...state, step: state.step + 1 });

  const handleRoomClicked = ({ currentTarget }: React.SyntheticEvent<HTMLInputElement>) => (
    setState({
      step: state.step + 1,
      form: {
        ...state.form,
        room: currentTarget.name,
      },
    })
  );

  const handleQuizImageClicked = ({ currentTarget }: React.SyntheticEvent<HTMLButtonElement>) => {
    const { step, choice } = currentTarget.dataset;

    setState({
      step: state.step + 1,
      form: {
        ...state.form,
        styles: {
          ...state.form.styles,
          [step as string]: choice,
        },
      },
    });
  };

  const handlePackageClicked = ({ currentTarget }: React.SyntheticEvent<HTMLButtonElement>) => {
    const { type } = currentTarget.dataset;

    setState({
      step: state.step + 1,
      form: {
        ...state.form,
        package: type as string,
      },
    });
  };

  const handleZipChanged = ({ currentTarget }: React.SyntheticEvent<HTMLInputElement>) => {
    const re = /^[0-9\b]+$/;
    if (re.test(currentTarget.value)) {
      setState({
        ...state,
        form: {
          ...state.form,
          zipcode: currentTarget.value,
        },
      });
    }
  };

  const handleSharedWithClicked = ({ currentTarget }: React.SyntheticEvent<HTMLInputElement>) => (
    setState({
      step: state.step + 1,
      form: {
        ...state.form,
        shared_with: currentTarget.value,
      },
    })
  );

  const handlePetsClicked = ({ currentTarget }: React.SyntheticEvent<HTMLInputElement>) => (
    setState({
      step: state.step + 1,
      form: {
        ...state.form,
        pet_friendly: Boolean(parseInt(currentTarget.value, 10)),
      },
    })
  );

  const handleAccessClicked = ({ currentTarget }: React.SyntheticEvent<HTMLInputElement>) => (
    setState({
      step: state.step + 1,
      form: {
        ...state.form,
        limited_access: Boolean(parseInt(currentTarget.value, 10)),
      },
    })
  );

  const handleBudgetClicked = (budget: ProjectBudgetOptions) => {
    setState({
      step: state.step + 1,
      form: {
        ...state.form,
        budget,
      },
    });

    setTimeout(() => handleSubmit());
  };

  const handleSubmit = async () => {
    const {
      room,
      zipcode,
      shared_with,
      pet_friendly,
      limited_access,
      budget,
    } = state.form;

    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 15);

    const project = {
      room,
      shared_with,
      budget,
      zipcode,
      style: 'Style goes here...',
      pet_friendly: pet_friendly!,
      limited_access: limited_access!,
      status: ProjectStatus.DETAILS,
      end_date: endDate.toISOString(),
      client: auth!.user.id!,
    };

    await dispatch(createProject(project));

    history.push('/');
  };

  return (
    <React.Fragment>
      <Header auth={auth} />
      <main className="onboarding">
        <div className="onboarding__container">
          {state.step === 0 && (
            <div className="onboarding__welcome">
              <h1 className="onboarding__welcome__headline">WELCOME TO<br />THE MAN HOME</h1>
              <p className="onboarding__welcome__subheadline">Time to like where you wake up</p>
              <button
                className="onboarding__welcome__button"
                onClick={handleStart}
              >
                START YOUR PROJECT
              </button>
            </div>
          )}
          {state.step > 0 && (
            <OnboardingSteps
              {...state}
              handleStepBack={handleStepBack}
              handleStepForward={handleStepForward}
              handleRoomClicked={handleRoomClicked}
              handleQuizImageClicked={handleQuizImageClicked}
              handlePackageClicked={handlePackageClicked}
              handleZipChanged={handleZipChanged}
              handleSharedWithClicked={handleSharedWithClicked}
              handlePetsClicked={handlePetsClicked}
              handleAccessClicked={handleAccessClicked}
              handleBudgetClicked={handleBudgetClicked}
            />
          )}
        </div>
      </main>
    </React.Fragment>
  );
};

export default withRouter(OnboardingPage);
