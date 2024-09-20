import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import History from "@/components/History";

export default function Convertor() {
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
          <div className="flex flex-col gap-2">
            <Input placeholder="Enter Date" />
            <Input placeholder="Enter Timestamp" />
          </div>
        </CardContent>
      </Card>
      <History />
    </div>
  );
}
