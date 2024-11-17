import { createSlice } from '@reduxjs/toolkit';
import { connectWallet } from '@/utils/store/services/wallet/wallet.actions';

interface WalletState {
  isConnecting: boolean;
  isConnected: boolean;
  errorConnecting: boolean;

  connectedAccountAddress?: string;
  chainId?: bigint;
  noMetamask: boolean;
}

const initialState: WalletState = {
  isConnecting: false,
  isConnected: false,
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
        state.isConnecting = false;

        if (!action.payload) {
          return state;
        }

        state.isConnected = true;
        state.errorConnecting = false;
        state.connectedAccountAddress = action.payload.address;
        state.chainId = action.payload.chainId;
      })
      .addCase(connectWallet.rejected, (state) => {
        state.isConnected = false;
        state.isConnecting = false;
        state.errorConnecting = true;
      });
  },
});
