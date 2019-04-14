import axios from 'axios';
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { Detail, Project } from '../reducers/ProjectReducer';
import { AppState } from '../store/Store';

export enum ProjectActionTypes {
  GET_PROJECTS = 'GET_PROJECTS',
  GET_PROJECT = 'GET_PROJECT',
  GET_LATEST_PROJECT = 'GET_LATEST_PROJECT',
  CREATE_PROJECT = 'CREATE_PROJECT',
  UPDATE_PROJECT = 'UPDATE_PROJECT',
  GET_DETAILS = 'GET_DETAILS',
  ADD_DETAIL = 'ADD_DETAIL',
  UPDATE_DETAIL = 'UPDATE_DETAIL',
  DELETE_DETAIL = 'DELETE_DETAIL',
}

export interface ProjectGetProjectsAction {
  type: ProjectActionTypes.GET_PROJECTS;
  projects: Project[];
}

export const getProjects: ActionCreator<
  ThunkAction<Promise<any>, AppState, void, ProjectGetProjectsAction>
> = () => (async (dispatch: Dispatch, getState) => {
  try {
    const appState = getState();
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/projects/me/`,
      { headers: { Authorization: `Token ${appState.userState.auth!.key}` } },
    );

    dispatch({
      projects: response.data,
      type: ProjectActionTypes.GET_PROJECTS,
    });

    return response.data;
  } catch (err) {
    return err;
  }
});

export interface ProjectGetProjectAction {
  type: ProjectActionTypes.GET_PROJECT;
  project: Project;
}

export const getProject: ActionCreator<
  ThunkAction<Promise<any>, AppState, void, ProjectGetProjectAction>
> = (id: string) => (async (dispatch: Dispatch, getState) => {
  try {
    const appState = getState();
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/projects/${id}/`,
      { headers: { Authorization: `Token ${appState.userState.auth!.key}` } },
    );

    dispatch({ type: ProjectActionTypes.GET_PROJECT });

    return response.data;
  } catch (err) {
    return err;
  }
});

export interface ProjectCreateProjectAction {
  type: ProjectActionTypes.CREATE_PROJECT;
  project: Project;
}

export interface ProjectGetLatestProjectAction {
  type: ProjectActionTypes.GET_LATEST_PROJECT;
  project: Project;
}

export const getLatestProject: ActionCreator<
  ThunkAction<Promise<any>, AppState, void, ProjectGetLatestProjectAction>
> = () => (async (dispatch: Dispatch, getState) => {
  try {
    const appState = getState();
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/projects/latest/`,
      { headers: { Authorization: `Token ${appState.userState.auth!.key}` } },
    );

    dispatch({ type: ProjectActionTypes.GET_LATEST_PROJECT });

    return response.data;
  } catch (err) {
    return err;
  }
});

export interface ProjectCreateProjectAction {
  type: ProjectActionTypes.CREATE_PROJECT;
  project: Project;
}

export const createProject: ActionCreator<
  ThunkAction<Promise<any>, AppState, void, ProjectCreateProjectAction>
> = (project) => (async (dispatch: Dispatch, getState) => {
  try {
    const appState = getState();
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/projects/`,
      project,
      { headers: { Authorization: `Token ${appState.userState.auth!.key}` } },
    );

    dispatch({
      project: response.data,
      type: ProjectActionTypes.CREATE_PROJECT,
    });

    return response.data;
  } catch (err) {
    return err;
  }
});

export interface ProjectUpdateProjectAction {
  type: ProjectActionTypes.UPDATE_PROJECT;
  project: Project;
}

export const updateProject: ActionCreator<
  ThunkAction<Promise<any>, AppState, void, ProjectUpdateProjectAction>
> = (project) => (async (dispatch: Dispatch, getState) => {
  try {
    const appState = getState();
    const response = await axios.patch(
      `${process.env.REACT_APP_API_URL}/api/v1/projects/${project.id}/`,
      project,
      { headers: { Authorization: `Token ${appState.userState.auth!.key}` } },
    );

    dispatch({
      project: response.data,
      type: ProjectActionTypes.UPDATE_PROJECT,
    });

    return response.data;
  } catch (err) {
    return err;
  }
});

export interface ProjectGetDetailsAction {
  type: ProjectActionTypes.GET_DETAILS;
  details: Detail[];
}

export const getDetails: ActionCreator<
  ThunkAction<Promise<any>, AppState, void, ProjectGetDetailsAction>
> = (id: string) => (async (dispatch: Dispatch, getState) => {
  try {
    const appState = getState();
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/details/project/?project=${id}`,
      { headers: { Authorization: `Token ${appState.userState.auth!.key}` } },
    );

    dispatch({ type: ProjectActionTypes.GET_DETAILS });

    return response.data;
  } catch (err) {
    return err;
  }
});

export interface ProjectAddDetailAction {
  type: ProjectActionTypes.ADD_DETAIL;
  detail: Detail;
}

export const addDetail: ActionCreator<
  ThunkAction<Promise<any>, AppState, void, ProjectAddDetailAction>
> = (project, file, type, status) => (async (dispatch: Dispatch, getState) => {
  try {
    const appState = getState();
    const formData = new FormData();

    formData.append('image', file);
    formData.append('type', type);
    formData.append('project', project.id);
    formData.append('status', status);

    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/details/`,
      formData,
      { headers: { Authorization: `Token ${appState.userState.auth!.key}` } },
    );

    dispatch({ type: ProjectActionTypes.ADD_DETAIL });

    return response.data;
  } catch (err) {
    return err;
  }
});

export interface ProjectUpdateDetailAction {
  type: ProjectActionTypes.UPDATE_DETAIL;
  detail: Detail;
}

export const updateDetail: ActionCreator<
  ThunkAction<Promise<any>, AppState, void, ProjectAddDetailAction>
> = (detail) => (async (dispatch: Dispatch, getState) => {
  try {
    const appState = getState();
    const response = await axios.patch(
      `${process.env.REACT_APP_API_URL}/api/v1/details/${detail.id}/`,
      detail,
      { headers: { Authorization: `Token ${appState.userState.auth!.key}` } },
    );

    dispatch({ type: ProjectActionTypes.UPDATE_DETAIL });

    return response.data;
  } catch (err) {
    return err;
  }
});

export interface ProjectDeleteDetailAction {
  type: ProjectActionTypes.DELETE_DETAIL;
  detail: Detail;
}

export const deleteDetail: ActionCreator<
  ThunkAction<Promise<any>, AppState, void, ProjectDeleteDetailAction>
> = (id) => (async (dispatch: Dispatch, getState) => {
  try {
    const appState = getState();
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/v1/details/${id}/`,
      { headers: { Authorization: `Token ${appState.userState.auth!.key}` } },
    );

    dispatch({ type: ProjectActionTypes.DELETE_DETAIL });

    return response.data;
  } catch (err) {
    return err;
  }
});

export type ProjectActions = (
  ProjectGetProjectsAction |
  ProjectGetProjectAction |
  ProjectGetLatestProjectAction |
  ProjectCreateProjectAction |
  ProjectUpdateProjectAction |
  ProjectGetDetailsAction |
  ProjectAddDetailAction |
  ProjectUpdateDetailAction |
  ProjectDeleteDetailAction
);
