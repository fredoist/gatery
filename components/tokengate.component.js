export default function Tokengate({ condition, tokens }) {
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
        className="h-px border-b border-black/20 w-full my-6 relative before:absolute before:uppercase before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:content-[attr(data-condition)] before:bg-white before:px-4"
        data-condition={`${condition} of`}
      />
      {tokens.length > 0 &&
        tokens?.map(({ image, collection, tokenId }) => (
          <div className="flex gap-4" key={tokenId}>
            <img
              src={image}
              className="w-12 h-12"
              alt={`${collection} #${tokenId}`}
            />
            <div className="flex flex-col">
              <strong>{tokenId}</strong>
              <span>{collection}</span>
            </div>
          </div>
        ))}
    </article>
  );
}
