import React, { ReactNode } from 'react';
import './CollabImageComponent.scss';

import { Detail } from '../../reducers/ProjectReducer';

interface CollabImageComponentProps {
  children?: ReactNode;
  details: Detail[];
  index: number;
  handleThumbClicked: (e: React.SyntheticEvent<HTMLElement>) => void;
  handleFileChanged?: (e: React.SyntheticEvent<HTMLInputElement>) => void;
  handleDeleteClicked?: (e: React.SyntheticEvent<HTMLElement>) => void;
}

const CollabImageComponent = (props: CollabImageComponentProps) => {
  let fileInput: HTMLInputElement;
  const handleClickFileInput = () => fileInput.click();

  return (
    <div className="collab__image">
      <img
        key={props.details[props.index].image as string}
        src={props.details[props.index].image as string}
        className="collab__image__selected"
      />
      <div className="collab__image__thumbs">
        {props.details.map((detail, index) => (
          <div
            key={detail.id}
            data-index={index}
            onClick={props.handleThumbClicked}
            style={{ backgroundImage: `url('${detail.image}')` }}
            className={`collab__image__thumb${props.index === index ? ' collab__image__thumb--selected' : ''}`}
          >
            {props.handleDeleteClicked && (
              <div
                data-id={detail.id}
                onClick={props.handleDeleteClicked}
                className="collab__image__thumb--delete"
              />
            )}
          </div>
        ))}
        {props.handleFileChanged && (
          <React.Fragment>
            <div
              onClick={handleClickFileInput}
              className="collab__image__thumb collab__image__thumb--upload"
            />
            <input
              ref={(input: HTMLInputElement) => { fileInput = input; }}
              type="file"
              accept="image/*"
              onChange={props.handleFileChanged}
              className="u-spaceless"
            />
          </React.Fragment>
        )}
      </div>
      {props.children}
    </div>
  );
};

export default React.memo(CollabImageComponent);
