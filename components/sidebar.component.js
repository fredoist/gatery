import { useEffect, useRef } from 'react';
import { auth, disconnectWallet } from '@stores/auth.store';
import { state, toggleSidebar } from '@stores/sidebar.store';
import useSWR from 'swr';
import Link from 'next/link';

export default function Sidebar() {
  const wallet = auth.use();
  const { data } = useSWR(`/api/get-gates?wallet=${wallet}`);
  const open = state.use();
  const asideRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        asideRef.current &&
        !asideRef.current.contains(event.target) &&
        open
      ) {
        toggleSidebar();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <aside
      ref={asideRef}
      className={`fixed right-0 inset-y-0 bg-white shadow-xl w-96 z-50 p-8 flex flex-col gap-10 ${
        open ? '-translate-x-0' : 'translate-x-full'
      } transition-transform duration-100 ease-in`}
    >
      <div className="flex items-center justify-between">
        <h3>My links</h3>
        <button onClick={disconnectWallet}>Log out</button>
      </div>
      <div className="flex-1 overflow-y-auto flex flex-col gap-4">
        {data &&
          data?.map(({ id, link, condition, tokens }) => (
            <article className="p-4 border border-black/20" key={id}>
              <a
                href={`/${id}`}
                target="_blank"
                className="leading-none text-sm font-bold"
              >
                /{id}
              </a>
              <span className="text-xs block truncate">{link}</span>
              <div className="flex items-center gap-2 mt-2">
                <span className="uppercase text-xs">{condition} of</span>
                <div className="flex -space-x-2">
                  {tokens.map(({ image, collection, tokenId }) => (
                    <img
                      src={image}
                      className="w-5 h-5 rounded-full"
                      alt={`${collection} #${tokenId}`}
                      title={`${collection} #${tokenId}`}
                    />
                  ))}
                </div>
              </div>
            </article>
          ))}
      </div>
    </aside>
  );
}
