"use client";

import React, { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { env } from "@/env";

require("@solana/wallet-adapter-react-ui/styles.css");

interface SolanaProvider {
  children: React.ReactElement | React.ReactElement[];
}

export const SolanaProvider: React.FC<SolanaProvider> = ({ children }) => {
  const wallets = useMemo(() => [], []);

  return (
    <ConnectionProvider endpoint={env.NEXT_PUBLIC_RPC_URL}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
