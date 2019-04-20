import React, { ReactNode } from 'react';
import './CollabWorkzone.scss';

interface CollabWorkzoneProps {
  children?: ReactNode;
}

const CollabWorkzone = (props: CollabWorkzoneProps) => (
  <div className="collab__workzone">{props.children}</div>
);

export default React.memo(CollabWorkzone);
