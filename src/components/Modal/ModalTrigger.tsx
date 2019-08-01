import React, { Ref, forwardRef } from 'react';

type ModalTriggerProps = {
  onOpen: () => void;
  text: string;
};

const ModalTrigger = ({ onOpen, text }: ModalTriggerProps, ref: Ref<HTMLButtonElement>) => (
  <button
    className="u-text-uppercase modal__trigger"
    ref={ref}
    onClick={onOpen}
  >
    {text}
  </button>
);

export default forwardRef(ModalTrigger);
