"use client";

import React, { ChangeEvent, FormEvent } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { useWallet } from "@solana/wallet-adapter-react";

interface ChatInputProps {
  className?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  className,
  value,
  onChange,
  onSubmit,
}) => {
  const wallet = useWallet();

  return (
    <form
      onSubmit={onSubmit}
      className={cn("flex w-full items-center space-x-2", className)}
    >
      <Input
        className="w-full"
        placeholder={
          wallet.connected
            ? "Type your message here..."
            : "Connect your wallet to chat"
        }
        disabled={!wallet.connected}
        value={value}
        onChange={onChange}
      />
      <Button
        type="submit"
        size="icon"
        className="aspect-square"
        disabled={!wallet.connected}
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
};
