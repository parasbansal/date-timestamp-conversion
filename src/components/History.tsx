import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function History() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>History</CardTitle>
          <CardDescription>Shows the history of conversions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">History</div>
        </CardContent>
      </Card>
    </div>
  );
}
