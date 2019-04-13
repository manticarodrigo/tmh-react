import React, { Component } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import './DashboardPage.scss';

import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { AppState } from '../../store/Store';
import { AppRoutes } from '../App/App';

import { CurrentUser, User } from '../../reducers/UserReducer';

import { getProjects } from '../../actions/ProjectActions';
import { Project } from '../../reducers/ProjectReducer';

import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';

import headerIcon from '../../assets/images/rooms/BEDROOM.png';

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

    history.push(AppRoutes.ONBOARDING);
  }

  render() {
    const { projects, currentUser } = this.props;
    const { loaded } = this.state;

    const view = (user: User, project: Project) => {
      switch (true) {
        case project.designer && project.designer.id === user.id:
          return 'designer';
        case project.client.id === user.id:
          return 'client';
        default:
          return 'public';
      }
    };

    return currentUser && loaded ? (
      <React.Fragment>
        <HeaderComponent currentUser={currentUser} title="Dashboard" />
        <main className="dashboard">
          <div className="dashboard__header">
            <img src={headerIcon} />
            <span>Client Name</span>
            <span>Project Type</span>
            <span>Last Edited</span>
            <span>Status</span>
            <span>Days Left</span>
            <span>Messages</span>
          </div>
          <div className="dashboard__projects">
            {projects!.map((project, index) => (
              <Link
                key={index}
                to={`${AppRoutes.DETAILS}/${view(currentUser.user, project)}/${project.id}`}
                className="dashboard__projects__item"
              >
                <span>
                  <div className="dashboard__projects__item__image">
                    <img src={require(`../../assets/images/rooms/${project.room}.png`)} />
                  </div>
                </span>
                <span>
                  {(new User(project.client as User)).getShortName()}
                  <span className="dashboard__projects__item__mobile">
                    &apos;s - {(new Project(project)).getReadableRoom()} Project
                  </span>
                </span>
                <span className="dashboard__projects__item__desktop">
                  {(new Project(project)).getReadableRoom()}
                </span>
                <span>
                  {(new Project(project)).getReadableModifiedDate()}
                  <span className="dashboard__projects__item__hint">
                    Edited
                  </span>
                </span>
                <span>
                  {(new Project(project)).getReadableStatus()}
                  <span className="dashboard__projects__item__hint">
                    Phase
                  </span>
                </span>
                <span>
                  {(new Project(project)).getReadableTimeLeft()}
                  <span className="dashboard__projects__item__hint">
                    Days Left
                  </span>
                </span>
                <div className="dashboard__projects__item__chat">
                  <img src={require('../../assets/images/utility/chat.png')} />
                </div>
              </Link>
            ))}
          </div>
        </main>
      </React.Fragment>
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
