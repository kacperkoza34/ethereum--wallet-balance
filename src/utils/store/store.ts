import { configureStore } from '@reduxjs/toolkit';
import { type TypedUseSelectorHook, useSelector } from 'react-redux';
import { walletSlice } from '@/utils/store/services/wallet/wallet.slice';

export const store = configureStore({
  reducer: {
    [walletSlice.name]: walletSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
