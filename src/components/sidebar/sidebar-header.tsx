import { BotMessageSquare } from "lucide-react";
import React from "react";

interface SidebarHeaderProps {}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({}) => {
  return (
    <div className="flex w-full cursor-pointer items-center justify-start gap-2 p-4">
      <p className="text-2xl font-extrabold">BlockChat</p>
      <BotMessageSquare className="h-8 w-8" />
    </div>
  );
};
