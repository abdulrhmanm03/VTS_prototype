"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Alert = {
  alert: string;
  solution: string;
  confidence: string;
  url: string;
  risk: string;
};

type ScanData = {
  name: string;
  ip: string;
  zap_scan: {
    alerts_count: number;
    alerts: Alert[];
  };
};

interface Props {
  data: ScanData;
}

// Utility function to truncate text
const truncate = (text: string, length: number) =>
  text.length > length ? text.slice(0, length) + "…" : text;

const riskLevels = ["high", "medium", "low"];
const confLevels = ["high", "medium", "low"];

export default function ScanReport({ data }: Props) {
  const [selectedRisks, setSelectedRisks] = useState<string[]>([...riskLevels]);
  const [selectedConfs, setSelectedConfs] = useState<string[]>([...confLevels]);

  const baseAlerts = data.zap_scan.alerts.filter(
    (a) => a.risk.toLowerCase() !== "informational"
  );

  const filteredAlerts = baseAlerts.filter((a) => {
    const riskMatch = selectedRisks.includes(a.risk.toLowerCase());
    const confMatch = selectedConfs.includes(a.confidence.toLowerCase());
    return riskMatch && confMatch;
  });

  const toggleAll = (type: "risk" | "conf", selectAll: boolean) => {
    if (type === "risk") {
      setSelectedRisks(selectAll ? [...riskLevels] : []);
    } else {
      setSelectedConfs(selectAll ? [...confLevels] : []);
    }
  };

  const toggleValue = (type: "risk" | "conf", value: string) => {
    if (type === "risk") {
      setSelectedRisks((prev) =>
        prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
      );
    } else {
      setSelectedConfs((prev) =>
        prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Asset Info */}
      <Card className="relative border-none text-white overflow-x-auto hide-scrollbar rounded-2xl bg-white/5 shadow-lg backdrop-blur-md hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-blue-800/10 to-transparent pointer-events-none" />
        <div className="relative z-10">
          <CardHeader>
            <CardTitle className="text-white">Asset Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-white/80">
            <p>
              <strong>Name:</strong> {data.name}
            </p>
            <p>
              <strong>IP:</strong> {data.ip}
            </p>
            <p>
              <strong>Total Alerts:</strong> {filteredAlerts.length}
            </p>
          </CardContent>
        </div>
      </Card>

      {/* Filters */}
      <div className="flex gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:border-blue-400 hover:bg-white/20 transition"
            >
              Filter by Risk
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 bg-white/10 backdrop-blur-md text-white border-white/20">
            <DropdownMenuCheckboxItem
              checked={selectedRisks.length === riskLevels.length}
              onCheckedChange={(checked) => toggleAll("risk", !!checked)}
            >
              Select All
            </DropdownMenuCheckboxItem>
            {riskLevels.map((risk) => (
              <DropdownMenuCheckboxItem
                key={risk}
                checked={selectedRisks.includes(risk)}
                onCheckedChange={() => toggleValue("risk", risk)}
              >
                {risk.charAt(0).toUpperCase() + risk.slice(1)}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:border-blue-400 hover:bg-white/20 transition"
            >
              Filter by Confidence
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-white/10 backdrop-blur-md text-white border-white/20">
            <DropdownMenuCheckboxItem
              checked={selectedConfs.length === confLevels.length}
              onCheckedChange={(checked) => toggleAll("conf", !!checked)}
            >
              Select All
            </DropdownMenuCheckboxItem>
            {confLevels.map((conf) => (
              <DropdownMenuCheckboxItem
                key={conf}
                checked={selectedConfs.includes(conf)}
                onCheckedChange={() => toggleValue("conf", conf)}
              >
                {conf.charAt(0).toUpperCase() + conf.slice(1)}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Alerts Table */}
      <Card className="relative border-none text-white overflow-x-auto hide-scrollbar rounded-2xl bg-white/5 shadow-lg backdrop-blur-md hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-blue-800/10 to-transparent pointer-events-none" />
        <div className="relative z-10">
          <CardHeader>
            <CardTitle className="text-white">Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="text-white/70">
                  <TableHead>Alert</TableHead>
                  <TableHead>Solution</TableHead>
                  <TableHead>Confidence</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead>Risk</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAlerts.map((alert, idx) => (
                  <TableRow
                    key={idx}
                    className="hover:bg-white/10 transition-colors"
                  >
                    <TableCell title={alert.alert} className="text-white">
                      {alert.alert}
                    </TableCell>
                    <TableCell
                      title={alert.solution}
                      className="text-white/80"
                    >
                      {truncate(alert.solution, 30)}
                    </TableCell>
                    <TableCell className="text-white">
                      <Badge
                        className={
                          alert.confidence.toLowerCase() === "high"
                            ? "bg-green-500 text-black"
                            : alert.confidence.toLowerCase() === "medium"
                            ? "bg-yellow-500 text-black"
                            : "bg-blue-500 text-black"
                        }
                      >
                        {alert.confidence}
                      </Badge>
                    </TableCell>
                    <TableCell title={alert.url} className="text-blue-400 underline">
                      {truncate(alert.url, 30)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          alert.risk.toLowerCase() === "high"
                            ? "bg-red-500 text-black"
                            : alert.risk.toLowerCase() === "medium"
                            ? "bg-yellow-500 text-black"
                            : "bg-blue-500 text-black"
                        }
                      >
                        {alert.risk}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredAlerts.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center text-white/60"
                    >
                      No alerts match the selected filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}