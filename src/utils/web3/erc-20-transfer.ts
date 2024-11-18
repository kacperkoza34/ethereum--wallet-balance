import { Contract } from 'ethers';
import { erc20Abi } from '@/utils/web3/erc-20-abi';
import { type ContractCallArguments } from '@/utils/types';

export interface Erc20TransferParams {
  recipient: string;
  amount: string;
}

export async function erc20Transfer({
  recipient,
  amount,
  contractAddress,
  signer,
}: ContractCallArguments & Erc20TransferParams) {
  const erc20 = new Contract(contractAddress, erc20Abi, signer);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- ...
  const tx = await erc20.transfer(recipient, amount);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access -- ...
  await tx.wait();
}
