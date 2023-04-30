import { db } from '@lib/firestore';
import { isWalletHolderOfToken } from '@lib/verbwire';

export default async function handler(req, res) {
  const { slug, wallet, tokens, condition } = req.body;
  try {
    const isOwner = await Promise.all(
      tokens.map((token) => isWalletHolderOfToken({ ...token, wallet }))
    );

    let valid = false;
    if (condition === 'all') valid = isOwner.every((token) => token);
    if (condition === 'any') valid = isOwner.some((token) => token);

    const docRef = await db.doc(`gates/${slug}`).get();
    const { link } = docRef.data();

    res.json({ valid, link: valid ? link : null });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
