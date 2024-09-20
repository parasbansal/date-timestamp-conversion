import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Convertor() {
  return (
    <div className="flex flex-grow items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Convertor</CardTitle>
          <CardDescription>
            Converts Date to Timestamp and Timestamp to Date
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <Input placeholder="Enter Date or Timestamp" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
