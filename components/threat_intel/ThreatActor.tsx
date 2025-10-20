"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Activity, Target, Shield, Signal } from "lucide-react";

export default function ThreatActorIntelligence() {
  const stats = [
    {
      icon: <Target className="w-6 h-6 text-red-400" />,
      value: "156",
      label: "Tracked Actors",
    },
    {
      icon: <Shield className="w-6 h-6 text-yellow-400" />,
      value: "89",
      label: "Active Campaigns",
    },
    {
      icon: <Signal className="w-6 h-6 text-purple-400" />,
      value: "15,847",
      label: "Total IOCs",
    },
    {
      icon: <Activity className="w-6 h-6 text-amber-400" />,
      value: "+47",
      label: "Recent Activity",
    },
  ];

  const actors = [
    {
      name: "APT28 (Fancy Bear)",
      aliases: "Sofacy • Pawn Storm • Sednit",
      country: "RU  Russia",
      motivation: "Espionage",
      sophistication: "Very High",
      firstSeen: "2007",
      campaigns: 47,
      iocs: 1247,
      sectors: 4,
      targets: ["Government", "Military", "Defense"],
      status: "Very Active",
    },
    {
      name: "Lazarus Group",
      aliases: "HIDDEN COBRA • Guardians of Peace",
      country: "KP  North",
      motivation: "Financial Gain, Espionage",
      sophistication: "Very High",
      firstSeen: "2009",
      campaigns: 89,
      iocs: 2341,
      sectors: 4,
      targets: ["Financial", "Cryptocurrency", "Defense"],
      status: "Very Active",
    },
    {
      name: "FIN7",
      aliases: "Carbanak Group • Navigator Group",
      country: "🌐 International",
      motivation: "Financial Gain",
      sophistication: "High",
      firstSeen: "2013",
      campaigns: 156,
      iocs: 3421,
      sectors: 3,
      targets: ["Retail", "Hospitality", "Financial Services"],
      status: "Active",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0F] via-[#11111A] to-[#1A1A24] text-white px-8 py-12 space-y-10">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.2)] flex items-center gap-3">
          <span className="text-orange-400">🧠</span> Threat Actor Intelligence
        </h1>
        <p className="text-slate-400">
          Advanced Persistent Threats & Cybercrime Groups
        </p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card
            key={i}
            className="bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md shadow-md hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition"
          >
            <CardContent className="flex flex-col items-center justify-center py-6">
              <div className="mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Actor Cards */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {actors.map((actor, i) => (
          <Card
            key={i}
            className="relative bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md shadow-lg hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] transition p-6"
          >
            {/* Status Badge */}
            <div
              className={`absolute top-4 right-4 text-xs px-3 py-1 rounded-full ${
                actor.status === "Very Active"
                  ? "bg-red-600/80 text-white"
                  : "bg-yellow-500/80 text-black"
              }`}
            >
              {actor.status}
            </div>

            <h2 className="text-xl font-bold text-white mb-1">{actor.name}</h2>
            <p className="text-slate-400 text-sm mb-2">{actor.aliases}</p>
            <p className="text-slate-400 text-sm mb-4">{actor.country}</p>

            <div className="space-y-1 text-sm text-white/80">
              <p>
                <span className="font-semibold text-white">Motivation:</span>{" "}
                {actor.motivation}
              </p>
              <p>
                <span className="font-semibold text-white">
                  Sophistication:
                </span>{" "}
                <span className="text-red-400">{actor.sophistication}</span>
              </p>
              <p>
                <span className="font-semibold text-white">First Seen:</span>{" "}
                {actor.firstSeen}
              </p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3 mt-5 text-center">
              <div className="bg-white/5 rounded-xl py-2">
                <div className="text-xl font-bold">{actor.campaigns}</div>
                <div className="text-xs text-slate-400">Campaigns</div>
              </div>
              <div className="bg-white/5 rounded-xl py-2">
                <div className="text-xl font-bold">{actor.iocs}</div>
                <div className="text-xs text-slate-400">IOCs</div>
              </div>
              <div className="bg-white/5 rounded-xl py-2">
                <div className="text-xl font-bold">{actor.sectors}</div>
                <div className="text-xs text-slate-400">Sectors</div>
              </div>
            </div>

            {/* Targets */}
            <div className="mt-5">
              <p className="text-xs uppercase text-slate-400 mb-2">
                Primary Targets:
              </p>
              <div className="flex flex-wrap gap-2">
                {actor.targets.map((t) => (
                  <span
                    key={t}
                    className="text-xs bg-red-900/40 text-red-300 px-3 py-1 rounded-lg border border-red-700/40"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Button */}
            <button className="w-full mt-6 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition">
              View Full Profile
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}
