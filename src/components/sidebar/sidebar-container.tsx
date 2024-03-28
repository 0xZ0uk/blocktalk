import React from "react";
import { SidebarPrimary } from "./sidebar-primary";

interface SidebarContainerProps {
  children: string | React.ReactElement | React.ReactElement[];
}

export const SidebarContainer: React.FC<SidebarContainerProps> = ({
  children,
}) => {
  return (
    <div className="flex h-screen w-full basis-2/6 bg-background">
      <SidebarPrimary />
      <div className="h-screen w-full basis-3/4 border-r">{children}</div>
    </div>
  );
};
