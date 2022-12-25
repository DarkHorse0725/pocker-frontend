import HomePage from '../components/content/HomePage';
import Layout from '../components/Layout';
import Header from '../components/Header';
import Constants from '../components/Constants';
import Images from '../components/Images';

const Home = () => {
  return (
    <Layout>
      <Header title={Constants.TITLE} image={Images.SOCIAL_SHARE} />

      <HomePage />
    </Layout>
  );
};

export default Home;
