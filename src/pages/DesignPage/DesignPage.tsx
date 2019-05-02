import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import './DesignPage.scss';

import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { AppState } from '../../store/Store';
import { AppRoutes } from '../App/App';

import { CurrentAuth } from '../../store/reducers/AuthReducer';

import {
  addDetail,
  addItem,
  deleteDetail,
  getDetails,
  getItems,
  getLatestProject,
  getProject,
  updateDetail,
  updateProject,
} from '../../store/actions/ProjectActions';

import {
  Detail,
  DetailStatus,
  DetailType,
  Item,
  ItemForm,
  Project,
} from '../../store/reducers/ProjectReducer';

import Header from '../../components/Header/Header';
import Loading from '../../components/Loading/Loading';

import DesignCollab from './DesignCollab/DesignCollab';

interface MatchParams {
  view: string;
  projectId: string;
}

interface DesignPageProps extends RouteComponentProps<MatchParams> {
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
  updateDetail: (detail: Partial<Detail>) => Promise<void>;
  deleteDetail: (id: string) => Promise<void>;
  getItems: (projectId: string) => Promise<Item[]>;
  addItem: (itemForm: ItemForm, project: Project) => Promise<Item>;
}

interface DesignPageState {
  project?: Project;
  conceptboards?: Detail[];
  floorplan?: Detail;
  selectedIndex: number;
  items?: Item[];
}

class DesignPage extends Component<DesignPageProps, DesignPageState> {
  state: DesignPageState = { selectedIndex: 0 };

  async componentDidMount() {
    const { auth, match } = this.props;
    const { params } = match;

    if (params.view && params.projectId) {
      // TODO: Check designer permissions
      const promises = Promise.all([
        this.props.getProject(params.projectId),
        this.props.getDetails(params.projectId),
        this.props.getItems(params.projectId),
      ]);

      const data = await promises;

      this.setInitialState(...data);

      return;
    }

    const project = await this.props.getLatestProject();

    if (project && project.id) {
      const isDesigner = project.designer && project.designer.id === auth!.user.id;
      const view = isDesigner ? 'designer' : 'client';
      this.props.history.replace(`${AppRoutes.DETAILS}/${view}/${project.id}`);

      const promises = Promise.all([
        this.props.getDetails(project.id),
        this.props.getItems(project.id),
      ]);

      const data = await promises;

      this.setInitialState(project, ...data);

      return;
    }

    this.props.history.push(AppRoutes.DASHBOARD);
  }

  setInitialState = (project: Project, details: Detail[], items: Item[]) => {
    const { floorplan, conceptboards } = this.findDetails(details);

    return this.setState({ project, conceptboards, floorplan, items: items.reverse() });
  }

  setDetails = (details: Detail[]) => {
    const { floorplan, conceptboards } = this.findDetails(details);

    return this.setState({ conceptboards, floorplan });
  }

  findDetails = (details: Detail[]) => {
    const floorplan = details.find((detail) => detail.type === DetailType.FLOOR_PLAN);
    const conceptboards = details.filter((detail) => detail.type === DetailType.CONCEPT);

    return { floorplan, conceptboards };
  }

  handleFileChanged = async (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget;
    const { type } = e.currentTarget.dataset;
    const { project } = this.state;

    if (files && project && project.id) {
      const file = files[0];
      switch (type) {
        case DetailType.CONCEPT:
          await this.props.addDetail(project, file, DetailType.CONCEPT, DetailStatus.PENDING);
          break;
        case DetailType.FLOOR_PLAN:
          await this.props.addDetail(project, file, DetailType.FLOOR_PLAN, DetailStatus.PENDING);
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

  handleSubmitDetailClicked = async (detail: Detail) => {
    await this.props.updateDetail({ id: detail.id, status: DetailStatus.SUBMITTED });

    const details = await this.props.getDetails(this.state.project!.id);
    this.setDetails(details);
  }

  handleApproveDetailClicked = async (detail: Detail) => {
    await this.props.updateDetail({ id: detail.id, status: DetailStatus.APPROVED });

    const details = await this.props.getDetails(this.state.project!.id);
    this.setDetails(details);
  }

  handleGetItems = async () => {
    const { project } = this.state;

    if (project) {
      const items = await this.props.getItems(project.id);
      this.setState({ items: items.reverse() });
    }
  }

  handleAddItem = async (itemForm: ItemForm) => {
    const { project } = this.state;

    if (project) {
      await this.props.addItem(itemForm, project);
      this.handleGetItems();
    }
  }

  render() {
    const { auth } = this.props;
    const {
      project,
      conceptboards,
      floorplan,
      selectedIndex,
      items,
    } = this.state;

    return auth && project ? (
      <React.Fragment>
        <Header
          auth={auth}
          title={`${auth.user.first_name}'s ${new Project(project).getReadableRoom()}: Design Studio`}
        />
        <main className="design">
          <DesignCollab
            project={project}
            conceptboards={conceptboards}
            floorplan={floorplan}
            selectedIndex={selectedIndex}
            items={items}
            handleFileChanged={this.handleFileChanged}
            handleThumbClicked={this.handleThumbClicked}
            handleDeleteClicked={this.handleDeleteClicked}
            handleSubmitDetailClicked={this.handleSubmitDetailClicked}
            handleApproveDetailClicked={this.handleApproveDetailClicked}
            handleGetItems={this.handleGetItems}
            handleAddItem={this.handleAddItem}
          />
        </main>
      </React.Fragment>
    ) : <Loading />;
  }
}

const mapStateToProps = (store: AppState) => ({
  auth: store.authState.auth,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, void, Action>) => ({
  getLatestProject: () => dispatch(getLatestProject()),
  getProject: (id: string) => dispatch(getProject(id)),
  updateProject: (project: Partial<Project>) => dispatch(updateProject(project)),
  getDetails: (projectId: string) => dispatch(getDetails(projectId)),
  addDetail: (
    project: Project,
    file: File,
    type: DetailType,
    status: DetailStatus,
  ) => dispatch(addDetail(project, file, type, status)),
  updateDetail: (detail: Partial<Detail>) => dispatch(updateDetail(detail)),
  deleteDetail: (id: string) => dispatch(deleteDetail(id)),
  getItems: (projectId: string) => dispatch(getItems(projectId)),
  addItem: (itemForm: ItemForm, project: Project) => dispatch(addItem(itemForm, project)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DesignPage));
