'use client';

import React, { useEffect, useState } from 'react';
import { ConnectButton as RainbowConnectButton } from '@rainbow-me/rainbowkit';
import { Button } from '@/components/ui/Button';
import { Wallet } from 'lucide-react';

export function ConnectButton() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" disabled>
        <Wallet className="w-4 h-4 mr-2" />
        Connect Wallet
      </Button>
    );
  }

  return (
    <RainbowConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted: rainbowMounted,
      }) => {
        const ready = rainbowMounted;
        const connected = ready && account && chain;

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    onClick={openConnectModal}
                    icon={<Wallet className="w-4 h-4" />}
                  >
                    Connect Wallet
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button onClick={openChainModal} variant="danger">
                    Wrong Network
                  </Button>
                );
              }

              return (
                <div className="flex gap-2">
                  <Button
                    onClick={openChainModal}
                    variant="ghost"
                    size="sm"
                  >
                    {chain.hasIcon && chain.iconUrl && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 16,
                          height: 16,
                          borderRadius: 999,
                          overflow: 'hidden',
                          marginRight: 4,
                        }}
                      >
                        <img
                          alt={chain.name ?? 'Chain icon'}
                          src={chain.iconUrl}
                          style={{ width: 16, height: 16 }}
                        />
                      </div>
                    )}
                    {chain.name}
                  </Button>

                  <Button
                    onClick={openAccountModal}
                    variant="secondary"
                    size="sm"
                  >
                    {account.displayName}
                  </Button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </RainbowConnectButton.Custom>
  );
}