import { NavLink, Outlet } from 'react-router-dom';
import styles from './LayoutPage.module.css';

const LayoutProfilePage = () => {
  const setActiveLink = ({ isActive }) => isActive ? styles.active : styles.link;
  return (
    <>
      <aside className={styles.sidebar}>
        <NavLink to='/profile' className={setActiveLink}>Профиль</NavLink>
        <NavLink to='/profile/orders' className={setActiveLink}>История заказов</NavLink>
        {/* <Link onClick={logout} className={styles.item}>
          Выход
        </Link> */}
        <div className={styles.text}>
          В этом разделе вы можете изменить свои персональные данные
        </div>
      </aside>

      <Outlet />
    </>
  );
};

export { LayoutProfilePage };
