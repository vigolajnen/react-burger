import { NavLink } from 'react-router-dom';
import styles from './AppHeader.module.css';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../hooks';

type PropsActiveLink = {
  isActive: boolean;
  isPending: boolean;
}

const AppHeader = () => {
  const user = useSelector((state) => state.user.user);

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

        <div className={styles.logo}>
          <Logo />
        </div>

        <NavLink to='/profile' className={setActiveLink}>
          <ProfileIcon type='primary' />
          {user ? (
            <span className={styles.linkText}>{user?.user?.name}</span>
          ) : (
            <span className={styles.linkText}>Личный кабинет</span>
          )}
        </NavLink>
      </div>
    </header>
  );
};

export default AppHeader;
