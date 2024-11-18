import { createAsyncThunk } from '@reduxjs/toolkit';
import { getSigner } from '@/utils/store/services/wallet/wallet.actions';
import { type RootState } from '@/utils/store/store';
import { erc20BalanceOf } from '@/utils/web3/erc-20-balance-of';
import { erc20Decimals } from '@/utils/web3/erc-20-decimals';
import { erc20Symbol } from '@/utils/web3/erc-20-symbol';
import { type TokeData } from '@/utils/store/services/contracts/contracts.slice';

export const BALANCE_OF_ACTION_NAME = 'contracts/getBalance';

export const getErc20Data = createAsyncThunk<
  TokeData,
  { address: string },
  { state: RootState }
>(BALANCE_OF_ACTION_NAME, async ({ address }) => {
  const signer = getSigner();
  const contractAddress = import.meta.env.VITE_ERC_20_ADDRESS as string;

  const [balance, decimals, symbol] = await Promise.all([
    erc20BalanceOf({
      address,
      signer,
      contractAddress,
    }),
    erc20Decimals({
      signer,
      contractAddress,
    }),
    erc20Symbol({
      signer,
      contractAddress,
    }),
  ]);

  return {
    balance,
    decimals,
    symbol,
    tokenType: { address: contractAddress, type: 'erc20' },
  };
});
