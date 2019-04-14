import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import './DetailsPage.scss';

import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { AppState } from '../../store/Store';
import { AppRoutes } from '../App/App';

import { CurrentAuth } from '../../reducers/UserReducer';

import {
  addDetail,
  deleteDetail,
  getDetails,
  getLatestProject,
  getProject,
  updateProject,
} from '../../actions/ProjectActions';
import { Detail, DetailStatus, DetailType, Project, ProjectStatus } from '../../reducers/ProjectReducer';

import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';

import DetailsCollabComponent from './DetailsCollabComponent/DetailsCollabComponent';
import DetailsCollabMenuComponent from './DetailsCollabMenuComponent/DetailsCollabMenuComponent';
import DetailsInfoComponent from './DetailsInfoComponent/DetailsInfoComponent';

interface MatchParams {
  projectId: string;
  view: string;
}

interface DetailsPageProps extends RouteComponentProps<MatchParams> {
  auth?: CurrentAuth;
  getLatestProject: () => Promise<Project>;
  getProject: (id: string) => Promise<Project>;
  updateProject: (project: Partial<Project>) => Promise<Project>;
  getDetails: (id: string) => Promise<Detail[]>;
  addDetail: (
    project: Project,
    file: File,
    type: DetailType,
    status: DetailStatus,
  ) => Promise<Detail>;
  deleteDetail: (id: string) => Promise<void>;
}

interface DetailsPageState {
  project?: Project;
  drawings: Detail[];
  inspirations: Detail[];
  furnitures: Detail[];
  selectedIndex: number;
  view: string;
}

class DetailsPage extends Component<DetailsPageProps, DetailsPageState> {
  state: DetailsPageState = {
    project: undefined,
    drawings: [],
    inspirations: [],
    furnitures: [],
    selectedIndex: 0,
    view: 'DRAWING',
  };

  async componentDidMount() {
    const { auth, match } = this.props;
    const { params } = match;

    if (params.view && params.projectId) {
      // TODO: Check designer permissions
      const promises = Promise.all([
        this.props.getProject(params.projectId),
        this.props.getDetails(params.projectId),
      ]);

      const data = await promises;

      this.setState({ project: data[0] });
      this.setDetails(data[1]);

      return;
    }

    const project = await this.props.getLatestProject();

    if (project && project.id) {
      const isDesigner = project.designer && project.designer.id === auth!.user.id;
      const view = isDesigner ? 'designer' : 'client';
      this.props.history.replace(`${AppRoutes.DETAILS}/${view}/${project.id}`);
      const details = await this.props.getDetails(project.id);
      this.setState({ project });
      this.setDetails(details);

      return;
    }

    this.props.history.push(AppRoutes.DASHBOARD);
  }

  setDetails(details: Detail[]) {
    const drawings = [];
    const inspirations = [];
    const furnitures = [];

    for (const detail of details) {
      switch (detail.type) {
        case DetailType.DRAWING:
          drawings.push(detail);
          break;
        case DetailType.INSPIRATION:
          inspirations.push(detail);
          break;
        case DetailType.FURNITURE:
          furnitures.push(detail);
          break;
        default:
          break;
      }
    }
    return this.setState({
      drawings,
      inspirations,
      furnitures,
    });
  }

  handleViewChanged = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    const { view } = e.currentTarget.dataset;
    this.setState({ view: view as string });
  }

  handleFileChanged = async (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget;
    const { project } = this.state;

    if (files && project && project.id) {
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

      const details = await this.props.getDetails(project.id);
      this.setDetails(details);
    }
  }

  handleThumbClicked = (e: React.SyntheticEvent<HTMLElement>) => {
    const { index } = e.currentTarget.dataset;
    this.setState({ selectedIndex: parseInt(index as string, 10) });
  }

  handleDeleteClicked = async (e: React.SyntheticEvent<HTMLElement>) => {
    const { id } = e.currentTarget.dataset;
    await this.props.deleteDetail(id as string);

    const details = await this.props.getDetails(this.state.project!.id!);
    this.setState({ selectedIndex: 0 });
    this.setDetails(details);
  }

  handleSubmitClicked = async (project: Project) => {
    const { user } = this.props.auth!;
    await this.props.updateProject({ id: project.id, status: ProjectStatus.DESIGN });

    let view = 'public';
    switch (true) {
      case project.designer && project.designer.id === user.id:
        view = 'designer';
        break;
      case project.client.id === user.id:
        view = 'client';
        break;
      default:
        break;
    }

    this.props.history.push(`${AppRoutes.DESIGN}/${view}/${project.id}`);
  }

  render() {
    const { auth } = this.props;
    const {
      project,
      drawings,
      inspirations,
      furnitures,
      selectedIndex,
      view,
    } = this.state;

    return project ? (
      <React.Fragment>
        <HeaderComponent auth={auth} title="Details" />
        <main className="details">
          <div className="collab__workzone">
            <DetailsCollabMenuComponent
              project={project}
              view={view}
              handleViewChanged={this.handleViewChanged}
            />
            <DetailsCollabComponent
              project={project}
              drawings={drawings}
              inspirations={inspirations}
              furnitures={furnitures}
              selectedIndex={selectedIndex}
              view={view}
              handleFileChanged={this.handleFileChanged}
              handleThumbClicked={this.handleThumbClicked}
              handleDeleteClicked={this.handleDeleteClicked}
              handleSubmitClicked={this.handleSubmitClicked}
            />
          </div>
          <DetailsInfoComponent project={project} />
        </main>
      </React.Fragment>
    ) : <LoadingComponent />;
  }
}

const mapStateToProps = (store: AppState) => ({
  auth: store.userState.auth,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, void, Action>) => ({
  getLatestProject: () => dispatch(getLatestProject()),
  getProject: (id: string) => dispatch(getProject(id)),
  updateProject: (project: Partial<Project>) => dispatch(updateProject(project)),
  getDetails: (id: string) => dispatch(getDetails(id)),
  addDetail: (
    project: Project,
    file: File,
    type: DetailType,
    status: DetailStatus,
  ) => dispatch(addDetail(project, file, type, status)),
  deleteDetail: (id: string) => dispatch(deleteDetail(id)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailsPage));
