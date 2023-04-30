import getTokenData from '@utils/get-token-data';
import { db } from '@lib/firestore';

export default async function handler(req, res) {
  const { link, condition, tokens, wallet } = req.body;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!link || !condition || !tokens) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const slug = Math.random().toString(36).substring(2, 16);
  const tokenDetails = await getTokenData(tokens);
  try {
    await db.doc(`gates/${slug}`).set({
      link,
      condition,
      tokens: tokenDetails,
      wallet,
      createdAt: new Date().toISOString(),
    });

    res.status(200).json({ slug });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}
