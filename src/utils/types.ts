import type { ReactElement, ReactPortal } from 'react';
import type { JsonRpcSigner } from 'ethers';

type ReactText = string | number;
type ReactChild = ReactElement | ReactText;

type ReactNode = ReactChild | ReactPortal | boolean | null | undefined;
type ReactNodeArray = ReactNode[];
export type Children = ReactNode | ReactNodeArray;

export interface ContractCallArguments {
  contractAddress: string;
  signer?: JsonRpcSigner;
}
