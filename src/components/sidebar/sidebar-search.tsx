import React from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

interface SidebarSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export const SidebarSearch: React.FC<SidebarSearchProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="flex items-center gap-2 rounded-md border px-4 py-2">
      <Search className="text-muted-foreground" />
      <Input
        className="h-fit rounded-none border-none bg-transparent p-0 outline-none focus-visible:ring-0"
        placeholder="Search for a chat..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
