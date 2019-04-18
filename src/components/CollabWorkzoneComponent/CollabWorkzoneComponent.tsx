import React, { ReactNode } from 'react';
import './CollabWorkzoneComponent.scss';

interface CollabWorkzoneComponentProps {
  children?: ReactNode;
}

const CollabWorkzoneComponent = (props: CollabWorkzoneComponentProps) => (
  <div className="collab__workzone">{props.children}</div>
);

export default React.memo(CollabWorkzoneComponent);
