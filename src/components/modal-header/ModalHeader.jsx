import React from 'react';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import stylesHeader from './ModalHeader.module.css';

const ModalHeader = ({ onClose, children }) => {
  return (
    <div className={stylesHeader.header}>
      <div className={stylesHeader.title}>{children}</div>
      <button className={stylesHeader.btnClose} type='button' onClick={onClose}>
        <CloseIcon type='primary' />
      </button>
    </div>
  );
};

ModalHeader.propTypes = {
  children: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default ModalHeader;
