const API_URL = `https://api.verbwire.com/v1/nft/data/isWalletHolderOfToken`;
const API_KEY = process.env.VERBWIRE_API_KEY;
const options = {
  headers: {
    'x-api-key': API_KEY,
    accept: 'application/json',
  },
};

export default async function handler(req, res) {
  const { wallet, tokens, condition } = req.body;
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

    if (condition === 'all') {
      const valid = checkIfOwner.every((token) => token);
      return res.status(200).json({ valid });
    } else if (condition === 'any') {
      const valid = checkIfOwner.some((token) => token);
      return res.status(200).json({ valid });
    } else {
      return res.status(400).json({ error: 'Invalid condition' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
