import { db } from '../../lib/firestore';

export default async function handler(req, res) {
  const { link, condition, tokens, wallet } = req.body;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!link || !condition || !tokens) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const slug = Math.random().toString(36).substring(2, 16);
  const formattedTokens = tokens
    .trim()
    .split(',')
    .map((token) => {
      if (token) {
        const cleanURI = token.replace('https://opensea.io/es/assets/', '');
        const chain = cleanURI.split('/')[0];
        const contractAddress = cleanURI.split('/')[1];
        const tokenId = cleanURI.split('/')[2];
        return `${chain}:${contractAddress}:${tokenId}`;
      }
      return null;
    }).filter(Boolean).join(',');
  try {
    await db.doc(`gates/${slug}`).set({
      link,
      condition,
      tokens: formattedTokens,
      wallet,
      createdAt: new Date().toISOString(),
    });

    res.status(200).json({ slug });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}
