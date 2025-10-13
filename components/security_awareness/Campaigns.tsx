"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CampaignsCard() {
  const campaigns = [
    {
      name: "Q4 Password Security Test",
      launch: "29/09/2025, 11:29:32 AM",
      targets: 4,
      status: "completed",
    },
    {
      name: "Employee Feedback Survey",
      launch: "10/10/2025, 11:29:32 AM",
      targets: 6,
      status: "completed",
    },
    {
      name: "Invoice Payment Verification",
      launch: "06/10/2025, 11:29:32 AM",
      targets: 3,
      status: "completed",
    },
    {
      name: "Benefits Enrollment Reminder",
      launch: "03/10/2025, 11:29:32 AM",
      targets: 2,
      status: "completed",
    },
    {
      name: "Security Awareness Test - November",
      launch: "12/10/2025, 11:29:32 AM",
      targets: 3,
      status: "in_progress",
    },
  ];

  return (
    <Card className="bg-white/5 border-none backdrop-blur-md shadow-lg mt-5">
      <CardHeader>
        <CardTitle className="text-gray-100">Campaigns</CardTitle>
        <p className="text-gray-400 text-sm">
          View and manage phishing campaigns
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {campaigns.map((c, idx) => (
          <div
            key={idx}
            className="flex flex-col md:flex-row md:items-center justify-between bg-white/5 p-4 rounded-xl"
          >
            <div>
              <h3 className="font-semibold text-gray-100">{c.name}</h3>
              <p className="text-sm text-gray-400">
                Launch: {c.launch} • {c.targets} targets
              </p>
            </div>
            <Badge
              className={`${
                c.status === "completed"
                  ? "bg-green-600/80"
                  : "bg-yellow-600/80"
              } text-white capitalize mt-2 md:mt-0`}
            >
              {c.status.replace("_", " ")}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
