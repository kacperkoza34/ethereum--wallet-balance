import { createSlice } from '@reduxjs/toolkit';
import {
  attachWallet,
  connectWallet,
  disconnectWallet,
} from '@/utils/store/services/wallet/wallet.actions';

interface WalletState {
  isConnecting: boolean;
  isConnected: boolean;
  isDisconnected: boolean;
  errorConnecting: boolean;

  connectedAccountAddress?: string;
  chainId?: bigint;
  noMetamask: boolean;
}

const initialState: WalletState = {
  isConnecting: false,
  isConnected: false,
  isDisconnected: false,
  errorConnecting: false,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any -- ...
  noMetamask: (window as any).ethereum === undefined,
};

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(connectWallet.pending, (state) => {
        state.isConnected = false;
        state.isConnecting = true;
        state.errorConnecting = false;
      })
      .addCase(connectWallet.fulfilled, (state, action) => {
        state.isConnected = false;
        state.isConnecting = false;

        if (!action.payload) {
          return state;
        }

        state.isDisconnected = false;
        state.isConnected = true;
        state.errorConnecting = false;
        state.connectedAccountAddress = action.payload.address;
        state.chainId = action.payload.chainId;
      })
      .addCase(connectWallet.rejected, (state) => {
        state.isConnected = false;
        state.isConnecting = false;
        state.errorConnecting = true;
      })
      .addCase(attachWallet.pending, (state) => {
        state.isConnected = false;
        state.isConnecting = true;
        state.errorConnecting = false;
      })
      .addCase(attachWallet.fulfilled, (state, action) => {
        state.isDisconnected = true;
        state.isConnected = false;
        state.isConnecting = false;

        if (!action.payload) {
          return state;
        }

        state.isDisconnected = false;
        state.isConnected = true;
        state.errorConnecting = false;
        state.connectedAccountAddress = action.payload.address;
        state.chainId = action.payload.chainId;
      })
      .addCase(attachWallet.rejected, (state) => {
        state.isConnected = false;
        state.isConnecting = false;
        state.errorConnecting = true;
      })
      .addCase(disconnectWallet.fulfilled, (state) => {
        state.isConnected = false;
        state.isConnecting = false;
        state.isDisconnected = true;
        state.chainId = undefined;
        state.connectedAccountAddress = undefined;
      });
  },
});
