import Form from '@components/form.component';
import Header from '@components/header.component';
import Sidebar from '@components/sidebar.component';
import Head from 'next/head';

export default function Home() {
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
          <Form />
        </section>
      </main>
    </div>
  );
}
