interface ChipProps {
  status: string;
}

export default function Chip({ status }: ChipProps) {
  const getChipClass = (status: string) => {
    switch (status) {
      case "active":
        return "bg-[#E9F9F0] rounded-md  px-2 py-[3px] text-[#33B469]";
      case "deactive":
        return "bg-[#ECEDEF] rounded-md px-sm py-sm text-[#8C94A0]";
      default:
        return "rounded-md text-black";
    }
  };
  getChipClass(status);
  return <span className={getChipClass(status)}> {status}</span>;
}
