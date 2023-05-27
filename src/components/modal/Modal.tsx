import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import ModalHeader from '../modal-header/ModalHeader';
import ModalBody from '../modal-body/ModalBody';
import ModalOverlay from '../modal-overlay/ModalOverlay';

import stylesModal from './Modal.module.css';

type Props = {
  onClose: () => void;
  children: JSX.Element;
  title?: string;
}

const modalRoot = document.getElementById('modals');

const Modal = ({ onClose, children, title }: Props) => {
  useEffect(() => {
    const handleClickEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleClickEscape);
    return () => {
      window.removeEventListener('keydown', handleClickEscape);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <>
      <div className={stylesModal.modal}>
        <ModalHeader onClose={onClose} title={title}>{children}</ModalHeader>
        <ModalBody>{children}</ModalBody>
      </div>
      <ModalOverlay handleClick={onClose} />
    </>,
    modalRoot!
  );
};


export default Modal;
