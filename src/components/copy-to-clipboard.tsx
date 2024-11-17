import { useState } from 'react';
import copy from 'copy-to-clipboard';
import { Button } from '@/components/button';

interface CopyToClipboardProps {
  displayValue: string;
  copyValue: string;
}

export function CopyToClipboard({
  displayValue,
  copyValue,
}: CopyToClipboardProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    copy(copyValue);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">{displayValue}</span>
      <Button
        size="small"
        onClick={handleCopy}
        aria-label="Copy to clipboard"
        type="button"
      >
        {isCopied ? 'Copied!' : 'Copy'}
      </Button>
    </div>
  );
}
