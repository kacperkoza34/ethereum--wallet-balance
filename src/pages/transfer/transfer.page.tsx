import { t } from 'i18next';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type z } from 'zod';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/card';
import { Layout } from '@/components/layout/layout';
import { Input } from '@/components/input';
import { Button } from '@/components/button';
import { getTransferSchema } from '@/pages/transfer/transfer.service';
import { routerPaths } from '@/utils/router/router-paths';

const TOKEN_BALANCE = {
  symbol: 'ETH',
  amount: 29.3333333333,
};

const DECIMALS = 18;

export function TransferPage() {
  const navigate = useNavigate();

  const validationSchema = getTransferSchema(
    DECIMALS,
    ethers.parseUnits(TOKEN_BALANCE.amount.toString(), DECIMALS)
  );

  const methods = useForm<z.infer<typeof validationSchema>>({
    defaultValues: {
      receiver: '',
      amount: '',
    },
    resolver: zodResolver(validationSchema),
  });

  return (
    <Layout maxHeight="36rem">
      <Card className="w-full h-full flex flex-col items-start justify-start gap-6">
        <div>{t('transferPage.title')}</div>

        <div className="w-full flex items-start justify-start gap-4">
          <div className="text-sm">
            {t('transferPage.balance')} {TOKEN_BALANCE.amount}{' '}
            {TOKEN_BALANCE.symbol}
          </div>
        </div>
        <FormProvider {...methods}>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              void methods.handleSubmit(
                (data) => {
                  // eslint-disable-next-line no-console -- test
                  console.log(data);
                },
                (e) => {
                  // eslint-disable-next-line no-console -- test
                  console.log(e);
                }
              )(event);
            }}
            className="w-full flex flex-col gap-4"
          >
            <Input label="Receiver" name="receiver" />
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
