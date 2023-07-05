import React from 'react';
// css
import styles from './not-found.module.css';

export function NotFoundPage() {
  return (
    <main className={styles.grid}>
      <h1 className={styles.center}>Нет такой страницы</h1>
    </main>
  );
}
