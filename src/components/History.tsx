import { useHistoryStore } from "@/zustand/history";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function History() {
  const history = useHistoryStore((state) => state.history);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>History</CardTitle>
          <CardDescription>Shows the history of conversions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            {history.length ? (
              history.map((h) => (
                <div key={h.id} className="flex justify-between">
                  <div>{h.dateTime}</div>
                  <div>{h.timestamp}</div>
                </div>
              ))
            ) : (
              <div className="text-center">No history found</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
