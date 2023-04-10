import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import ModalHeader from '../modal-header/ModalHeader';
import ModalBody from '../modal-body/ModalBody';
import ModalOverlay from '../modal-overlay/ModalOverlay';

import stylesModal from './Modal.module.css';

const modalRoot = document.getElementById('modals');

const Modal = ({ onClose, children, title }) => {
  useEffect(() => {
    const handleClickEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleClickEscape);
    return () => {
      window.removeEventListener('keydown', handleClickEscape);
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <div className={stylesModal.modal}>
        <ModalHeader onClose={onClose}>{title}</ModalHeader>
        <ModalBody>{children}</ModalBody>
      </div>
      <ModalOverlay handleClick={onClose} />
    </>,
    modalRoot,
  );
};

Modal.proptypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export default Modal;
