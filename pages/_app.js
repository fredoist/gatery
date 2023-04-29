import AuthProvider from '../context/AuthContext';
import '@fontsource/space-mono';
import 'tailwindcss/tailwind.css';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
