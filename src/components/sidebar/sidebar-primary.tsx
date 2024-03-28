import { AudioLines, BotMessageSquare, Cog, MessageSquare } from "lucide-react";
import React from "react";
import { ThemeToggle } from "../theme/theme-toggle";
import { Separator } from "../ui/separator";
import { SidebarGroup } from ".";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface SidebarPrimaryProps {}

const nav = {
  primary: [
    {
      path: "/",
      label: "Chat",
      icon: <MessageSquare />,
    },
    {
      path: "/voice",
      label: "Voice",
      icon: <AudioLines />,
    },
  ],
  secondary: [
    {
      path: "/settings",
      label: "Settings",
      icon: <Cog />,
    },
  ],
};

export const SidebarPrimary: React.FC<SidebarPrimaryProps> = ({}) => {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <div className="flex h-screen w-full basis-1/4 flex-col items-center justify-between border-r py-6">
      <div className="flex w-full flex-col items-center justify-start gap-6">
        <div className="w-fit rounded-full bg-gradient-to-br from-violet-400 via-fuchsia-200 to-teal-100 p-4 text-violet-950">
          <BotMessageSquare className="h-8 w-8" />
        </div>
        <div className="w-full px-4">
          <Separator className="bg-muted-foreground" />
        </div>
        <SidebarGroup
          label="MAIN"
          className="flex w-full flex-col items-center justify-start gap-3 text-center"
        >
          <>
            {nav.primary.map(({ path, icon, label }) => (
              <div
                key={path}
                className={cn(
                  "w-full",
                  isActive(path)
                    ? "border-l-4 border-violet-400"
                    : "text-muted-foreground",
                )}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => router.push(path)}
                      >
                        {icon}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{label}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            ))}
          </>
        </SidebarGroup>
        <SidebarGroup
          label="OTHER"
          className="flex w-full flex-col items-center justify-start gap-3 text-center"
        >
          <>
            {nav.secondary.map(({ path, icon, label }) => (
              <div
                key={path}
                className={cn(
                  "w-full",
                  isActive(path)
                    ? "border-l-4 border-violet-400"
                    : "text-muted-foreground",
                )}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => router.push(path)}
                      >
                        {icon}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{label}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            ))}
          </>
        </SidebarGroup>
      </div>
      <ThemeToggle />
    </div>
  );
};
