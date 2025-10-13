"use client";

import { Users, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TargetGroups() {
  const groups = [
    { name: "IT Department", targets: 3 },
    { name: "Sales Team", targets: 6 },
    { name: "Executive Team", targets: 0 },
    { name: "Accounting", targets: 3 },
    { name: "Trading Desk", targets: 2 },
    { name: "Medical Staff", targets: 2 },
    { name: "Administration", targets: 2 },
  ];

  // duplicate to fill grid visually like screenshot
  const duplicated = Array(3).fill(groups).flat().slice(0, 15);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.9)]">
            Groups & Targets
          </h1>
          <p className="text-muted-foreground">
            Manage target groups and users
          </p>
        </div>

        <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.6)]">
          <Plus className="w-4 h-4 mr-2" /> Create Group
        </Button>
      </div>

      {/* Groups Grid */}
      <Card className="bg-black/30 border border-blue-500/30 backdrop-blur-md rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-blue-300">
                All Groups
              </h2>
              <p className="text-sm text-muted-foreground">
                {duplicated.length} target groups
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {duplicated.map((group, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 bg-blue-900/20 border border-blue-400/20 rounded-xl p-4 hover:bg-blue-900/30 transition-all duration-200 shadow-[0_0_10px_rgba(59,130,246,0.2)] hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]"
              >
                <div className="p-3 rounded-full bg-blue-500/20 text-blue-400">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-200">{group.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {group.targets} targets
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
