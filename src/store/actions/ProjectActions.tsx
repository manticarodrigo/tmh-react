import { Dispatch } from 'react';
import { protectedApi } from 'store/reducers/AuthReducer';
import { Detail, Item, ItemForm, ItemStatus, Project, ProjectSubmitForm } from 'store/reducers/ProjectReducer';

export type ProjectAction =
  | { type: 'GET_PROJECTS', payload: Project[] }
  | { type: 'GET_PROJECT', payload: Project }
  | { type: 'GET_LATEST_PROJECT', payload: Project }
  | { type: 'CREATE_PROJECT', payload: Project }
  | { type: 'UPDATE_PROJECT', payload: Project }
  | { type: 'GET_DETAILS', payload: Detail[] }
  | { type: 'ADD_DETAIL', payload: Detail }
  | { type: 'UPDATE_DETAIL', payload: Detail }
  | { type: 'DELETE_DETAIL', payload: Detail }
  | { type: 'GET_ITEMS', payload: Item[] }
  | { type: 'ADD_ITEM', payload: Item }
  | { type: 'LOGOUT' };

export const getProjects = () => (async (dispatch: Dispatch<ProjectAction>) => {
  try {
    const { data } = await protectedApi.get('projects/me/');

    dispatch({ type: 'GET_PROJECTS', payload: data });

    return data;
  } catch (error) {
    throw error;
  }
});

export const getProject = (id: string) => (async (dispatch: Dispatch<ProjectAction>) => {
  try {
    const { data } = await protectedApi.get(`projects/${id}/`);

    dispatch({ type: 'GET_PROJECT', payload: data });

    return data;
  } catch (error) {
    throw error;
  }
});

export const getLatestProject = () => (async (dispatch: Dispatch<ProjectAction>) => {
  try {
    const { data } = await protectedApi.get(`projects/latest/`);

    dispatch({ type: 'GET_LATEST_PROJECT', payload: data });

    return data;
  } catch (error) {
    throw error;
  }
});

export const createProject = (projectForm: ProjectSubmitForm) => (async (dispatch: Dispatch<ProjectAction>) => {
  try {
    const { data } = await protectedApi.post(`projects/`, projectForm);

    dispatch({ type: 'CREATE_PROJECT', payload: data });

    return data;
  } catch (error) {
    throw error;
  }
});

export const updateProject = (project: Partial<Project>) => (async (dispatch: Dispatch<ProjectAction>) => {
  try {
    const { data } = await protectedApi.patch(`projects/${project.id}/`, project);

    dispatch({ type: 'UPDATE_PROJECT', payload: data });

    return data;
  } catch (error) {
    throw error;
  }
});

export const getDetails = (projectId: string) => (async (dispatch: Dispatch<ProjectAction>) => {
  try {
    const { data } = await protectedApi.get(`details/project/?project=${projectId}`);

    dispatch({ type: 'GET_DETAILS', payload: data });

    return data;
  } catch (error) {
    throw error;
  }
});

export const addDetail = (project: Project, file: File, type: string, status: string) =>
  (async (dispatch: Dispatch<ProjectAction>) => {
    try {
      const formData = new FormData();

      formData.append('image', file);
      formData.append('type', type);
      formData.append('project', project.id);
      formData.append('status', status);

      const { data } = await protectedApi.post(`details/`, formData);

      dispatch({ type: 'ADD_DETAIL', payload: data });

      return data;
    } catch (error) {
      throw error;
    }
  });

export const updateDetail = (detail: Partial<Detail>) => (async (dispatch: Dispatch<ProjectAction>) => {
  try {
    const { data } = await protectedApi.patch(`details/${detail.id}/`, detail);

    dispatch({ type: 'UPDATE_DETAIL', payload: data });

    return data;
  } catch (error) {
    throw error;
  }
});

export const deleteDetail = (id: string) => (async (dispatch: Dispatch<ProjectAction>) => {
  try {
    const { data } = await protectedApi.delete(`details/${id}/`);

    dispatch({ type: 'DELETE_DETAIL', payload: data });

    return data;
  } catch (error) {
    throw error;
  }
});

export const getItems = (projectId: string) => (async (dispatch: Dispatch<ProjectAction>) => {
  try {
    const { data } = await protectedApi.get(`items/project/?project=${projectId}`);

    dispatch({ type: 'GET_ITEMS', payload: data });

    return data;
  } catch (error) {
    throw error;
  }
});

export const addItem = (itemForm: ItemForm, project: Project) => (async (dispatch: Dispatch<ProjectAction>) => {
  try {
    const formData = new FormData();

    formData.append('status', ItemStatus.PENDING);
    formData.append('image', itemForm.file || '');
    formData.append('make', itemForm.make);
    formData.append('type', itemForm.type);
    formData.append('price', itemForm.price);
    formData.append('inspiration', itemForm.inspiration);
    formData.append('lat', itemForm.lat.toString());
    formData.append('lng', itemForm.lng.toString());
    formData.append('project', project.id);

    const { data } = await protectedApi.post(`items/`, formData);

    dispatch({ type: 'ADD_ITEM', payload: data });

    return data;
  } catch (error) {
    throw error;
  }
});
