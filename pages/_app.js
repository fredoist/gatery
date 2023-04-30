import '@fontsource/space-mono';
import { SWRConfig } from 'swr';
import 'tailwindcss/tailwind.css';

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig value={{ fetcher: (url) => fetch(url).then((r) => r.json()) }}>
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
