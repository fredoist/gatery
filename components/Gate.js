import { useEffect, useState } from 'react';

export default function Gate({ fields }) {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    async function fetchDetails() {
      const tokenArray = fields.tokens
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
        })
        .filter(Boolean)
        .join(',');
      const request = await fetch(`/api/token-details?tokens=${tokenArray}`);
      const response = await request.json();
      setTokens(response);
    }
    if (fields.tokens) {
      fetchDetails();
    }
  }, [fields.tokens]);

  return (
    <article className="p-5 border border-black/20 shadow-xl max-w-sm w-full flex flex-col gap-2">
      <header>
        <h3 className="text-lg font-bold mb-4">Holder's exclusive</h3>
        <p className="text-sm">Connect your wallet to unlock this link</p>
      </header>
      <button className="bg-black text-white py-2 px-4 block w-full">
        Connect wallet
      </button>
      <div
        className="h-px border-b border-black/20 w-full my-6 relative before:absolute before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:content-[attr(data-condition)] before:bg-white before:px-4"
        data-condition={`${fields.condition} of`}
      />
      {tokens.length > 0 &&
        tokens?.map((token) => (
          <div className="flex gap-4">
            <img
              src={token.image}
              className="w-12 h-12"
              alt={`${token.collection} ${token.tokenId}`}
            />
            <div className="flex flex-col">
              <strong>{token.tokenId}</strong>
              <span>{token.collection}</span>
            </div>
          </div>
        ))}
    </article>
  );
}
