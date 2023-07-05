import React from 'react';

// css
import stylesBody from './ModalBody.module.css';

type Props = {
  children: JSX.Element;
};

const ModalBody = ({ children }: Props) => {
  return <div className={stylesBody.content}>{children}</div>;
};

export default ModalBody;
