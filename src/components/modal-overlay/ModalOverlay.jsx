import React from 'react';
import stylesOverlay from './ModalOverlay.module.css';

const ModalOverlay = ({handleClick}) => {
  return (
    <div className={stylesOverlay.overlay} onClick={handleClick}></div>
  )
}

export default ModalOverlay;
