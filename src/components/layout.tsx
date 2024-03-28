"use client";

import React from "react";
import { SidebarMain } from "./sidebar-main";
import { HeaderContainer } from "./header/header-container";
import { api } from "@/trpc/react";
import { useWallet } from "@solana/wallet-adapter-react";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { publicKey } = useWallet();

  const { data: chats } = api.chat.getAll.useQuery({
    userId: publicKey?.toString() ?? "",
  });

  return (
    <main className="flex min-h-screen w-full items-start justify-start bg-background text-foreground">
      <SidebarMain chats={chats ?? []} />
      <div className="w-full basis-4/6 flex-col">
        <HeaderContainer />
        {children}
      </div>
    </main>
  );
};
