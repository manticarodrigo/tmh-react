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

import DetailsCollabMenuComponent from './DetailsCollabMenuComponent/DetailsCollabMenuComponent';
import DetailsInfoComponent from './DetailsInfoComponent/DetailsInfoComponent';

interface MatchParams {
  id: string;
}

interface DetailsPageProps extends RouteComponentProps<MatchParams> {
  currentUser?: CurrentUser;
  getProject: (id: string) => Promise<Project>;
}

interface DetailsPageState {
  project?: Project;
  view: string;
}

class DetailsPage extends Component<DetailsPageProps, DetailsPageState> {
  state: DetailsPageState = {
    project: undefined,
    view: 'DRAWING',
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

  handleViewChanged = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    const { view } = e.currentTarget.dataset;
    this.setState({ view: view as string });
  }

  render() {
    const { currentUser } = this.props;
    const { project, view } = this.state;

    return project ? (
      <React.Fragment>
        <HeaderComponent currentUser={currentUser} title="Details" />
        <main className="details__container">
          <div className="collab__workzone">
            <DetailsCollabMenuComponent
              project={project}
              view={view}
              handleViewChanged={this.handleViewChanged}
            />
          </div>
          <DetailsInfoComponent project={project} />
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
