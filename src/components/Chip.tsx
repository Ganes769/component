import { ReactNode } from "react";

interface ChipProps {
  type: string;
  children: ReactNode;
}

export default function Chip({ type, children }: ChipProps) {
  const getChipClass = (type: string) => {
    switch (type) {
      case "active":
        return "bg-[#E9F9F0] rounded-md  px-2 py-[3px] text-[#33B469]";
      case "tag":
        return " rounded-md px-sm py-sm text-[#8C94A0]";
      default:
        return "rounded-md text-black";
    }
  };
  getChipClass(type);
  return <span className={getChipClass(type)}> {children}</span>;
}
