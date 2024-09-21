import { useHistoryStore } from "@/zustand/history";
import { XCircle } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function History() {
  const history = useHistoryStore((state) => state.history);
  const removeHistory = useHistoryStore((state) => state.removeHistory);

  return (
    <div className="max-w-80 w-full">
      <Card>
        <CardHeader>
          <CardTitle>History</CardTitle>
          <CardDescription>Shows the history of conversions</CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          <div className="flex flex-col gap-2 min-h-96 max-h-96 overflow-auto scroll1 px-6">
            {history.length ? (
              history.map((h) => (
                <div
                  key={h.id}
                  className="flex items-center justify-between pb-2 border-b last:border-b-0 gap-8"
                >
                  <div className="flex flex-col">
                    <div>{h.dateTime}</div>
                    <div>{h.timestamp}</div>
                  </div>
                  <button
                    onClick={() => removeHistory(h)}
                    className="text-red-500"
                  >
                    <XCircle size={16} />
                  </button>
                </div>
              ))
            ) : (
              <div className="flex-grow flex items-center justify-center text-muted-foreground">
                No history found
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
