import { NavLink, Outlet } from 'react-router-dom';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../hooks';

import styles from './LayoutPage.module.css';

type PropsActiveLink = {
  isActive: boolean;
  isPending: any;
}

const LayoutPage = () => {
  const user = useSelector((state) => state.user.user);
  const isAuth = useSelector((state) => state.user.isAuth);

  const setActiveLink = ({ isActive, isPending }: PropsActiveLink) =>
    isPending ? 'pending' : isActive ? styles.active : styles.link;

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <NavLink to='/' className={setActiveLink}>
            <BurgerIcon type='primary' />
            <span className={styles.linkText}>Конструктор</span>
          </NavLink>
       
          <NavLink  to='/feed' className={setActiveLink}>
            <ListIcon type='secondary' />
            <span className={styles.linkText}>Лента заказов</span>
          </NavLink>

          <div className={styles.logo}>
            <Logo />
          </div>

          <NavLink to='/profile' className={setActiveLink}>
            <ProfileIcon type='primary' />
            {isAuth ? (
              <span className={styles.linkText}>{user.name}</span>
            ) : (
              <span className={styles.linkText}>Личный кабинет</span>
            )}
          </NavLink>
        </div>
      </header>
      <Outlet />
    </>
  );
};

export { LayoutPage };
