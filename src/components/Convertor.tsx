import { useState } from "react";
import { ArrowUpIcon } from "@radix-ui/react-icons";

import { useHistoryStore } from "@/zustand/history";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import History from "@/components/History";
import DateTimePicker, { type Time } from "@/components/DateTimePicker";

import { addZero } from "@/utils/time";

type Direction = "dateToTimestamp" | "timestampToDate";

export default function Convertor() {
  const addHistory = useHistoryStore((state) => state.addHistory);

  const [date, setDate] = useState<Date>(new Date());
  const [dateTimeError, setDateTimeError] = useState<string | null>(null);
  const [time, setTime] = useState<Time>({
    hour: "00",
    minute: "00",
    second: "00",
  });
  const [timestamp, setTimestamp] = useState<string>("");
  const [timestampError, setTimestampError] = useState<string | null>(null);
  const [direction, setDirection] = useState<Direction>("dateToTimestamp");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "timestamp") {
      setTimestamp(value);
      setDirection("timestampToDate");
    }
  };

  const handleDateSelect = (newDate: Date) => {
    setDate(newDate);
    setDirection("dateToTimestamp");
  };

  const handleTimeChange = (newTime: Time) => {
    setTime(newTime);
    setDirection("dateToTimestamp");
  };

  const handleConvert = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (direction === "dateToTimestamp") {
      if (isNaN(date.getTime())) {
        setDateTimeError("Invalid Date");
        return;
      }
      const fullDate =
        date.toDateString() + ` ${time.hour}:${time.minute}:${time.second}`;

      const timestamp = new Date(fullDate).getTime();

      const convertedTimestamp = Math.floor(timestamp / 1000);

      setTimestamp(convertedTimestamp.toString());

      addHistory({
        id: Date.now(),
        dateTime: fullDate,
        timestamp: convertedTimestamp,
      });
    } else if (direction === "timestampToDate") {
      if (!timestamp) {
        setTimestampError("Timestamp is required");
        return;
      }
      if (isNaN(parseInt(timestamp))) {
        setTimestampError("Timestamp must be a number");
        return;
      }
      if (parseInt(timestamp) < 0) {
        setTimestampError("Timestamp must be a positive number");
        return;
      }
      let sanitizedTimestamp = parseInt(timestamp);
      const todayTimestamp = new Date().getTime();
      const todayTimestampLength = todayTimestamp.toString().length - 3;
      if (timestamp.length > todayTimestampLength) {
        // Remove all digits after present digit
        sanitizedTimestamp = Math.floor(
          sanitizedTimestamp /
            Math.pow(10, timestamp.length - todayTimestampLength)
        );
      }
      const date = new Date(sanitizedTimestamp * 1000);
      let dateFormatted = date.toDateString();
      // Remove day from the dateTime
      dateFormatted = dateFormatted.slice(4);

      const dateTime = dateFormatted + " " + date.toLocaleTimeString();

      setTimestamp(sanitizedTimestamp.toString());
      setDate(new Date(dateTime));
      setTime({
        hour: addZero(date.getHours()),
        minute: addZero(date.getMinutes()),
        second: addZero(date.getSeconds()),
      });

      addHistory({
        id: Date.now(),
        dateTime:
          new Date(dateTime).toDateString() + " " + date.toLocaleTimeString(),
        timestamp: sanitizedTimestamp,
      });
    }

    setTimestampError(null);
    setDateTimeError(null);
  };

  return (
    <div className="flex flex-grow items-center justify-center gap-2">
      <Card>
        <CardHeader>
          <CardTitle>Convertor</CardTitle>
          <CardDescription>
            Converts Date to Timestamp and Timestamp to Date
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleConvert}
            className="flex flex-col gap-2 items-center"
          >
            <div className="w-full flex flex-col gap-1">
              <Label htmlFor="dateTime">Datetime</Label>
              <DateTimePicker
                date={new Date(date)}
                setDate={handleDateSelect}
                time={time}
                setTime={handleTimeChange}
              />
              {direction === "dateToTimestamp" && dateTimeError && (
                <div className="text-red-500 text-sm">{dateTimeError}</div>
              )}
            </div>
            <ArrowUpIcon
              className="transition-transform size-5"
              style={{
                transform: `rotate(${
                  direction === "dateToTimestamp" ? "180" : "0"
                }deg)`,
              }}
            />
            <div className="w-full flex flex-col gap-1">
              <Label htmlFor="timestamp">Timestamp (in seconds)</Label>
              <Input
                type="tel"
                placeholder="Enter Timestamp"
                value={timestamp}
                id="timestamp"
                name="timestamp"
                onChange={handleChange}
              />
              {direction === "timestampToDate" && timestampError && (
                <div className="text-red-500 text-sm">{timestampError}</div>
              )}
            </div>
            <Button variant={"secondary"} type="submit" className="mt-2">
              Convert
            </Button>
          </form>
        </CardContent>
      </Card>
      <History />
    </div>
  );
}
