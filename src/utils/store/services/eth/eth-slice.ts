import { createSlice } from '@reduxjs/toolkit';
import {
  type TokeData,
  type Status,
} from '@/utils/store/services/contracts/contracts.slice';
import {
  getEthData,
  transferEth,
} from '@/utils/store/services/eth/eth.actions';

interface EthState {
  ethData: {
    data: TokeData;
    status: Status;
  };
  ethTransfer: {
    status: Status;
  };
}

const initialState: EthState = {
  ethData: {
    data: { tokenType: { type: 'eth' } },
    status: {
      idle: true,
      loading: false,
      success: false,
      error: false,
    },
  },
  ethTransfer: {
    status: {
      idle: true,
      loading: false,
      success: false,
      error: false,
    },
  },
};

export const ethSlice = createSlice({
  name: 'eth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getEthData.pending, (state) => {
        state.ethData.status.error = false;
        state.ethData.status.loading = true;
        state.ethData.status.idle = false;
        state.ethData.status.success = false;
      })
      .addCase(getEthData.fulfilled, (state, action) => {
        state.ethData.data = action.payload;
        state.ethData.status.error = false;
        state.ethData.status.loading = false;
        state.ethData.status.idle = true;
        state.ethData.status.success = true;
      })
      .addCase(getEthData.rejected, (state) => {
        state.ethData.status.error = true;
        state.ethData.status.loading = false;
        state.ethData.status.idle = false;
        state.ethData.status.success = false;
      })
      .addCase(transferEth.pending, (state) => {
        state.ethTransfer.status.loading = true;
      })
      .addCase(transferEth.fulfilled, (state) => {
        state.ethTransfer.status.success = true;
        state.ethTransfer.status.loading = false;
      })
      .addCase(transferEth.rejected, (state) => {
        state.ethTransfer.status.error = true;
        state.ethTransfer.status.success = false;
        state.ethTransfer.status.loading = false;
      });
  },
});
