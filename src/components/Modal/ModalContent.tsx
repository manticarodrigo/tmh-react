import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';

import ReactFocusTrap from 'focus-trap-react';

interface ModalContentProps {
  ariaLabel: string;
  content: ReactNode;
  buttonRef: (node: HTMLButtonElement) => void;
  modalRef: (node: HTMLElement) => void;
  onClose: () => void;
  role?: string;
  centered?: boolean;
}

const ModalContent = ({
  ariaLabel,
  content,
  buttonRef,
  modalRef,
  onClose,
  role = 'dialog',
  centered,
}: ModalContentProps) => {
  return ReactDOM.createPortal(
    (
      <ReactFocusTrap
        focusTrapOptions={{ onDeactivate: onClose }}
      >
        <aside
          ref={modalRef}
          onClick={onClose}
          role={role}
          aria-label={ariaLabel}
          aria-modal="true"
          className="modal"
        >
          <div className={`modal__inner${centered ? ' modal__inner--centered' : ''}`}>
            <button className="modal__close" aria-labelledby="close-modal" onClick={onClose} ref={buttonRef}>
              <span id="close-modal" className="u-hide-visually">Close Modal</span>
            </button>
            <div className="modal__body">{content}</div>
          </div>
        </aside>
      </ReactFocusTrap>
    ),
    document.body,
  );
};

export default React.memo(ModalContent);
