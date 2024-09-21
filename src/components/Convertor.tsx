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

type Direction = "dateToTimestamp" | "timestampToDate";

export default function Convertor() {
  const history = useHistoryStore((state) => state.history);

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

  const handleTimeChange = (newTime: Time) => {
    console.log(newTime);
    setTime(newTime);
  };

  const handleConvert = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Converting", direction);
    if (direction === "dateToTimestamp") {
      // Check if date is valid
      if (!date) {
        setDateTimeError("Datetime is required");
        return;
      }

      const parsedDate = new Date(date);

      if (isNaN(parsedDate.getTime())) {
        setDateTimeError("Invalid Date");
        return;
      }

      const timestamp = parsedDate.getTime();

      const convertedTimestamp = Math.floor(timestamp / 1000);

      setTimestamp(convertedTimestamp.toString());
      // addHistory({ dateTime, timestamp });
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
        console.log("Removing digits");
        // Remove all digits after present digit
        sanitizedTimestamp = Math.floor(
          sanitizedTimestamp /
            Math.pow(10, timestamp.length - todayTimestampLength)
        );
      }
      console.log("Sanitized Timestamp", sanitizedTimestamp);
      const date = new Date(sanitizedTimestamp * 1000);
      let dateFormatted = date.toDateString();
      // Remove day from the dateTime
      dateFormatted = dateFormatted.slice(4);

      const dateTime = dateFormatted + " " + date.toLocaleTimeString();

      setTimestamp(sanitizedTimestamp.toString());
      setDate(new Date(dateTime));
      // addHistory({ dateTime, timestamp: parseInt(timestamp) });
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
                setDate={(date) => setDate(date)}
                time={time}
                setTime={handleTimeChange}
              />
              {/* <Input
                placeholder={`Datetime ${FORMAT}`}
                value={dateTime}
                id="dateTime"
                name="dateTime"
                onChange={handleChange}
              /> */}
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
      {history.length > 0 && <History />}
    </div>
  );
}
