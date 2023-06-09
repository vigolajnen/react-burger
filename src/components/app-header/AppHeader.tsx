import { NavLink } from 'react-router-dom';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../hooks';

// css
import styles from './AppHeader.module.css';

type PropsActiveLink = {
  isActive: boolean;
  isPending: boolean;
};

const AppHeader = () => {
  const { user } = useSelector((state) => state.user);
  const setActiveLink = ({ isActive, isPending }: PropsActiveLink) =>
    isPending ? 'pending' : isActive ? styles.active : styles.link;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <NavLink to='/' className={setActiveLink}>
          <BurgerIcon type='primary' />
          <span className={styles.linkText}>Конструктор</span>
        </NavLink>

        <NavLink to='/feed' className={setActiveLink}>
          <ListIcon type='secondary' />
          <span className={styles.linkText}>Лента заказов</span>
        </NavLink>

        <NavLink to='/' className={styles.logo}>
          <Logo />
        </NavLink>

        <NavLink to='/profile' className={setActiveLink}>
          <ProfileIcon type='primary' />
          {user ? (
            <span className={styles.linkText}>{user?.name}</span>
          ) : (
            <span className={styles.linkText}>Личный кабинет</span>
          )}
        </NavLink>
      </div>
    </header>
  );
};

export default AppHeader;
