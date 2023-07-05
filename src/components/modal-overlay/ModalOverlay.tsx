import React from 'react';

// css
import stylesOverlay from './ModalOverlay.module.css';

type Props = {
  handleClick: () => void;
};

const ModalOverlay = ({ handleClick }: Props) => {
  return <div className={stylesOverlay.overlay} onClick={handleClick}></div>;
};

export default ModalOverlay;
