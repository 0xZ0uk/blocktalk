import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Copy, LogOut, Wallet } from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";
import { copyToClipboard } from "@/utils/common";
import { toast } from "sonner";

interface HeaderAvatarProps {
  publicKey: string;
}

export const HeaderAvatar: React.FC<HeaderAvatarProps> = ({ publicKey }) => {
  const { disconnect } = useWallet();

  const handleCopyPublicKey = async () => {
    await copyToClipboard(publicKey);
    toast("Wallet address copied to clipboard");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 text-sm text-muted-foreground"
        >
          <Wallet className="h-4 w-4" />
          {publicKey.substring(0, 4)}
          ...
          {publicKey.substring(publicKey.length - 4, publicKey.length)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="flex items-center justify-between">
          <div>
            {publicKey.substring(0, 4)}
            ...
            {publicKey.substring(publicKey.length - 4, publicKey.length)}
          </div>
          <Button size="icon" variant="outline" onClick={handleCopyPublicKey}>
            <Copy className="h-4 w-4" />
          </Button>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-500" onClick={() => disconnect()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
