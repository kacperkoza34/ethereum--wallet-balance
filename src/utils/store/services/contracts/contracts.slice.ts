import { createSlice } from '@reduxjs/toolkit';
import {
  getErc20Data,
  transferErc20Token,
} from '@/utils/store/services/contracts/contracts.actions';

type TokenType = { type: 'erc20'; address: string } | { type: 'eth' };

export interface Status {
  idle: boolean;
  loading: boolean;
  success: boolean;
  error: boolean;
}

export interface TokeData {
  balance?: bigint;
  symbol?: string;
  decimals?: bigint;
  tokenType: TokenType;
}

interface ContractState {
  erc20Data: {
    data: TokeData;
    status: Status;
  };
  erc20Transfer: {
    status: Status;
  };
}

const initialState: ContractState = {
  erc20Data: {
    data: {
      tokenType: {
        type: 'erc20',
        address: import.meta.env.VITE_ERC_20_ADDRESS as string,
      },
    },
    status: {
      idle: true,
      loading: false,
      success: false,
      error: false,
    },
  },
  erc20Transfer: {
    status: {
      idle: true,
      loading: false,
      success: false,
      error: false,
    },
  },
};

export const contractSlice = createSlice({
  name: 'contract',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getErc20Data.pending, (state) => {
        state.erc20Data.status.error = false;
        state.erc20Data.status.loading = true;
        state.erc20Data.status.idle = false;
        state.erc20Data.status.success = false;
      })
      .addCase(getErc20Data.fulfilled, (state, action) => {
        state.erc20Data.data = action.payload;
        state.erc20Data.status.error = false;
        state.erc20Data.status.loading = false;
        state.erc20Data.status.idle = true;
        state.erc20Data.status.success = true;
      })
      .addCase(getErc20Data.rejected, (state) => {
        state.erc20Data.status.error = true;
        state.erc20Data.status.loading = false;
        state.erc20Data.status.idle = false;
        state.erc20Data.status.success = false;
      })
      .addCase(transferErc20Token.pending, (state) => {
        state.erc20Transfer.status.loading = true;
      })
      .addCase(transferErc20Token.fulfilled, (state) => {
        state.erc20Transfer.status.success = true;
        state.erc20Transfer.status.loading = false;
      })
      .addCase(transferErc20Token.rejected, (state) => {
        state.erc20Transfer.status.error = true;
        state.erc20Transfer.status.success = false;
        state.erc20Transfer.status.loading = false;
      });
  },
});
