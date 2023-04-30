import { auth, connectWallet } from '@stores/auth.store';
import { useEffect, useState } from 'react';

export default function Tokengate({ slug, disabled, condition, tokens }) {
  const wallet = auth.use();
  const [isValid, setIsValid] = useState(false);
  const [link, setLink] = useState(null);

  useEffect(() => {
    if (wallet) validate();
  }, [wallet]);

  const validate = async () => {
    if(!tokens.length || !condition || disabled) return;
    try {
      const res = await fetch('/api/validate-gate', {
        method: 'POST',
        body: JSON.stringify({ slug, wallet, tokens, condition }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { valid, link } = await res.json();
      setIsValid(valid);
      if (!valid) {
        alert('You do not own the required tokens');
        return
      }

      setLink(link);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <article className="p-5 border border-black/20 shadow-xl max-w-sm w-full flex flex-col gap-2 bg-white">
      <header>
        <h3 className="text-lg font-bold mb-4">Holder's exclusive</h3>
        <p className="text-sm">Connect your wallet to unlock this link</p>
      </header>
      {wallet && isValid ? (
        <button
          className="bg-black text-white py-2 px-4 block w-full"
          onClick={() => {
            window.location.href = link;
          }}
        >
          Proceed to link
        </button>
      ) : (
        <button
          className="bg-black text-white py-2 px-4 block w-full"
          onClick={connectWallet}
        >
          Connect wallet
        </button>
      )}
      <div
        className="h-px border-b border-black/20 w-full my-6 relative before:absolute before:uppercase before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:content-[attr(data-condition)] before:bg-white before:px-4"
        data-condition={`${condition} of`}
      />
      {tokens.length > 0 ? (
        tokens?.map(({ image, collection, tokenId }) => (
          <div className="flex gap-4" key={tokenId}>
            <img
              src={image}
              className="w-12 h-12"
              alt={`${collection} #${tokenId}`}
            />
            <div className="flex flex-col">
              <strong>#{tokenId}</strong>
              <span>{collection}</span>
            </div>
          </div>
        ))
      ) : (
        <div className="flex gap-4 motion-safe:animate-pulse">
          <img
            className="w-12 h-12 bg-gray-300"
            alt=""
          />
          <div className="flex flex-col gap-2">
            <strong className='block w-16 h-5 bg-gray-300'></strong>
            <span className='block w-24 h-4 bg-gray-300'></span>
          </div>
        </div>
      )}
    </article>
  );
}
