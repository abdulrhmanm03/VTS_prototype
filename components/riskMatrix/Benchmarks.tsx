"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { name: "You", score: 72 },
  { name: "Industry Avg", score: 85 },
  { name: "Top 25%", score: 92 },
  { name: "Bottom 25%", score: 45 },
];

export default function Benchmarks() {
  return (
    <Card className="bg-white/5 backdrop-blur-md border-none rounded-2xl">
      <CardHeader>
        <CardTitle>Benchmark Comparison</CardTitle>
        <p className="text-sm text-gray-400">
          Compare your security posture against peers
        </p>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f1f1f",
                border: "1px solid #444",
              }}
              labelStyle={{ color: "#fff" }}
              itemStyle={{ color: "#fff" }}
            />
            <Bar dataKey="score" fill="#3b82f6" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
