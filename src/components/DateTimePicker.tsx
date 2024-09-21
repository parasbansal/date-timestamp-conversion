import { format } from "date-fns";
import { CalendarIcon } from "@radix-ui/react-icons";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";
import { addZero } from "@/utils/time";

export type Time = { hour: string; minute: string; second: string };

type Props = {
  date: Date;
  setDate: (date: Date) => void;
  time: Time;
  setTime: (time: Time) => void;
};

export default function DateTimePicker({
  date,
  setDate,
  time,
  setTime,
}: Props) {
  const handleDateSelect = (selected: unknown) => {
    if (selected instanceof Date) {
      setDate(selected);
    }
  };

  const handleTimeChange = (key: keyof Time, value: string) => {
    setTime({ ...time, [key]: value });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            `${format(date, "PPP")} ${time.hour}:${time.minute}:${time.second}`
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          initialFocus
        />

        <div className="flex flex-col items-center justify-center p-2">
          <div className="text-sm">Time</div>
          <div className="flex gap-2 items-center justify-center p-2">
            <Select
              value={time.hour}
              onValueChange={(value) => handleTimeChange("hour", value)}
            >
              <SelectTrigger className="w-14">
                <SelectValue placeholder="HH" />
              </SelectTrigger>
              <SelectContent className="w-14">
                {Array.from({ length: 24 }).map((_, index) => {
                  const value = addZero(index);
                  return (
                    <SelectItem value={value} key={index}>
                      {value}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            {":"}
            <Select
              value={time.minute}
              onValueChange={(value) => handleTimeChange("minute", value)}
            >
              <SelectTrigger className="w-14">
                <SelectValue placeholder="mm" />
              </SelectTrigger>
              <SelectContent className="w-14">
                {Array.from({ length: 60 }).map((_, index) => {
                  const value = addZero(index);
                  return (
                    <SelectItem value={value} key={index}>
                      {value}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            {":"}
            <Select
              value={time.second}
              onValueChange={(value) => handleTimeChange("second", value)}
            >
              <SelectTrigger className="w-14">
                <SelectValue placeholder="ss" />
              </SelectTrigger>
              <SelectContent className="w-14">
                {Array.from({ length: 60 }).map((_, index) => {
                  const value = addZero(index);
                  return (
                    <SelectItem value={value} key={index}>
                      {value}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
