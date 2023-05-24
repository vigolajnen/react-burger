import React from 'react';
import PropTypes from 'prop-types';
import stylesBody from './ModalBody.module.css';

const ModalBody = ({ children }) => {
  return (<div className={stylesBody.content}>{children}</div>)
};

ModalBody.propTypes = {
  children: PropTypes.node,
};

export default ModalBody;
