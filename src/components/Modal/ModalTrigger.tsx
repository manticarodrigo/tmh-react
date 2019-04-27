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
}: ModalTriggerProps) => (
  <button
    className="u-text-uppercase modal__trigger"
    ref={buttonRef}
    onClick={onOpen}
  >
    {text}
  </button>
);

export default React.memo(ModalTrigger);
