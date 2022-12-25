import Hamburger from './Hamburger';
import Aux from './_Aux';
import styles from '../styles/Home.module.css';

const Layout = (props: { children: any }) => {
  return (
    <Aux>
      <Hamburger />

      <div className={styles.container}>{props.children}</div>
    </Aux>
  );
};

export default Layout;
