import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { DateRange } from "react-day-picker";

export interface DateRangeType{
from: Date;
to: Date;
}

interface DateProps {
  mode?: "range" | "single",
  disabledDates?: Date[];
  hiddenDates?: Date[];
  minDate?: Date;
  maxDate?:Date;
  maxMonth?: Date;
  maxYear?: number;
  minMonth?: Date;
  minYear?: number;
  disableNavigation?: boolean;
  numberOfMonths?: number;
  disableDatesByRange?: DateRangeType; 
  onChange?: (date?: Date | DateRange) => void;
}
export function DatePicker({mode="single", onChange, disabledDates,disableNavigation,maxMonth,maxYear,minDate,minMonth,minYear, maxDate,hiddenDates,numberOfMonths, disableDatesByRange }: DateProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const rangeProps = {
    mode: "range" as const,
    selected:  dateRange,
    onSelect: (date: DateRange | undefined)=> handleDateRange(date)
  }

  const singleProps = {
    mode:"single" as const,
    selected: date ,
    onSelect: (date: Date | undefined) => handleDateSelect(date)
  }

  const getProps = (mode: "range" | "single" | "default" | "multiple") => {
    const disabled = disabledDates? [...disabledDates] : []
    if(mode === "range"){
      if(disableDatesByRange?.from && disableDatesByRange?.to ){
        const disabledProp = {
          disabled: [ ...disabled, (date: Date) => date <= disableDatesByRange?.to && date >= disableDatesByRange?.from]
        }
       return {...rangeProps,...disabledProp }    
      }
      return rangeProps
    }else{
      if(disableDatesByRange?.from && disableDatesByRange?.to ){
        const disabledProp = {
          disabled: [...disabled , (date: Date) => date <= disableDatesByRange?.to && date >= disableDatesByRange?.from]
        }
       return {...singleProps,...disabledProp }    
      }
      return singleProps
    }
  }

  function handleDateSelect(newDate?: Date) {
    setDate(newDate);
    onChange && onChange(newDate)
  }

  function handleDateRange(range?: DateRange) {
    setDateRange(range);
    onChange && onChange(range)
  }

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
          disabled={disabledDates}
          fromDate={minDate}
          toDate={maxDate}
          fromMonth={minMonth}
          fromYear={minYear}
          toMonth={maxMonth}
          toYear={maxYear}
          disableNavigation={disableNavigation}
          hidden={hiddenDates}
          numberOfMonths={numberOfMonths? numberOfMonths : 1}
          {...getProps(mode)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
