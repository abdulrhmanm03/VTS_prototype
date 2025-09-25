"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

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

  // Filter out informational alerts first
  const baseAlerts = data.zap_scan.alerts.filter(
    (a) => a.risk.toLowerCase() !== "informational"
  );

  // Apply filters
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
    <div className="space-y-6 p-6">
      {/* Asset Info */}
      <Card>
        <CardHeader>
          <CardTitle>Asset Information</CardTitle>
        </CardHeader>
        <CardContent>
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
      </Card>

      {/* Filters */}
      <div className="flex gap-4">
        {/* Risk Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Filter by Risk</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
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

        {/* Confidence Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Filter by Confidence</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
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
      <Card>
        <CardHeader>
          <CardTitle>Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Alert</TableHead>
                <TableHead>Solution</TableHead>
                <TableHead>Confidence</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Risk</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAlerts.map((alert, idx) => (
                <TableRow key={idx}>
                  <TableCell title={alert.alert}>{alert.alert}</TableCell>
                  <TableCell title={alert.solution}>
                    {truncate(alert.solution, 30)}
                  </TableCell>
                  <TableCell title={alert.confidence}>{alert.confidence}</TableCell>
                  <TableCell title={alert.url}>{truncate(alert.url, 30)}</TableCell>
                  <TableCell title={alert.risk}>{alert.risk}</TableCell>
                </TableRow>
              ))}
              {filteredAlerts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    No alerts match the selected filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
