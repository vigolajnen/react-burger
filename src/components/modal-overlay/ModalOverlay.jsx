import React from 'react';
import PropTypes from 'prop-types';
import stylesOverlay from './ModalOverlay.module.css';

const ModalOverlay = ({handleClick}) => {
  return (
    <div className={stylesOverlay.overlay} onClick={handleClick}></div>
  )
}

ModalOverlay.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default ModalOverlay;
