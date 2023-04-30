import { cleanUrl } from '@utils/clean-opensea-url';
import { fixIFPSUrl } from '@utils/fix-ipfs';

const API_URL = `https://api.verbwire.com/v1/nft/data`;
const options = {
  headers: {
    'x-api-key': process.env.VERBWIRE_API_KEY,
    accept: 'application/json',
  },
};

/**
 * Check if wallet is holder of token
 *
 * @typedef {Object} NFTDetails
 * @property {string} NFTDetails.wallet
 * @property {string} NFTDetails.tokenId
 * @property {string} NFTDetails.contractAddress
 * @property {string} NFTDetails.chain
 * @param {NFTDetails} props
 * @returns {Promise<Boolean>}
 */
export async function isWalletHolderOfToken({
  wallet,
  tokenId,
  contractAddress,
  chain,
}) {
  try {
    const res = await fetch(
      `${API_URL}/isWalletHolderOfToken?walletAddress=${wallet}&contractAddress=${contractAddress}&chain=${chain}`,
      options
    );
    const { isWalletHolderOfToken, holdings } = await res.json();

    if (!isWalletHolderOfToken) return false;

    const token = holdings.find(({ tokenID }) => tokenID === tokenId);
    if (!token) return false;

    return true;
  } catch (error) {
    throw new Error(error.message);
  }
}

/**
 * Get token data from verbwire
 *
 * @param {string[]} tokens - array of tokens as url strings from opensea
 * @returns {Promise<{chain: string, tokenId: string, contractAddress: string, collection: string, image: string}[]>}
 */
export default async function getTokenData(tokens) {
  try {
    const tokensArray = tokens.split(',').map(cleanUrl).filter(Boolean);
    const tokenDetails = await Promise.all(
      tokensArray
        .map(async (token) => {
          if (token) {
            const part = token.split('/');
            let chain = part[0];
            const contractAddress = part[1];
            const tokenId = part[2];

            if (chain === 'ethereum') chain = 'ethereum';
            if (chain === 'matic') chain = 'polygon';

            const response = await fetch(
              `${API_URL}/nftDetails?chain=${chain}&contractAddress=${contractAddress}&tokenId=${tokenId}`,
              options
            );
            const { nft_details } = await response.json();
            const nft = await fetch(fixIFPSUrl(nft_details.tokenURI));
            const { image } = await nft.json();
            return {
              chain,
              tokenId,
              contractAddress,
              collection: nft_details.name,
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
