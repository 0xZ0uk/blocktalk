"use client";

import { useRouter } from "next/navigation";
import { SidebarContainer } from "./sidebar/sidebar-container";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { Separator } from "./ui/separator";
import { SidebarSearch } from "./sidebar";
import { SidebarItem } from "./sidebar/siderbar-item";
import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

interface SidebarMainProps {
  chats: any[];
}

export const SidebarMain = ({ chats }: SidebarMainProps) => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const wallet = useWallet();

  return (
    <SidebarContainer>
      <div className="flex flex-col gap-4">
        <div className="p-4 pt-6">
          <h4 className="text-xl font-bold">BlockTalk</h4>
          <p className="italic text-muted-foreground">Talk to the blockchain</p>
        </div>
        <div className="flex w-full flex-col gap-4 px-4">
          {wallet.connected && (
            <>
              <Button
                variant="outline"
                className="flex w-full gap-2"
                onClick={() => router.push("/")}
              >
                <Plus className="h-4 w-4" />
                New Chat
              </Button>
              <Separator />
              <SidebarSearch
                value={search}
                onChange={(value) => setSearch(value)}
              />
            </>
          )}
          {chats?.map((chat) => {
            return (
              <SidebarItem
                key={chat.chatId}
                active={true}
                title={chat.chatId}
                icon="chat"
                onClick={() => router.push("/c/" + chat.chatId)}
              />
            );
          })}
        </div>
      </div>
    </SidebarContainer>
  );
};
