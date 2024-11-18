import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { attachWallet } from '@/utils/store/services/wallet/wallet.actions';
import { useAppSelector, type AppDispatch } from '@/utils/store/store';
import { type Children } from '@/utils/types';
import { routerPaths } from '@/utils/router/router-paths';
import { CardLoader } from '@/components/layout/card-loader';

interface AttachWalletProvider {
  children: Children;
}
export function AttachWalletProvider({ children }: AttachWalletProvider) {
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const walletState = useAppSelector(({ wallet }) => wallet);

  useEffect(() => {
    void dispatch(attachWallet());
    // eslint-disable-next-line react-hooks/exhaustive-deps -- call this only once
  }, []);

  if (
    (walletState.noMetamask || walletState.isDisconnected) &&
    location.pathname !== routerPaths.homePage
  ) {
    return <Navigate to={routerPaths.homePage} />;
  }

  if (walletState.isConnecting) {
    return <CardLoader />;
  }

  return children;
}
