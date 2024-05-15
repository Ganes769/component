import Icons from "./IconCollection.svg";
interface IconProps {
  name: string;
  size: number;
}
export default function Icon({ name, size }: IconProps) {
  return (
    <span>
      <svg className="inline-block align-middle" height={size} width={size}>
        <use xlinkHref={`${Icons}#icon-${name}`} />
      </svg>
    </span>
  );
}
