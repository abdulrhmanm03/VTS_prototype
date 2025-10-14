"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { RefreshCw, Play, Loader2 } from "lucide-react";

type UserClick = {
  id: string;
  email: string;
  name: string;
  clicked: boolean;
  clickTime?: string;
  riskScore: number;
};

type Summary = {
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  reported: number;
  avgRisk: number;
};

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
}

function makeUsers(count: number): UserClick[] {
  const users: UserClick[] = [];
  for (let i = 0; i < count; i++) {
    const id = `U-${1000 + i}`;
    const name = [
      "Aisha",
      "Omar",
      "Sara",
      "Yusuf",
      "Laila",
      "Hamad",
      "Mona",
      "Khalid",
      "Fatima",
      "Zain",
    ][i % 10];
    const email = `${name.toLowerCase()}${i}@example.com`;
    const clicked = Math.random() < 0.18; // 18% click rate baseline
    const clickTime = clicked
      ? new Date(Date.now() - randInt(60, 3600) * 1000).toISOString()
      : undefined;
    const riskScore = clicked ? randInt(60, 95) : randInt(1, 40);
    users.push({ id, name, email, clicked, clickTime, riskScore });
  }
  return users;
}

export default function StartSimulation() {
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [users, setUsers] = useState<UserClick[]>(() => makeUsers(48));
  const [summary, setSummary] = useState<Summary>({
    sent: 0,
    delivered: 0,
    opened: 0,
    clicked: 0,
    reported: 0,
    avgRisk: 12,
  });
  const [timeline, setTimeline] = useState(() => generateTimelineData(20));

  useEffect(() => {
    let timer: number | undefined;
    if (running) {
      timer = window.setInterval(() => {
        setProgress((p) => Math.min(100, p + randInt(3, 9)));
        setElapsed((e) => e + randInt(1, 3));
      }, 800);
    }
    return () => {
      if (timer) window.clearInterval(timer);
    };
  }, [running]);

  useEffect(() => {
    if (progress >= 100 && running) {
      // finish simulation: synthesize results
      const newUsers = makeUsers(48).map((u) => ({ ...u }));
      const clickedCount = newUsers.filter((u) => u.clicked).length;
      const opened = Math.min(
        newUsers.length,
        Math.floor(newUsers.length * (0.35 + Math.random() * 0.25))
      );
      const reported = Math.floor(clickedCount * (0.05 + Math.random() * 0.12));
      const avgRisk = Math.round(
        newUsers.reduce((s, u) => s + u.riskScore, 0) / newUsers.length
      );
      setUsers(newUsers);
      setSummary({
        sent: newUsers.length,
        delivered: newUsers.length - randInt(0, 2),
        opened,
        clicked: clickedCount,
        reported,
        avgRisk,
      });
      setTimeline(generateTimelineData(20, clickedCount));
      setRunning(false);
    }
  }, [progress, running]);

  function startSimulation() {
    setProgress(0);
    setElapsed(0);
    setRunning(true);
    setSummary({
      sent: 0,
      delivered: 0,
      opened: 0,
      clicked: 0,
      reported: 0,
      avgRisk: 0,
    });
  }

  function resetSimulation() {
    setUsers(makeUsers(48));
    setSummary({
      sent: 0,
      delivered: 0,
      opened: 0,
      clicked: 0,
      reported: 0,
      avgRisk: 12,
    });
    setProgress(0);
    setElapsed(0);
    setTimeline(generateTimelineData(20));
    setRunning(false);
  }

  const chartData = useMemo(() => timeline, [timeline]);

  return (
    <div className="space-y-4 mt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Attack Simulator</h2>
          <p className="text-sm text-gray-400">
            Launch controlled scenarios to validate controls.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            onClick={resetSimulation}
            className="flex items-center gap-2"
          >
            <RefreshCw size={16} /> Reset
          </Button>
          <Button
            onClick={startSimulation}
            disabled={running}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700"
          >
            {running ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <Play size={16} />
            )}{" "}
            {running ? "Running" : "Start Simulation"}
          </Button>
        </div>
      </div>

      <Card className="bg-white/5 backdrop-blur-md rounded-2xl shadow-lg p-4">
        <CardContent>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <StatCard label="Emails Sent" value={summary.sent} />
                <StatCard label="Delivered" value={summary.delivered} />
                <StatCard label="Opened" value={summary.opened} />
                <StatCard label="Clicked" value={summary.clicked} highlight />
                <StatCard label="Reported" value={summary.reported} />
                <StatCard label="Avg Risk" value={`${summary.avgRisk}`} />
                <div className="col-span-2">
                  <div className="mt-3 text-sm text-gray-400">
                    Elapsed: {formatTime(elapsed)}
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-3 mt-2 overflow-hidden">
                    <div
                      className="h-3 rounded-full transition-all"
                      style={{
                        width: `${progress}%`,
                        background:
                          "linear-gradient(90deg, rgba(59,130,246,0.2), rgba(99,102,241,0.4))",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-64 flex-shrink-0">
              <div className="text-right">
                <div className="text-xs text-gray-400">
                  Scenario: Credential Harvesting
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-white/5 rounded-2xl p-4 shadow-lg col-span-2">
        <CardHeader>
          <CardTitle>Engagement Over Time</CardTitle>
          <div className="text-sm text-gray-400">
            Timeline of opens & clicks (fake)
          </div>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorOpen" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopOpacity={0.3} stopColor="#60a5fa" />
                  <stop offset="95%" stopOpacity={0} stopColor="#60a5fa" />
                </linearGradient>
              </defs>
              <XAxis dataKey="label" tick={{ fill: "#94a3b8" }} />
              <YAxis tick={{ fill: "#94a3b8" }} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="opens"
                stroke="#60a5fa"
                fillOpacity={1}
                fill="url(#colorOpen)"
              />
              <Area
                type="monotone"
                dataKey="clicks"
                stroke="#a78bfa"
                fillOpacity={0.1}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="bg-white/5 rounded-2xl p-4 shadow-lg">
        <CardHeader>
          <CardTitle>Top Responders & Actions</CardTitle>
          <div className="text-sm text-gray-400">
            Detailed table of user interactions
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Id</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Clicked</TableHead>
                  <TableHead>Risk</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell className="font-medium">{u.id}</TableCell>
                    <TableCell>{u.name}</TableCell>
                    <TableCell className="text-xs text-gray-400">
                      {u.email}
                    </TableCell>
                    <TableCell>
                      {u.clicked ? (
                        <Badge>Clicked</Badge>
                      ) : (
                        <div className="text-xs text-gray-400">No</div>
                      )}
                    </TableCell>
                    <TableCell>{u.riskScore}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost">
                          Details
                        </Button>
                        <Button size="sm" variant="outline">
                          Quarantine
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// --- Helper components and generators ---

function StatCard({
  label,
  value,
  highlight,
}: {
  label: string;
  value: number | string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`p-3 rounded-xl bg-white/3 border border-white/5 ${
        highlight ? "shadow-inner" : ""
      }`}
    >
      <div className="text-xs text-gray-400">{label}</div>
      <div className="text-xl font-semibold text-gray-100">{value}</div>
    </div>
  );
}

function generateTimelineData(points: number, clicksBaseline = 8) {
  const arr: { label: string; opens: number; clicks: number }[] = [];
  for (let i = 0; i < points; i++) {
    arr.push({
      label: `${i}`,
      opens: randInt(5, 30) + Math.floor(i * 1.2),
      clicks: randInt(0, 6) + Math.floor((i / points) * clicksBaseline),
    });
  }
  return arr;
}
