"use client";

import { cn } from "@/lib/utils";
import { Message } from "ai";

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 rounded-md p-4",
        message.role === "assistant" ?? "bg-muted",
      )}
    >
      <p className="text-sm text-muted-foreground">
        {message.role === "user" ? "You" : "Blockchat"}
      </p>
      <p>{message.content}</p>
    </div>
  );
};
