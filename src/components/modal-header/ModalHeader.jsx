import React from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import stylesHeader from './ModalHeader.module.css';

const ModalHeader = ({onClose, children}) => {
  return (
    <div className={stylesHeader.header}>
      <div className={stylesHeader.title}>{children}</div>
      <button className={stylesHeader.btnClose} type='button' onClick={onClose}>
        <CloseIcon type='primary' />
      </button>
    </div>
  );
};

export default ModalHeader;