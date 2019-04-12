import React from 'react';
import './CollabImageComponent.scss';

import { Detail } from '../../reducers/ProjectReducer';

interface CollabImageComponentProps {
  details: Detail[];
  index: number;
  handleThumbClicked: (e: React.SyntheticEvent<HTMLElement>) => void;
  handleFileChanged?: (e: React.SyntheticEvent<HTMLInputElement>) => void;
}

const CollabImageComponent = (props: CollabImageComponentProps) => {
  let fileInput: HTMLInputElement;
  const handleClickFileInput = () => fileInput.click();

  return (
    <div className="collab__image">
      <img className="collab__image__selected" src={props.details[props.index].image as string} />
      <div className="collab__image__thumbs">
        {props.details.map((detail, index) => (
          <div
            key={detail.id}
            data-index={index}
            style={{ backgroundImage: `url('${detail.image}')` }}
            className={`collab__image__thumb${props.index === index ? ' collab__image__thumb--selected' : ''}`}
            onClick={props.handleThumbClicked}
          >
            <div
              className="collab__image__thumb--delete"
              // onClick={props.handleDeleteClicked}
            />
          </div>
        ))}
          <div className="collab__image__thumb collab__image__thumb--upload" onClick={handleClickFileInput} />
          <input
            ref={(input: HTMLInputElement) => { fileInput = input; }}
            type="file"
            accept="image/*"
            className="u-spaceless"
            onChange={props.handleFileChanged}
          />
      </div>
    </div>
  );
};

export default React.memo(CollabImageComponent);
