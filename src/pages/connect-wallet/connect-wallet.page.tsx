import { t } from 'i18next';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Layout } from '@/components/layout/layout';
import { Card } from '@/components/card';
import { Button } from '@/components/button';
import { type AppDispatch, useAppSelector } from '@/utils/store/store';
import { routerPaths } from '@/utils/router/router-paths';
import { connectWallet } from '@/utils/store/services/wallet/wallet.actions';

export function ConnectWalletPage() {
  const isConnected = useAppSelector(({ wallet }) => wallet.isConnected);
  const isConnecting = useAppSelector(({ wallet }) => wallet.isConnecting);
  const isDisconnected = useAppSelector(({ wallet }) => wallet.isDisconnected);
  const dispatch: AppDispatch = useDispatch();

  if (isConnected && !isDisconnected) {
    return <Navigate to={routerPaths.walletStatePage} />;
  }

  const handleConnectClick = () => {
    void dispatch(connectWallet());
  };

  return (
    <Layout>
      <Card className="w-full h-full flex flex-col items-center justify-start md:justify-center gap-10">
        <div className="text-lg font-roboto">
          {t('connectWalletPage.title')}
        </div>
        <Button onClick={handleConnectClick} disabled={isConnecting}>
          {t('connectWalletPage.button')}
        </Button>
      </Card>
    </Layout>
  );
}
