import { z } from 'zod';
import { t } from 'i18next';
import { ethers } from 'ethers';
import { isValidEthereumAddress } from '@/utils/helpers/is-valid-ethereum-address';

export const getTokenAmountSchema = (
  tokenDecimals: number,
  balanceInBaseUnit: bigint
) =>
  z
    .string()
    .refine(
      (amount) => {
        const valueAsNumber = Number(amount);
        return !Number.isNaN(valueAsNumber);
      },
      { message: t('transferPage.validationErrors.notANumber') }
    )
    .refine(
      (amount) => {
        return Number(amount) > 0;
      },
      { message: t('transferPage.validationErrors.notAPositiveNumber') }
    )
    .refine(
      (amount) => {
        const decimalPart = amount.toString().split('.')[1];
        if (!decimalPart) {
          return true;
        }
        if (decimalPart.length > tokenDecimals) {
          return false;
        }
        return true;
      },
      {
        message: t('transferPage.validationErrors.invalidDecimals', {
          decimals: tokenDecimals,
        }),
      }
    )
    .refine(
      (amount) => {
        try {
          const enoughFunds =
            ethers.parseUnits(amount, tokenDecimals) <= balanceInBaseUnit;
          return enoughFunds;
        } catch (error) {
          return false;
        }
      },
      { message: t('transferPage.validationErrors.insufficientFunds') }
    );

export const getTransferSchema = (
  decimals: number,
  balanceInBaseUnit: bigint
) =>
  z.object({
    recipient: z.string().refine(isValidEthereumAddress, {
      message: t('transferPage.validationErrors.invalidAddress'),
    }),
    amount: getTokenAmountSchema(decimals, balanceInBaseUnit),
  });
