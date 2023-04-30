import { db } from '../../lib/firestore';

export default async function (req, res) {
  const { wallet } = req.query;
  try {
    const gates = await db.collection('gates').where('wallet', '==', wallet).get();
    const data = gates.docs.map((gate) => ({
      id: gate.id,
      ...gate.data(),
    }));
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}
