import React, { Component, Fragment, ReactNode } from 'react';
import './ModalComponent.scss';

import ModalContent from './ModalContent';
import ModalTrigger from './ModalTrigger';

interface ModalComponentProps {
  children?: ReactNode;
  role?: string;
  triggerText: string;
  ariaLabel: string;
}

class ModalComponent extends Component<ModalComponentProps, any> {
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
    const { ariaLabel, children, triggerText, role } = this.props;

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
          />
        }
      </Fragment>
    );
  }
}

export default React.memo(ModalComponent);
