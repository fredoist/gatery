import { fixIFPSUrl } from './fix-ipfs';

const API_URL = 'https://api.verbwire.com/v1/nft/data/nftDetails';
const API_KEY = process.env.VERBWIRE_API_KEY;
const options = {
  headers: {
    'x-api-key': API_KEY,
    accept: 'application/json',
  },
};

export default async function getTokenData(tokens) {
  try {
    const tokensArray = tokens.trim().split(',').map((token) => {
      if (token) {
        // remove https://opensea.io/assets/ from token
        const tokenString = token.split('https://opensea.io/assets/')[1];
        return tokenString;
      }
      return null;
    }).filter(Boolean)
    const tokenDetails = await Promise.all(
      tokensArray
        .map(async (token) => {
          if (token) {
            const chain = token.split('/')[0];
            const contractAddress = token.split('/')[1];
            const tokenId = token.split('/')[2];

            const response = await fetch(
              `${API_URL}?chain=${chain}&contractAddress=${contractAddress}&tokenId=${tokenId}`,
              options
            );
            const { nft_details: data } = await response.json();
            const nft = await fetch(fixIFPSUrl(data.tokenURI));
            const { image } = await nft.json();
            return {
              tokenId: tokenId,
              collection: data.name,
              image: fixIFPSUrl(image),
            };
          }
          return null;
        })
        .filter(Boolean)
    );
    return tokenDetails;
  } catch (error) {
    throw new Error(error.message);
  }
}
