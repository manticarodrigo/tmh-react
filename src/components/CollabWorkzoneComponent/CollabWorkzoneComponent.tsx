import React, { ReactNode, Ref } from 'react';
import './CollabWorkzoneComponent.scss';

interface CollabWorkzoneComponentProps {
  children?: ReactNode;
}

const CollabWorkzoneComponent = (props: CollabWorkzoneComponentProps, ref: Ref<HTMLDivElement>) => (
    <div className="collab__workzone" ref={ref}>
      {props.children}
    </div>
);

export default React.forwardRef(CollabWorkzoneComponent);
