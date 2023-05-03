import React from 'react';
import styles from './page.module.css';

export function NotFoundPage() {
  return (
    <main className={styles.grid}>
      <h1 className={styles.center}>Нет такой страницы</h1>
    </main>
  );
}
