import Layout from '../components/Layout';
import Header from '../components/Header';
import Constants from '../components/Constants';
import Images from '../components/Images';
import styles from '../styles/Home.module.css';

const Offline = () => {
  return (
    <Layout>
      <Header title={Constants.TITLE} image={Images.SOCIAL_SHARE} />

      <main className={styles.main}>
        <h1 className={styles.title}>
          You are offline. Please connect to the Internet
        </h1>
      </main>
    </Layout>
  );
};

export default Offline;
