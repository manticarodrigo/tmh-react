import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import './DashboardPage.scss';

import headerIcon from '../../assets/images/onboarding/rooms/BEDROOM.png';

import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { AppState } from '../../store/Store';

import { CurrentUser, User } from '../../reducers/UserReducer';

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
  };

  async componentDidMount() {
    const { history } = this.props;

    const latest = await this.props.getProjects();
    if (latest && latest.length) {
      return this.setState({ loaded: true });
    }

    history.push('/onboarding');
  }

  render() {
    const { projects } = this.props;
    const { loaded } = this.state;

    return loaded ? (
      <main className="dashboard__container">
        <div className="dashboard__header">
          <img src={headerIcon} />
          <span>Client Name</span>
          <span>Project Type</span>
          <span>Last Edited</span>
          <span>Status</span>
          <span>Time Left</span>
          <span>Messages</span>
        </div>
        <div className="dashboard__projects">
          {projects!.map((project, index) => (
            <div key={index} className="dashboard__projects__item">
              <div className="dashboard__projects__item__image">
                <img src={require(`../../assets/images/onboarding/rooms/${project.room}.png`)} />
              </div>
              <span>{(new User(project.client as User)).getShortName()}</span>
              <span>{(new Project(project)).getReadableRoom()}</span>
              <span>{(new Project(project)).getReadableModifiedDate()}</span>
              <span>{(new Project(project)).getReadableStatus()}</span>
              <span>{(new Project(project)).getReadableTimeLeft()}</span>
              <div className="dashboard__projects__item__chat">
                <img src={require('../../assets/images/utility/chat.png')} />
              </div>
            </div>
          ))}
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
