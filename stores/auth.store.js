import { entity, persistence } from 'simpler-state';

export const auth = entity(null, [persistence('auth')]);

export const connectWallet = async () => {
  const accounts = await window.ethereum.request({
    method: 'eth_requestAccounts',
  });
  auth.set(accounts[0]);
};

export const disconnectWallet = async () => {
  auth.set(null);
};
