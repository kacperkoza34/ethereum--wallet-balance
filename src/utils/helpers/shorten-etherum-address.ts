export function shortenEthereumAddress(address: string): string {
  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    throw new Error('Invalid Ethereum address');
  }
  return `${address.slice(0, 6)}...${address.slice(-5)}`;
}
