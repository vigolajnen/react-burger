import React from 'react';

import stylesBody from './ModalBody.module.css';

const ModalBody = ({ children }) => {
  // onClick={(e) => e.stopPropagation()}
  return (
    <div className={stylesBody.content} >
      {children}
    </div>
  );
};

export default ModalBody;
