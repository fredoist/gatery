import { useEffect, useRef, useState } from 'react';
import { auth } from '@stores/auth.store';
import { state, toggleSidebar } from '@stores/sidebar.store';

export default function Sidebar() {
  const [gates, setGates] = useState([]);
  const wallet = auth.use();
  const open = state.use();
  const asideRef = useRef();

  useEffect(() => {
    async function fetchGates() {
      const response = await fetch(`/api/get-gates?wallet=${wallet}`);
      const data = await response.json();
      setGates(data);
      console.log(data);
    }
    fetchGates();
  }, [wallet]);

  return (
    <aside
      ref={asideRef}
      className={`fixed right-0 inset-y-0 bg-white shadow-xl w-96 z-50 p-8 flex flex-col gap-10 ${
        open ? '-translate-x-0' : 'translate-x-full'
      } transition-transform duration-100 ease-in`}
    >
      <div className="flex items-center justify-between">
        <h3>My links</h3>
        <button>Log out</button>
      </div>
      <div className="flex-1 overflow-y-auto">
        <article className="p-4 border border-black/20">
          <h4 className="leading-none">GATE_ID</h4>
          <span className="text-xs">GATE_LINK</span>
          <div className="flex items-center gap-2 mt-2">
            <span className="uppercase">GATE_CONDITION</span>
            <div className="flex -space-x-2">
              <img
                src="https://ipfs.io/ipfs/QmS8ToohXJLrmYEN8uduXfVMoofwBRkN9tguufvhCzVkBj"
                className="w-6 rounded-full"
                alt=""
              />
              <img
                src="https://wonderpals.mypinata.cloud/ipfs/QmYh6fia5KZTQ2EAGkDtKGGEpSMNMNdHU8qnZa4ttp9t11"
                className="w-6 rounded-full"
                alt=""
              />
            </div>
          </div>
        </article>
      </div>
    </aside>
  );
}
