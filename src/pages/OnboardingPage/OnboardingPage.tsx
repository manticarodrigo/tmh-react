import React, { Component } from 'react';
import './OnboardingPage.scss';

import { RouteComponentProps, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { CurrentAuth } from '../../store/reducers/AuthReducer';
import { AppState } from '../../store/Store';

import { createProject } from '../../store/actions/ProjectActions';
import { Project, ProjectBudgetOptions, ProjectForm } from '../../store/reducers/ProjectReducer';

import Header from '../../components/Header/Header';
import OnboardingSteps from './OnboardingSteps/OnboardingSteps';

interface OnboardingPageProps extends RouteComponentProps {
  auth?: CurrentAuth;
  createProject: (project: object) => Promise<Project>;
}

interface OnboardingPageState {
  step: number;
  form: ProjectForm;
}

class OnboardingPage extends Component<OnboardingPageProps, OnboardingPageState> {
  state = {
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
          zipcode: e.currentTarget.value,
        },
      });
    }
  }

  handleSharedWithClicked = (e: React.SyntheticEvent<HTMLInputElement>) => (
    this.setState({
      step: this.state.step + 1,
      form: {
        ...this.state.form,
        shared_with: e.currentTarget.value,
      },
    })
  )

  handlePetsClicked = (e: React.SyntheticEvent<HTMLInputElement>) => (
    this.setState({
      step: this.state.step + 1,
      form: {
        ...this.state.form,
        pet_friendly: Boolean(parseInt(e.currentTarget.value, 10)),
      },
    })
  )

  handleAccessClicked = (e: React.SyntheticEvent<HTMLInputElement>) => (
    this.setState({
      step: this.state.step + 1,
      form: {
        ...this.state.form,
        limited_access: Boolean(parseInt(e.currentTarget.value, 10)),
      },
    })
  )

  handleBudgetClicked = (budget: ProjectBudgetOptions) => {
    this.setState({
      step: this.state.step + 1,
      form: {
        ...this.state.form,
        budget,
      },
    });

    setTimeout(() => this.handleSubmit());
  }

  handleSubmit = async () => {
    const {
      room,
      zipcode,
      shared_with,
      pet_friendly,
      limited_access,
      budget,
    } = this.state.form;

    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 15);

    const project = {
      room,
      shared_with,
      budget,
      zipcode: zipcode!,
      style: 'Style goes here...',
      pet_friendly: pet_friendly!,
      limited_access: limited_access!,
      status: 'DETAILS',
      end_date: endDate.toISOString(),
      client: this.props.auth!.user.id,
    };

    await this.props.createProject(project);

    this.props.history.push('/');
  }

  render() {
    const { auth } = this.props;
    const { step } = this.state;

    return (
      <React.Fragment>
        <Header auth={auth} />
        <main className="onboarding">
          <div className="onboarding__container">
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
              <OnboardingSteps
                {...this.state}
                handleStepBack={this.handleStepBack}
                handleStepForward={this.handleStepForward}
                handleRoomClicked={this.handleRoomClicked}
                handleQuizImageClicked={this.handleQuizImageClicked}
                handlePackageClicked={this.handlePackageClicked}
                handleZipChanged={this.handleZipChanged}
                handleSharedWithClicked={this.handleSharedWithClicked}
                handlePetsClicked={this.handlePetsClicked}
                handleAccessClicked={this.handleAccessClicked}
                handleBudgetClicked={this.handleBudgetClicked}
              />
            )}
          </div>
        </main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (store: AppState) => ({
  auth: store.authState.auth,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, void, Action>) => ({
  createProject: (project: object) => dispatch(createProject(project)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OnboardingPage));
