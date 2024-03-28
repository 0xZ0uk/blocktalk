"use client";

import { BotMessageSquare, Ellipsis } from "lucide-react";
import React from "react";

interface SidebarItemProps {
  title: string;
  icon: string;
  active: boolean;
  onClick: () => void;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  title,
  icon,
  active,
  onClick,
}) => {
  return (
    <div
      className="flex w-full cursor-pointer items-center justify-between overflow-hidden rounded-md border p-4"
      onClick={onClick}
    >
      <div className="flex w-full items-center gap-4">
        <div className="w-fit rounded-full bg-gradient-to-br from-violet-400 via-fuchsia-200 to-teal-100 p-3 text-violet-950">
          <BotMessageSquare className="h-6 w-6" />
        </div>
        <div className="w-full">
          <h4 className="text-lg font-bold">
            {title.substring(0, 15).concat(title.length > 15 ? "..." : "")}
          </h4>
        </div>
      </div>
      <div>
        <Ellipsis className="text-muted-foreground" />
      </div>
    </div>
  );
};
