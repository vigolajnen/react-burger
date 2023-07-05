import React from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

// css
import stylesHeader from './ModalHeader.module.css';

type Props = {
  onClose: () => void;
  children?: JSX.Element;
  title?: string;
};

const ModalHeader = ({ onClose, children, title }: Props) => {
  return (
    <div className={stylesHeader.header}>
      <div className={stylesHeader.title}>{title}</div>
      <button className={stylesHeader.btnClose} type='button' onClick={onClose}>
        <CloseIcon type='primary' />
      </button>
    </div>
  );
};

export default ModalHeader;
