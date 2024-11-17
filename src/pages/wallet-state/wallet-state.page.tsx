import { t } from 'i18next';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/layout';
import { Card } from '@/components/card';
import { Popover } from '@/components/popover';
import { Button } from '@/components/button';
import { shortenEthereumAddress } from '@/utils/helpers/shorten-etherum-address';
import { CopyToClipboard } from '@/components/copy-to-clipboard';

const BALANCE_MOCK = [{ symbol: 'eth', balance: 200 }];

const MOCK_WALLET_ADDRESS = '0x73DAE75F3A3a1eFEB9B2e8901E16C89E7DcfC7BB';

export function WalletStatePage() {
  const navigate = useNavigate();

  const popoverContent = (
    <div className="w-[15rem] flex flex-col items-start justify-start gap-16">
      <div className="w-full flex flex-col items-start justify-start gap-2">
        <div>{t('walletStatePage.popover.connectWalletLabel')}</div>
        <CopyToClipboard
          displayValue={shortenEthereumAddress(MOCK_WALLET_ADDRESS)}
          copyValue={MOCK_WALLET_ADDRESS}
        />
      </div>
      <Button>{t('walletStatePage.popover.disconnectWallet')}</Button>
    </div>
  );

  return (
    <Layout>
      <Card className="w-full h-full flex flex-col items-start justify-start gap-10">
        <div className="w-full flex items-center justify-between">
          <div className="text-lg font-roboto">
            {t('walletStatePage.title')}
          </div>
          <Popover content={popoverContent}>
            <Button as="div">
              {shortenEthereumAddress(MOCK_WALLET_ADDRESS)}
            </Button>
          </Popover>
        </div>
        <div className="w-full flex flex-col items-start justify-start gap-4 max-h-40 overflow-y-auto">
          {BALANCE_MOCK.map(({ balance, symbol }) => (
            <div
              className="w-full flex items-center justify-between"
              key={crypto.randomUUID()}
            >
              <div>
                {balance} {symbol.toLocaleUpperCase()}
              </div>
              <Button
                onClick={() => {
                  navigate(`/transfer/${symbol}`);
                }}
                size="small"
              >
                Transfer
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </Layout>
  );
}
