import Head from 'next/head';
import Constants from './Constants';

const Header = (props: { title: string; image: string }) => {
  return (
    <Head>
      <title>{props.title}</title>

      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={Constants.DESCRIPTION} />
      <meta property="og:image" content={props.image} />
      <meta property="og:url" content={Constants.BASE_URL} />

      <link rel="icon" href="/favicon.ico" />
      <link rel="manifest" href="/manifest.json" />
    </Head>
  );
};

export default Header;
