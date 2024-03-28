import { cn } from "@/lib/utils";
import React from "react";

interface SidebarGroupProps {
  label: string;
  children: React.ReactElement | React.ReactElement[];
  className?: string;
}

export const SidebarGroup: React.FC<SidebarGroupProps> = ({
  label,
  children,
  className,
}) => {
  return (
    <div className={cn("w-full", className)}>
      <h5 className="text-sm font-semibold text-muted-foreground">{label}</h5>
      <div className="mt-2 flex w-full flex-col gap-1">{children}</div>
    </div>
  );
};
