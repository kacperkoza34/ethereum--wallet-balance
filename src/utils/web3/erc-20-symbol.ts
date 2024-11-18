import { Contract } from 'ethers';
import { erc20Abi } from '@/utils/web3/erc-20-abi';
import { type ContractCallArguments } from '@/utils/types';

export async function erc20Symbol({
  contractAddress,
  signer,
}: ContractCallArguments) {
  const erc20 = new Contract(contractAddress, erc20Abi, signer);
  const balance = (await erc20.getFunction('symbol')()) as Promise<string>;

  return balance;
}
