import { Navigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { routerPaths } from '@/utils/router/router-paths';
import { type AppDispatch, useAppSelector } from '@/utils/store/store';
import { getErc20Data } from '@/utils/store/services/contracts/contracts.actions';
import { getEthData } from '@/utils/store/services/eth/eth.actions';
import { isValidEthereumAddress } from '@/utils/helpers/is-valid-ethereum-address';
import { CardLoader } from '@/components/layout/card-loader';
import { TransferForm } from '@/pages/transfer/transfer-form';

function ERC20DataProvider() {
  const { connectedAccountAddress } = useAppSelector((slice) => slice.wallet);
  const { status, data } = useAppSelector((slice) => slice.contract.erc20Data);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    void dispatch(getErc20Data({ address: connectedAccountAddress ?? '' }));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- call only once
  }, []);

  if (status.loading || !status.success) {
    return <CardLoader />;
  }

  return <TransferForm {...data} />;
}

function EthDataProvider() {
  const { connectedAccountAddress } = useAppSelector((slice) => slice.wallet);
  const { status, data } = useAppSelector((slice) => slice.eth.ethData);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    void dispatch(getEthData({ address: connectedAccountAddress ?? '' }));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- call only once
  }, []);

  if (status.loading || !status.success) {
    return <CardLoader />;
  }

  return <TransferForm {...data} />;
}

export function TransferPage() {
  const { tokenAddress } = useParams<{ tokenAddress: string }>();
  const isAddressValid =
    isValidEthereumAddress(tokenAddress ?? '') || tokenAddress === 'eth';

  if (!isAddressValid) {
    return <Navigate to={routerPaths.walletStatePage} />;
  }

  if (tokenAddress === 'eth') {
    return <EthDataProvider />;
  }

  return <ERC20DataProvider />;
}
