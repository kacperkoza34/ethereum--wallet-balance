import { formatUnits } from 'ethers';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/button';
import { type TokeData } from '@/utils/store/services/contracts/contracts.slice';

export function WalletStateListElement({
  balance = BigInt(0),
  decimals = BigInt(18),
  symbol,
  tokenType,
}: TokeData) {
  const navigate = useNavigate();
  const routerId = tokenType.type === 'erc20' ? tokenType.address : 'eth';
  return (
    <div className="w-full flex items-center justify-between">
      <div>
        {formatUnits(balance, decimals)} {symbol?.toLocaleUpperCase()}
      </div>
      <Button
        onClick={() => {
          navigate(`/transfer/${routerId}`);
        }}
        size="small"
      >
        Transfer
      </Button>
    </div>
  );
}
