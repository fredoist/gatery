import AuthProvider from '../context/AuthContext';
import '@fontsource/space-mono';
import 'tailwindcss/tailwind.css';
import FormContextProvider from '../context/FormContext';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <FormContextProvider>
        <Component {...pageProps} />
      </FormContextProvider>
    </AuthProvider>
  );
}

export default MyApp;
