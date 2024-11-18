import type { RouteProps } from 'react-router-dom';
import { ConnectWalletPage } from '@/pages/connect-wallet/connect-wallet.page';
import { routerPaths } from '@/utils/router/router-paths';
import { WalletStatePage } from '@/pages/wallet-state/wallet-state.page';
import { TransferPage } from '@/pages/transfer/transfer.page';
import { AttachWalletProvider } from '@/utils/providers/attach-wallet-provider';

export const routes: RouteProps[] = [
  {
    path: routerPaths.homePage,
    element: (
      <AttachWalletProvider>
        <ConnectWalletPage />
      </AttachWalletProvider>
    ),
  },
  {
    path: routerPaths.walletStatePage,
    element: (
      <AttachWalletProvider>
        <WalletStatePage />
      </AttachWalletProvider>
    ),
  },
  {
    path: routerPaths.transfer,
    element: (
      <AttachWalletProvider>
        <TransferPage />
      </AttachWalletProvider>
    ),
  },
];
