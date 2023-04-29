import { useContext } from 'react';
import { FormContext } from '../context/FormContext';

export default function GateCard() {
  const { fields } = useContext(FormContext);

  return (
    <article className="p-5 border border-black/20 shadow-xl max-w-sm w-full flex flex-col gap-2">
      <header>
        <h3 className="text-lg font-bold mb-4">Holder exclusive</h3>
        <p className="text-sm">Connect your wallet to unlock this link</p>
      </header>
      <button className="bg-black text-white py-2 px-4 block w-full">
        Connect wallet
      </button>
      <div
        className="h-px border-b border-black/20 w-full my-6 relative before:absolute before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:content-[attr(data-condition)] before:bg-white before:px-4"
        data-condition={`${fields.condition} of`}
      />
      <div className="flex gap-4">
        <img
          src="https://i.seadn.io/gcs/files/34231b362bfca9e94b4f2b285b3eb7a3.png?auto=format&w=50"
          className="w-12 h-12"
          alt="#0"
        />
        <div className="flex flex-col">
          <strong>#123</strong>
          <span>PolygonMonkeys</span>
        </div>
      </div>
    </article>
  );
}
