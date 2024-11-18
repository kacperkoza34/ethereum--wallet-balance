/* eslint-disable @typescript-eslint/no-invalid-void-type -- ... */
/* eslint-disable @typescript-eslint/no-unsafe-call -- ... */
/* eslint-disable @typescript-eslint/no-unsafe-argument -- ... */
/* eslint-disable @typescript-eslint/no-unsafe-member-access -- ... */
/* eslint-disable @typescript-eslint/no-explicit-any -- ... */
/* eslint-disable @typescript-eslint/no-unsafe-assignment -- ... */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { type JsonRpcSigner } from 'ethers';
import { BrowserProvider } from 'ethers';
import { type RootState } from '@/utils/store/store';

const config: {
  provider?: BrowserProvider;
  signer?: JsonRpcSigner;
} = {};

export const getSigner = () => config.signer;
export const getProvider = () => config.provider;
const ethereum = (window as any).ethereum;

if (ethereum) {
  config.provider = new BrowserProvider((window as any).ethereum);

  ethereum?.on('accountsChanged', () => {
    window.location.reload();
  });

  ethereum?.on('chainChanged', () => {
    window.location.reload();
  });
}

export const ATTACH_WALLET_ACTION_NAME = 'wallet/attachWallet';

export const attachWallet = createAsyncThunk<
  { address: string; chainId: bigint } | null,
  void,
  { state: RootState }
>(ATTACH_WALLET_ACTION_NAME, async (_, { getState }) => {
  const state = getState();
  const disconnect = localStorage.getItem('disconnected');

  if (
    disconnect === 'true' ||
    state.wallet.noMetamask ||
    !config.provider ||
    state.wallet.isDisconnected
  ) {
    return null;
  }

  const accounts = await config.provider.listAccounts();

  if (accounts.length === 0) {
    return null;
  }
  config.signer = await config.provider.getSigner();

  const network = await config.provider.getNetwork();

  localStorage.setItem('disconnected', 'false');

  return {
    address: accounts[0].address,
    chainId: network.chainId,
  };
});

export const CONNECT_WALLET_ACTION_NAME = 'wallet/connectWallet';

export const connectWallet = createAsyncThunk<
  { address: string; chainId: bigint } | null,
  void,
  { state: RootState }
>(CONNECT_WALLET_ACTION_NAME, async (_, { getState }) => {
  const state = getState();

  if (state.wallet.noMetamask || !config.provider) {
    return null;
  }

  config.signer = await config.provider.getSigner();

  const accounts = await config.provider.listAccounts();

  if (accounts.length === 0) {
    return null;
  }

  const network = await config.provider.getNetwork();
  localStorage.setItem('disconnected', 'false');

  return {
    address: accounts[0].address,
    chainId: network.chainId,
  };
});

export const DISCONNECT_WALLET_ACTION_NAME = 'wallet/disconnectWallet';

export const disconnectWallet = createAsyncThunk(
  DISCONNECT_WALLET_ACTION_NAME,
  () => {
    localStorage.setItem('disconnected', 'true');
  }
);
