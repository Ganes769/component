import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
interface SwitchProps {
  status: boolean;
  setChange: (check: boolean) => void;
}
export function SwitchDemo({ status, setChange }: SwitchProps) {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        defaultChecked={status}
        onCheckedChange={(check) => setChange(check)}
        id="airplane-mode"
      />
      <Label htmlFor="airplane-mode">
        Airplane Mode {`${status ? "on" : "off"}`}
      </Label>
    </div>
  );
}
