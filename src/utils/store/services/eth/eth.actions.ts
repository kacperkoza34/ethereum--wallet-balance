/* eslint-disable @typescript-eslint/no-explicit-any -- ...*/
/* eslint-disable @typescript-eslint/no-unsafe-member-access -- ...*/
/* eslint-disable @typescript-eslint/no-unsafe-call -- ...*/
import { createAsyncThunk } from '@reduxjs/toolkit';
import { type RootState } from '@/utils/store/store';
import { type TokeData } from '@/utils/store/services/contracts/contracts.slice';
import { type Erc20TransferParams } from '@/utils/web3/erc-20-transfer';
import { getSigner } from '@/utils/store/services/wallet/wallet.actions';

export const BALANCE_OF_ACTION_NAME = 'eth/getBalanceEth';

export const getEthData = createAsyncThunk<
  TokeData,
  { address: string },
  { state: RootState }
>(BALANCE_OF_ACTION_NAME, async ({ address }) => {
  const balance = (await (window as any).ethereum.request({
    method: 'eth_getBalance',
    params: [address, 'latest'],
  })) as string;

  return {
    balance: BigInt(parseInt(balance, 16)),
    decimals: BigInt(18),
    symbol: 'eth',
    tokenType: {
      type: 'eth',
    },
  };
});

export const TRANSFER_OF_ACTION_NAME = 'eth/transfer';

export const transferEth = createAsyncThunk<
  unknown,
  Erc20TransferParams,
  { state: RootState }
>(TRANSFER_OF_ACTION_NAME, async ({ amount, recipient }) => {
  const signer = getSigner();

  const tx = await signer?.sendTransaction({
    to: recipient,
    value: amount,
  });

  await tx?.wait();
});
