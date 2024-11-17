import { isValidEthereumAddress } from '@/utils/helpers/is-valid-ethereum-address';

export function shortenEthereumAddress(address: string): string {
  if (!isValidEthereumAddress(address)) {
    throw new Error('Invalid Ethereum address');
  }
  return `${address.slice(0, 6)}...${address.slice(-5)}`;
}
