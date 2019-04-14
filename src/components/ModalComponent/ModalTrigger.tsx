import React from 'react';

interface ModalTriggerProps {
  buttonRef: (node: HTMLButtonElement) => void;
  onOpen: () => void;
  text: string;
}

const ModalTrigger = ({
  buttonRef,
  onOpen,
  text,
}: ModalTriggerProps) => <button className="u-text-uppercase" onClick={onOpen} ref={buttonRef}>{text}</button>;

export default React.memo(ModalTrigger);
