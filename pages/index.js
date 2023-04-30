import Head from 'next/head';
import Header from '../components/Header';
import GateCard from '../components/GateCard';
import CreateForm from '../components/CreateForm';
import { FormContext } from '../context/FormContext';
import { useContext } from 'react';

export default function Home() {
  const { fields } = useContext(FormContext);

  return (
    <div>
      <Head>
        <title>Create tokengated links with Gatery</title>
        <link rel="icon" href="/gatery.svg" type="image/svg+xml" />
      </Head>
      <Header />
        <main className="p-5">
          <section className="max-w-7xl mx-auto">
            <h1 className="text-5xl max-w-4xl mb-12">
              Create tokengated content experiences for anything
            </h1>
            <div className="flex justify-between gap-8 items-center">
              <CreateForm />
              <GateCard fields={fields} />
            </div>
          </section>
        </main>
    </div>
  );
}
