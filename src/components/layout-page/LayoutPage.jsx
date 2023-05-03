import { NavLink, Outlet } from 'react-router-dom';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './LayoutPage.module.css';

const LayoutPage = () => {
  const setActiveLink = ({ isActive }) => isActive ? styles.active : styles.link;
  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <NavLink to='/' className={setActiveLink}>
            <BurgerIcon type='primary' />
            <span className={styles.linkText}>Конструктор</span>
          </NavLink>

          <a href='#' className={styles.linkSecondary}>
            <ListIcon type='secondary' />
            <span className={styles.linkText}>Лента заказов</span>
          </a>

          <div className={styles.logo}>
            <Logo />
          </div>

          <NavLink to='/profile' className={setActiveLink}>
            <ProfileIcon type='secondary' />
            <span className={styles.linkText}>Личный кабинет</span>
          </NavLink>
        </div>
      </header>
      <Outlet />
    </>
  );
};

export { LayoutPage };
