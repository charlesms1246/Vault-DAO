'use client';

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { formatAddress } from '@/lib/utils/formatters';
import { Tooltip } from '@/components/ui/Tooltip';

interface AddressDisplayProps {
  address: string;
  chars?: number;
  showCopy?: boolean;
  ens?: string;
}

export function AddressDisplay({ 
  address, 
  chars = 4, 
  showCopy = true,
  ens 
}: AddressDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-sm">
        {ens || formatAddress(address, chars)}
      </span>
      {showCopy && (
        <Tooltip content={copied ? 'Copied!' : 'Copy address'}>
          <button
            onClick={handleCopy}
            className="text-gray-400 hover:text-cyber-cyan transition-colors"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </Tooltip>
      )}
    </div>
  );
}