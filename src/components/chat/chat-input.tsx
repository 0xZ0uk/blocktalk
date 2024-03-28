"use client";

import React, { ChangeEvent, FormEvent } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

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
  return (
    <form
      onSubmit={onSubmit}
      className={cn("flex w-full items-center space-x-2", className)}
    >
      <Input
        className="w-full"
        placeholder="Type your message here..."
        value={value}
        onChange={onChange}
      />
      <Button
        type="submit"
        variant="outline"
        size="icon"
        className="aspect-square"
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
};
