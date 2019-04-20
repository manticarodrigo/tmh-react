import React, { Component, Fragment, ReactNode } from 'react';
import './Modal.scss';

import ModalContent from './ModalContent';
import ModalTrigger from './ModalTrigger';

interface ModalProps {
  children?: ReactNode;
  role?: string;
  triggerText: string;
  ariaLabel: string;
  centered?: boolean;
}

class Modal extends Component<ModalProps, any> {
  state = { isOpen: false };
  modalNode?: HTMLElement;
  openButtonNode?: HTMLButtonElement;
  closeButtonNode?: HTMLButtonElement;

  onOpen = () => {
    this.setState({ isOpen: true }, () => this.closeButtonNode!.focus());
    document.querySelector('html')!.classList.add('u-lock-scroll');
  }

  onClose = () => {
    this.setState({ isOpen: false });
    this.openButtonNode!.focus();
    document.querySelector('html')!.classList.remove('u-lock-scroll');
  }

  render() {
    const { isOpen } = this.state;
    const { ariaLabel, children, triggerText, role, centered } = this.props;

    const modalRef = (node: HTMLElement) => this.modalNode = node;
    const openButtonRef = (node: HTMLButtonElement) => this.openButtonNode = node;
    const closeButtonRef = (node: HTMLButtonElement) => this.closeButtonNode = node;

    return (
      <Fragment>
        <ModalTrigger
          onOpen={this.onOpen}
          buttonRef={openButtonRef}
          text={triggerText}
        />
        {isOpen &&
          <ModalContent
            ariaLabel={ariaLabel}
            buttonRef={closeButtonRef}
            modalRef={modalRef}
            content={children}
            onClose={this.onClose}
            role={role}
            centered={centered}
          />
        }
      </Fragment>
    );
  }
}

export default React.memo(Modal);
