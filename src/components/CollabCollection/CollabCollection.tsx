
import React, { ReactNode } from 'react';
import './CollabCollection.scss';

import { Item } from '../../store/reducers/ProjectReducer';

import Modal from '../Modal/Modal';

interface CollabWorkzoneProps {
  children?: ReactNode;
  items?: Item[];
}

const CollabCollection = (props: CollabWorkzoneProps) => (
  <div className="collab__collection">
    <div className="collab__collection__info">
      <div className="collab__collection__info__text">
        {props.children}
      </div>
      <div>
        <Modal
          centered
          triggerText="Approve &amp; Submit"
          ariaLabel="Approve Collection"
        >
          <button className="u-text-uppercase">Approve &amp; Submit</button>
        </Modal>
      </div>
    </div>
    {props.items && (
      <div className="collab__collection__items">
        {props.items.map((item, index) => (
          <div key={index} className="collab__collection__item">
            <div className="collab__collection__item__inner">
              <div className="u-text-uppercase collab__collection__item__header">
                Item {index + 1}
              </div>
              <div
                className="collab__collection__image"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <p>{item.make}</p>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default React.memo(CollabCollection);
