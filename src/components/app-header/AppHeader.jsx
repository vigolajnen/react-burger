import React from 'react';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import headerStyles from './AppHeader.module.css';

export default class AppHeader extends React.Component {
  render() {
    return (
      <header className={headerStyles.header}>
        <div className={headerStyles.container}>
          <a href='#' className={headerStyles.link}>
            <BurgerIcon type='primary' />
            <span className={headerStyles.linkText}>Конструктор</span>
          </a>
          <a href='#' className={headerStyles.linkSecondary}>
            <ListIcon type='secondary' />
            <span className={headerStyles.linkText}>Лента заказов</span>
          </a>
          <div className={headerStyles.logo}>
            <Logo />
          </div>

          <a href='#' className={headerStyles.linkRight}>
            <ProfileIcon type='secondary' />
            <span className={headerStyles.linkText}>Личный кабинет</span>
          </a>
        </div>
      </header>
    );
  }
}
