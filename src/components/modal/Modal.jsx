import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import stylesModal from './Modal.module.css';

const Modal = ({ isOpen, onClose, children }) => {
  const handleUserKeyPress = useCallback((event) => {
    const { keyCode } = event;
    keyCode === 27 ? console.log('esc') : console.log('no');
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleUserKeyPress);
    return () => {
      window.removeEventListener('keydown', handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className={stylesModal.modal} onClick={onClose}>
      <div className={stylesModal.content}>
        <button
          className={stylesModal.btnClose}
          type='button'
          onClick={onClose}
        >
          <CloseIcon type='primary' />
        </button>
        <div className={stylesModal.body} onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
};

Modal.proptypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
