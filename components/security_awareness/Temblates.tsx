"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function TemplatesCard() {
  const emailTemplates = [
    {
      name: "Password Reset Request",
      subject: "Urgent: Reset Your Password",
      type: "credential_harvesting",
    },
    {
      name: "IT Department Survey",
      subject: "Quick IT Survey - Your Feedback Needed",
      type: "social_engineering",
    },
    {
      name: "HR Benefits Update",
      subject: "Important: Update Your Benefits Information",
      type: "social_engineering",
    },
    {
      name: "Invoice Payment Required",
      subject: "Invoice #{{random_number}} - Payment Overdue",
      type: "social_engineering",
    },
  ];

  const landingPages = [
    {
      name: "Corporate Login Portal",
      type: "credential_harvesting",
    },
    {
      name: "Survey Response Form",
      type: "social_engineering",
    },
  ];

  return (
    <Card className="bg-white/5 border-none backdrop-blur-md shadow-lg mt-5">
      <CardHeader>
        <CardTitle className="text-gray-100">Templates</CardTitle>
        <p className="text-gray-400 text-sm">
          Email templates and landing pages
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Email Templates */}
        <div>
          <h3 className="text-lg font-semibold text-gray-200 mb-2">
            Email Templates
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            {emailTemplates.length} templates available
          </p>
          <div className="space-y-3">
            {emailTemplates.map((t, idx) => (
              <div
                key={idx}
                className="flex flex-col md:flex-row md:items-center justify-between bg-white/5 p-4 rounded-xl"
              >
                <div>
                  <h4 className="font-semibold text-gray-100">{t.name}</h4>
                  <p className="text-sm text-gray-400">Subject: {t.subject}</p>
                </div>
                <Badge className="bg-blue-600/80 text-white capitalize mt-2 md:mt-0">
                  {t.type.replace("_", " ")}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Landing Pages */}
        <div>
          <h3 className="text-lg font-semibold text-gray-200 mb-2">
            Landing Pages
          </h3>
          <div className="space-y-3">
            {landingPages.map((l, idx) => (
              <div
                key={idx}
                className="flex flex-col md:flex-row md:items-center justify-between bg-white/5 p-4 rounded-xl"
              >
                <h4 className="font-semibold text-gray-100">{l.name}</h4>
                <Badge className="bg-purple-600/80 text-white capitalize mt-2 md:mt-0">
                  {l.type.replace("_", " ")}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
