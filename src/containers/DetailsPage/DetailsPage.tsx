import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import './DetailsPage.scss';

import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { AppState } from '../../store/Store';
import { appRoutes } from '../App/App';

import { CurrentUser } from '../../reducers/UserReducer';

import { addDetail, getDetails, getProject } from '../../actions/ProjectActions';
import { Detail, DetailStatus, DetailType, Project } from '../../reducers/ProjectReducer';

import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';

import DetailsCollabAlertComponent from './DetailsCollabAlertComponent/DetailsCollabAlertComponent';
import DetailsCollabMenuComponent from './DetailsCollabMenuComponent/DetailsCollabMenuComponent';
import DetailsInfoComponent from './DetailsInfoComponent/DetailsInfoComponent';

interface MatchParams {
  id: string;
}

interface DetailsPageProps extends RouteComponentProps<MatchParams> {
  currentUser?: CurrentUser;
  getProject: (id: string) => Promise<Project>;
  getDetails: (id: string) => Promise<Detail[]>;
  addDetail: (
    project: Project,
    file: File,
    type: DetailType,
    status: DetailStatus,
  ) => Promise<Detail>;
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
      const promises = Promise.all([
        this.props.getProject(params.id),
        this.props.getDetails(params.id),
      ]);

      const data = await promises;

      if (data) {
        return this.setState({ project: data[0] });
      }
    }

    this.props.history.push(appRoutes.DASHBOARD.pathname);
  }

  handleViewChanged = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    const { view } = e.currentTarget.dataset;
    this.setState({ view: view as string });
  }

  handleFileChanged = async (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget;
    const { project } = this.state;
    if (files && project) {
      const file = files[0];
      switch (this.state.view) {
        case DetailType.DRAWING:
          await this.props.addDetail(project, file, DetailType.DRAWING, DetailStatus.APPROVED);
          break;
        case DetailType.INSPIRATION:
          await this.props.addDetail(project, file, DetailType.INSPIRATION, DetailStatus.APPROVED);
          break;
        case DetailType.FURNITURE:
          await this.props.addDetail(project, file, DetailType.FURNITURE, DetailStatus.APPROVED);
          break;
        default:
          break;
      }
      // this.props.getDetails();
    }
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
            <DetailsCollabAlertComponent
              project={project}
              view={view}
              handleFileChanged={this.handleFileChanged}
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
  getDetails: (id: string) => dispatch(getDetails(id)),
  addDetail: (
    project: Project,
    file: File,
    type: DetailType,
    status: DetailStatus,
  ) => dispatch(addDetail(project, file, type, status)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailsPage));
