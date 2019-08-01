import React, { Fragment, useState, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import './DetailsPage.scss';

import useAppState from 'hooks/useAppState';

import {
  addDetail,
  deleteDetail,
  getDetails,
  getLatestProject,
  getProject,
  updateProject,
} from 'store/actions/ProjectActions';

import {
  Detail,
  DetailStatus,
  DetailType,
  Project,
  ProjectStatus,
} from 'store/reducers/ProjectReducer';

import { AppRoutes } from 'pages/App/App';

import Header from 'components/Header/Header';
import Loading from 'components/Loading/Loading';
import CollabChat from 'components/CollabChat/CollabChat';
import CollabWorkzone from 'components/CollabWorkzone/CollabWorkzone';

import DetailsCollab from './DetailsCollab/DetailsCollab';
import DetailsCollabMenu from './DetailsCollabMenu/DetailsCollabMenu';
import DetailsInfo from './DetailsInfo/DetailsInfo';

type MatchParams = {
  view: string;
  projectId: string;
};

type DetailsPageState = {
  project?: Project;
  drawings: Detail[];
  inspirations: Detail[];
  furnitures: Detail[];
  selectedIndex: number;
  view: DetailType;
};

const DetailsPage = ({ match, history }: RouteComponentProps<MatchParams>) => {
  const [{ authState: { auth } }, dispatch] = useAppState();
  const [
    {
      project,
      drawings,
      inspirations,
      furnitures,
      selectedIndex,
      view,
    },
    setState,
  ] = useState<DetailsPageState>({
    project: undefined,
    drawings: [],
    inspirations: [],
    furnitures: [],
    selectedIndex: 0,
    view: 'DRAWING',
  });

  useEffect(() => {
    const onMount = async () => {
      const { params } = match;

      if (params.view && params.projectId) {
        // TODO: Check designer permissions
        const promises = Promise.all([
          dispatch(getProject(params.projectId)),
          dispatch(getDetails(params.projectId)),
        ]);

        const [currentProject, details] = await promises;

        setState((prevState) => ({ ...prevState, project: currentProject }));
        setDetails(details);

        return;
      }

      const latestProject = await dispatch(getLatestProject());

      if (latestProject && latestProject.id) {
        const isDesigner = latestProject.designer && latestProject.designer.id === auth!.user.id;
        const currentView = isDesigner ? 'designer' : 'client';

        const details = await dispatch(getDetails(latestProject.id));

        setState((prevState) => ({ ...prevState, project: latestProject }));
        setDetails(details);

        history.replace(`${AppRoutes.DETAILS}/${currentView}/${latestProject.id}`);

        return;
      }

      history.push(AppRoutes.DASHBOARD);
    };

    onMount();
  }, []);

  const setDetails = (details: Detail[]) => {
    const getKey = (type: DetailType) => {
      switch (type) {
        case 'DRAWING':
          return 'drawings';
        case 'INSPIRATION':
          return 'inspirations';
        case 'FURNITURE':
          return 'furnitures';
        default:
          return 'drawings';
      }
    };

    const mappedDetails = details.reduce((result, { type, ...detail }) => {
      const key = getKey(type);
      return {
          ...result,
          [key]: [...result[key], { type, ...detail }],
      };
    }, {
      drawings: [],
      inspirations: [],
      furnitures: [],
    });

    return setState((prevState) => ({
      ...prevState,
      ...mappedDetails,
    }));
  };

  const handleViewChanged = ({ currentTarget }: React.SyntheticEvent<HTMLButtonElement>) => {
    const { dataset } = currentTarget;
    setState((prevState) => ({ ...prevState, view: dataset.view as DetailType }));
  };

  const handleFileChanged = async ({ currentTarget }: React.SyntheticEvent<HTMLInputElement>) => {
    const { files } = currentTarget;

    if (files && project && project.id) {
      const file = files[0];

      switch (view) {
        case 'DRAWING':
          await dispatch(addDetail(project, file, 'DRAWING', DetailStatus.APPROVED));
          break;
        case 'INSPIRATION':
          await dispatch(addDetail(project, file, 'INSPIRATION', DetailStatus.APPROVED));
          break;
        case 'FURNITURE':
          await dispatch(addDetail(project, file, 'FURNITURE', DetailStatus.APPROVED));
          break;
        default:
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

  const handleDeleteClicked = async ({ currentTarget }: React.SyntheticEvent<HTMLElement>) => {
    const { id } = currentTarget.dataset;
    await dispatch(deleteDetail(id as string));

    const details = await dispatch(getDetails(project!.id!));

    setState((prevState) => ({ ...prevState, selectedIndex: 0 }));
    setDetails(details);
  };

  const handleSubmitClicked = async ({ id, designer}: Project) => {
    const { user } = auth!;

    await dispatch(updateProject({ id, status: ProjectStatus.DESIGN }));

    const isDesigner = designer && designer.id === user.id;
    const currentView = isDesigner ? 'designer' : 'client';

    history.push(`${AppRoutes.DESIGN}/${currentView}/${id}`);
  };

  return project ? (
    <Fragment>
      <Header auth={auth} title="Details" />
      <main className="details">
        <CollabWorkzone>
          <DetailsCollabMenu
            project={project}
            view={view}
            handleViewChanged={handleViewChanged}
          />
          <DetailsCollab
            project={project}
            drawings={drawings}
            inspirations={inspirations}
            furnitures={furnitures}
            selectedIndex={selectedIndex}
            view={view}
            handleFileChanged={handleFileChanged}
            handleThumbClicked={handleThumbClicked}
            handleDeleteClicked={handleDeleteClicked}
            handleSubmitClicked={handleSubmitClicked}
          />
        </CollabWorkzone>
        <DetailsInfo project={project} />
      </main>
      {auth && project && <CollabChat auth={auth} project={project} />}
    </Fragment>
  ) : <Loading />;
};

export default withRouter(DetailsPage);
