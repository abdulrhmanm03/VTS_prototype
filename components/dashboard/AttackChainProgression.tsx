"use client";

import { FC } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowRight, Activity } from "lucide-react";

const chainGradients = {
  INITIAL: "from-blue-900/20 via-blue-800/10 to-transparent",
  EXECUTION: "from-orange-900/20 via-orange-800/10 to-transparent",
  LATERAL: "from-purple-900/20 via-purple-800/10 to-transparent",
  EXFILTRATION: "from-red-900/20 via-red-800/10 to-transparent",
};

const stageColors = {
  INITIAL: "bg-blue-600 text-white",
  EXECUTION: "bg-orange-500 text-black",
  LATERAL: "bg-purple-600 text-white",
  EXFILTRATION: "bg-red-600 text-white",
};

const attackChain = [
  {
    id: 1,
    stage: "INITIAL",
    name: "Spear Phishing Email",
    details:
      "Malicious email with a disguised payload successfully delivered to target inbox.",
  },
  {
    id: 2,
    stage: "EXECUTION",
    name: "Payload Execution",
    details:
      "Victim opened the attachment, executing a PowerShell script establishing C2.",
  },
  {
    id: 3,
    stage: "LATERAL",
    name: "Credential Harvesting",
    details:
      "Attacker escalated privileges using cached domain credentials and moved laterally.",
  },
  {
    id: 4,
    stage: "EXFILTRATION",
    name: "Data Transfer to Remote Server",
    details:
      "Sensitive files compressed and exfiltrated via HTTPS to external host.",
  },
  {
    id: 5,
    stage: "INITIAL",
    name: "Spear Phishing Email",
    details:
      "Malicious email with a disguised payload successfully delivered to target inbox.",
  },
  {
    id: 6,
    stage: "EXECUTION",
    name: "Payload Execution",
    details:
      "Victim opened the attachment, executing a PowerShell script establishing C2.",
  },
  {
    id: 7,
    stage: "LATERAL",
    name: "Credential Harvesting",
    details:
      "Attacker escalated privileges using cached domain credentials and moved laterally.",
  },
  {
    id: 8,
    stage: "EXFILTRATION",
    name: "Data Transfer to Remote Server",
    details:
      "Sensitive files compressed and exfiltrated via HTTPS to external host.",
  },
];

const AttackChainProgression: FC = () => {
  return (
    <Card className="bg-[#0e1321] border-none text-white h-[600px] shadow-lg backdrop-blur-md hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2 text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.9)]">
          <Activity className="h-6 w-6 text-blue-400 animate-pulse" />
          Attack Timeline
        </CardTitle>
        <p className="text-xs text-gray-400 mt-1">
          Visualizes the progression of a cyber attack across stages, showing
          each action and its details.
        </p>
      </CardHeader>
      <CardContent className="space-y-3 overflow-y-auto hide-scrollbar pr-2">
        {attackChain.map((attack) => (
          <div
            key={attack.id}
            className="flex items-center gap-3 h-20 transition-all duration-300"
          >
            {/* Left small card - Attack Name */}
            <Card
              className={`relative w-1/4 min-w-[140px] h-full border-none rounded-xl bg-white/10 text-white flex items-center justify-center font-semibold text-sm shadow-md backdrop-blur-md hover:shadow-[0_0_16px_rgba(59,130,246,0.5)] transition-all duration-300`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${
                  chainGradients[attack.stage as keyof typeof chainGradients]
                } pointer-events-none`}
              />
              <span
                className={`absolute top-2 right-2 text-[9px] font-bold px-2 py-0.5 rounded-full ${
                  stageColors[attack.stage as keyof typeof stageColors]
                }`}
              >
                {attack.stage}
              </span>
              <span className="relative z-10 text-center">{attack.name}</span>
            </Card>

            {/* Arrow separator */}
            <ArrowRight className="text-gray-500 w-4 h-4 shrink-0" />

            {/* Right large card - Details */}
            <Card
              className={`relative flex-1 h-full border-none rounded-xl bg-white/5 text-white flex flex-col justify-center px-4 shadow-md backdrop-blur-md hover:shadow-[0_0_16px_rgba(59,130,246,0.5)] transition-all duration-300`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${
                  chainGradients[attack.stage as keyof typeof chainGradients]
                } pointer-events-none`}
              />
              <div className="relative z-10 text-xs text-gray-300 leading-snug">
                {attack.details}
              </div>
            </Card>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AttackChainProgression;
