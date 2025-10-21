"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, Target, Shield, Signal, X } from "lucide-react";

type ThreatActor = {
  name: string;
  aliases: string;
  country: string;
  motivation: string;
  sophistication: string;
  firstSeen: string;
  campaigns: number;
  iocs: number;
  sectors: number;
  targets: string[];
  status: "Very Active" | "Active" | "Inactive";
};

export default function ThreatActorIntelligence() {
  const [selectedActor, setSelectedActor] = useState<ThreatActor | null>(null);

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

  const actors: ThreatActor[] = [
    {
      name: "APT28 (Fancy Bear)",
      aliases: "Sofacy • Pawn Storm • Sednit",
      country: "🇷🇺 Russia",
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
      country: "🇰🇵 North Korea",
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
    <div className="min-h-screen text-white px-8 py-12 space-y-10">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3 drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]">
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
        {actors.map((actor) => (
          <motion.div
            key={actor.name}
            layoutId={actor.name}
            onClick={() => setSelectedActor(actor)}
            className="cursor-pointer"
          >
            <Card className="relative bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md shadow-lg hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] transition p-6">
              <div
                className={`absolute top-4 right-4 text-xs px-3 py-1 rounded-full ${
                  actor.status === "Very Active"
                    ? "bg-red-600/80 text-white"
                    : "bg-yellow-500/80 text-black"
                }`}
              >
                {actor.status}
              </div>
              <h2 className="text-xl font-bold text-white mb-1">
                {actor.name}
              </h2>
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
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Expanded View */}
      <AnimatePresence>
        {selectedActor && (
          <motion.div
            layoutId={selectedActor.name}
            className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-50 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative max-w-3xl w-full bg-[#11111A]/95 border border-white/10 rounded-3xl p-8 shadow-[0_0_40px_rgba(255,255,255,0.1)]"
              layout
            >
              <button
                onClick={() => setSelectedActor(null)}
                className="absolute top-4 right-4 text-slate-300 hover:text-white transition"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="text-2xl font-bold text-white mb-1">
                {selectedActor.name}
              </h2>
              <p className="text-slate-400 text-sm mb-2">
                {selectedActor.aliases}
              </p>
              <p className="text-slate-400 text-sm mb-6">
                {selectedActor.country}
              </p>

              <div className="grid grid-cols-2 gap-4 text-white/80 mb-6">
                <p>
                  <span className="font-semibold text-white">Motivation:</span>{" "}
                  {selectedActor.motivation}
                </p>
                <p>
                  <span className="font-semibold text-white">
                    Sophistication:
                  </span>{" "}
                  {selectedActor.sophistication}
                </p>
                <p>
                  <span className="font-semibold text-white">First Seen:</span>{" "}
                  {selectedActor.firstSeen}
                </p>
                <p>
                  <span className="font-semibold text-white">Status:</span>{" "}
                  {selectedActor.status}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center mb-6">
                <div className="bg-white/5 rounded-xl py-3">
                  <div className="text-xl font-bold">
                    {selectedActor.campaigns}
                  </div>
                  <div className="text-xs text-slate-400">Campaigns</div>
                </div>
                <div className="bg-white/5 rounded-xl py-3">
                  <div className="text-xl font-bold">{selectedActor.iocs}</div>
                  <div className="text-xs text-slate-400">IOCs</div>
                </div>
                <div className="bg-white/5 rounded-xl py-3">
                  <div className="text-xl font-bold">
                    {selectedActor.sectors}
                  </div>
                  <div className="text-xs text-slate-400">Sectors</div>
                </div>
              </div>

              <p className="text-xs uppercase text-slate-400 mb-2">
                Primary Targets:
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {selectedActor.targets.map((t) => (
                  <span
                    key={t}
                    className="text-xs bg-red-900/40 text-red-300 px-3 py-1 rounded-lg border border-red-700/40"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <button
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition"
                onClick={() => alert("Full profile view coming soon!")}
              >
                View Full Profile
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
