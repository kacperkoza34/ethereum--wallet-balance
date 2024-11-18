import { t } from 'i18next';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Layout } from '@/components/layout/layout';
import { Card } from '@/components/card';
import { Popover } from '@/components/popover';
import { Button } from '@/components/button';
import { shortenEthereumAddress } from '@/utils/helpers/shorten-etherum-address';
import { CopyToClipboard } from '@/components/copy-to-clipboard';
import { type AppDispatch, useAppSelector } from '@/utils/store/store';
import { CardLoader } from '@/components/layout/card-loader';
import { getErc20Data } from '@/utils/store/services/contracts/contracts.actions';
import { getEthData } from '@/utils/store/services/eth/eth.actions';
import { WalletStateListElement } from '@/pages/wallet-state/wallet-state-list-element';
import { disconnectWallet } from '@/utils/store/services/wallet/wallet.actions';

export function WalletStatePage() {
  const { connectedAccountAddress } = useAppSelector((slice) => slice.wallet);
  const erc20 = useAppSelector((slice) => slice.contract.erc20Data);
  const eth = useAppSelector((slice) => slice.eth.ethData);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    void dispatch(getErc20Data({ address: connectedAccountAddress ?? '' }));
    void dispatch(getEthData({ address: connectedAccountAddress ?? '' }));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- call only once
  }, []);

  const handleDisconnect = () => {
    void dispatch(disconnectWallet());
  };

  const popoverContent = (
    <div className="w-[15rem] flex flex-col items-start justify-start gap-16">
      <div className="w-full flex flex-col items-start justify-start gap-2">
        <div>{t('walletStatePage.popover.connectWalletLabel')}</div>
        <CopyToClipboard
          displayValue={shortenEthereumAddress(connectedAccountAddress ?? '')}
          copyValue={connectedAccountAddress ?? ''}
        />
      </div>
      <Button onClick={handleDisconnect}>
        {t('walletStatePage.popover.disconnectWallet')}
      </Button>
    </div>
  );

  if (erc20.status.loading || !erc20.status.success) {
    return <CardLoader />;
  }

  return (
    <Layout>
      <Card className="w-full h-full flex flex-col items-start justify-start gap-10">
        <div className="w-full flex items-center justify-between">
          <div className="text-lg font-roboto">
            {t('walletStatePage.title')}
          </div>
          <Popover content={popoverContent}>
            <Button as="div">
              {shortenEthereumAddress(connectedAccountAddress ?? '')}
            </Button>
          </Popover>
        </div>
        <div className="w-full flex flex-col items-start justify-start gap-4 max-h-40 overflow-y-auto">
          <WalletStateListElement {...eth.data} />
          <WalletStateListElement {...erc20.data} />
        </div>
      </Card>
    </Layout>
  );
}
