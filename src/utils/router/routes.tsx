import type { RouteProps } from 'react-router-dom';
import { ConnectWalletPage } from '@/pages/connect-wallet/connect-wallet.page';
import { routerPaths } from '@/utils/router/router-paths';

export const routes: RouteProps[] = [
  {
    path: routerPaths.homePage,
    element: <ConnectWalletPage />,
  },
];
