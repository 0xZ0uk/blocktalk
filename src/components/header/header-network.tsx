import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface HeaderNetworkProps {
  networks: {
    label: string;
    value: string;
    icon?: string;
    disabled?: boolean;
  }[];
}

export const HeaderNetwork: React.FC<HeaderNetworkProps> = ({ networks }) => {
  return (
    <Select defaultValue={networks[0]?.value}>
      <SelectTrigger defaultValue={networks[0]?.value} className="w-[180px]">
        <SelectValue placeholder="Select a network" />
      </SelectTrigger>
      <SelectContent>
        {networks.map((network) => (
          <SelectItem
            value={network.value}
            key={network.value}
            disabled={network.disabled}
          >
            <div className="flex items-center gap-2">
              <img
                src={network.icon}
                alt=""
                width={16}
                height={16}
                className="h-4 w-4 rounded-full"
              />
              {network.label}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
