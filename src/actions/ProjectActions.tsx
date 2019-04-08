import axios from 'axios';
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { Project } from '../reducers/ProjectReducer';
import { AppState } from '../store/Store';

export enum ProjectActionTypes {
  GET_PROJECTS = 'GET_PROJECTS',
  CREATE_PROJECT = 'CREATE_PROJECT',
}

export interface ProjectGetProjectsAction {
  type: ProjectActionTypes.GET_PROJECTS;
  projects: Project[];
}

/* ThunkAction<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
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

export interface ProjectCreateProjectAction {
  type: ProjectActionTypes.CREATE_PROJECT;
  project: Project;
}

/* ThunkAction<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
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

export type ProjectActions = ProjectGetProjectsAction | ProjectCreateProjectAction;
