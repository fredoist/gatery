import { db } from '@lib/firestore';

const API_URL = `https://api.verbwire.com/v1/nft/data/isWalletHolderOfToken`;
const API_KEY = process.env.VERBWIRE_API_KEY;
const options = {
  headers: {
    'x-api-key': API_KEY,
    accept: 'application/json',
  },
};

export default async function handler(req, res) {
  const { slug, wallet, tokens, condition } = req.body;
  try {
    const checkIfOwner = await Promise.all(tokens.map(async ({ tokenId, contractAddress, chain }) => {
      const res = await fetch(
        `${API_URL}?walletAddress=${wallet}&contractAddress=${contractAddress}&chain=${chain}`,
        options
      );
      const { isWalletHolderOfToken, holdings } = await res.json();
      console.log({ isWalletHolderOfToken, holdings });

      if (!isWalletHolderOfToken) return false;

      const token = holdings.find(({ tokenID }) => tokenID === tokenId);
      if (!token) return false;

      return true;
    }));

    let valid = false;
    if (condition === 'all') valid = checkIfOwner.every((token) => token);
    if (condition === 'any') valid = checkIfOwner.some((token) => token);

    const docRef = await db.doc(`gates/${slug}`).get();
    const { link } = docRef.data();

    res.json({ valid, link })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
