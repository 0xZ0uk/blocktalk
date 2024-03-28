"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useChat } from "ai/react";
import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { ChatContainer, ChatInput } from "@/components/chat";
import { ChatMessage } from "@/components/chat/chat-message";
import { api } from "@/trpc/react";

export default function Chat() {
  const [currentChatID, _setCurrentChatID] = React.useState(uuidv4());
  const { publicKey } = useWallet();

  const { messages, isLoading, input, handleInputChange, handleSubmit } =
    useChat();

  const { refetch } = api.chat.getAll.useQuery({
    userId: publicKey?.toString() ?? "",
  });

  const sendMessages = api.chat.sendMessages.useMutation();

  useEffect(() => {
    if (messages && !isLoading && !!publicKey) {
      sendMessages.mutate({
        messages: messages.map((m) => ({
          ...m,
          createdAt: m.createdAt?.toString(),
        })),
        chatId: currentChatID,
        userId: publicKey.toString(),
      });
    }

    refetch();
  }, [messages, isLoading]);

  return (
    <ChatContainer className="p-4">
      <div>
        {messages.map((m) => (
          <ChatMessage key={m.id} message={m} />
        ))}
      </div>
      <ChatInput
        value={input}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    </ChatContainer>
  );
}
