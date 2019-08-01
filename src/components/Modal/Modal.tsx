import React, { Fragment, ReactNode, RefObject, createRef, useState, useEffect } from 'react';
import './Modal.scss';

import ModalContent from './ModalContent';
import ModalTrigger from './ModalTrigger';

type ModalProps = {
  children?: ReactNode;
  role?: string;
  triggerText: string;
  ariaLabel: string;
  centered?: boolean;
};

const Modal = ({ ariaLabel, children, triggerText, role, centered }: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const openButtonRef: RefObject<HTMLButtonElement> = createRef();
  const closeButtonRef: RefObject<HTMLButtonElement> = createRef();

  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current!.focus();
      document.querySelector('html')!.classList.add('u-lock-scroll');
    } else {
      openButtonRef.current!.focus();
      document.querySelector('html')!.classList.remove('u-lock-scroll');
    }
  }, [isOpen]);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <Fragment>
      <ModalTrigger
        ref={openButtonRef}
        onOpen={onOpen}
        text={triggerText}
      />
      {isOpen &&
        <ModalContent
          ref={closeButtonRef}
          ariaLabel={ariaLabel}
          content={children}
          role={role}
          centered={centered}
          onClose={onClose}
        />
      }
    </Fragment>
  );
};

export default Modal;
