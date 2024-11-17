import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { attachWallet } from '@/utils/store/services/wallet/wallet.actions';
import { type AppDispatch } from '@/utils/store/store';
import { type Children } from '@/utils/types';

interface AttachWalletProvider {
  children: Children;
}
export function AttachWalletProvider({ children }: AttachWalletProvider) {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    void dispatch(attachWallet());
    // eslint-disable-next-line react-hooks/exhaustive-deps -- call this only once
  }, []);

  return children;
}
