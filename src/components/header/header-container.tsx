"use client";

import React from "react";
import { useWallet } from "@solana/wallet-adapter-react";

import { HeaderNetwork } from "./header-network";
import { HeaderConnect } from "./header-connect";
import { HeaderAvatar } from "./header-avatar";

interface HeaderContainerProps {}

export const HeaderContainer: React.FC<HeaderContainerProps> = () => {
  const { publicKey } = useWallet();

  return (
    <header className="flex h-20 w-full items-center justify-between border-b px-4">
      <div></div>
      <div className="flex gap-4">
        <HeaderNetwork
          networks={[
            {
              label: "Solana",
              value: "solana",
              icon: "https://cryptologos.cc/logos/solana-sol-logo.svg",
            },
            {
              label: "Base",
              value: "basechain",
              icon: "https://raw.githubusercontent.com/base-org/brand-kit/main/logo/symbol/Base_Symbol_Blue.svg",
              disabled: true,
            },
          ]}
        />
        {!!publicKey ? (
          <HeaderAvatar publicKey={publicKey.toString()} />
        ) : (
          <HeaderConnect />
        )}
      </div>
    </header>
  );
};
