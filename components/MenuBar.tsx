import Link from 'next/link';
import styles from '../styles/Home.module.css';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <Link href="/gameplay">
        <a className={styles.card}>
          <h2>Gameplay</h2>
        </a>
      </Link>

      <Link href="/">
        <a className={styles.card}>
          <h2>Player Stats</h2>
        </a>
      </Link>

      <Link href="/">
        <a className={styles.card}>
          <h2>Daily Leaderboard</h2>
        </a>
      </Link>

      <Link href="/">
        <a className={styles.card}>
          <h2>Find an Open Table</h2>
        </a>
      </Link>

      <Link href="/">
        <a className={styles.card}>
          <h2>Daily ICE Challenges</h2>
        </a>
      </Link>
    </div>
  );
};

export default Footer;
