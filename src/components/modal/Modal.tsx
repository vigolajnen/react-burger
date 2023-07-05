import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import ModalHeader from '../modal-header/ModalHeader';
import ModalBody from '../modal-body/ModalBody';
import ModalOverlay from '../modal-overlay/ModalOverlay';

// css
import stylesModal from './Modal.module.css';

type Props = {
  onClose: () => void;
  children: JSX.Element;
  title?: string;
};

const modalRoot = document.getElementById('modals');

const Modal = ({ onClose, children, title }: Props) => {
  let navigate = useNavigate();

  useEffect(() => {
    const handleClickEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    function onClose() {
      navigate(-1);
    }

    window.addEventListener('keydown', handleClickEscape);
    return () => {
      window.removeEventListener('keydown', handleClickEscape);
    };
  }, [onClose, navigate]);

  return ReactDOM.createPortal(
    <>
      <motion.div
        className={stylesModal.modal}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 0.3,
        }}
        exit={{ opacity: 0 }}
      >
        <ModalHeader onClose={onClose} title={title}>
          {children}
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
      </motion.div>
      <ModalOverlay handleClick={onClose} />
    </>,
    modalRoot!,
  );
};

export default Modal;
