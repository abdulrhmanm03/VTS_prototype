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
import { motion } from "framer-motion";

interface Threat {
  type: string;
  domain: string;
  risk: string;
  riskColor: string;
  date: string;
  action: string;
  similarity: number;
  description: string;
  ip?: string;
  registrant?: string;
  lastSeen?: string;
  history?: { date: string; action: string }[];
}

export default function BrandProtection() {
  const [threats, setThreats] = useState<Threat[]>([
    {
      type: "Typosquatting",
      domain: "companyy.com",
      risk: "High Risk",
      riskColor: "bg-red-500",
      date: "2024-01-20",
      action: "Takedown Requested",
      similarity: 95,
      description:
        "This domain closely resembles your brand. Often used for phishing attempts or fraud.",
      ip: "192.168.1.10",
      registrant: "John Doe / Whois Privacy",
      lastSeen: "2024-01-21",
      history: [
        { date: "2024-01-20", action: "Detected" },
        { date: "2024-01-20", action: "Takedown Requested" },
      ],
    },
    {
      type: "Phishing",
      domain: "company-secure.net",
      risk: "Critical Risk",
      riskColor: "bg-red-700",
      date: "2024-01-18",
      action: "None",
      similarity: 90,
      description:
        "This site is sending phishing emails pretending to be your company. Immediate action is recommended.",
      ip: "203.0.113.45",
      registrant: "Jane Smith / Whois Guard",
      lastSeen: "2024-01-19",
      history: [{ date: "2024-01-18", action: "Detected" }],
    },
  ]);

  const [expanded, setExpanded] = useState<number | null>(null);
  const [activeDialog, setActiveDialog] = useState<{
    type: "investigate" | "takedown";
    index: number;
  } | null>(null);

  const handleTakedown = (index: number) => {
    const updatedThreats = [...threats];
    updatedThreats[index].action = "Takedown Sent";
    updatedThreats[index].history?.push({
      date: new Date().toISOString().split("T")[0],
      action: "Takedown Sent",
    });
    setThreats(updatedThreats);
    setActiveDialog(null);
  };

  return (
    <div className="space-y-6 mt-6">
      <h2 className="text-2xl font-bold">Brand Protection Monitoring</h2>
      <p className="text-sm text-gray-400">
        Monitor for typosquatting, phishing, and brand abuse
      </p>

      {threats.map((t, i) => (
        <div key={i}>
          <Card
            className="relative border-none rounded-2xl bg-white/5 shadow-lg backdrop-blur-md hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-shadow duration-300 cursor-pointer"
            onClick={() => setExpanded(expanded === i ? null : i)}
          >
            <CardContent className="flex items-center justify-between p-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Badge className="bg-orange-500 text-white">{t.type}</Badge>
                  <span className="font-medium">{t.domain}</span>
                  <Badge className={`${t.riskColor} text-white`}>
                    {t.risk}
                  </Badge>
                  <Badge variant="secondary">Active</Badge>
                </div>
                <p className="text-sm text-gray-400">
                  Similarity: {t.similarity}% · Detected: {t.date} · Action:{" "}
                  {t.action}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-white/10 border-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveDialog({ type: "investigate", index: i });
                  }}
                >
                  Investigate
                </Button>
                <Button
                  size="sm"
                  className="bg-blue-500 hover:bg-blue-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveDialog({ type: "takedown", index: i });
                  }}
                >
                  Takedown
                </Button>
              </div>
            </CardContent>
          </Card>

          {expanded === i && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-none rounded-2xl bg-white/10 shadow-md backdrop-blur-md p-4 mt-2">
                <h3 className="font-semibold text-lg mb-2">
                  {t.domain} Details
                </h3>
                <p className="text-gray-300 mb-1">{t.description}</p>

                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="text-gray-400 text-sm">IP Address:</p>
                    <p className="text-white text-sm">{t.ip}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Registrant:</p>
                    <p className="text-white text-sm">{t.registrant}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Last Seen:</p>
                    <p className="text-white text-sm">{t.lastSeen}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Current Action:</p>
                    <p className="text-white text-sm">{t.action}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-gray-400 text-sm mb-1">Action History:</p>
                  <ul className="space-y-1 text-gray-300 text-sm">
                    {t.history?.map((h, idx) => (
                      <li key={idx}>
                        <span className="font-semibold">{h.date}</span>:{" "}
                        {h.action}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      ))}

      {/* Dialog */}
      {activeDialog && (
        <Dialog open={true} onOpenChange={() => setActiveDialog(null)}>
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle>
                {activeDialog.type === "investigate"
                  ? `Investigate ${threats[activeDialog.index].domain}`
                  : `Takedown ${threats[activeDialog.index].domain}`}
              </DialogTitle>
            </DialogHeader>
            <div className="mt-2 text-gray-300">
              {activeDialog.type === "investigate" ? (
                <div>
                  <p>{threats[activeDialog.index].description}</p>
                  <p className="mt-2 text-sm text-gray-400">
                    Similarity: {threats[activeDialog.index].similarity}% ·
                    Detected: {threats[activeDialog.index].date}
                  </p>
                </div>
              ) : (
                <p>
                  Are you sure you want to send a takedown request for{" "}
                  {threats[activeDialog.index].domain}?
                </p>
              )}
            </div>
            <DialogFooter className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setActiveDialog(null)}>
                Cancel
              </Button>
              {activeDialog.type === "takedown" && (
                <Button
                  className="bg-blue-500 hover:bg-blue-600"
                  onClick={() => handleTakedown(activeDialog.index)}
                >
                  Confirm
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
