import React from "react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { Button } from "../ui/button";
import { Wallet } from "lucide-react";

interface HeaderConnectProps {}

export const HeaderConnect: React.FC<HeaderConnectProps> = () => {
  const { setVisible } = useWalletModal();

  return (
    <Button
      onClick={() => setVisible(true)}
      className="flex items-center justify-start gap-2 bg-gradient-to-br from-violet-400 via-fuchsia-200 to-teal-100"
    >
      <Wallet />
      <span>Connect Wallet</span>
    </Button>
  );
};
