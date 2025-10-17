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

interface ExecutiveThreat {
  name: string;
  platform: string;
  risk: string;
  severity: string;
  date: string;
  action: string;
  description: string;
  source?: string;
  history?: { date: string; action: string }[];
}

export default function ExecutiveProtection() {
  const [threats, setThreats] = useState<ExecutiveThreat[]>([
    {
      name: "John Doe",
      platform: "LinkedIn",
      risk: "Impersonation Detected",
      severity: "High",
      date: "2024-02-03",
      action: "Pending Review",
      description:
        "A profile mimicking John Doe has been detected on LinkedIn. This may be used for fraudulent activity or phishing attempts targeting company employees or clients.",
      source: "LinkedIn",
      history: [
        { date: "2024-02-03", action: "Detected" },
        { date: "2024-02-03", action: "Pending Review" },
      ],
    },
    {
      name: "Jane Smith",
      platform: "Twitter",
      risk: "Targeted Harassment",
      severity: "Critical",
      date: "2024-01-30",
      action: "Escalated",
      description:
        "Jane Smith has been targeted with harassment on Twitter. The accounts are impersonating her and posting threatening content.",
      source: "Twitter",
      history: [
        { date: "2024-01-30", action: "Detected" },
        { date: "2024-01-30", action: "Escalated" },
      ],
    },
  ]);

  const [activeDialog, setActiveDialog] = useState<number | null>(null);

  const handleEscalate = (index: number) => {
    const updated = [...threats];
    updated[index].action = "Escalated";
    updated[index].history?.push({
      date: new Date().toISOString().split("T")[0],
      action: "Escalated",
    });
    setThreats(updated);
    // don't close the modal, let the user see the update
  };

  return (
    <div className="space-y-6 mt-6">
      <h2 className="text-2xl font-bold">Executive Protection Monitoring</h2>
      <p className="text-sm text-gray-400">
        Detect impersonation, leaks, and threats to executives
      </p>

      {threats.map((e, i) => (
        <Card
          key={i}
          className="bg-white/5 border-none rounded-2xl backdrop-blur-md shadow-lg hover:shadow-[0_0_20px_rgba(147,51,234,0.4)] transition-shadow duration-300"
        >
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-purple-500 text-white">{e.platform}</Badge>
                <span className="font-medium">{e.name}</span>
                <Badge className={`bg-red-500 text-white`}>{e.risk}</Badge>
                <Badge className="bg-yellow-500 text-white">{e.severity}</Badge>
              </div>
              <p className="text-sm text-gray-400">
                Detected: {e.date} · Action: {e.action}
              </p>
            </div>
            <Button
              size="sm"
              className="bg-purple-500 hover:bg-purple-600"
              onClick={() => setActiveDialog(i)}
            >
              Investigate
            </Button>
          </CardContent>
        </Card>
      ))}

      {activeDialog !== null && (
        <Dialog open={true} onOpenChange={() => setActiveDialog(null)}>
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle>
                Investigate {threats[activeDialog].name}
              </DialogTitle>
            </DialogHeader>
            <div className="mt-2 text-gray-300">
              <p className="mb-2">{threats[activeDialog].description}</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Platform:</p>
                  <p className="text-white">{threats[activeDialog].platform}</p>
                </div>
                <div>
                  <p className="text-gray-400">Severity:</p>
                  <p className="text-white">{threats[activeDialog].severity}</p>
                </div>
                <div>
                  <p className="text-gray-400">Source:</p>
                  <p className="text-white">{threats[activeDialog].source}</p>
                </div>
                <div>
                  <p className="text-gray-400">Detected:</p>
                  <p className="text-white">{threats[activeDialog].date}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-gray-400 mb-1">Action History:</p>
                <ul className="space-y-1 text-gray-300 text-sm">
                  {threats[activeDialog].history?.map((h, idx) => (
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
                className="bg-purple-500 hover:bg-purple-600"
                onClick={() => handleEscalate(activeDialog)}
              >
                Escalate
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
