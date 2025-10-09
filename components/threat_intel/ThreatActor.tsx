"use client";

import Image from "next/image";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type ThreatActorType = {
  name: string;
  image: string;
  motivation: string;
  countries: string;
  sectors: string;
  attackType: string;
  techniques: string[];
  date: string;
  readTime: string;
  quote: string;
  description: string;
};

const threatActors: Record<string, ThreatActorType> = {
  "black-cat": {
    name: "Black Cat Ransomware",
    image: "/black_cat_2.png",
    motivation: "Financial Gain",
    countries: "Singapore, Taiwan, Thailand, United States",
    sectors: "Manufacturing, Financial Services, Healthcare",
    attackType: "Data Encryption, Data Exfiltration",
    techniques: [
      "Phishing (T1566)",
      "Inhibit System Recovery (T1490)",
      "Data Encrypted for Impact (T1486)",
    ],
    date: "Sep 19, 2025",
    readTime: "10 Mins Read",
    quote: "We only seek money. No morals, no political stance.",
    description:
      "Black Cat emerged in 2025 and quickly carried out disruptive ransomware attacks in multiple regions...",
  },
  "dire-wolf": {
    name: "Dire Wolf Ransomware",
    image: "/dire_wolf_2.png",
    motivation: "Financial Gain",
    countries: "USA, Canada, UK",
    sectors: "Healthcare, Education, Retail",
    attackType: "Data Encryption, Credential Theft",
    techniques: [
      "Spear Phishing (T1566.002)",
      "Account Takeover (T1078)",
      "Data Encrypted for Impact (T1486)",
    ],
    date: "Sep 04, 2025",
    readTime: "8 Mins Read",
    quote: "Profit is everything. No politics, no ideology.",
    description:
      "Dire Wolf surfaced in 2024 targeting multiple sectors with advanced phishing campaigns and ransomware attacks...",
  },
};

export default function ThreatActor() {
  const [currentActorKey, setCurrentActorKey] = useState("black-cat");
  const actor = threatActors[currentActorKey];

  return (
    <div className="min-h-screen text-gray-200">
      {/* Hero Section */}
      <section className="relative w-full">
        <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8 items-center">
          {/* Image */}
          <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 shadow-lg">
            <Image
              src={actor.image}
              alt={actor.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-blue-800/20 to-transparent" />
          </div>

          {/* Info Card */}
          <Card className="relative border-none text-white overflow-hidden rounded-2xl bg-white/5 shadow-lg backdrop-blur-md hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-blue-800/10 to-transparent" />
            <div className="relative z-10">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.8)]">
                  {actor.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-white/80">
                <p>
                  <span className="font-semibold text-white">Motivation:</span>{" "}
                  {actor.motivation}
                </p>
                <p>
                  <span className="font-semibold text-white">
                    Target Countries:
                  </span>{" "}
                  {actor.countries}
                </p>
                <p>
                  <span className="font-semibold text-white">
                    Target Sectors:
                  </span>{" "}
                  {actor.sectors}
                </p>
                <p>
                  <span className="font-semibold text-white">Attack Type:</span>{" "}
                  {actor.attackType}
                </p>
                <Separator className="my-2 bg-white/20" />
                <ul className="space-y-1 text-blue-300">
                  {actor.techniques.map((technique) => (
                    <li key={technique}>• {technique}</li>
                  ))}
                </ul>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      {/* Body Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-12 gap-8">
        {/* Sidebar Left */}
        <aside className="lg:col-span-3 space-y-6">
          <Card className="relative border-none text-white overflow-hidden rounded-2xl bg-white/5 shadow-lg backdrop-blur-md p-4">
            <p className="font-semibold mb-3 text-blue-400">Table Of Content</p>
            <ul className="text-sm space-y-2 text-white/70">
              <li className="text-blue-300 font-semibold">
                Dark Web Profile: {actor.name}
              </li>
              <li>Who is {actor.name}?</li>
              <li>What are {actor.name}’s Targets?</li>
              <li>What are {actor.name}’s Techniques?</li>
              <li>What are the Mitigation Tactics?</li>
              <li>How Can SOCRadar Help?</li>
            </ul>
          </Card>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-6 space-y-6">
          <div>
            <p className="text-xs text-white/60">
              Home › Blog › Threat Actor Profiles
            </p>
            <h1 className="text-3xl font-bold mt-2 mb-4 text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.9)]">
              Dark Web Profile: {actor.name}
            </h1>
            <p className="text-sm text-white/60">
              {actor.date} • {actor.readTime}
            </p>
          </div>

          <div className="prose prose-invert max-w-none text-white/80">
            <p>{actor.description}</p>
            <p>
              <em className="text-blue-300">{actor.quote}</em>
            </p>
          </div>
        </main>

        {/* Related Articles */}
        <aside className="lg:col-span-3 space-y-6">
          <Card className="relative border-none text-white overflow-hidden rounded-2xl bg-white/5 shadow-lg backdrop-blur-md p-4">
            <p className="font-semibold mb-3 text-blue-400">Related Articles</p>
            <ul className="space-y-4 text-sm text-white/70">
              {Object.entries(threatActors).map(([key, item]) => (
                <li
                  key={key}
                  className="cursor-pointer hover:text-blue-300"
                  onClick={() => setCurrentActorKey(key)}
                >
                  <p>{item.name}</p>
                  <p className="text-xs text-white/50">{item.date}</p>
                </li>
              ))}
            </ul>
          </Card>
        </aside>
      </div>
    </div>
  );
}
