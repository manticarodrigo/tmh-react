import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { protectedApi } from '../reducers/AuthReducer';
import { Detail, Item, ItemForm, Project } from '../reducers/ProjectReducer';
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
  GET_ITEMS = 'GET_ITEMS',
  ADD_ITEM = 'ADD_ITEM',
}

export interface ProjectGetProjectsAction {
  type: ProjectActionTypes.GET_PROJECTS;
  projects: Project[];
}

export const getProjects: ActionCreator<
  ThunkAction<Promise<any>, AppState, void, ProjectGetProjectsAction>
> = () => (async (dispatch: Dispatch) => {
  try {
    const response = await protectedApi.get('projects/me/');

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
> = (id: string) => (async (dispatch: Dispatch) => {
  try {
    const response = await protectedApi.get(`projects/${id}/`);

    dispatch({ type: ProjectActionTypes.GET_PROJECT });

    return response.data;
  } catch (err) {
    return err;
  }
});

export interface ProjectGetLatestProjectAction {
  type: ProjectActionTypes.GET_LATEST_PROJECT;
  project: Project;
}

export const getLatestProject: ActionCreator<
  ThunkAction<Promise<any>, AppState, void, ProjectGetLatestProjectAction>
> = () => (async (dispatch: Dispatch) => {
  try {
    const response = await protectedApi.get(`projects/latest/`);

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
> = (project) => (async (dispatch: Dispatch) => {
  try {
    const response = await protectedApi.post(`projects/`, project);

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
> = (project) => (async (dispatch: Dispatch) => {
  try {
    const response = await protectedApi.patch(`projects/${project.id}/`, project);

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
> = (projectId: string) => (async (dispatch: Dispatch) => {
  try {
    const response = await protectedApi.get(`details/project/?project=${projectId}`);

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
> = (project, file, type, status) => (async (dispatch: Dispatch) => {
  try {
    const formData = new FormData();

    formData.append('image', file);
    formData.append('type', type);
    formData.append('project', project.id);
    formData.append('status', status);

    const response = await protectedApi.post(`details/`, formData);

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
> = (detail) => (async (dispatch: Dispatch) => {
  try {
    const response = await protectedApi.patch(`details/${detail.id}/`, detail);

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
> = (id) => (async (dispatch: Dispatch) => {
  try {
    const response = await protectedApi.delete(`details/${id}/`);

    dispatch({ type: ProjectActionTypes.DELETE_DETAIL });

    return response.data;
  } catch (err) {
    return err;
  }
});

export interface ProjectGetItemsAction {
  type: ProjectActionTypes.GET_ITEMS;
  details: Item[];
}

export const getItems: ActionCreator<
  ThunkAction<Promise<any>, AppState, void, ProjectGetItemsAction>
> = (projectId: string) => (async (dispatch: Dispatch) => {
  try {
    const response = await protectedApi.get(`items/project/?project=${projectId}`);

    dispatch({ type: ProjectActionTypes.GET_ITEMS });

    return response.data;
  } catch (err) {
    return err;
  }
});

export interface ProjectAddDetailAction {
  type: ProjectActionTypes.ADD_DETAIL;
  detail: Detail;
}

export interface ProjectAddItemAction {
  type: ProjectActionTypes.ADD_ITEM;
  item: Item;
}

export const addItem: ActionCreator<
  ThunkAction<Promise<any>, AppState, void, ProjectAddItemAction>
> = (itemForm: ItemForm, project: Project) => (async (dispatch: Dispatch) => {
  try {
    const formData = new FormData();

    formData.append('status', 'PENDING');
    formData.append('image', itemForm.file);
    formData.append('make', itemForm.make);
    formData.append('type', itemForm.type);
    formData.append('price', itemForm.price);
    formData.append('inspiration', itemForm.inspiration);
    formData.append('lat', itemForm.lat.toString());
    formData.append('lng', itemForm.lng.toString());
    formData.append('project', project.id);

    const response = await protectedApi.post(`items/`, formData);

    dispatch({ type: ProjectActionTypes.ADD_ITEM });

    return response.data;
  } catch (error) {
    throw error;
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
  ProjectDeleteDetailAction |
  ProjectGetItemsAction |
  ProjectAddItemAction
);
