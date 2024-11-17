import type { RouteProps } from 'react-router-dom';
import { ConnectWalletPage } from '@/pages/connect-wallet/connect-wallet.page';
import { routerPaths } from '@/utils/router/router-paths';
import { WalletStatePage } from '@/pages/wallet-state/wallet-state.page';

export const routes: RouteProps[] = [
  {
    path: routerPaths.homePage,
    element: <ConnectWalletPage />,
  },
  {
    path: routerPaths.walletStatePage,
    element: <WalletStatePage />,
  },
];
