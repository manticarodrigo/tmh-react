import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Action } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import './DashboardPage.scss';

import { AppState } from '../../store/Store';

import { CurrentUser } from '../../reducers/UserReducer';

import { getProjects } from '../../actions/ProjectActions';
import { Project } from '../../reducers/ProjectReducer';


import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';

interface DashboardPageProps extends RouteComponentProps {
  currentUser?: CurrentUser;
  projects?: Project[];
  getProjects: () => Promise<Project[]>;
}

class DashboardPage extends Component<DashboardPageProps> {
  state = {
    loaded: false,
  }

  async componentDidMount() {
    console.log(this.props);
    const { currentUser, projects, getProjects, history } = this.props;
    if (currentUser && !projects) {
      const latest = await getProjects();
      if (latest && latest.length) {
        return this.setState({ loaded: true })
      }

      history.push('/onboarding');
    }
  }

  render() {
    const { currentUser, projects } = this.props;
    const { loaded } = this.state;

    return loaded ? (
      <main className="splash">
        <div className="splash__container">
          <div className="splash__container__inner">
            Dashboard Page
          </div>
        </div>
      </main>
    ) : <LoadingComponent />;
  }
}

const mapStateToProps = (store: AppState) => ({
  currentUser: store.userState.currentUser,
  projects: store.projectState.projects,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, void, Action>) => ({
  getProjects: () => dispatch(getProjects()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DashboardPage));
