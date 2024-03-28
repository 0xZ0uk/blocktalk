"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface ChatContainerProps {
  className?: string;
  children: React.ReactElement | React.ReactElement[];
}

export const ChatContainer: React.FC<ChatContainerProps> = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "flex h-[calc(100vh-5rem)] w-full flex-col justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
};
