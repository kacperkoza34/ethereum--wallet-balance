import { t } from 'i18next';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type z } from 'zod';
import { formatUnits, parseUnits } from 'ethers';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Card } from '@/components/card';
import { Layout } from '@/components/layout/layout';
import { Input } from '@/components/input';
import { Button } from '@/components/button';
import { getTransferSchema } from '@/pages/transfer/transfer.service';
import { routerPaths } from '@/utils/router/router-paths';
import { type TokeData } from '@/utils/store/services/contracts/contracts.slice';
import { transferErc20Token } from '@/utils/store/services/contracts/contracts.actions';
import { useAppSelector, type AppDispatch } from '@/utils/store/store';
import { CardLoader } from '@/components/layout/card-loader';
import { transferEth } from '@/utils/store/services/eth/eth.actions';

export function TransferForm({
  balance = BigInt(0),
  decimals = BigInt(18),
  symbol,
  tokenType,
}: TokeData) {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { status: erc20Status } = useAppSelector(
    (slice) => slice.contract.erc20Transfer
  );
  const { status: ethTransferStatus } = useAppSelector(
    (slice) => slice.eth.ethTransfer
  );

  const transferStatus =
    tokenType.type === 'erc20' ? erc20Status : ethTransferStatus;

  const validationSchema = getTransferSchema(
    Number(decimals.toString()),
    balance
  );

  const methods = useForm<z.infer<typeof validationSchema>>({
    defaultValues: {
      recipient: '',
      amount: '',
    },
    resolver: zodResolver(validationSchema),
  });

  const handleSubmit = (data: z.infer<typeof validationSchema>) => {
    const formattedData = {
      amount: parseUnits(data.amount, decimals).toString(),
      recipient: data.recipient,
    };

    if (tokenType.type === 'erc20') {
      void dispatch(transferErc20Token(formattedData));
    } else {
      void dispatch(transferEth(formattedData));
    }
  };

  if (transferStatus.success) {
    return (
      <Layout>
        <Card className="w-full h-full flex flex-col items-center justify-start md:justify-center gap-10">
          <div className="text-lg font-roboto">
            {t('transferPage.successTitle')}
          </div>
          <Button
            onClick={() => {
              navigate(routerPaths.walletStatePage);
            }}
          >
            {t('transferPage.backToWallet')}
          </Button>
        </Card>
      </Layout>
    );
  }

  if (transferStatus.loading) {
    return <CardLoader />;
  }

  return (
    <Layout maxHeight="36rem">
      <Card className="w-full h-full flex flex-col items-start justify-start gap-6">
        <div>{t('transferPage.title')}</div>

        <div className="w-full flex items-start justify-start gap-4">
          <div className="text-sm">
            {t('transferPage.balance')}{' '}
            {formatUnits(balance, Number(decimals.toString()))}{' '}
            {symbol?.toLocaleUpperCase()}
          </div>
        </div>
        <FormProvider {...methods}>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              void methods.handleSubmit(handleSubmit)(event);
            }}
            className="w-full flex flex-col gap-4"
          >
            <Input label="Recipient" name="recipient" />
            <Input label="Amount" name="amount" />
            <Button type="submit">{t('transferPage.transferBtn')}</Button>
            <Button
              onClick={() => {
                navigate(routerPaths.walletStatePage);
              }}
            >
              {t('transferPage.backToWallet')}
            </Button>
          </form>
        </FormProvider>
      </Card>
    </Layout>
  );
}
