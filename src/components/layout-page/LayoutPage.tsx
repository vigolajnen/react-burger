import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import AppHeader from '../app-header/AppHeader';

const LayoutPage: FC = () => {
  return (
    <>
      <AppHeader />

      <Outlet />
    </>
  );
};

export { LayoutPage };
