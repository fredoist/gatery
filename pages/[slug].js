import Tokengate from '@components/tokengate.component';
import { db } from '@lib/firestore';

export default function GatedPage({ gate, slug }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-lime-400">
      <Tokengate slug={slug} {...gate} />
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const { slug } = params;
  const gateRef = await db.doc(`gates/${slug}`).get();
  const gate = gateRef.data();

  if (!gate) {
    return {
      notFound: true,
    };
  }

  return {
    props: { gate, slug },
  };
}
