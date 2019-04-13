import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import './DetailsPage.scss';

import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { AppState } from '../../store/Store';
import { AppRoutes } from '../App/App';

import { CurrentUser } from '../../reducers/UserReducer';

import { addDetail, deleteDetail, getDetails, getProject } from '../../actions/ProjectActions';
import { Detail, DetailStatus, DetailType, Project } from '../../reducers/ProjectReducer';

import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';

import DetailsCollabComponent from './DetailsCollabComponent/DetailsCollabComponent';
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
    const { params } = this.props.match;

    if (params.id) {
      const promises = Promise.all([
        this.props.getProject(params.id),
        this.props.getDetails(params.id),
      ]);

      const data = await promises;

      if (data) {
        this.setState({ project: data[0] });

        return this.setDetails(data[1]);
      }
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

  render() {
    const { currentUser } = this.props;
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
        <HeaderComponent currentUser={currentUser} title="Details" />
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
  deleteDetail: (id: string) => dispatch(deleteDetail(id)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailsPage));
