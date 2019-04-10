import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import './DetailsPage.scss';

import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { AppState } from '../../store/Store';
import { appRoutes } from '../App/App';

import { CurrentUser } from '../../reducers/UserReducer';

import { getProject } from '../../actions/ProjectActions';
import { Project } from '../../reducers/ProjectReducer';

import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';

interface MatchParams {
  id: string;
}

interface DetailsPageProps extends RouteComponentProps<MatchParams> {
  currentUser?: CurrentUser;
  getProject: (id: string) => Promise<Project>;
}

interface DetailsPageState {
  project?: Project;
}

class DetailsPage extends Component<DetailsPageProps, DetailsPageState> {
  state: DetailsPageState = {
    project: undefined,
  };

  async componentDidMount() {
    const { params } = this.props.match;

    if (params.id) {
      const project = await this.props.getProject(params.id);

      if (project) {
        return this.setState({ project });
      }
    }

    this.props.history.push(appRoutes.DASHBOARD.pathname);
  }

  render() {
    const { currentUser } = this.props;
    const { project } = this.state;

    return project ? (
      <React.Fragment>
        <HeaderComponent currentUser={currentUser} title="Details" />
        <main className="details__container">
          <div className="details__info">
            <h3 className="h1">Project Details</h3>
            <div className="details__info__box">
              <div className="details__info__image">
                <img src={require(`../../assets/images/onboarding/rooms/${project.room}.png`)} />
              </div>
              {new Project(project).getReadableRoom()}
            </div>
          </div>
        </main>
      </React.Fragment>
    ) : <LoadingComponent />;
  }
}

const mapStateToProps = (store: AppState) => ({
  currentUser: store.userState.currentUser,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, void, Action>) => ({
  getProject: (id: string) => dispatch(getProject(id)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailsPage));
