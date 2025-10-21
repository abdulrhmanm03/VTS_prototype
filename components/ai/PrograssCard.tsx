"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export default function ProgressCard() {
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);

  const stages = [
    { label: "Init", desc: "Initializing modules…" },
    { label: "Logs", desc: "Fetching runtime logs…" },
    { label: "Analyze", desc: "Analyzing threat signals…" },
    { label: "Report", desc: "Finalizing report generation…" },
  ];

  useEffect(() => {
    let stageIndex = 0;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + Math.floor(Math.random() * 8) + 5, 100);
        if (
          next >= ((stageIndex + 1) / stages.length) * 100 &&
          stageIndex < stages.length - 1
        ) {
          stageIndex++;
          setCurrentStage(stageIndex);
        }
        if (next === 100) clearInterval(interval);
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="p-5 rounded-2xl bg-white/6 border border-white/10 shadow-lg backdrop-blur-md">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-sm text-gray-300">Live Progress</div>
          <div className="text-2xl font-bold text-white mt-1">{progress}%</div>
        </div>
        <div className="text-xs text-gray-400 text-right ">
          {stages[currentStage]?.desc}
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden mb-4">
        <motion.div
          className="h-3 bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-400"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>

      {/* Stages row */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {stages.map((stage, index) => (
          <motion.div
            key={index}
            animate={{
              boxShadow:
                index === currentStage
                  ? "0 0 12px rgba(56,189,248,0.8), 0 0 24px rgba(56,189,248,0.6)"
                  : "none",
              backgroundColor:
                index <= currentStage
                  ? "rgba(59,130,246,0.4)"
                  : "rgba(255,255,255,0.08)",
              scale: index === currentStage ? 1.05 : 1,
            }}
            transition={{ duration: 0.4 }}
            className="text-center text-xs text-white py-2 rounded-lg border border-white/10"
          >
            {stage.label}
          </motion.div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
        <div className="bg-white/5 p-2 rounded">CPU: 64%</div>
        <div className="bg-white/5 p-2 rounded">Memory: 72%</div>
        <div className="bg-white/5 p-2 rounded">Disk I/O: Normal</div>
        <div className="bg-white/5 p-2 rounded">Network: Stable</div>
      </div>
    </Card>
  );
}
