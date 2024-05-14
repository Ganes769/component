interface ChipProps {
  name: string;
}

export default function Chip({ name }: ChipProps) {
  const getChipClass = (name: string) => {
    switch (name) {
      case "active":
        return "bg-[#E9F9F0] rounded-md  px-md py-sm text-[#33B469]";
      case "deactive":
        return "bg-[#ECEDEF] rounded-md px-md py-sm text-[#8C94A0]";
      default:
        return "rounded-md text-black";
    }
  };
  getChipClass(name);
  return <span className={getChipClass(name)}> {name}</span>;
}
