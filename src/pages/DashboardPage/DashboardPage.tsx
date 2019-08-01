import React, { useState, useEffect } from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import './DashboardPage.scss';

import { AppRoutes } from 'pages/App/App';

import useAppState from 'hooks/useAppState';
import { User } from 'store/reducers/AuthReducer';
import { Project, ProjectStatus } from 'store/reducers/ProjectReducer';
import { getProjects } from 'store/actions/ProjectActions';

import Header from 'components/Header/Header';
import Loading from 'components/Loading/Loading';

import headerIcon from 'assets/images/rooms/BEDROOM.png';

const DashboardPage = ({ history }: RouteComponentProps)  => {
  const [{ authState: { auth }, projectState: { projects } }, dispatch] = useAppState();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const onMount = async () => {
      const latest = await dispatch(getProjects());

      if (latest && latest.length) {
        return setIsLoaded(true);
      }

      history.push(AppRoutes.ONBOARDING);
    };

    onMount();
  }, []);

  const view = (user: User, project: Project) => {
    switch (true) {
      case project.designer && project.designer.id === user.id:
        return 'designer';
      case project.client.id === user.id:
        return 'client';
      default:
        return 'public';
    }
  };

  const linkTo = (user: User, project: Project) => {
    switch (project.status) {
      case ProjectStatus.DETAILS:
        return `${AppRoutes.DETAILS}/${view(user, project)}/${project.id}`;
      case ProjectStatus.DESIGN:
      case ProjectStatus.CONCEPTS:
      case ProjectStatus.FLOOR_PLAN:
      case ProjectStatus.REQUEST_ALTERNATIVES:
        return `${AppRoutes.DESIGN}/${view(user, project)}/${project.id}`;
      case ProjectStatus.FINAL_DELIVERY:
      case ProjectStatus.SHOPPING_CART:
      case ProjectStatus.ESTIMATE_SHIPPING_AND_TAX:
      case ProjectStatus.CHECKOUT:
      case ProjectStatus.ARCHIVED:
        return `${AppRoutes.FINAL_DELIVERY}/${view(user, project)}/${project.id}`;
      default:
        return '';
    }
  };

  return auth && isLoaded ? (
    <React.Fragment>
      <Header auth={auth} title="Dashboard" />
      <main className="dashboard">
        <div className="dashboard__header">
          <img src={headerIcon} />
          <span>Client Name</span>
          <span>Project Type</span>
          <span>Last Edited</span>
          <span>Status</span>
          <span>Days Left</span>
          <span>Messages</span>
        </div>
        <div className="dashboard__projects">
          {projects!.map((project: Project, index: number) => (
            <Link
              key={index}
              to={linkTo(auth.user, project)}
              className="dashboard__projects__item"
            >
              <span>
                <div className="dashboard__projects__item__image">
                  <img src={require(`assets/images/rooms/${project.room}.png`)} />
                </div>
              </span>
              <span>
                {(new User(project.client as User)).getShortName()}
                <span className="dashboard__projects__item__mobile">
                  &apos;s - {(new Project(project)).getReadableRoom()} Project
                </span>
              </span>
              <span className="dashboard__projects__item__desktop">
                {(new Project(project)).getReadableRoom()}
              </span>
              <span>
                {(new Project(project)).getReadableModifiedDate()}
                <span className="dashboard__projects__item__hint">
                  Edited
                </span>
              </span>
              <span>
                {(new Project(project)).getReadableStatus()}
                <span className="dashboard__projects__item__hint">
                  Phase
                </span>
              </span>
              <span>
                {(new Project(project)).getReadableTimeLeft()}
                <span className="dashboard__projects__item__hint">
                  Days Left
                </span>
              </span>
              <div className="dashboard__projects__item__chat">
                <img src={require('assets/images/utility/chat.png')} />
              </div>
            </Link>
          ))}
        </div>
      </main>
    </React.Fragment>
  ) : <Loading />;
};

export default withRouter(DashboardPage);
