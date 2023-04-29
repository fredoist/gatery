import Head from 'next/head';
import Header from '../components/Header';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create tokengated links with Gatery</title>
        <link rel="icon" href="/gatery.svg" type="image/svg+xml" />
      </Head>
      <Header />
    </div>
  );
}
