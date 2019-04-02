import axios from 'axios';
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { AppState } from '../store/Store';
import { Project } from '../reducers/ProjectReducer';

export enum ProjectActionTypes {
  GET_PROJECTS = 'GET_PROJECTS',
}

export interface ProjectGetProjectsAction {
  type: ProjectActionTypes.GET_PROJECTS;
  projects: [Project];
}

export type ProjectActions = ProjectGetProjectsAction;

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
