import Head from 'next/head';
import Header from '../components/Header';
import GateCard from '../components/Gate';
import CreateForm from '../components/CreateForm';
import Sidebar from '../components/Sidebar';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create tokengated links with Gatery</title>
        <link rel="icon" href="/gatery.svg" type="image/svg+xml" />
      </Head>
      <Header />
        <main className="p-5">
          <Sidebar />
          <section className="max-w-7xl mx-auto">
            <h1 className="text-5xl max-w-4xl mb-12">
              Create tokengated content experiences for anything
            </h1>
            <CreateForm />
          </section>
        </main>
    </div>
  );
}
