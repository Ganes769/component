import { format, isSameDay } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateRange } from "react-day-picker";
interface DateProps {
  disableDates?: DateRange;
  date?: Date;
  onSelectDate: (date?: Date) => void;
}
export function DatePicker({ date, onSelectDate, disableDates }: DateProps) {
  const { to, from } = disableDates;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          disabled={(date) => date <= to && date >= from}
          mode="single"
          selected={date}
          onSelect={(date) => onSelectDate(date)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
