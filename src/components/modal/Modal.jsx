import React from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className='modal'>
      <CloseIcon type='primary' onClick={onClose} />
      <div className='modal-body'>
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
