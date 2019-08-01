import React, { Ref, ReactNode, forwardRef } from 'react';
import ReactDOM from 'react-dom';
import ReactFocusTrap from 'focus-trap-react';

type ModalContentProps = {
  ariaLabel: string;
  content: ReactNode;
  role?: string;
  centered?: boolean;
  onClose: () => void;
};

const ModalContent = ({
  ariaLabel,
  content,
  role = 'dialog',
  centered,
  onClose,
}: ModalContentProps, ref: Ref<HTMLButtonElement>) => {
  return ReactDOM.createPortal(
    (
      <ReactFocusTrap
        focusTrapOptions={{ onDeactivate: onClose }}
      >
        <aside
          onClick={onClose}
          role={role}
          aria-label={ariaLabel}
          aria-modal="true"
          className="modal"
        >
          <div className={`modal__inner${centered ? ' modal__inner--centered' : ''}`}>
            <button ref={ref} className="modal__close" aria-labelledby="close-modal" onClick={onClose}>
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

export default forwardRef(ModalContent);
