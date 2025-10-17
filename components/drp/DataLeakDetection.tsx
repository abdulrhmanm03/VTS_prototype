"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface DataLeak {
  source: string;
  item: string;
  risk: string;
  date: string;
  severity: string;
  description: string;
  affectedUsers?: string[];
  history?: { date: string; action: string }[];
}

export default function DataLeakDetection() {
  const [leaks, setLeaks] = useState<DataLeak[]>([
    {
      source: "Pastebin",
      item: "employee_logins.csv",
      risk: "High",
      severity: "High",
      date: "2024-02-01",
      description:
        "A file containing employee login credentials has been posted publicly on Pastebin. Immediate action is recommended.",
      affectedUsers: ["john.doe@example.com", "jane.smith@example.com"],
      history: [{ date: "2024-02-01", action: "Detected" }],
    },
    {
      source: "Dark Web Forum",
      item: "confidential_docs.zip",
      risk: "Critical",
      severity: "Critical",
      date: "2024-01-29",
      description:
        "Confidential company documents have been found on a dark web forum. May contain sensitive project and client information.",
      affectedUsers: ["Project Team A", "Project Team B"],
      history: [{ date: "2024-01-29", action: "Detected" }],
    },
  ]);

  const [activeDialog, setActiveDialog] = useState<number | null>(null);

  const handleRemediate = (index: number) => {
    const updated = [...leaks];
    updated[index].history?.push({
      date: new Date().toISOString().split("T")[0],
      action: "Remediated",
    });
    updated[index].risk = "Remediated";
    setLeaks(updated);
    // Modal stays open so user can see the updated status
  };

  return (
    <div className="space-y-6 mt-6">
      <h2 className="text-2xl font-bold">Data Leak Detection</h2>
      <p className="text-sm text-gray-400">
        Monitor for leaked credentials, emails, or documents
      </p>

      {leaks.map((d, i) => (
        <Card
          key={i}
          className="bg-white/5 border-none rounded-2xl backdrop-blur-md shadow-lg hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-shadow duration-300"
        >
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-red-500 text-white">{d.source}</Badge>
                <span className="font-medium">{d.item}</span>
                <Badge className={`bg-red-700 text-white`}>{d.risk} Risk</Badge>
                <Badge className="bg-yellow-500 text-white">{d.severity}</Badge>
              </div>
              <p className="text-sm text-gray-400">Detected: {d.date}</p>
            </div>
            <Button
              size="sm"
              className="bg-red-500 hover:bg-red-600"
              onClick={() => setActiveDialog(i)}
            >
              Remediate
            </Button>
          </CardContent>
        </Card>
      ))}

      {activeDialog !== null && (
        <Dialog open={true} onOpenChange={() => setActiveDialog(null)}>
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle>Remediate {leaks[activeDialog].item}</DialogTitle>
            </DialogHeader>
            <div className="mt-2 text-gray-300">
              <p className="mb-2">{leaks[activeDialog].description}</p>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Source:</p>
                  <p className="text-white">{leaks[activeDialog].source}</p>
                </div>
                <div>
                  <p className="text-gray-400">Severity:</p>
                  <p className="text-white">{leaks[activeDialog].severity}</p>
                </div>
                <div>
                  <p className="text-gray-400">Detected:</p>
                  <p className="text-white">{leaks[activeDialog].date}</p>
                </div>
                <div>
                  <p className="text-gray-400">Affected Users/Teams:</p>
                  <p className="text-white">
                    {leaks[activeDialog].affectedUsers?.join(", ")}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-gray-400 mb-1">Action History:</p>
                <ul className="space-y-1 text-gray-300 text-sm">
                  {leaks[activeDialog].history?.map((h, idx) => (
                    <li key={idx}>
                      <span className="font-semibold">{h.date}</span>:{" "}
                      {h.action}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <DialogFooter className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setActiveDialog(null)}>
                Close
              </Button>
              <Button
                className="bg-red-500 hover:bg-red-600"
                onClick={() => handleRemediate(activeDialog)}
              >
                Mark as Remediated
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
