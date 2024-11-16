import type { ReactElement, ReactPortal } from 'react';

type ReactText = string | number;
type ReactChild = ReactElement | ReactText;

type ReactNode = ReactChild | ReactPortal | boolean | null | undefined;
type ReactNodeArray = ReactNode[];
export type Children = ReactNode | ReactNodeArray;
