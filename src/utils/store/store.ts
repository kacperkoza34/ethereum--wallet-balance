import { configureStore } from '@reduxjs/toolkit';
import { type TypedUseSelectorHook, useSelector } from 'react-redux';
import { walletSlice } from '@/utils/store/services/wallet/wallet.slice';
import { contractSlice } from '@/utils/store/services/contracts/contracts.slice';
import { ethSlice } from '@/utils/store/services/eth/eth-slice';

export const store = configureStore({
  reducer: {
    [walletSlice.name]: walletSlice.reducer,
    [contractSlice.name]: contractSlice.reducer,
    [ethSlice.name]: ethSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['your/action/type'],
        ignoredActionPaths: ['meta.arg', 'payload'],
        ignoredPaths: ['wallet', 'contract', 'eth'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
