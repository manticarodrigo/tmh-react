import axios from 'axios';
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { Project } from '../reducers/ProjectReducer';
import { AppState } from '../store/Store';

export enum ProjectActionTypes {
  GET_PROJECTS = 'GET_PROJECTS',
  GET_PROJECT = 'GET_PROJECT',
  CREATE_PROJECT = 'CREATE_PROJECT',
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
      { headers: { Authorization: `Token ${appState.userState.currentUser!.key}` } },
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
      { headers: { Authorization: `Token ${appState.userState.currentUser!.key}` } },
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

export const createProject: ActionCreator<
  ThunkAction<Promise<any>, AppState, void, ProjectCreateProjectAction>
> = (project) => (async (dispatch: Dispatch, getState) => {
  try {
    const appState = getState();
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/projects/`,
      project,
      { headers: { Authorization: `Token ${appState.userState.currentUser!.key}` } },
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

export type ProjectActions = ProjectGetProjectsAction | ProjectGetProjectAction | ProjectCreateProjectAction;
