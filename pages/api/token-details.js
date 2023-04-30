const API_URL =
  'https://api.verbwire.com/v1/nft/data/nftDetails';
const API_KEY = process.env.VERBWIRE_API_KEY;
const options = {
  headers: {
    'x-api-key': API_KEY,
    accept: 'application/json',
  },
};

export default async function handler(req, res) {
  const { tokens } = req.query;

  try {
    const tokensArray = tokens.split(',');
    const tokenDetails = await Promise.all(
      tokensArray.map(async (token) => {
        const chain = token.split(':')[0];
        const contractAddress = token.split(':')[1];
        const tokenId = token.split(':')[2];
        const response = await fetch(
          `${API_URL}?chain=${chain}&contractAddress=${contractAddress}&tokenId=${tokenId}`,
          options
        );
        const { nft_details: data } = await response.json();
        const nft = await fetch(
          data.tokenURI.replace('ipfs://', 'https://ipfs.io/ipfs/')
        );
        const { image } = await nft.json();
        return {
          tokenId: tokenId,
          collection: data.name,
          image: image.replace('ipfs://', 'https://ipfs.io/ipfs/'),
        };
      })
    );
    res
      .setHeader('Cache-Control', 's-maxage=31536000, stale-while-revalidate')
      .json(tokenDetails);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}
