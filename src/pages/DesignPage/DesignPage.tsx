import React, { Fragment, useState, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import './DesignPage.scss';

import useAppState from 'hooks/useAppState';
import { AppRoutes } from 'pages/App/App';

import {
  addDetail,
  addItem,
  deleteDetail,
  getDetails,
  getItems,
  getLatestProject,
  getProject,
  updateDetail,
} from 'store/actions/ProjectActions';

import {
  Detail,
  DetailStatus,
  Item,
  ItemForm,
  Project,
} from 'store/reducers/ProjectReducer';

import Header from 'components/Header/Header';
import Loading from 'components/Loading/Loading';

import DesignCollab from './DesignCollab/DesignCollab';

type DesignPageMatchParams = {
  view: string;
  projectId: string;
};

type DesignPageState = {
  project?: Project;
  conceptboards?: Detail[];
  floorplan?: Detail;
  selectedIndex: number;
  items?: Item[];
};

const DesignPage = ({ match, history }: RouteComponentProps<DesignPageMatchParams>) => {
  const [{ authState: { auth } }, dispatch] = useAppState();
  const [
    {
      project,
      conceptboards,
      floorplan,
      selectedIndex,
      items,
    },
    setState,
  ] = useState<DesignPageState>({ selectedIndex: 0 });

  useEffect(() => {
    const setInitialState = (latestProject: Project, latestDetails: Detail[], latestItems: Item[]) =>
      setState((prevState) => ({
        ...prevState,
        ...findDetails(latestDetails),
        project: latestProject,
        items: latestItems.reverse(),
      }));

    const getInitialState = async () => {
      const { params: { view, projectId} } = match;

      if (view && projectId) {
        // TODO: Check designer permissions
        const promises = Promise.all([
          dispatch(getProject(projectId)),
          dispatch(getDetails(projectId)),
          dispatch(getItems(projectId)),
        ]);

        const data = await promises;

        setInitialState(...data);

        return;
      }

      const latestProject = await dispatch(getLatestProject());

      if (latestProject && latestProject.id) {
        const isDesigner = latestProject.designer && latestProject.designer.id === auth!.user.id;
        const view = isDesigner ? 'designer' : 'client';
        history.replace(`${AppRoutes.DETAILS}/${view}/${latestProject.id}`);

        const promises = Promise.all([
          dispatch(getDetails(latestProject.id)),
          dispatch(getItems(latestProject.id)),
        ]);

        const data = await promises;

        setInitialState(latestProject, ...data);

        return;
      }

      history.push(AppRoutes.DASHBOARD);
    };

    getInitialState();
  }, []);

  const setDetails = (details: Detail[]) => setState((prevState) => ({ ...prevState, ...findDetails(details) }));

  const findDetails = (details: Detail[]) => ({
    floorplan: details.find((detail) => detail.type === 'FLOOR_PLAN'),
    conceptboards: details.filter((detail) => detail.type === 'CONCEPT'),
  });

  const handleFileChanged = async ({ currentTarget }: React.SyntheticEvent<HTMLInputElement>) => {
    const { files } = currentTarget;
    const { type } = currentTarget.dataset;

    if (files && project && project.id) {
      const file = files[0];
      switch (type) {
        case 'CONCEPT':
          await dispatch(addDetail(project, file, 'CONCEPT', DetailStatus.PENDING));
          break;
        case 'FLOOR_PLAN':
          await dispatch(addDetail(project, file, 'FLOOR_PLAN', DetailStatus.PENDING));
          break;
      }

      const details = await dispatch(getDetails(project.id));
      setDetails(details);
    }
  };

  const handleThumbClicked = ({ currentTarget }: React.SyntheticEvent<HTMLElement>) => {
    const { index } = currentTarget.dataset;
    setState((prevState) => ({ ...prevState, selectedIndex: parseInt(index as string, 10) }));
  };

  const handleDeleteClicked = async ({ currentTarget}: React.SyntheticEvent<HTMLElement>) => {
    const { id } = currentTarget.dataset;
    await dispatch(deleteDetail(id as string));

    const details = await dispatch(getDetails(project!.id!));
    setState((prevState) => ({ ...prevState, selectedIndex: 0 }));
    setDetails(details);
  };

  const handleSubmitDetailClicked = async (detail: Detail) => {
    await dispatch(updateDetail({ id: detail.id, status: DetailStatus.SUBMITTED }));

    const details = await dispatch(getDetails(project!.id));
    setDetails(details);
  };

  const handleApproveDetailClicked = async (detail: Detail) => {
    await dispatch(updateDetail({ id: detail.id, status: DetailStatus.APPROVED }));

    const details = await dispatch(getDetails(project!.id));
    setDetails(details);
  };

  const handleGetItems = async () => {
    if (project) {
      const latestItems = await dispatch(getItems(project.id));
      setState((prevState) => ({ ...prevState, items: latestItems.reverse() }));
    }
  };

  const handleAddItem = async (itemForm: ItemForm) => {
    if (project) {
      await dispatch(addItem(itemForm, project));
      handleGetItems();
    }
  };

  return auth && project ? (
    <Fragment>
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
          handleFileChanged={handleFileChanged}
          handleThumbClicked={handleThumbClicked}
          handleDeleteClicked={handleDeleteClicked}
          handleSubmitDetailClicked={handleSubmitDetailClicked}
          handleApproveDetailClicked={handleApproveDetailClicked}
          handleGetItems={handleGetItems}
          handleAddItem={handleAddItem}
        />
      </main>
    </Fragment>
  ) : <Loading />;
};

export default withRouter(DesignPage);
