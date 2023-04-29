import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('wallet')) {
      setWallet(localStorage.getItem('wallet'));
    }
  }, []);

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined' && !window.ethereum.isMetaMask) {
      alert('Please install MetaMask!');
      return;
    }

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    setWallet(account);
    localStorage.setItem('wallet', account);
  }

  const disconnectWallet = () => {
    setWallet(null);
    localStorage.removeItem('wallet');
  }

  return (
    <AuthContext.Provider value={{ wallet, connectWallet, disconnectWallet }}>
      {children}
    </AuthContext.Provider>
  );
}
