import { useContext } from 'react';
import { FormContext } from '../context/FormContext';

export default function CreateForm() {
  const { fields, updateField } = useContext(FormContext);

  const handleChange = (e) => {
    updateField(e.target.name, e.target.value);
  }

  return (
    <form className="max-w-xl flex flex-col gap-4 flex-1">
      <div className="flex flex-col gap-2">
        <label htmlFor="link">Locked content link</label>
        <input
          className="p-2 outline-none border border-black/20 focus:border-black bg-gray-50"
          type="url"
          id="link"
          name="link"
          value={fields.link}
          onChange={handleChange}
          placeholder="https://www.dropbox.com/s/g0rb22icw0va10u/file.zip?dl=0"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="link">Unlock condition</label>
        <div className="p-1 border border-black/20 flex [&>label]:flex-1 [&>label]:text-center">
          <input
            className="peer/any"
            type="radio"
            name="condition"
            id="any"
            value="any"
            hidden
            onChange={handleChange}
            defaultChecked
          />
          <label
            className="peer-checked/any:bg-lime-400 py-2 px-3 cursor-pointer"
            htmlFor="any"
          >
            Any of
          </label>
          <input
            className="peer/all"
            type="radio"
            name="condition"
            id="all"
            value="all"
            onChange={handleChange}
            hidden
          />
          <label
            className="peer-checked/all:bg-lime-400 py-2 px-3 cursor-pointer"
            htmlFor="all"
          >
            All of
          </label>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="tokens">Tokens</label>
        <input
          className="p-2 outline-none border border-black/20 focus:border-black bg-gray-50"
          type="text"
          id="tokens"
          name="tokens"
          value={fields.tokens}
          onChange={handleChange}
          placeholder="0x1234...5678"
        />
        <span className="text-xs">
          Comma-separated list of contracts or OpenSea links
        </span>
      </div>
      <button className="text-white bg-black py-3 px-6 mt-6" type="submit">
        Create gated link
      </button>
    </form>
  );
}
